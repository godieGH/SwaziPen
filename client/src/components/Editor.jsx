// src/components/Editor.jsx
import { useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@api/axios.js";
import socket from "@api/socket.js";
import useLoadedFileStore from "@stores/loadedFile.js";
import AceEditor from "react-ace";
import BottomBarTools from "@components/BottomBarTools.jsx";

async function saveFile(payload) {
   const { data } = await api.post("/api/save/file", payload);
   return data;
}

function Editor() {
   const mutateFileContent = useMutation({
      mutationFn: saveFile,
      onSuccess: (data, vars) => {
         //console.log(data, vars);
         navigator.vibrate(70)
         useLoadedFileStore.setState({notsaved: false, deleted: false})
      },
      onError: err => {
         console.error("Failes to save file", err);
      }
   });

   // store selectors
   const treeFileData = useLoadedFileStore(s => s.treeFileData);
   const sourceContent = useLoadedFileStore(s => s.content);
   const filename = useLoadedFileStore(s => s.filename);
   const updateSource = useLoadedFileStore(s => s.updateSource);
   const theme = useLoadedFileStore(s => s.theme);
   const mode = useLoadedFileStore(s => s.mode);

   // applyNewContent is used by the debounced commit
   const applyNewContent = useLoadedFileStore.getState().applyNewContent;

   const editorRef = useRef(null);
   const saveTimerRef = useRef(null);

   const handleLoad = editor => {
      editorRef.current = editor;
   };

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
         // commit newContent -> content in your store
         applyNewContent();
         // OPTIONAL: call an API save here
         // e.g. api.post('/api/save', { path: filename, content: newValue })
      }, 800); // 800ms after the last keystroke
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
         if (!treeFileData) return;
         if(!useLoadedFileStore.getState().notsaved) return
         mutateFileContent.mutate({
            filename,
            treeFileData,
            content: sourceContent
         });
      }
      if(data.key === "move-up") ed.moveLinesUp();
      if(data.key === "move-down") ed.moveLinesDown();
      if(data.key === "copy-up") ed.copyLinesUp();
      if(data.key === "copy-down") ed.copyLinesDown();
   };

   useEffect(() => {
      function handleFileChange(payload) {
         const local = useLoadedFileStore.getState().content;
         const localFilename = useLoadedFileStore.getState().filename;
         const localTree = useLoadedFileStore.getState().treeFileData;
         if(payload.content !== local && payload.filename === localFilename && payload.filePath === localTree.node.absPath) {
            useLoadedFileStore.setState({notsaved: true})
            if(confirm(`${localFilename} File has been changed at the background, reload it?`)) {
               useLoadedFileStore.setState({ content: payload.content, notsaved: false });
            }
         }
      }
      
      
      function handleFileDelete(payload) {
         const localFilename = useLoadedFileStore.getState().filename;
         const localTree = useLoadedFileStore.getState().treeFileData;
         if(payload.filename === localFilename && payload.filePath === localTree.node.absPath ) {
            window.alert(`File has been deleted or renamed at the background?`)
            useLoadedFileStore.setState({deleted: true, notsaved: true})
         }
      }
      
      socket.on("file:changed", handleFileChange);
      socket.on("file:deleted", handleFileDelete);
      return () => {
         socket.off("file:changed", handleFileChange);
         socket.off("file:deleted", handleFileDelete);
      };
   }, []);

   return (
      <>
         <AceEditor
            name="SwaziPenEditor"
            mode={mode}
            theme={theme}
            width="100%"
            height="86dvh"
            fontSize={14}
            lineHeight={22}
            onLoad={handleLoad}
            value={sourceContent}
            onChange={handleChange}
            setOptions={{
                fontFamily: "Noto Mono, Menlo, Monaco, Consolas, 'Courier New', monospace",
               //enableBasicAutocompletion: true,
               //enableLiveAutocompletion: true,
               //enableSnippets: true,
               showLineNumbers: true,
               tabSize: 2,
               wrap: false,
               displayIndentGuides: true
            }}
         />
         <BottomBarTools onAction={handleAction} />
      </>
   );
}

export default Editor;
