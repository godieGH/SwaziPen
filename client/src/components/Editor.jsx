// src/components/Editor.jsx
import { useEffect, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@api/axios.js";
import socket from "@api/socket.js";
import useLoadedFileStore from "@stores/loadedFile.js";
import useSettingsStore from '@stores/settingsStore';
import AceEditor from "react-ace";
import BottomBarTools from "@components/BottomBarTools.jsx";
import debounce from "lodash.debounce";

async function saveFile(payload) {
   const { data } = await api.post("/api/save/file", payload);
   return data;
}

function Editor() {
   const mutateFileContent = useMutation({
      mutationFn: saveFile,
      onSuccess: (data, vars) => {
         navigator.vibrate(70);
         useLoadedFileStore.setState({notsaved: false, deleted: false});
      },
      onError: err => {
         console.error("Failed to save file", err);
      }
   });

   // store selectors
   const treeFileData = useLoadedFileStore(s => s.treeFileData);
   const sourceContent = useLoadedFileStore(s => s.content);
   const filename = useLoadedFileStore(s => s.filename);
   const updateSource = useLoadedFileStore(s => s.updateSource);
   //const theme = useLoadedFileStore(s => s.theme);
   const mode = useLoadedFileStore(s => s.mode);
   
   // settingsStore
   const theme = useSettingsStore(s => s.theme);
   const fontSize = useSettingsStore(s => s.fontSize);
   const lineHeight = useSettingsStore(s => s.lineHeight);
   const fontFamily = useSettingsStore(s => s.fontFamily);
   const lineNumbers = useSettingsStore(s => s.lineNumbers);
   const indentGuides = useSettingsStore(s => s.indentGuides);
   const tabSize = useSettingsStore(s => s.tabSize);
   const wordWrap = useSettingsStore(s => s.wordWrap);
   const cursorStyle = useSettingsStore(s => s.cursorStyle);
   const renderWhitespace = useSettingsStore(s => s.renderWhitespace);
   const autoSave = useSettingsStore(s => s.autoSave);

   // applyNewContent is used by the debounced commit
   const applyNewContent = useLoadedFileStore.getState().applyNewContent;

   const editorRef = useRef(null);
   const saveTimerRef = useRef(null);
   const autoSaveTimerRef = useRef(null);

   const handleLoad = editor => {
      editorRef.current = editor;
   };

   // Debounced auto-save function - created once
   const debouncedAutoSave = useRef(
      debounce(() => {
         const state = useLoadedFileStore.getState();
         if (!state.treeFileData || !state.filename || !state.notsaved || state.deleted) return;
         
         mutateFileContent.mutate({
            filename: state.filename,
            treeFileData: state.treeFileData,
            content: state.content
         });
      }, 3000)
   ).current;

   // When store.content changes (e.g. file load), update editor only if different
   useEffect(() => {
      const ed = editorRef.current;
      if (!ed) return;

      const current = ed.getValue();
      if (current === sourceContent) return;

      // preserve cursor and selection if possible
      let cursor, selRange;
      try {
         cursor = ed.getCursorPosition();
         selRange = ed.getSelectionRange();
      } catch (e) {
         cursor = null;
         selRange = null;
      }

      // set editor value (this may move cursor)
      ed.setValue(sourceContent);

      // restore caret + selection if we grabbed them
      try {
         if (cursor) ed.moveCursorToPosition(cursor);
         if (selRange) ed.selection.setSelectionRange(selRange);
      } catch (e) {
         // ignore if restore fails
      }
   }, [sourceContent]);

   // called by Ace on every change
   const handleChange = newValue => {
      // 1) update the "in-progress" store quickly
      updateSource(newValue);

      // 2) debounce the commit (applyNewContent)
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
         applyNewContent();
         
         // 3) Trigger auto-save if afterDelay mode
         if (autoSave === 'afterDelay') {
            debouncedAutoSave();
         }
      }, 800);
   };

   const handleAction = data => {
      const ed = editorRef.current;
      if (!ed) return;
      
      if (data.key === "tab") ed.insert("\t");
      if (data.key === "nav-up") ed.navigateUp(1);
      if (data.key === "nav-down") ed.navigateDown(1);
      if (data.key === "nav-left") ed.navigateLeft(1);
      if (data.key === "nav-right") ed.navigateRight(1);
      if (data.key === "undo") ed.undo();
      if (data.key === "redo") ed.redo();
      
      if (data.key === "save") {
         // Cancel any pending auto-save
         debouncedAutoSave.cancel();
         if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
         if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
         
         // Perform manual save
         if (!treeFileData) return;
         if (!useLoadedFileStore.getState().notsaved) return;
         
         mutateFileContent.mutate({
            filename,
            treeFileData,
            content: sourceContent
         });
      }
      
      if (data.key === "move-up") ed.moveLinesUp();
      if (data.key === "move-down") ed.moveLinesDown();
      if (data.key === "copy-up") ed.copyLinesUp();
      if (data.key === "copy-down") ed.copyLinesDown();
   };

   // Socket listeners for file changes
   useEffect(() => {
      function handleFileChange(payload) {
         const local = useLoadedFileStore.getState().content;
         const localFilename = useLoadedFileStore.getState().filename;
         const localTree = useLoadedFileStore.getState().treeFileData;
         
         if (payload.content !== local && 
             payload.filename === localFilename && 
             payload.filePath === localTree.node.absPath) {
            useLoadedFileStore.setState({notsaved: true});
            
            if (confirm(`${localFilename} File has been changed in the background, reload it?`)) {
               useLoadedFileStore.setState({ content: payload.content, notsaved: false });
            }
         }
      }
      
      function handleFileDelete(payload) {
         const localFilename = useLoadedFileStore.getState().filename;
         const localTree = useLoadedFileStore.getState().treeFileData;
         
         if (payload.filename === localFilename && 
             payload.filePath === localTree.node.absPath) {
            window.alert(`File has been deleted or renamed in the background?`);
            useLoadedFileStore.setState({deleted: true, notsaved: true});
         }
      }
      
      socket.on("file:changed", handleFileChange);
      socket.on("file:deleted", handleFileDelete);
      
      return () => {
         socket.off("file:changed", handleFileChange);
         socket.off("file:deleted", handleFileDelete);
      };
   }, []);

   // Auto-save: onFocusChange mode
   useEffect(() => {
      if (autoSave !== 'onFocusChange') return;
      
      const ed = editorRef.current;
      if (!ed) return;

      const handleBlur = () => {
         // Cancel any pending debounced saves
         debouncedAutoSave.cancel();
         
         // Perform immediate save on blur
         const state = useLoadedFileStore.getState();
         if (!state.treeFileData || !state.filename || !state.notsaved || state.deleted) return;
         
         mutateFileContent.mutate({
            filename: state.filename,
            treeFileData: state.treeFileData,
            content: state.content
         });
      };

      ed.on('blur', handleBlur);
      
      return () => {
         ed.off('blur', handleBlur);
      };
   }, [autoSave, mutateFileContent, debouncedAutoSave]);

   // Cleanup on unmount
   useEffect(() => {
      return () => {
         debouncedAutoSave.cancel();
         if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
         if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
      };
   }, [debouncedAutoSave]);

   return (
      <>
         <AceEditor
            name="SwaziPenEditor"
            mode={mode}
            theme={theme}
            width="100%"
            height="100%"
            fontSize={fontSize}
            lineHeight={(lineHeight * fontSize) + 2}
            onLoad={handleLoad}
            value={sourceContent}
            onChange={handleChange}
            setOptions={{
               fontFamily: `${fontFamily}, Monaco, Consolas, 'Courier New', monospace`,
               cursorStyle: cursorStyle,
               showLineNumbers: lineNumbers,
               tabSize: tabSize,
               wrap: wordWrap,
               displayIndentGuides: indentGuides,
               showInvisibles: renderWhitespace === "all"
            }}
         />
         <BottomBarTools onAction={handleAction} />
      </>
   );
}

export default Editor;