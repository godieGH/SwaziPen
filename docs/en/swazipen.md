# SwaziPen: Browser IDE for SwaziLang

SwaziPen is a browser-based IDE and playground for SwaziLang. It lets you edit, navigate, and run SwaziLang code interactively — perfect for learning, rapid prototyping, or sharing code with others.

> You can write swazi codes in any of your prefered editors but right now we do not guarantee syntax Highlighting, and other SwaziLang-based Features control on other editors. but we are on working to create a Vs code, sublime text editors and other more editors Plugins to ensure support of SwaziLang syntax in these editors

---

## Features

- **Live Code Editing:** Write and update SwaziLang code with instant feedback.
- **File Navigation:** Browse project files and folders easily.
- **Run & Test:** Execute SwaziLang scripts and see output in real time.
- **Syntax Highlighting:** SwaziLang code is easy to read and visually distinct.
<!-- - **Shareable Projects:** Host your SwaziLang code and share links with collaborators. -->
<!-- - **Built-in REPL:** Experiment interactively with the SwaziLang REPL in your browser. -->
- **Cross-platform:** Works on Windows, macOS, and Linux.

---

## Installation Recap

See [Install SwaziPen](./installation.md#install-swazi) for complete setup.


---

## Starting SwaziPen

### Basic Usage

1. **Prepare your SwaziLang project folder.** Create a new folder call it anything you want.
2. `cd <swazi-project>` then navigate into the folder
3. And **Start SwaziPen server:** with the `swazipen <path> [-qp]` command.

   ```bash
   swazipen . # Server default running at port 5000
   swazipen . --port 8080 # use --port <port> or short -p <port> to run on a custom port
   swazipen . -q # use -q to run it queitely no much verbose logs
   ```

  - By default swazipen runs on the current folder if not specified, and at port 5000 with noisy logs of each actions made by the client (ie. save, edit, new file, etc. logs)
  - But you can customise the behaviour 
  ![swazi-start-up](../assets/swazi-start-up.gif)
3. **Open your browser:**  
   Navigate to `http://localhost:5000`

---

## User Interface Overview

- **File Explorer:** Left sidebar shows folder structure. Click to open files.
- **Code Editor:** Main area for editing SwaziLang files. Features syntax highlighting and autocompletion.
- **Output Panel:** See results from running code, <!-- REPL outputs, --> and error messages.
- **Toolbar:** Buttons for run, save, reload, and settings.
<!-- - **REPL Tab:** Try SwaziLang expressions interactively. -->

> Note: we are still working to improve the IDE UX so we will be updating frequently be tuned for more recent features.
---

## Key Workflows

### Editing & Running Code

- create new swazi files, eg. `main.sl` or `main.swz` (swazi has two interchangible file extentions `.sl` and `.swz`)
- Click a `.sl` or `.swz` file to load it in the editor and edit.
- Make changes, click **Run** (or use keyboard shortcut: `Ctrl+Enter`).
- Output appears instantly in the Output Panel.

### Creating New Files/Folders

- Click on the three virtical dots to open a file contextual menu in the File Explorer and click the **New File/Folder** action to create a new file/Folder.

### Saving Files

- Manual save (`Ctrl+S`) or click the save Button at the bottom right corner, or auto-save (if enabled later in Settings).

### Using the REPL (Not supported yet, but will be in the future)

- Switch to the REPL tab.
- Type SwaziLang code and press Enter to execute.
- Use for quick experiments and learning syntax.

---

## CLI Reference

SwaziPen provides a CLI with useful options:

```bash
swazipen [project-directory] [options]
```

**Options:**

| Option                            | Description                          |
|-----------------------------------|--------------------------------------|
| `--port <number>` or `-p <port>`  | Set server port                      |
| `--compiler <path>`               | Path to SwaziLang compiler binary    |
| `--open`                          | Automatically open browser on start  |
| `--quiet`      or  `-q `          | Log less detailed server info       |

**Example:**

```bash
swazipen . --port 8080 --compiler ~/SwaziLang/build/swazi --open
```

---

## Advanced Usage

### Custom Compiler Path

If your SwaziLang compiler is not in the default location, specify with `--compiler`:

```bash
swazipen . --compiler /path/to/swazi
```

### Sharing Projects

- SwaziPen can be hosted on remote servers for collaboration.
- Share your local IP and port with your team.

### Plugin System (Not supported Yet, but stay tuned)

- Extend SwaziPen with custom plugins for linting, formatting, or additional languages.
- See [SwaziPen Plugins](./plugins.md) for more information.

---

## Troubleshooting

- **Compiler not found:**  
  Ensure `swazi` binary is built and compiler path is correct.
- **Port already in use:**  
  Use a different port with `--port`.
- **Browser doesn’t open:**  
  Manually navigate to `http://localhost:<port>`.
- **Permission errors:**  
  Run terminal as administrator or use `sudo` on Linux/macOS.
- **UI or build errors:**  
  Re-run `pnpm build` in the `client` folder.

---

## FAQ

- **Can I use SwaziPen without installing SwaziLang?**  
  No, you must build SwaziLang and provide its compiler path.
- **Does SwaziPen support hot-reload for code changes?**  
  Yes, changes in the editor reflect instantly upon run.
- **Can I use SwaziPen on mobile?**  
  It’s optimized for desktop browsers and mobile devices too.

---
Happy coding with SwaziPen!