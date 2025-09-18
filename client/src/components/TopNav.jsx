import React, { useState } from "react";
import "@scss/TopNav.scss";
import MenuIcon from "@components/MenuIcon.jsx";
import { FileIcon } from "react-file-icon";
import { FaSearch, FaPlay } from "react-icons/fa";
import SideBar from "@components/SideBar.jsx";

function TopNav() {
   const [isSidebarOpen, setSidebarOpen] = useState(false);

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
               <div className="file-icon">
                  <FileIcon extension=".swz" color="#4caf8e" />
               </div>
               <div>app.swz</div>
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
