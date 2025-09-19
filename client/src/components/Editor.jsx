// src/components/Editor.jsx
import { useEffect, useRef } from "react";
import path from "path"
import useLoadedFileStore from "@stores/loadedFile.js";
import AceEditor from "react-ace";
import BottomBarTools from "@components/BottomBarTools.jsx";

function Editor() {
  // store selectors
  const sourceContent = useLoadedFileStore((s) => s.content);
  const updateSource = useLoadedFileStore((s) => s.updateSource);
  // applyNewContent is used by the debounced commit
  const applyNewContent = useLoadedFileStore.getState().applyNewContent;

  const editorRef = useRef(null);
  const saveTimerRef = useRef(null);

  const handleLoad = (editor) => {
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
  const handleChange = (newValue) => {
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

  const handleAction = (data) => {
    const ed = editorRef.current;
    if (!ed) return;
    if (data.title === "Tab / Shift+Tab") ed.insert("\t");
    if (data.title === "Navigate Up") ed.navigateUp(1);
    if (data.title === "Navigate Down") ed.navigateDown(1);
    if (data.title === "Navigate Left") ed.navigateLeft(1);
    if (data.title === "Navigate Right") ed.navigateRight(1);
    if (data.title === "Undo") ed.undo();
    if (data.title === "Redo") ed.redo();
  };

  return (
    <>
      <AceEditor
        name="SwaziPenEditor"
        mode="swazilang"
        theme="swazipen"
        width="100%"
        height="86dvh"
        fontSize={14}
        onLoad={handleLoad}
        value={sourceContent}         // keep it driven by the store.content
        onChange={handleChange}       // update newContent (then debounce commit)
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 3,
          wrap: true,
          wrapMethod: "auto",
          displayIndentGuides: true,
        }}
      />
      <BottomBarTools onAction={handleAction} />
    </>
  );
}

export default Editor;