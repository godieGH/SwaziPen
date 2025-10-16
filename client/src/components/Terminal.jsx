// SlideUpTerminal.jsx

import React, { useState, useRef, useEffect, useCallback } from "react";
import "tailwindcss/tailwind.css";

function TopTabs({ active = 0, tabs = ["Console", "REPL"], onSwitchTab }) {
    return (
        <div className="select-none flex items-center gap-4 px-3 pt-2 pb-1 border-b border-slate-700">
            {tabs.map((t, i) => (
                <div
                    key={t}
                    className={`text-sm px-2 pb-2 ${
                        i === active
                            ? "text-white border-b-2 border-slate-400"
                            : "text-slate-400"
                    }`}
                    onClick={() => {
                        onSwitchTab && onSwitchTab(i);
                    }}
                >
                    {t}
                </div>
            ))}
        </div>
    );
}

function ConsoleFilterBar({
    active = 1,
    tabs = ["All", "Info", "Warning", "Error"],
    onChangeFilter
}) {
    return (
        <div className="select-none flex items-center justify-between px-3 py-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
                {tabs.map((t, i) => (
                    <button
                        className={`text-xs ${
                            i === active ? "px-2 py-1 rounded bg-slate-700" : ""
                        } ${
                            t === "All"
                                ? "text-white"
                                : t === "Info"
                                ? "text-slate-400"
                                : t === "Warning"
                                ? "text-amber-400"
                                : t === "Error"
                                ? "text-rose-400"
                                : ""
                        }`}
                        onClick={() => {
                            onChangeFilter(i);
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-3">
                <svg
                    className="w-5 h-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M4 6H20M10 12H20M16 18H20"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                </svg>
                <svg
                    className="w-5 h-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M8 6H20M8 12H20M8 18H20"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
}

function ConsoleArea({ children }) {
    return (
        <div
            className="flex-1 p-2 overflow-y-auto min-h-0"
            style={{
                fontSize: "14px",
                whiteSpace: "pre-wrap"
            }}
        >
            {children}
        </div>
    );
}

function BottomInput() {
    return (
        <div className="border-t border-slate-800 px-3 py-3 flex items-center">
            <button className="w-9 h-9 rounded bg-transparent flex items-center justify-center"></button>
            <div className="flex-1 ml-2 text-slate-500">
                {/*REPL input here*/}
            </div>
        </div>
    );
}

export default function SlideUpTerminal({ isOpen, onClose, children }) {
    const panelRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const [consoleFilter, setConsoleFilter] = useState(0);

    // dragging / height state
    const [height, setHeight] = useState(0);
    const [isDragging, setDragging] = useState(false);
    const startYRef = useRef(0);
    const startHeightRef = useRef(0);

    // constants
    const MIN_HEIGHT = 100;
    const MAX_HEIGHT =
        typeof window !== "undefined" ? window.innerHeight * 0.9 : 0;
    const MID_HEIGHT =
        typeof window !== "undefined" ? window.innerHeight * 0.5 : 0;

    // When isOpen changes
    useEffect(() => {
        if (isOpen) {
            setHeight(MID_HEIGHT);
        } else {
            setHeight(0);
        }
    }, [isOpen, MID_HEIGHT]);

    // Prevent overscroll / pull-to-refresh on mobile when open panel or dragging
    useEffect(() => {
        function preventTouchMove(e) {
            // only block default touchmove while actively dragging
            if (
                isDragging &&
                panelRef.current &&
                panelRef.current.contains(e.target)
            ) {
                e.preventDefault();
            }
        }
        if (isDragging) {
            document.addEventListener("touchmove", preventTouchMove, {
                passive: false
            });
        }
        return () => {
            document.removeEventListener("touchmove", preventTouchMove, {
                passive: false
            });
        };
    }, [isDragging]);

    // Handlers

    const onDragStart = useCallback(
        pageY => {
            setDragging(true);
            startYRef.current = pageY;
            startHeightRef.current = height;
        },
        [height]
    );

    const onMouseDown = e => {
        e.preventDefault();
        onDragStart(e.clientY);
    };

    const onTouchStart = e => {
        onDragStart(e.touches[0].clientY);
    };
    const onMove = useCallback(
        pageY => {
            if (!isDragging) return;

            const delta = startHeightRef.current + (startYRef.current - pageY);
            let newHeight = delta;
            if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
            if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;
            setHeight(newHeight);
        },
        [isDragging, MIN_HEIGHT, MAX_HEIGHT]
    );

    const onMouseMove = e => {
        onMove(e.clientY);
    };

    const onTouchMove = e => {
        onMove(e.touches[0].clientY);
    };

    const onDragEnd = () => {
        if (!isDragging) return;
        setDragging(false);

        // Snap behavior
        if (height < MIN_HEIGHT + 50) {
            onClose();
        } else if (height < (MID_HEIGHT + MIN_HEIGHT) / 2) {
            setHeight(MIN_HEIGHT);
        } else if (height > (MID_HEIGHT + MAX_HEIGHT) / 2) {
            setHeight(MAX_HEIGHT);
        } else {
            setHeight(MID_HEIGHT);
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onDragEnd);
            window.addEventListener("touchmove", onTouchMove, {
                passive: false
            });
            window.addEventListener("touchend", onDragEnd);
        } else {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onDragEnd);
            window.removeEventListener("touchmove", onTouchMove, {
                passive: false
            });
            window.removeEventListener("touchend", onDragEnd);
        }
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onDragEnd);
            window.removeEventListener("touchmove", onTouchMove, {
                passive: false
            });
            window.removeEventListener("touchend", onDragEnd);
        };
    }, [isDragging, onMove, onDragEnd]);

    // Styles: transitions only when not dragging
    const panelStyle = {
        height: `${height}px`,
        transform: `translateY(${isOpen ? 0 : 100}%)`,
        transition: isDragging
            ? "none"
            : "height 0.3s ease, transform 0.3s ease",
        // ensure panel is above bottomNav which has z-index: 999
        zIndex: 10000, // >= 10000 to beat 999
        position: "fixed", // ensure it’s fixed in viewport
        left: 0,
        right: 0,
        bottom: 0
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                    style={{ zIndex: 9999 }}
                    onClick={onClose}
                />
            )}
            <div
                ref={panelRef}
                className="bg-[#111111] rounded-t-2xl shadow-2xl border border-slate-800 overflow-hidden"
                style={panelStyle}
            >
                {/* drag handle */}
                <div
                    className="w-full h-4 cursor-row-resize bg-transparent flex justify-center items-center touch-none"
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                >
                    <div className="w-12 h-1 rounded-full bg-slate-600" />
                </div>

                {/* content */}
                <div className="flex flex-col h-full min-h-0">
                    <TopTabs onSwitchTab={setActiveTab} active={activeTab} />
                    <ConsoleFilterBar
                        onChangeFilter={i => {
                            setConsoleFilter(i);
                        }}
                        active={consoleFilter}
                    />
                    <ConsoleArea>{children}</ConsoleArea>
                    <BottomInput />
                </div>
            </div>
        </>
    );
}
