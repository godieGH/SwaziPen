import React, { useState } from "react";
import useLoadedFileStore from "@stores/loadedFile.js"
import "@scss/TopNav.scss";
import api from "@api/axios.js"
import MenuIcon from "@components/MenuIcon.jsx";
import { FileIcon } from "react-file-icon";
import { FaSearch, FaPlay } from "react-icons/fa";
import SideBar from "@components/SideBar.jsx";
import Terminal from "@components/Terminal.jsx"

function TopNav() {
   const [isSidebarOpen, setSidebarOpen] = useState(false);
   const filename = useLoadedFileStore(state => state.filename)
   const fileDeleted = useLoadedFileStore(state => state.deleted)
   const fileNotSaved = useLoadedFileStore(state => state.notsaved)
   
   const [terminal, setTerminal] = useState(false)
   const [terminalRes, setTerminalRes] = useState("")
   const [terminalError, setTerminalError] = useState(null)
   
   const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
   };
   
   async function handleExecute() {
      try {
         const { data } = await api.post("/api/execute", {code: useLoadedFileStore.getState().content, filename: useLoadedFileStore.getState().filename})
         navigator.vibrate(80)
         if(data.output.stderr) setTerminalError(data.output.stderr)
         if(data.output.stdout) setTerminalRes(data.output.stdout)
         setTerminal(true)
      } catch(err) {
         console.error(err.message)
      }
   }
   
   

   return (
      <>
         {/* Pass the state and toggle function to the SideBar */}
         <SideBar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

         <div className="top-nav-bar">
            {/* Add the onClick handler to the menu icon wrapper */}
            <div
               className="menu-icon"
               onClick={toggleSidebar}
               role="button"
               tabIndex="0"
            >
               <MenuIcon />
            </div>

            <div className="recent-opened-file-menu">
               {fileNotSaved && <div className="file-not-saved-badge"></div>}
               <div className="file-name">
                  {filename}
                  {fileDeleted && <span className="deleted-badge">[deleted]</span>}
               </div>
            </div>

            <div className="other-actions">
               <div>
                  {/*<FaSearch color="#9e9e9e" />*/}
               </div>
               <div>
                  <FaPlay onClick={handleExecute}/>
               </div>
            </div>
            <div className="terminal-container">
               <Terminal isOpen={terminal} onClose={() => {
                  setTerminal(false)
                  setTerminalRes("")
                  setTerminalError(null)
               }}>
                  {terminalError ? 
                     <div style={{
                        color: "#9c3c3c",
                     }}>{terminalError}</div> : terminalRes}
               </Terminal>
            </div>
         </div>
      </>
   );
}

export default TopNav;
