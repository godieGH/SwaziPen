// client/src/components/Terminal.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import "tailwindcss/tailwind.css";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import socket from "@api/socket.js";
import useLoadedFileStore from "@stores/loadedFile.js";

/* Tabs and UI kept as you had them. Drag logic uses pointer events for reliability. */

function TopTabs({ active = 0, tabs = ["Console", "REPL"], onSwitchTab }) {
  return (
    <div className="select-none flex items-center gap-4 px-3 pt-2 pb-1 border-b border-slate-700">
      {tabs.map((t, i) => (
        <div
          key={t}
          className={`text-sm px-2 pb-2 ${i === active ? "text-white border-b-2 border-slate-400" : "text-slate-400"}`}
          onClick={() => onSwitchTab && onSwitchTab(i)}
        >
          {t}
        </div>
      ))}
    </div>
  );
}

function ConsoleFilterBar({ active = 1, tabs = ["All", "Info", "Warning", "Error"], onChangeFilter }) {
  return (
    <div className="select-none flex items-center justify-between px-3 py-2 border-b border-slate-800">
      <div className="flex items-center gap-2">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`text-xs ${i === active ? "px-2 py-1 rounded bg-slate-700" : ""} ${
              t === "All" ? "text-white" : t === "Info" ? "text-slate-400" : t === "Warning" ? "text-amber-400" : "text-rose-400"
            }`}
            onClick={() => onChangeFilter(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none">
          <path d="M4 6H20M10 12H20M16 18H20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none">
          <path d="M8 6H20M8 12H20M8 18H20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function ConsoleArea({ children }) {
  return (
    <div className="flex-1 p-2 overflow-y-auto min-h-0" style={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>
      {children}
    </div>
  );
}

function BottomInput({ children }) {
  return (
    <div className="border-t border-slate-800 px-3 py-3 flex items-center">
      <div className="flex-1 ml-2 text-slate-500">{children}</div>
    </div>
  );
}

export default function SlideUpTerminal({ isOpen, onClose, children, runTrigger = 0 }) {
  const panelRef = useRef(null);
  const handleRef = useRef(null);

  const [activeTab, setActiveTab] = useState(0);
  const [consoleFilter, setConsoleFilter] = useState(0);

  // xterm refs (kept from your previous implementation)
  const consoleXtermRef = useRef(null);
  const consoleFitRef = useRef(null);
  const consoleContainerRef = useRef(null);
  const consolePtyIdRef = useRef(null);
  const consoleOnDataRef = useRef(null);
  const consoleOnExitRef = useRef(null);
  const consoleOnErrorRef = useRef(null);

  const replXtermRef = useRef(null);
  const replFitRef = useRef(null);
  const replContainerRef = useRef(null);
  const replPtyIdRef = useRef(null);
  const replOnDataRef = useRef(null);
  const replOnExitRef = useRef(null);
  const replOnErrorRef = useRef(null);

  // drag state
  const [height, setHeight] = useState(0);
  const draggingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  const MIN_HEIGHT = 100;
  const MAX_HEIGHT = typeof window !== "undefined" ? window.innerHeight * 0.9 : 800;
  const MID_HEIGHT = typeof window !== "undefined" ? window.innerHeight * 0.5 : 400;

  // keep activeTab in ref for safety in callbacks
  const activeTabRef = useRef(activeTab);
  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);

  useEffect(() => {
    if (isOpen) setHeight(MID_HEIGHT);
    else setHeight(0);
  }, [isOpen, MID_HEIGHT]);

  // DRAG: pointer-based handlers (works for mouse & touch; simpler)
  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;

    // pointerdown
    const onPointerDown = (e) => {
      // only left button or touch/pen
      if (e.pointerType === "mouse" && e.button !== 0) return;
      draggingRef.current = true;
      startYRef.current = e.clientY;
      startHeightRef.current = height;

      // capture pointer so we receive pointermove/up even outside the window
      try { handle.setPointerCapture && handle.setPointerCapture(e.pointerId); } catch (err) {}

      // prevent text selection while dragging
      document.body.style.userSelect = "none";
      document.body.style.touchAction = "none";
    };

    // pointermove
    const onPointerMove = (e) => {
      if (!draggingRef.current) return;
      const delta = startHeightRef.current + (startYRef.current - e.clientY);
      let newHeight = delta;
      if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
      if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;
      setHeight(newHeight);
    };

    // pointerup / cancel
    const onPointerUp = (e) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      try { handle.releasePointerCapture && handle.releasePointerCapture(e.pointerId); } catch (err) {}

      // restore selection/touch
      document.body.style.userSelect = "";
      document.body.style.touchAction = "";

      // snapping behavior
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

    // attach to the handle and window for move/up
    handle.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      try {
        handle.removeEventListener("pointerdown", onPointerDown);
      } catch (e) {}
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      // ensure no leftover styles
      document.body.style.userSelect = "";
      document.body.style.touchAction = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, MIN_HEIGHT, MAX_HEIGHT, MID_HEIGHT, onClose]);

  // --- Console & REPL pty wiring kept similar to previous code ---
  // helper: cleanup console pty & listeners
  const killConsolePty = useCallback(() => {
    if (!consolePtyIdRef.current) return;
    const id = consolePtyIdRef.current;
    consolePtyIdRef.current = null;
    try { socket.emit("terminal:kill", { id }); } catch (e) {}
    try {
      if (consoleOnDataRef.current) { socket.off("terminal:data", consoleOnDataRef.current); consoleOnDataRef.current = null; }
      if (consoleOnExitRef.current) { socket.off("terminal:exit", consoleOnExitRef.current); consoleOnExitRef.current = null; }
      if (consoleOnErrorRef.current) { socket.off("terminal:error", consoleOnErrorRef.current); consoleOnErrorRef.current = null; }
    } catch (e) {}
  }, []);

  const killReplPty = useCallback(() => {
    if (!replPtyIdRef.current) return;
    const id = replPtyIdRef.current;
    replPtyIdRef.current = null;
    try { socket.emit("terminal:kill", { id }); } catch (e) {}
    try {
      if (replOnDataRef.current) { socket.off("terminal:data", replOnDataRef.current); replOnDataRef.current = null; }
      if (replOnExitRef.current) { socket.off("terminal:exit", replOnExitRef.current); replOnExitRef.current = null; }
      if (replOnErrorRef.current) { socket.off("terminal:error", replOnErrorRef.current); replOnErrorRef.current = null; }
    } catch (e) {}
  }, []);

  const ensureConsoleXterm = useCallback(() => {
    if (consoleXtermRef.current) return;
    const term = new XTerm({
      convertEol: true,
      cursorBlink: false,
      disableStdin: true,
      fontFamily: "Noto Mono, Menlo, Monaco, Consolas, 'Courier New', monospace",
      fontSize: 12,
      theme: { background: "#111111", foreground: "#e5e7eb" }
    });
    const fit = new FitAddon();
    try { term.loadAddon(fit); } catch (e) {}
    if (consoleContainerRef.current) {
      consoleContainerRef.current.style.background = "#111111";
      consoleContainerRef.current.tabIndex = -1;
    }
    term.open(consoleContainerRef.current);
    try { fit.fit(); } catch (e) {}
    consoleXtermRef.current = term;
    consoleFitRef.current = fit;
  }, []);

  const ensureReplXterm = useCallback(() => {
    if (replXtermRef.current) return;
    const term = new XTerm({
      convertEol: true,
      cursorBlink: true,
      disableStdin: false,
      fontFamily: "Noto Mono, Menlo, Monaco, Consolas, 'Courier New', monospace",
      fontSize: 12,
      theme: { background: "#111111", foreground: "#e5e7eb" }
    });
    const fit = new FitAddon();
    try { term.loadAddon(fit); } catch (e) {}
    if (replContainerRef.current) {
      replContainerRef.current.style.background = "#111111";
      replContainerRef.current.tabIndex = 0;
    }
    term.open(replContainerRef.current);
    try { fit.fit(); } catch (e) {}
    term.onData((d) => {
      if (!replPtyIdRef.current) return;
      socket.emit("terminal:input", { id: replPtyIdRef.current, data: d });
    });
    replXtermRef.current = term;
    replFitRef.current = fit;
  }, []);

  // runTrigger handling (Play button)
  const lastRunRef = useRef(runTrigger);
  const currentContent = useLoadedFileStore(s => s.content);
  const currentFilename = useLoadedFileStore(s => s.filename);

  useEffect(() => {
    if (!isOpen) return;
    if (runTrigger === lastRunRef.current) return;
    lastRunRef.current = runTrigger;

    if (activeTab !== 0) {
      setActiveTab(0);
      setTimeout(() => startConsoleRun(), 120);
    } else {
      startConsoleRun();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runTrigger, isOpen]);

  const startConsoleRun = () => {
    ensureConsoleXterm();
    killConsolePty();
    try { consoleXtermRef.current && consoleXtermRef.current.clear(); } catch (e) {}
    const id = `console-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    consolePtyIdRef.current = id;
    const cols = consoleXtermRef.current ? consoleXtermRef.current.cols : 80;
    const rows = consoleXtermRef.current ? consoleXtermRef.current.rows : 24;

    const onData = ({ id: evId, data }) => {
      if (evId !== consolePtyIdRef.current) return;
      try { consoleXtermRef.current && consoleXtermRef.current.write(data); } catch (e) {}
    };
    const onExit = ({ id: evId, code }) => {
      if (evId !== consolePtyIdRef.current) return;
      try { consoleXtermRef.current && consoleXtermRef.current.write(`\r\n\n[process exited: ${code}]\r\n`); } catch (e) {}
      consolePtyIdRef.current = null;
    };
    const onError = ({ id: evId, message }) => {
      if (evId !== consolePtyIdRef.current) return;
      try { consoleXtermRef.current && consoleXtermRef.current.write(`\r\n\n[error] ${message}\r\n`); } catch (e) {}
    };

    consoleOnDataRef.current = onData;
    consoleOnExitRef.current = onExit;
    consoleOnErrorRef.current = onError;

    socket.on("terminal:data", onData);
    socket.on("terminal:exit", onExit);
    socket.on("terminal:error", onError);

    try {
      socket.emit("terminal:create", {
        id,
        mode: "run",
        cols,
        rows,
        code: currentContent || "",
        filename: currentFilename || "run.sl"
      });
    } catch (e) {
      try { consoleXtermRef.current && consoleXtermRef.current.write(`[error] ${String(e)}\r\n`); } catch (e2) {}
    }
  };

  // ActiveTab -> REPL setup/teardown
  useEffect(() => {
    if (activeTab !== 1) {
      killReplPty();
      if (replXtermRef.current) {
        try { replXtermRef.current.setOption && replXtermRef.current.setOption("disableStdin", true); } catch (e) {}
        if (replContainerRef.current) replContainerRef.current.tabIndex = -1;
      }
      return;
    }

    ensureReplXterm();
    killReplPty();
    try { replXtermRef.current && replXtermRef.current.clear(); } catch (e) {}

    const id = `repl-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    replPtyIdRef.current = id;
    const cols = replXtermRef.current ? replXtermRef.current.cols : 80;
    const rows = replXtermRef.current ? replXtermRef.current.rows : 24;

    const onData = ({ id: evId, data }) => {
      if (evId !== replPtyIdRef.current) return;
      try { replXtermRef.current && replXtermRef.current.write(data); } catch (e) {}
    };
    const onExit = ({ id: evId, code }) => {
      if (evId !== replPtyIdRef.current) return;
      try { replXtermRef.current && replXtermRef.current.write(`\r\n\n[process exited: ${code}]\r\n`); } catch (e) {}
      replPtyIdRef.current = null;
    };
    const onError = ({ id: evId, message }) => {
      if (evId !== replPtyIdRef.current) return;
      try { replXtermRef.current && replXtermRef.current.write(`\r\n\n[error] ${message}\r\n`); } catch (e) {}
    };

    replOnDataRef.current = onData;
    replOnExitRef.current = onExit;
    replOnErrorRef.current = onError;

    socket.on("terminal:data", onData);
    socket.on("terminal:exit", onExit);
    socket.on("terminal:error", onError);

    try { socket.emit("terminal:create", { id, mode: "repl", cols, rows }); } catch (e) {}
    try { replXtermRef.current && replXtermRef.current.setOption && replXtermRef.current.setOption("disableStdin", false); } catch (e) {}
    setTimeout(() => { try { replXtermRef.current && replXtermRef.current.focus && replXtermRef.current.focus(); } catch (e) {} }, 50);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isOpen]);

  // Fit terminals when height changes or when tab switches
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      try {
        if (activeTab === 0 && consoleFitRef.current && consoleXtermRef.current) {
          consoleFitRef.current.fit();
        } else if (activeTab === 1 && replFitRef.current && replXtermRef.current) {
          replFitRef.current.fit();
        }
      } catch (e) {
        console.error("Fit error:", e);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [height, activeTab, isOpen]);

  // cleanup on panel close/unmount
  useEffect(() => {
    if (!isOpen) return;
    return () => {
      killConsolePty();
      killReplPty();
      try {
        if (consoleOnDataRef.current) socket.off("terminal:data", consoleOnDataRef.current);
        if (consoleOnExitRef.current) socket.off("terminal:exit", consoleOnExitRef.current);
        if (consoleOnErrorRef.current) socket.off("terminal:error", consoleOnErrorRef.current);
        if (replOnDataRef.current) socket.off("terminal:data", replOnDataRef.current);
        if (replOnExitRef.current) socket.off("terminal:exit", replOnExitRef.current);
        if (replOnErrorRef.current) socket.off("terminal:error", replOnErrorRef.current);
      } catch (e) {}
      try { consoleXtermRef.current && consoleXtermRef.current.dispose && consoleXtermRef.current.dispose(); } catch (e) {}
      try { replXtermRef.current && replXtermRef.current.dispose && replXtermRef.current.dispose(); } catch (e) {}
      consoleXtermRef.current = null;
      replXtermRef.current = null;
      consolePtyIdRef.current = null;
      replPtyIdRef.current = null;
    };
  }, [isOpen, killConsolePty, killReplPty]);

  // panel style
  const panelStyle = {
    height: `${height}px`,
    transform: `translateY(${isOpen ? 0 : 100}%)`,
    transition: draggingRef.current ? "none" : "height 0.3s ease, transform 0.3s ease",
    zIndex: 10000,
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50" style={{ zIndex: 9999 }} onClick={onClose} />}
      <div ref={panelRef} className="bg-[#111111] rounded-t-2xl shadow-2xl border border-slate-800 overflow-hidden" style={panelStyle}>
        {/* drag handle (use pointer events attached above) */}
        <div ref={handleRef} className="w-full h-6 cursor-row-resize bg-transparent flex justify-center items-center touch-none">
          <div className="w-12 h-1 rounded-full bg-slate-600" />
        </div>

        <div className="flex flex-col" style={{ height: "calc(100% - 24px)" }}>
          <TopTabs active={activeTab} onSwitchTab={(i) => setActiveTab(i)} />
          <ConsoleFilterBar active={consoleFilter} onChangeFilter={(i) => setConsoleFilter(i)} />

          <div className="overflow-hidden" style={{ flex: "1 1 0", minHeight: 0, fontSize: "14px" }}>
            {/* Console tab */}
            {activeTab === 0 && (
              <div style={{ width: "100%", height: "100%" }}>
                <div ref={consoleContainerRef} style={{ width: "100%", height: "100%", background: "#111111" }} />
              </div>
            )}

            {/* REPL tab */}
            {activeTab === 1 && (
              <div style={{ width: "100%", height: "100%" }}>
                <div ref={replContainerRef} style={{ width: "100%", height: "100%", background: "#111111" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}