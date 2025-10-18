import React, { useState, useRef, useEffect, useCallback } from "react";
import "tailwindcss/tailwind.css";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import socket from "@api/socket.js";
import useLoadedFileStore from "@stores/loadedFile.js";

/* Small UI polish to make the panel look like a classic terminal:
   - Added a TerminalHeader with "traffic light" buttons and a centered title.
   - Restyled tabs to be subtle, compact and terminal-like.
   - Compressed filter bar and moved icons to feel more like terminal controls.
   - Bottom input now shows a monospace prompt line to match terminal vibes.
   - Kept all existing xterm & socket logic intact; only UI changes.
*/

function TerminalHeader({ title, activeTab, onSwitchTab }) {
    return (
        <div className="flex items-center justify-between px-3 py-2 select-none border-b border-slate-800 bg-gradient-to-b from-[#0b0b0b] to-[#0f0f0f]">
            <div className="flex items-center gap-3">
                {/* traffic lights */}
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_0_3px_rgba(255,0,0,0.04)]" />
                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_0_3px_rgba(255,200,0,0.04)]" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(0,255,120,0.04)]" />
                </div>

                {/* compact tabs / title area */}
                <div className="flex items-center gap-2 ml-1">
                    <div
                        onClick={() => onSwitchTab && onSwitchTab(0)}
                        className={`text-xs px-2 py-1 rounded-md cursor-pointer ${
                            activeTab === 0
                                ? "bg-slate-800 text-white"
                                : "text-slate-400 hover:bg-slate-900"
                        }`}
                    >
                        Console
                    </div>
                    <div
                        onClick={() => onSwitchTab && onSwitchTab(1)}
                        className={`text-xs px-2 py-1 rounded-md cursor-pointer ${
                            activeTab === 1
                                ? "bg-slate-800 text-white"
                                : "text-slate-400 hover:bg-slate-900"
                        }`}
                    >
                        REPL
                    </div>
                </div>
            </div>

            <div className="flex-1 text-center pointer-events-none">
                <div className="text-[13px] text-slate-300 font-mono">
                    {title}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* small controls (purely decorative) */}
                <svg
                    className="w-4 h-4 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M6 12h12"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                </svg>
                <svg
                    className="w-4 h-4 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M6 6h12M6 18h12"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
}

function ConsoleFilterBar({ active = 0, tabs = ["All"], onChangeFilter }) {
    return (
        <div className="select-none flex items-center justify-between px-3 py-1 border-b border-slate-800 bg-[#0b0b0b]">
            <div className="flex items-center gap-2 text-xs">
                {tabs.map((t, i) => (
                    <button
                        key={t}
                        className={`text-[12px] ${
                            i === active ? "px-2 py-1 rounded bg-slate-800 text-white" : "text-slate-400"
                        }`}
                        onClick={() => onChangeFilter(i)}
                    >
                        {t}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-3">
                <svg
                    className="w-4 h-4 text-slate-500"
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
                    className="w-4 h-4 text-slate-500"
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
            style={{ fontSize: "14px", whiteSpace: "pre-wrap" }}
        >
            {children}
        </div>
    );
}

function BottomInput({ filename }) {
    // simple, decorative prompt row so the panel reads like a terminal UI.
    return (
        <div className="border-t border-slate-800 px-3 py-3 flex items-center bg-[#070707]">
            <div className="text-slate-400 font-mono text-xs select-none">
                {/*user@project:~*/}$
            </div>
            <div className="flex-1 ml-3 text-slate-300 font-mono text-xs truncate">
                {filename ? ` ${filename}` : ""}
            </div>
            {/* static caret to hint at interactivity */}
            <div
                className="ml-2 w-2 h-4 bg-slate-300/80"
                style={{ opacity: 0.9 }}
                aria-hidden
            />
        </div>
    );
}

export default function SlideUpTerminal({
    isOpen,
    onClose,
    children,
    runTrigger = 0
}) {
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
    const consoleTermOnDataDisposableRef = useRef(null);

    const replXtermRef = useRef(null);
    const replFitRef = useRef(null);
    const replContainerRef = useRef(null);
    const replPtyIdRef = useRef(null);
    const replOnDataRef = useRef(null);
    const replOnExitRef = useRef(null);
    const replOnErrorRef = useRef(null);
    const replTermOnDataDisposableRef = useRef(null);

    // drag state
    const [height, setHeight] = useState(0);
    const draggingRef = useRef(false);
    const startYRef = useRef(0);
    const startHeightRef = useRef(0);

    const MIN_HEIGHT = 100;
    const MAX_HEIGHT =
        typeof window !== "undefined" ? window.innerHeight * 0.9 : 800;
    const MID_HEIGHT =
        typeof window !== "undefined" ? window.innerHeight * 0.5 : 400;

    // keep activeTab in ref for safety in callbacks
    const activeTabRef = useRef(activeTab);
    const prevActiveRef = useRef(activeTab);
    useEffect(() => {
        activeTabRef.current = activeTab;
    }, [activeTab]);

    useEffect(() => {
        if (isOpen) setHeight(MID_HEIGHT);
        else setHeight(0);
    }, [isOpen, MID_HEIGHT]);

    // DRAG: pointer-based handlers (works for mouse & touch; simpler)
    useEffect(() => {
        const handle = handleRef.current;
        if (!handle) return;

        const onPointerDown = e => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            draggingRef.current = true;
            startYRef.current = e.clientY;
            startHeightRef.current = height;
            try {
                handle.setPointerCapture &&
                    handle.setPointerCapture(e.pointerId);
            } catch (err) {}
            document.body.style.userSelect = "none";
            document.body.style.touchAction = "none";
        };

        const onPointerMove = e => {
            if (!draggingRef.current) return;
            const delta =
                startHeightRef.current + (startYRef.current - e.clientY);
            let newHeight = delta;
            if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
            if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;
            setHeight(newHeight);
        };

        const onPointerUp = e => {
            if (!draggingRef.current) return;
            draggingRef.current = false;
            try {
                handle.releasePointerCapture &&
                    handle.releasePointerCapture(e.pointerId);
            } catch (err) {}
            document.body.style.userSelect = "";
            document.body.style.touchAction = "";

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
            document.body.style.userSelect = "";
            document.body.style.touchAction = "";
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height, MIN_HEIGHT, MAX_HEIGHT, MID_HEIGHT, onClose]);

    // --- Helpers for socket cleanup ---
    const safeOff = useCallback((ev, handlerRef) => {
        try {
            const h = handlerRef && handlerRef.current;
            if (h) {
                socket.off(ev, h);
                handlerRef.current = null;
            }
        } catch (e) {}
    }, []);

    // --- cleanup helpers for xterm onData disposables ---
    const disposeConsoleTermData = useCallback(() => {
        try {
            if (consoleTermOnDataDisposableRef.current) {
                consoleTermOnDataDisposableRef.current.dispose();
                consoleTermOnDataDisposableRef.current = null;
            }
        } catch (e) {}
    }, []);

    const disposeReplTermData = useCallback(() => {
        try {
            if (replTermOnDataDisposableRef.current) {
                replTermOnDataDisposableRef.current.dispose();
                replTermOnDataDisposableRef.current = null;
            }
        } catch (e) {}
    }, []);

    // Force-dispose the xterm instance (use before re-creating)
    const forceDisposeConsoleXterm = useCallback(() => {
        try {
            if (consoleXtermRef.current) {
                try {
                    consoleXtermRef.current.dispose &&
                        consoleXtermRef.current.dispose();
                } catch (e) {}
                consoleXtermRef.current = null;
            }
        } catch (e) {}
        consoleFitRef.current = null;
    }, []);

    const forceDisposeReplXterm = useCallback(() => {
        try {
            if (replXtermRef.current) {
                try {
                    replXtermRef.current.dispose &&
                        replXtermRef.current.dispose();
                } catch (e) {}
                replXtermRef.current = null;
            }
        } catch (e) {}
        replFitRef.current = null;
    }, []);

    // helper: cleanup console pty & listeners
    const killConsolePty = useCallback(() => {
        // emit kill even if null id? only when present
        if (!consolePtyIdRef.current) return;
        const id = consolePtyIdRef.current;
        consolePtyIdRef.current = null;
        try {
            socket.emit("terminal:kill", { id });
        } catch (e) {}
        safeOff("terminal:data", consoleOnDataRef);
        safeOff("terminal:exit", consoleOnExitRef);
        safeOff("terminal:error", consoleOnErrorRef);
        disposeConsoleTermData();
    }, [safeOff, disposeConsoleTermData]);

    const killReplPty = useCallback(() => {
        if (!replPtyIdRef.current) return;
        const id = replPtyIdRef.current;
        replPtyIdRef.current = null;
        try {
            socket.emit("terminal:kill", { id });
        } catch (e) {}
        safeOff("terminal:data", replOnDataRef);
        safeOff("terminal:exit", replOnExitRef);
        safeOff("terminal:error", replOnErrorRef);
        disposeReplTermData();
    }, [safeOff, disposeReplTermData]);

    // ensure console xterm exists and is attached to current container, (re)bind its onData emitter
    const ensureConsoleXterm = useCallback(() => {
        if (!consoleContainerRef.current) {
            // container isn't mounted yet — try again on next animation frame
            requestAnimationFrame(() => {
                try {
                    ensureConsoleXterm();
                } catch (e) {}
            });
            return;
        }

        // Try re-attach existing terminal instance to current container
        if (consoleXtermRef.current) {
            try {
                const term = consoleXtermRef.current;
                if (
                    consoleContainerRef.current &&
                    term.element &&
                    term.element.parentNode !== consoleContainerRef.current
                ) {
                    try {
                        term.open(consoleContainerRef.current);
                    } catch (e) {
                        // fallback: dispose and recreate below
                        try {
                            term.dispose && term.dispose();
                        } catch (ee) {}
                        consoleXtermRef.current = null;
                        consoleFitRef.current = null;
                    }
                    try {
                        consoleFitRef.current && consoleFitRef.current.fit();
                    } catch (e) {}
                }
            } catch (e) {
                try {
                    consoleXtermRef.current &&
                        consoleXtermRef.current.dispose &&
                        consoleXtermRef.current.dispose();
                } catch (ee) {}
                consoleXtermRef.current = null;
                consoleFitRef.current = null;
            }
        }

        // create if missing
        if (!consoleXtermRef.current) {
            const term = new XTerm({
                convertEol: true,
                cursorBlink: true,
                cursorStyle: "underline",
                disableStdin: false,
                fontFamily:
                    "Noto Mono, Menlo, Monaco, Consolas, 'Courier New', monospace",
                fontSize: 12,
                theme: { background: "#0b0b0b", foreground: "#e5e7eb" }
            });
            const fit = new FitAddon();
            try {
                term.loadAddon(fit);
            } catch (e) {}
            if (consoleContainerRef.current) {
                consoleContainerRef.current.style.background = "#0b0b0b";
                consoleContainerRef.current.tabIndex = 0;
            }
            try {
                term.open(consoleContainerRef.current);
            } catch (e) {}
            try {
                fit.fit();
            } catch (e) {}
            consoleXtermRef.current = term;
            consoleFitRef.current = fit;
        }

        // ensure single onData binding on the xterm -> emits terminal:input
        disposeConsoleTermData();
        try {
            // onData returns an IDisposable with dispose()
            consoleTermOnDataDisposableRef.current =
                consoleXtermRef.current.onData(d => {
                    if (!consolePtyIdRef.current) return;
                    try {
                        socket.emit("terminal:input", {
                            id: consolePtyIdRef.current,
                            data: d
                        });
                    } catch (e) {}
                });
        } catch (e) {
            /* ignore if onData missing */
        }
    }, [disposeConsoleTermData]);

    // ensure repl xterm exists and is attached to current container, (re)bind its onData emitter
    const ensureReplXterm = useCallback(() => {
        if (!replContainerRef.current) {
            requestAnimationFrame(() => {
                try {
                    ensureReplXterm();
                } catch (e) {}
            });
            return;
        }

        if (replXtermRef.current) {
            try {
                const term = replXtermRef.current;
                if (
                    replContainerRef.current &&
                    term.element &&
                    term.element.parentNode !== replContainerRef.current
                ) {
                    try {
                        term.open(replContainerRef.current);
                    } catch (e) {
                        try {
                            term.dispose && term.dispose();
                        } catch (ee) {}
                        replXtermRef.current = null;
                        replFitRef.current = null;
                    }
                    try {
                        replFitRef.current && replFitRef.current.fit();
                    } catch (e) {}
                }
            } catch (e) {
                try {
                    replXtermRef.current &&
                        replXtermRef.current.dispose &&
                        replXtermRef.current.dispose();
                } catch (ee) {}
                replXtermRef.current = null;
                replFitRef.current = null;
            }
        }

        if (!replXtermRef.current) {
            const term = new XTerm({
                convertEol: true,
                cursorBlink: true,
                disableStdin: false,
                fontFamily:
                    "Noto Mono, Menlo, Monaco, Consolas, 'Courier New', monospace",
                fontSize: 12,
                theme: { background: "#0b0b0b", foreground: "#e5e7eb" }
            });
            const fit = new FitAddon();
            try {
                term.loadAddon(fit);
            } catch (e) {}
            if (replContainerRef.current) {
                replContainerRef.current.style.background = "#0b0b0b";
                replContainerRef.current.tabIndex = 0;
            }
            try {
                term.open(replContainerRef.current);
            } catch (e) {}
            try {
                fit.fit();
            } catch (e) {}
            replXtermRef.current = term;
            replFitRef.current = fit;
        }

        disposeReplTermData();
        try {
            replTermOnDataDisposableRef.current = replXtermRef.current.onData(
                d => {
                    if (!replPtyIdRef.current) return;
                    try {
                        socket.emit("terminal:input", {
                            id: replPtyIdRef.current,
                            data: d
                        });
                    } catch (e) {}
                }
            );
        } catch (e) {}
    }, [disposeReplTermData]);

    // runTrigger handling (Play button)
    const lastRunRef = useRef(runTrigger);
    const currentContent = useLoadedFileStore(s => s.content);
    const currentFilename = useLoadedFileStore(s => s.filename);

    useEffect(() => {
        if (!isOpen) return;
        if (runTrigger === lastRunRef.current) return;
        lastRunRef.current = runTrigger;

        // when Play pressed -> open terminal and start run in Console tab
        if (activeTab !== 0) {
            setActiveTab(0);
            // give tab a moment to render the container before starting
            setTimeout(() => startConsoleRun(), 120);
        } else {
            startConsoleRun();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [runTrigger, isOpen]);

    const startConsoleRun = useCallback(() => {
        try {
            forceDisposeConsoleXterm();
        } catch (e) {}

        // ensure UI terminal exists / attached
        ensureConsoleXterm();

        // kill any repl session so only one interactive session is active
        killReplPty();

        // kill any existing console pty/handlers (we will create a new one)
        killConsolePty();

        try {
            consoleXtermRef.current && consoleXtermRef.current.clear();
        } catch (e) {}

        const id = `console-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`;
        consolePtyIdRef.current = id;
        const cols = consoleXtermRef.current
            ? consoleXtermRef.current.cols
            : 80;
        const rows = consoleXtermRef.current
            ? consoleXtermRef.current.rows
            : 24;

        // defensively remove leftover socket handlers for console channel
        safeOff("terminal:data", consoleOnDataRef);
        safeOff("terminal:exit", consoleOnExitRef);
        safeOff("terminal:error", consoleOnErrorRef);

        // attach new socket handlers scoped to this console id
        const onData = ({ id: evId, data }) => {
            if (evId !== consolePtyIdRef.current) return;
            try {
                consoleXtermRef.current && consoleXtermRef.current.write(data);
            } catch (e) {}
        };
        const onExit = ({ id: evId, code, signal }) => {
            if (evId !== consolePtyIdRef.current) return;
            try {
                consoleXtermRef.current &&
                    consoleXtermRef.current.write(
                        `\r\n[process exited: ${code}]\r\n`
                    );
            } catch (e) {}
            consolePtyIdRef.current = null;
        };
        const onError = ({ id: evId, message }) => {
            if (evId !== consolePtyIdRef.current) return;
            try {
                consoleXtermRef.current &&
                    consoleXtermRef.current.write(
                        `\r\n\n[error] ${message}\r\n`
                    );
            } catch (e) {}
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
            // focus so input goes to xterm
            setTimeout(() => {
                try {
                    consoleXtermRef.current &&
                        consoleXtermRef.current.focus &&
                        consoleXtermRef.current.focus();
                } catch (e) {}
                try {
                    consoleFitRef.current && consoleFitRef.current.fit();
                } catch (e) {}
            }, 60);
        } catch (e) {
            try {
                consoleXtermRef.current &&
                    consoleXtermRef.current.write(`[error] ${String(e)}\r\n`);
            } catch (e2) {}
        }
    }, [
        ensureConsoleXterm,
        killConsolePty,
        killReplPty,
        safeOff,
        currentContent,
        currentFilename
    ]);

    // detect tab switch and restart appropriate sessions
    useEffect(() => {
        if (!isOpen) {
            prevActiveRef.current = activeTab;
            return;
        }

        if (prevActiveRef.current !== activeTab) {
            // switched tabs
            if (activeTab === 0) {
                // switched to Console -> start fresh run after a short delay so container ref is mounted
                try {
                    setTimeout(() => {
                        try {
                            startConsoleRun();
                        } catch (e) {
                            console.error(
                                "Failed to restart console run (delayed):",
                                e
                            );
                        }
                    }, 40);
                } catch (e) {
                    console.error("Failed to schedule Console start:", e);
                }
            } else if (activeTab === 1) {
                // switched to REPL -> kill console and start repl after a short delay
                try {
                    killConsolePty();
                    setTimeout(() => {
                        try {
                            try {
                                forceDisposeReplXterm();
                            } catch (e) {}

                            // ensure repl xterm attached and start
                            ensureReplXterm();

                            // kill any previous repl pty handlers first
                            safeOff("terminal:data", replOnDataRef);
                            safeOff("terminal:exit", replOnExitRef);
                            safeOff("terminal:error", replOnErrorRef);
                            killReplPty(); // ensure previous repl killed

                            const id = `repl-${Date.now()}-${Math.random()
                                .toString(36)
                                .slice(2, 8)}`;
                            replPtyIdRef.current = id;
                            const cols = replXtermRef.current
                                ? replXtermRef.current.cols
                                : 80;
                            const rows = replXtermRef.current
                                ? replXtermRef.current.rows
                                : 24;

                            const onData = ({ id: evId, data }) => {
                                if (evId !== replPtyIdRef.current) return;
                                try {
                                    replXtermRef.current &&
                                        replXtermRef.current.write(data);
                                } catch (e) {}
                            };
                            const onExit = ({ id: evId, code, signal }) => {
                                if (evId !== replPtyIdRef.current) return;
                                try {
                                    replXtermRef.current &&
                                        replXtermRef.current.write(
                                            `\r\n\n[process exited: ${code}]\r\n`
                                        );
                                } catch (e) {}
                                replPtyIdRef.current = null;
                            };
                            const onError = ({ id: evId, message }) => {
                                if (evId !== replPtyIdRef.current) return;
                                try {
                                    replXtermRef.current &&
                                        replXtermRef.current.write(
                                            `\r\n\n[error] ${message}\r\n`
                                        );
                                } catch (e) {}
                            };

                            replOnDataRef.current = onData;
                            replOnExitRef.current = onExit;
                            replOnErrorRef.current = onError;

                            socket.on("terminal:data", onData);
                            socket.on("terminal:exit", onExit);
                            socket.on("terminal:error", onError);

                            // request new repl
                            try {
                                socket.emit("terminal:create", {
                                    id,
                                    mode: "repl",
                                    cols,
                                    rows
                                });
                                setTimeout(() => {
                                    try {
                                        replXtermRef.current &&
                                            replXtermRef.current.setOption &&
                                            replXtermRef.current.setOption(
                                                "disableStdin",
                                                false
                                            );
                                    } catch (e) {}
                                    try {
                                        replXtermRef.current &&
                                            replXtermRef.current.focus &&
                                            replXtermRef.current.focus();
                                    } catch (e) {}
                                    try {
                                        replFitRef.current &&
                                            replFitRef.current.fit();
                                    } catch (e) {}
                                }, 50);
                            } catch (e) {}
                        } catch (e) {
                            console.error(
                                "Failed to start REPL inside delayed callback:",
                                e
                            );
                        }
                    }, 40);
                } catch (e) {
                    console.error("Failed to schedule REPL start:", e);
                }
            }
        }

        prevActiveRef.current = activeTab;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, isOpen]);

    // Fit terminals when height changes or when tab switches (container layout changes)
    useEffect(() => {
        if (!isOpen) return;
        const timer = setTimeout(() => {
            try {
                if (
                    activeTab === 0 &&
                    consoleFitRef.current &&
                    consoleXtermRef.current
                ) {
                    consoleFitRef.current.fit();
                } else if (
                    activeTab === 1 &&
                    replFitRef.current &&
                    replXtermRef.current
                ) {
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
            // stop any running ptys and remove socket handlers
            try {
                killConsolePty();
            } catch (e) {}
            try {
                killReplPty();
            } catch (e) {}

            try {
                safeOff("terminal:data", consoleOnDataRef);
                safeOff("terminal:exit", consoleOnExitRef);
                safeOff("terminal:error", consoleOnErrorRef);
                safeOff("terminal:data", replOnDataRef);
                safeOff("terminal:exit", replOnExitRef);
                safeOff("terminal:error", replOnErrorRef);
            } catch (e) {}

            // dispose xterm onData disposables
            try {
                disposeConsoleTermData();
            } catch (e) {}
            try {
                disposeReplTermData();
            } catch (e) {}

            // dispose xterms
            try {
                consoleXtermRef.current &&
                    consoleXtermRef.current.dispose &&
                    consoleXtermRef.current.dispose();
            } catch (e) {}
            try {
                replXtermRef.current &&
                    replXtermRef.current.dispose &&
                    replXtermRef.current.dispose();
            } catch (e) {}

            consoleXtermRef.current = null;
            replXtermRef.current = null;
            consolePtyIdRef.current = null;
            replPtyIdRef.current = null;
        };
    }, [
        isOpen,
        killConsolePty,
        killReplPty,
        safeOff,
        disposeConsoleTermData,
        disposeReplTermData
    ]);

    // panel style
    const panelStyle = {
        height: `${height}px`,
        transform: `translateY(${isOpen ? 0 : 100}%)`,
        transition: draggingRef.current
            ? "none"
            : "height 0.3s ease, transform 0.3s ease",
        zIndex: 10000,
        position: "fixed",
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
                className="shadow-2xl border border-slate-800 overflow-hidden rounded-t-lg"
                style={{
                    ...panelStyle,
                    background: "linear-gradient(180deg, #0b0b0b, #0f0f0f)"
                }}
            >
                {/* drag handle (use pointer events attached above) */}
                <div
                    ref={handleRef}
                    className="w-full h-6 cursor-row-resize bg-transparent flex justify-center items-center touch-none"
                >
                    <div className="w-12 h-1 rounded-full bg-slate-600" />
                </div>

                <div className="flex flex-col" style={{ height: "calc(100% - 24px)" }}>
                    <TerminalHeader
                        title={activeTab === 0 ? "Console" : "REPL"}
                        activeTab={activeTab}
                        onSwitchTab={i => setActiveTab(i)}
                    />

                    <ConsoleFilterBar
                        active={consoleFilter}
                        onChangeFilter={i => setConsoleFilter(i)}
                    />

                    <div
                        className="overflow-hidden"
                        style={{
                            flex: "1 1 0",
                            minHeight: 0,
                            fontSize: "14px",
                            padding: "6px"
                        }}
                    >
                        {/* Console tab */}
                        {activeTab === 0 && (
                            <div style={{ width: "100%", height: "100%" }}>
                                <div
                                    ref={consoleContainerRef}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        background: "#0b0b0b",
                                        borderRadius: 0,
                                        boxSizing: "border-box"
                                    }}
                                />
                            </div>
                        )}

                        {/* REPL tab */}
                        {activeTab === 1 && (
                            <div style={{ width: "100%", height: "100%" }}>
                                <div
                                    ref={replContainerRef}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        background: "#0b0b0b",
                                        borderRadius: 0,
                                        boxSizing: "border-box"
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <BottomInput filename={currentFilename} />
                </div>
            </div>
        </>
    );
}