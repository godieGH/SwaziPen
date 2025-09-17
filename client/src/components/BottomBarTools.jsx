import React from "react";
import {
   FaChevronUp,
   FaChevronDown,
   FaChevronLeft,
   FaChevronRight,
   FaUndo,
   FaRedo,
   FaSave
} from "react-icons/fa";
import { MdKeyboardTab } from "react-icons/md";
import "@scss/BottomBarTools.scss";

function BottomBarTools({ onAction }) {
   const toolGroups = [
      [{ title: "Tab / Shift+Tab", icon: <MdKeyboardTab /> }],
      [
         { title: "Navigate Left", icon: <FaChevronLeft size={14} /> },
         { title: "Navigate Right", icon: <FaChevronRight size={14} /> },
         { title: "Navigate Up", icon: <FaChevronUp size={14} /> },
         { title: "Navigate Down", icon: <FaChevronDown size={14} /> }
      ],
      [
         { title: "Undo", icon: <FaUndo size={14} /> },
         { title: "Redo", icon: <FaRedo size={14} /> }
      ],
      [{ title: "Save File", icon: <FaSave size={14} /> }]
   ];
   return (
      <div className="bottom-bar-container">
         {toolGroups.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
               {group.map((tool, index) => (
                  <button
                     key={index}
                     className="tool-button"
                     title={tool.title}
                     onClick={() => onAction(tool)}
                  >
                     {tool.icon}
                  </button>
               ))}
               {/* Don’t put separator after the last group */}
               {groupIndex < toolGroups.length - 1 && (
                  <div className="separator"></div>
               )}
            </React.Fragment>
         ))}
      </div>
   );
}

export default BottomBarTools;
