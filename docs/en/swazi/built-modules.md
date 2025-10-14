# SwaziLang Built-in Modules

SwaziLang comes with a set of **built-in modules** that provide powerful, ready-to-use features—no need to install or write them yourself!  
These modules cover common tasks like working with files, regular expressions, HTTP requests, JSON data, and more.

---

## What Are Built-in Modules?

Built-in modules are special modules provided by the SwaziLang interpreter.  
You can import them just like your own modules, but they always exist and are **loaded instantly**.

**Examples of built-in module names:**
- `"regex"`
- `"fs"`
- `"http"`
- `"json"`
- `"path"`
- `"os"`
- `"process"`
- `"async"`

---

## How to Import Built-in Modules

Just use the `tumia` keyword in your code:

```swazi
tumia "fs"          // Imports file system module
tumia {get, post} kutoka "http"    // Imports HTTP module functions
tumia "json"        // Imports JSON module
tumia "async"       // Imports async module
```

*Tip: You do NOT need to create or download these files—the interpreter provides them automatically!*

---

## What Can You Do With Each Module?

### 1. `regex` — Regular Expressions

Work with text patterns, search, match, and replace strings.

**Functions:**
- `match(str, pattern, [flags])` — Find matches (supports flags like `"i"`, `"g"`, `"m"`)
- `test(str, pattern, [flags])` — Test if a pattern exists
- `fullMatch(str, pattern, [flags])` — True if whole string matches
- `search(str, pattern, [flags])` — Find position of first match
- `replace(str, pattern, replacement, [flags])` — Replace matches in string
- `split(str, pattern, [flags])` — Split string by pattern

**Example:**
```swazi
tumia "regex"
data found = regex.match("hello world", "o.", "g")
chapisha found
```

---

### 2. `fs` — File System

Read and write files and folders, check existence, and more.

**Functions:**
- `readFile(path)` — Read file content
- `writeFile(path, content, [binary=false])` — Write to file
- `exists(path)` — Check if a file or folder exists
- `listDir(path)` — List files/folders in a directory
- `copy(src, dest, [overwrite=false])` — Copy files/folders
- `move(src, dest, [overwrite=false])` — Move files/folders
- `remove(path)` — Delete files/folders
- `makeDir(path, [recursive=true])` — Create directories
- `stat(path)` — Get info about a file/folder

**Example:**
```swazi
tumia "fs"
chapisha fs.readFile("myfile.txt")
```

---

### 3. `http` — HTTP Requests

Send and receive data over the internet (if available on your system).

**Functions:**
- `get(url, [headers])` — HTTP GET request
- `post(url, body, [contentType], [headers])` — HTTP POST request

**Example:**
```swazi
tumia "http"
data html = http.get("https://swazi-lang.org")
chapisha html
```

---

### 4. `json` — JSON Data

Parse and generate JSON, the universal data format.

**Functions:**
- `parse(str)` — Parse JSON string into Swazi data
- `stringify(val)` — Convert Swazi data to JSON string

**Example:**
```swazi
tumia "json"
data obj = json.parse('{"name": "Amina"}')
chapisha obj.name
```

---

### 5. `path` — File Paths

Work with file and folder paths.

**Functions:**
- `join(...segments)` — Combine paths
- `basename(path)` — Get filename from path
- `dirname(path)` — Get folder from path
- `extname(path)` — Get file extension
- `resolve(...segments)` — Get absolute path

**Example:**
```swazi
tumia "path"
data fullPath = path.join("/home", "user", "docs")
chapisha fullPath
```

---

### 6. `os` — Operating System Info

Get info about your system.

**Functions:**
- `platform()` — OS name (windows, linux, macos)
- `cwd()` — Current working directory
- `hostname()` — Computer name
- `tmpdir()` — Temporary folder
- `cpus()` — Number of CPU cores

**Example:**
```swazi
tumia "os"
chapisha os.platform()
```

---

### 7. `process` — Environment & Process Info

Control environment variables and get process info.

**Functions:**
- `getEnv(name)` — Get environment variable
- `setEnv(name, value)` — Set environment variable
- `unsetEnv(name)` — Remove environment variable
- `pid()` — Get process ID

**Example:**
```swazi
tumia "process"
chapisha process.pid()
```

---

### 8. `async` — Asynchronous Helpers

Handle timers and async callbacks easily in SwaziLang.

**Functions:**
- `subiri(cb, ...args)` — Queue a callback to be run asynchronously.
- `setTimeout(ms, cb)` or `setTimeout(cb, ms)` — Schedule a callback after `ms` milliseconds.
- `clearTimeout(id)` — Cancel a scheduled timeout by ID.
- `setInterval(ms, cb)` or `setInterval(cb, ms)` — Schedule a callback to run every `ms` milliseconds.
- `clearInterval(id)` — Cancel a scheduled interval by ID.
- `nap(ms, cb?)` — Sleep for a period, optionally run a callback after.

**Example:**
```swazi
tumia "async"
async.setTimeout(1000, () => chapisha "Hello after 1 second")
```
Or with named import:
```swazi
tumia {setInterval, clearInterval} kutoka "async"
data id = setInterval(500, () => chapisha "Tick")
async.setTimeout(3000, () => clearInterval(id)) // Stop ticking after 3 seconds
```

---

## How the Flow Works

- When you use `tumia "fs"` (or any built-in module), SwaziLang's interpreter provides the module instantly—no loading from disk!
- You access module functions as properties (e.g., `fs.readFile`, `regex.match`)
- You can use them anywhere in your program, just like your own code.

---

## Summary Table

| Module   | Purpose              | Example Use         |
|----------|----------------------|--------------------|
| regex    | Text matching        | `regex.match(...)` |
| fs       | File operations      | `fs.readFile(...)` |
| http     | Web requests         | `http.get(...)`    |
| json     | JSON data            | `json.parse(...)`  |
| path     | Path manipulation    | `path.join(...)`   |
| os       | OS info              | `os.platform()`    |
| process  | Env/process control  | `process.getEnv(...)` |
| async    | Async helpers        | `async.setTimeout(...)` |

---

## Pro Tips

- You can import and use **multiple built-in modules** in the same file.
- Built-in modules are **safe, fast, and isolated**—they won’t clash with your own code.
- Read the official SwaziLang docs(will be provided later) for more examples and usage of more modules in the future and different edge cases!

---

**Next:**  
Discover built-in global objects and functions to make your SwaziLang journey even smoother!