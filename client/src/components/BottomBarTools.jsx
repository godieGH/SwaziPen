import React, { useRef, useState, useCallback } from "react";
import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaUndo,
  FaRedo,
  FaSave,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { MdKeyboardTab } from "react-icons/md";
import "@scss/BottomBarTools.scss";

/**
 * BottomBarTools
 *
 * - Short click on the Tab button -> fires the Tab action (onAction receives the tool object)
 * - Long press (hold >= 500ms) + release on the Tab button -> toggles the "navigate" <-> "move/copy" mode
 * - When in move/copy mode, the four navigation buttons are replaced by:
 *     Move Line Up    (arrow up with badge "M")
 *     Move Line Down  (arrow down with badge "M")
 *     Copy Line Up    (arrow up with badge "C")
 *     Copy Line Down  (arrow down with badge "C")
 *
 * onAction receives an object with at least:
 *   { key: string, title: string, type?: string }
 *
 * Example keys/types:
 *   { key: "tab", title: "Tab / Shift+Tab" }
 *   { key: "nav-left", title: "Navigate Left", type: "navigate" }
 *   { key: "move-up", title: "Move Line Up", type: "move" }
 *   { key: "copy-down", title: "Copy Line Down", type: "copy" }
 *
 * The component is written in plain JS/React and handles mouse and touch events.
 */

const LONG_PRESS_MS = 200;

function BottomBarTools({ onAction = () => {} }) {
  const [mode, setMode] = useState("navigate"); // "navigate" | "moveCopy"
  const longPressTimer = useRef(null);
  const longPressTriggered = useRef(false);
  const touchOrMouseDown = useRef(false);

  const handleToggleMode = useCallback(() => {
    setMode((m) => (m === "navigate" ? "moveCopy" : "navigate"));
  }, []);

  const startPress = useCallback(() => {
    touchOrMouseDown.current = true;
    longPressTriggered.current = false;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      // We don't toggle mode until release per user's description "press hold(500ms) and release"
      // But you could toggle immediately here if desired.
    }, LONG_PRESS_MS);
  }, []);

  const cancelPress = useCallback(() => {
    touchOrMouseDown.current = false;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    longPressTriggered.current = false;
  }, []);

  const endPressOnTab = useCallback(
    (ev) => {
      // prevent duplicate events (touch -> mouse)
      ev.preventDefault?.();

      const wasLongPress = longPressTriggered.current;
      cancelPress();

      if (wasLongPress) {
        // held for >= LONG_PRESS_MS and released -> toggle mode
        handleToggleMode();
        onAction({ key: "toggle-mode", title: "Toggle Navigate/MoveCopy Mode", type: "toggle", mode: mode === "navigate" ? "moveCopy" : "navigate" });
      } else {
        // short click -> regular Tab action
        onAction({ key: "tab", title: "Tab / Shift+Tab", type: "tab" });
      }
    },
    [cancelPress, handleToggleMode, mode, onAction]
  );

  // Define the groups depending on mode
  const tabTool = { title: "Tab / Shift+Tab", key: "tab", icon: <MdKeyboardTab /> };

  const navigateTools = [
    { key: "nav-left", title: "Navigate Left", icon: <FaChevronLeft size={14} />, type: "navigate" },
    { key: "nav-right", title: "Navigate Right", icon: <FaChevronRight size={14} />, type: "navigate" },
    { key: "nav-up", title: "Navigate Up", icon: <FaChevronUp size={14} />, type: "navigate" },
    { key: "nav-down", title: "Navigate Down", icon: <FaChevronDown size={14} />, type: "navigate" }
  ];

  // Move/Copy tools will reuse up/down icons but show badges 'M' or 'C'
  const moveCopyTools = [
    { key: "move-up", title: "Move Line Up", icon: <FaArrowUp size={14} />, badge: "M", type: "move" },
    { key: "move-down", title: "Move Line Down", icon: <FaArrowDown size={14} />, badge: "M", type: "move" },
    { key: "copy-up", title: "Copy Line Up", icon: <FaArrowUp size={14} />, badge: "C", type: "copy" },
    { key: "copy-down", title: "Copy Line Down", icon: <FaArrowDown size={14} />, badge: "C", type: "copy" }
  ];

  const otherTools = [
    { key: "undo", title: "Undo", icon: <FaUndo size={14} />, type: "undo" },
    { key: "redo", title: "Redo", icon: <FaRedo size={14} />, type: "redo" }
  ];

  const saveTool = { key: "save", title: "Save File", icon: <FaSave size={14} />, type: "save" };

  const handleToolClick = (tool) => {
    // If the tab tool is clicked by a short click we already handle above.
    if (tool.key === "tab") return;
    onAction(tool);
  };

  // Render a tool button which optionally shows a small badge letter (M/C)
  const renderToolButton = (tool, idx) => {
    return (
      <button
        key={tool.key || idx}
        className="tool-button"
        title={tool.title}
        onClick={() => handleToolClick(tool)}
        aria-label={tool.title}
        type="button"
      >
        <span className="icon-wrapper">
          {tool.icon}
          {tool.badge && <span className="icon-badge">{tool.badge}</span>}
        </span>
      </button>
    );
  };

  return (
    <div className="bottom-bar-container">
      {/* Tab button - handle long press */}
      <React.Fragment>
        <button
          key="tab-button"
          className={`tool-button tab-button ${mode === "moveCopy" ? "mode-active" : ""}`}
          title={tabTool.title}
          onMouseDown={startPress}
          onMouseUp={endPressOnTab}
          onMouseLeave={cancelPress}
          onTouchStart={startPress}
          onTouchEnd={endPressOnTab}
          onTouchCancel={cancelPress}
          onClick={(e) => {
            // Prevent onClick from firing after touchend/mouseup has already handled action.
            // We rely on endPressOnTab for semantics.
            e.preventDefault();
          }}
          aria-pressed={mode === "moveCopy"}
          type="button"
        >
          <span className="icon-wrapper">
            {tabTool.icon}
            <span className="mode-indicator" aria-hidden>
              {mode === "navigate" ? "NAV" : "MOV/C"}
            </span>
          </span>
        </button>
      </React.Fragment>

      {/* Separator */}
      <div className="separator"></div>

      {/* Either navigate tools or move/copy tools */}
      <React.Fragment>
        {(mode === "navigate" ? navigateTools : moveCopyTools).map((tool) => renderToolButton(tool))}
      </React.Fragment>

      {/* Separator */}
      <div className="separator"></div>

      {/* Undo / Redo */}
      {otherTools.map((tool) => renderToolButton(tool))}

      {/* Separator */}
      <div className="separator"></div>

      {/* Save */}
      {renderToolButton(saveTool)}
    </div>
  );
}

export default BottomBarTools;