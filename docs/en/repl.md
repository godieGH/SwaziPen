# SwaziLang REPL

The SwaziLang REPL (Read-Eval-Print Loop) is an interactive environment where you can write, test, and experiment with SwaziLang code one expression at a time. It’s perfect for learning, debugging, and exploring language features.

---

## What is a REPL?

A REPL lets you:

- **Type SwaziLang code interactively**
- **See instant results for each line or expression**
- **Quickly experiment with syntax and features**
- **Debug code in real time**

---

## Using the REPL

### 1. SwaziPen (Browser IDE)

- Open SwaziPen in your browser (`http://localhost:5000`).
- Switch to the **REPL Tab** in the interface.
- Type any SwaziLang expression or statement and press Enter.
- See the output instantly below your input.

**REPL Features in SwaziPen:**
- Syntax highlighting
- Multi-line editing (Shift+Enter for new line)
- Command history (Up/Down arrows)
- Output panel shows results and errors

### 2. Command Line REPL

If you built the SwaziLang compiler, you can launch the REPL directly in your terminal:

```bash
swazi
```

- You’ll see a prompt like `>>>`.
- Type SwaziLang statements and get immediate results.
- Use `exit` or `Ctrl+D` to leave the REPL.

---

## Common REPL Actions

- **Run an expression:**  
  Just type:  
  ```bash
  2 + 2
  ```
- **Define a variable:**  
  ```bash
  name = "Swazi"
  ```
- **print the name:**  
  ```bash
  name
  ```
- **See errors:**  
  Invalid syntax or runtime errors are displayed right away.

---

## Benefits of Using the REPL

- **Fast Learning:** Try new language features immediately.
- **Debugging:** Isolate code snippets to test and fix issues.
- **Prototyping:** Build up code ideas interactively before saving them to files.

---

## Tips & Tricks

- Use Up/Down arrows to navigate command history.
- Use multi-line mode for longer code blocks.
- Clear the REPL output by refreshing the browser (SwaziPen) or restarting the terminal session.

---

:::info
Some features may not work on the SwaziPen Editor, please update frequently to gain access of these new features
:::

Happy experimenting with SwaziLang REPL!