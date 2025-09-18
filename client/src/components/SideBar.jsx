import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FaRegFolder, FaFolder } from "react-icons/fa";
import { MdFolder } from "react-icons/md";

import "@scss/SideBar.scss";
import FileTree from "@components/FileTree.jsx"

const SideBar = ({ isOpen, onToggle }) => {
  const sidebarRef = useRef(null);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  // reset any drag state when sidebar is closed/opened programmatically
  useEffect(() => {
    if (!isOpen) {
      setTranslateX(0);
      setDragging(false);
    }
  }, [isOpen]);

  const getSidebarWidth = () => sidebarRef.current ? sidebarRef.current.offsetWidth : 300;

  // only allow swipe-to-close when the sidebar is open
  const handleTouchStart = (e) => {
    if (!isOpen) return;
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchCurrentX.current = t.clientX;
    setDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!dragging) return;
    const t = e.touches[0];
    touchCurrentX.current = t.clientX;
    const deltaX = touchCurrentX.current - touchStartX.current; // negative = swipe left
    // only move the sidebar left (no dragging to the right)
    if (deltaX < 0) {
      // prevents the page from scrolling horizontally while dragging
      e.preventDefault?.();
      const maxLeft = -getSidebarWidth();
      setTranslateX(Math.max(deltaX, maxLeft));
    }
  };

  const handleTouchEnd = () => {
    if (!dragging) return;
    const deltaX = touchCurrentX.current - touchStartX.current;
    const width = getSidebarWidth();
    const closeThreshold = Math.min(100, width * 0.33); // close if dragged more than 100px or 33% of width
    setDragging(false);
    setTranslateX(0);

    // if user swiped left enough -> close
    if (-deltaX > closeThreshold) {
      onToggle();
    }
  };

  const sidebarClassName = `sidebar ${isOpen ? 'sidebar--open' : ''} ${dragging ? 'sidebar--dragging' : ''}`;

  const sidebarStyle = {
    // while dragging we translate by translateX; otherwise let CSS handle open/closed transform
    transform: isOpen ? `translateX(${translateX}px)` : undefined,
    transition: dragging ? 'none' : undefined,
    touchAction: 'pan-y', // allow vertical scrolling but not horizontal by default
  };

  return (
    <>
      {/* Overlay to close the sidebar when clicked */}
      <div
        className={`sidebar__overlay ${isOpen ? 'sidebar__overlay--open' : ''}`}
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
          <div className="root-folder-name">
             <MdFolder />
             <div>
               MY-SWAZI-PROJECT
             </div> 
          </div>
          {/* keep your existing content here */}
          <FileTree/>
        </div>
      </aside>
    </>
  );
};

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SideBar;