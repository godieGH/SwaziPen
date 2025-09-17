import { useState, useEffect, useRef } from "react"
import AceEditor from "react-ace";
import BottomBarTools from "@components/BottomBarTools.jsx";

function Editor() {
   const editorRef = useRef(null)
   const handleLoad = (editor) => {
      editorRef.current = editor
   }
   const handleAction = (data) => {
      if(data.title === "Tab / Shift+Tab") editorRef.current.insert('\t')
      if(data.title === "Navigate Up") editorRef.current.navigateUp(1)
      if(data.title === "Navigate Down") editorRef.current.navigateDown(1)
      if(data.title === "Navigate Left") editorRef.current.navigateLeft(1)
      if(data.title === "Navigate Right") editorRef.current.navigateRight(1)
      if(data.title === "Undo") editorRef.current.undo()
      if(data.title === "Redo") editorRef.current.redo()
   }
   
   
   return (
      <>
         <AceEditor
            name="SwaziPenEditor"
            mode="swazilang"
            theme="swazipen"
            width="100%"
            height="90dvh"
            fontSize={13}
            onLoad={handleLoad}
            setOptions={{
               enableBasicAutocompletion: true,
               enableLiveAutocompletion: true,
               enableSnippets: true,
               showLineNumbers: true,
               tabSize: 4,
               wrap: true,
               wrapMethod: "auto",
               displayIndentGuides: true,
            }}
         />
         <BottomBarTools onAction={handleAction}/>
      </>
   );
}

export default Editor;
