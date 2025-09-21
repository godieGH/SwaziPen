# SwaziPen

Browser‑based IDE for SwaziLang — edit, navigate, and run your SwaziLang projects in a project‑scoped web editor powered by Node.js and Ace.

---

## Table of Contents

1. [What is SwaziPen?](#what-is-swazipen)  
2. [Motivation](#motivation)  
3. [Features](#features)  
4. [Architecture](#architecture)  
5. [Installation & Setup](#installation--setup)  
6. [Usage](#usage)  
7. [Editor / Client](#editor--client)  
8. [API Endpoints](#api-endpoints)  
9. [Project Scanning & File Tree](#project-scanning--file-tree)  
10. [File System Operations](#file-system-operations)  
11. [Live Updates & Watching](#live-updates--watching)  
12. [Configuration & Options](#configuration--options)  
13. [Security Considerations](#security-considerations)  
14. [Limitations & Known Issues](#limitations--known-issues)  
15. [Roadmap & Future Work](#roadmap--future-work)  
16. [Contributing](#contributing)  
17. [License](#license)

---

## What is SwaziPen?

SwaziPen is an integrated development environment (IDE) built for **SwaziLang**, designed to run directly in your browser. It allows you to:

- Browse the files and folders of a SwaziLang project.
- Edit files using a web‑based code editor.
- Perform file system operations such as saving, creating, deleting, moving, and renaming.
- Execute SwaziLang code directly from the editor.
- See live updates when files change on disk via real‑time synchronization.

---

## Motivation

SwaziPen was built to:

- Reduce friction in developing SwaziLang projects.
- Provide a unified environment combining editor, file management, and execution.
- Help beginners learn SwaziLang syntax through a simple and interactive editor.
- Enable fast feedback loops with live updates and project scanning.

---

## Features

- Project scanning to build a file/folder tree, excluding irrelevant or large files/folders.  
  ```bash 
   swazipen <path> # scan any path
  ```
- Web-based editor served in the browser to open, edit, and save files.  
- File/folder operations:  
    • Create new files/folders  
    • Rename  
    • Delete  
    • Copy / Move  
- REST API + WebSocket (Socket.IO) for interaction and live updates.  
- File watcher for external modifications.  
- CLI entry point with options: custom project path, port selection, quiet mode (minimal logs).  

---

## Architecture

SwaziPen is composed of:

- **CLI Tool**: Parses arguments (path, port, quiet), scans the project, then starts the server.  
- **Scanner**: Crawls the project directory (with filters) to produce a file tree structure.  
- **Server**: Express.js + Socket.IO  
    • Serves client assets  
    • Provides REST API endpoints for file operations  
    • Sends WebSocket events for live updates  
- **Watcher**: Uses `chokidar` to detect file changes and notify the client.  

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher recommended).  
- A C++ compiler for building the SwaziLang executable (recommended to build it yourself for stability).  
- `pnpm` package manager.  
- SwaziLang executable (build it from [SwaziLang](https://github.com/godieGH/SwaziLang)).  

### Steps

#### 1. Build SwaziLang

```bash
# Clone the project
git clone git@github.com:godieGH/SwaziLang.git
cd SwaziLang

# Create build directory
mkdir build && cd build

# Ensure CMake and a C++ compiler are installed
cmake ..     # Configure the build environment
cmake --build .   # Start the build process

# Run to confirm build worked
./swazi
```

At this point you have built the `swazi` compiler.  
Add it to your system `$PATH` so you can run it anywhere.  
- **Windows**: use `setx` or the GUI.  
- **Linux/macOS**: add `export PATH=$PATH:/path/to/swazi` in `.bashrc` or `.zshrc`.  

#### 2. Set up SwaziPen

```bash
git clone git@github.com:godieGH/SwaziPen.git
cd SwaziPen

# Install dependencies
pnpm install

# Link the CLI tool globally
pnpm link
```

> You can also use npm, yarn, or bun — but `pnpm` is recommended.

Now run:  
```bash
swazipen <path>
```  
If omitted, you’ll be prompted for a path. Default port is `5000` (can be changed with `--port` or `PORT` env var).

---

## Usage

1. Run the CLI tool:
   ```bash
   swazipen /path/to/project --port 5000
   ```
2. Open `http://localhost:5000` in your browser.  
3. Features available in the editor:  
   * Browse project in file explorer  
   * Open/edit/save files  
   * Create/rename/delete/move files & folders  
   * Run SwaziLang code (if supported)  
   * Live updates when files change  

---

## Editor / Client

- Built with **React** + **Ace editor**.  
- Syntax highlighting for SwaziLang keywords (`kazi`, `data`, `kama`, etc.), comments, literals, etc.  
- Auto‑indentation, formatting, and potential linting/error checking.  
- Panels: file explorer, editor, and console/output panel for running code on the fly.  

---

## API Endpoints

| Method    | Route                   | Purpose |
|-----------|-------------------------|---------|
| `GET`     | `/api/filetree`         | Get project file tree |
| `POST`    | `/api/get/file/content` | Read file content + setup watcher |
| `POST`    | `/api/save/file`        | Save changes to a file |
| `POST`    | `/api/create/new/file`  | Create a new file |
| `POST`    | `/api/create/new/folder`| Create a new folder |
| `POST`    | `/api/remove/dir/file`  | Delete file or folder |
| `POST`    | `/api/rename/dir/file`  | Rename file or folder |
| `POST`    | `/api/paste`            | Copy/move items |
| **WebSocket events** | `filetree:init`, `filetree:update`, `file:changed`, `file:deleted`, etc. | Live sync |

---

## Project Scanning & File Tree

- Scans project folder recursively.  
- Ignores: `node_modules`, `.git`, build folders (`dist`, `build`, `public`, `.next`, etc.), `.log`, `.map`, media files, and temp files.  
- Optionally follows symlinks (default: off).  
- Reports scan time and item counts.  

---

## File System Operations

Supported operations:

- Read file contents  
- Save file contents  
- Create new files/folders  
- Delete files/folders  
- Rename items  
- Copy/move (paste semantics)  

All operations are restricted within the project root to ensure security.

---

## Live Updates & Watching

- Uses `chokidar` to watch project for file/folder changes.  
- Watches opened files for external edits.  
- Debounces rapid events to avoid flooding the client.  

---

## Configuration & Options

| Option                  | Description |
|--------------------------|-------------|
| `--port <port>` or `-p` | Server port (default: `5000` or `PORT` env var) |
| `--quiet` or `-q`       | Suppress non‑error logs |
| `<project path>`        | Path to project folder (if omitted, prompts for one) |
| `PORT` env var          | Alternative port configuration |

---

## Security Considerations

- Validates all paths: no escaping outside project root.  
- Prevents deleting the project root itself.  
- Filters out unnecessary/large files (media, logs, etc.) to reduce risk and improve performance.  

---

## Limitations & Known Issues

- Execution runner may be limited.  
- Syntax highlighting and error reporting are basic.  
- Large projects may cause delays or high memory usage.  
- No version control (Git) integration yet.  
- Some UI features (tabs, diff, theming) are minimal or missing.  
- Frequent updates recommended for improvements.  

---

## Roadmap & Future Work

- Full SwaziLang interpreter/runner with REPL & output console.  
- Enhanced UI: tabs, diff view, unsaved change warnings, search.  
- Advanced syntax highlighting, linting, autocompletion.  
- Plugin/extension system.  
- Theming and layout customization.  
- Git integration (commit, diff, branches).  
- Remote project support.  

---

## Contributing

- Open issues for bugs/features.  
- Fork and create branches.  
- Follow code style.  
- Write tests for new features.  
- Update documentation when needed.  

---

## License

This project is open source under [LICENSE](https://github.com/godieGH/SwaziPen/blob/main/LICENSE)
