import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaRegFolder, FaFolder } from "react-icons/fa";
import { MdFolder } from "react-icons/md";
import "@scss/SideBar.scss";

import SideBarContent from "@components/SideBarContent.jsx";


const SideBar = React.memo(({ isOpen, onToggle }) => {
   const sidebarRef = useRef(null);
   const touchStartX = useRef(0);
   const touchStartY = useRef(0);
   const touchCurrentX = useRef(0);
   const touchCurrentY = useRef(0);
   // null = undecided, true = horizontal swipe, false = vertical/diagonal (ignore)
   const isHorizontalSwipe = useRef(null);

   const [dragging, setDragging] = useState(false);
   const [translateX, setTranslateX] = useState(0);

   // reset any drag state when sidebar is closed/opened programmatically
   useEffect(() => {
      if (!isOpen) {
         setTranslateX(0);
         setDragging(false);
         isHorizontalSwipe.current = null;
      }
   }, [isOpen]);

   const getSidebarWidth = () =>
      sidebarRef.current ? sidebarRef.current.offsetWidth : 300;

   // only allow swipe-to-close when the sidebar is open
   const handleTouchStart = e => {
      if (!isOpen) return;
      const t = e.touches[0];
      touchStartX.current = t.clientX;
      touchStartY.current = t.clientY;
      touchCurrentX.current = t.clientX;
      touchCurrentY.current = t.clientY;
      isHorizontalSwipe.current = null; // undecided until we see movement
      setDragging(true);
   };

   const handleTouchMove = e => {
      if (!dragging) return;
      const t = e.touches[0];
      touchCurrentX.current = t.clientX;
      touchCurrentY.current = t.clientY;

      const deltaX = touchCurrentX.current - touchStartX.current; // negative = swipe left
      const deltaY = touchCurrentY.current - touchStartY.current;

      // Decide whether this is a deliberate horizontal swipe or a vertical/diagonal gesture.
      if (isHorizontalSwipe.current === null) {
         const absX = Math.abs(deltaX);
         const absY = Math.abs(deltaY);

         // Movement too small to decide yet
         if (absX < 5 && absY < 5) return;

         // Heuristics to reject diagonal/vertical swipes:
         // - if vertical movement is large in absolute terms, reject
         // - or if vertical movement is a large proportion of horizontal movement, reject
         const verticalLimitPx = 30; // absolute vertical tolerance
         const verticalToHorizontalRatio = 0.5; // allow vertical up to 50% of horizontal
         if (
            absY > verticalLimitPx ||
            absY > absX * verticalToHorizontalRatio
         ) {
            // Not a valid low-range horizontal swipe — cancel dragging
            isHorizontalSwipe.current = false;
            setDragging(false);
            setTranslateX(0);
            return;
         }

         // Otherwise treat as horizontal swipe
         isHorizontalSwipe.current = true;
      }

      if (!isHorizontalSwipe.current) return;

      // only move the sidebar left (no dragging to the right)
      if (deltaX < 0) {
         // prevents the page from scrolling horizontally while dragging
         e.preventDefault?.();
         const maxLeft = -getSidebarWidth();
         setTranslateX(Math.max(deltaX, maxLeft));
      }
   };

   const handleTouchEnd = () => {
      // if we never determined a horizontal swipe, or dragging was cancelled, nothing to do
      if (!dragging && isHorizontalSwipe.current !== true) return;

      const deltaX = touchCurrentX.current - touchStartX.current;
      const width = getSidebarWidth();
      const closeThreshold = Math.min(100, width * 0.33); // close if dragged more than 100px or 33% of width
      setDragging(false);
      setTranslateX(0);
      isHorizontalSwipe.current = null;

      // if user swiped left enough -> close
      if (-deltaX > closeThreshold) {
         onToggle();
      }
   };

   const sidebarClassName = `sidebar ${isOpen ? "sidebar--open" : ""} ${
      dragging ? "sidebar--dragging" : ""
   }`;

   const sidebarStyle = {
      // while dragging we translate by translateX; otherwise let CSS handle open/closed transform
      transform: isOpen ? `translateX(${translateX}px)` : undefined,
      transition: dragging ? "none" : undefined,
      touchAction: "pan-y" // allow vertical scrolling but not horizontal by default
   };

   return (
      <>
         {/* Overlay to close the sidebar when clicked */}
         <div
            className={`sidebar__overlay ${
               isOpen ? "sidebar__overlay--open" : ""
            }`}
            onClick={onToggle}
            aria-hidden="true"
         />

         <aside
            ref={sidebarRef}
            className={sidebarClassName}
            style={sidebarStyle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
         >
            <div className="sidebar__content">
               {/* keep your existing content here */}
               <SideBarContent onFileLoad={onToggle}/>
            </div>
         </aside>
      </>
   );
});

SideBar.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onToggle: PropTypes.func.isRequired
};

export default SideBar;
