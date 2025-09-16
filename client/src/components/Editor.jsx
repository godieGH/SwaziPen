import AceEditor from "react-ace";


import "@ace_customs/themes/swazipen"

function Editor() {
   return (
      <>
         <AceEditor
            name="SwaziPenEditor"
            theme="swazipen"
            width="100%"
            height="90dvh"
            fontSize={14}
            setOptions={{
               enableBasicAutocompletion: true,
               enableLiveAutocompletion: true,
               enableSnippets: true,
               showLineNumbers: true,
               tabSize: 2,
               wrap: true,
               wrapMethod: "auto",
               displayIndentGuides: true,
            }}
         />
      </>
   );
}

export default Editor;
