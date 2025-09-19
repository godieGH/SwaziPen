import React, { useState } from "react";
import useLoadedFileStore from "@stores/loadedFile.js"
import "@scss/TopNav.scss";
import MenuIcon from "@components/MenuIcon.jsx";
import { FileIcon } from "react-file-icon";
import { FaSearch, FaPlay } from "react-icons/fa";
import SideBar from "@components/SideBar.jsx";

function TopNav() {
   const [isSidebarOpen, setSidebarOpen] = useState(false);
   const filename = useLoadedFileStore(state => state.filename)
   
   const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
   };

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
               {/*<div className="file-icon">
                  <FaFile />
               </div>*/}
               <div className="file-name">{filename}</div>
            </div>

            <div className="other-actions">
               <div>
                  <FaSearch color="#9e9e9e" />
               </div>
               <div>
                  <FaPlay />
               </div>
            </div>
         </div>
      </>
   );
}

export default TopNav;
