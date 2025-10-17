import React, { useState } from "react";
import useLoadedFileStore from "@stores/loadedFile.js";
import "@scss/TopNav.scss";
import MenuIcon from "@components/MenuIcon.jsx";
import { FaPlay } from "react-icons/fa";
import SideBar from "@components/SideBar.jsx";
import Terminal from "@components/Terminal.jsx";

function TopNav() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const filename = useLoadedFileStore(state => state.filename);
  const fileDeleted = useLoadedFileStore(state => state.deleted);
  const fileNotSaved = useLoadedFileStore(state => state.notsaved);

  const [terminalOpen, setTerminalOpen] = useState(false);
  // runTrigger increments each time Play pressed; Terminal listens to this prop
  const [runTrigger, setRunTrigger] = useState(0);

  const toggleSidebar = () => setSidebarOpen(s => !s);

  function handleExecute() {
    // open terminal and emit runTrigger — Terminal will grab current file content from store
    navigator.vibrate && navigator.vibrate(80);
    setTerminalOpen(true);
    setRunTrigger(t => t + 1);
  }

  return (
    <>
      <SideBar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      <div className="top-nav-bar">
        <div className="menu-icon" onClick={toggleSidebar} role="button" tabIndex="0">
          <MenuIcon />
        </div>

        <div className="recent-opened-file-menu">
          {fileNotSaved && <div className="file-not-saved-badge"></div>}
          <div className="file-name">{filename}{fileDeleted && <span className="deleted-badge">[deleted]</span>}</div>
        </div>

        <div className="other-actions" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div>{/* reserved */}</div>
          <div><FaPlay onClick={handleExecute} style={{ cursor: "pointer" }} /></div>
        </div>

        <div className="terminal-container">
          <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} runTrigger={runTrigger}>
            {/* Console no longer receives children output here; Console will stream via socket */}
          </Terminal>
        </div>
      </div>
    </>
  );
}

export default TopNav;