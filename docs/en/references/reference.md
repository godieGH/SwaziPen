# SwaziLang Complete Reference

Comprehensive tabular reference for SwaziLang built-in globals, objects, modules, methods, and runtime behaviors.

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Global Functions](#2-global-functions)
3. [Global Objects](#3-global-objects)
4. [Built-in Modules](#4-built-in-modules)
5. [Member Methods by Type](#5-member-methods-by-type)
6. [Muda Time API](#6-muda-time-api)
7. [Async API & Event Loop](#7-async-api--event-loop)
8. [Module System](#8-module-system)
9. [Error Handling](#9-error-handling)
10. [Common Patterns](#10-common-patterns)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Quick Start

### Running Programs

| Command | Description |
|---------|-------------|
| `swazi main.sl` | Run with explicit `.sl` extension |
| `swazi main.swz` | Run with explicit `.swz` extension |
| `swazi main` | Auto-tries: `main`, `main.sl`, `main.swz` |

### Key Rules

- Entry file starts in global environment
- Import other modules using `tumia`
- Use relative paths for local files: `tumia "./math.sl"`
- Use bare names for built-ins: `tumia "fs"`

---

## 2. Global Functions

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `ainaya()` | value | string | Inspect runtime type: "namba", "neno", "bool", "null", "object", "muundo", "orodha", "kazi" |
| `Orodha()` | ...args | array | Create array: `()` → empty, `(n)` → length n, `(a,b,c)` → [a,b,c] |
| `Bool()` | value | boolean | Convert to boolean using Swazi truthiness |
| `Namba()` | value | number | Convert to number (floating point) |
| `Neno()` | value | string | Convert to string |
| `soma()` | prompt? | string | Read line from stdin, optional prompt |
| `Makosa()` | msg? | throws | Throw runtime error with message |
| `thibitisha()` | cond, msg? | void/throws | Assert condition is truthy, throw if false |
| `muda()` | ...args | number/string | Flexible date/time helper (see Muda section) |
| `NOW_MS()` | - | number | Current epoch milliseconds (UTC) |

### Examples

```swazi
chapisha ainaya(42)              // "namba"
data arr = Orodha(1,2,3)         // [1,2,3]
data name = soma("Name: ")       // Read input
thibitisha(x > 0, "x must be positive")
```

---

## 3. Global Objects

### 3.1 Object Utilities

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `Object.keys()` | obj | array | Array of property names (strings) |
| `Object.values()` | obj | array | Array of property values |
| `Object.entry()` | obj | array | Array of [key, value] pairs |

**Example:**
```swazi
data person = { name: "Amina", age: 20 }
chapisha Object.keys(person)    // ["name", "age"]
chapisha Object.values(person)  // ["Amina", 20]
```

---

### 3.2 Hesabu (Math & Statistics)

#### Basic Math Operations

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `kadiria()` | x | number | Round to nearest integer |
| `kadiriajuu()` | x | number | Ceiling (round up) |
| `kadiriachini()` | x | number | Floor (round down) |
| `kubwa()` | a,b,... | number | Maximum value |
| `ndogo()` | a,b,... | number | Minimum value |
| `alama()` | x | number | Sign: 1, -1, or 0 |

#### Logarithmic & Trigonometric

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `log()` | n, base? | number | log₁₀(n) or logₓ(n) if base provided |
| `ln()` | n | number | Natural logarithm |
| `sin()` | x | number | Sine (radians) |
| `cos()` | x | number | Cosine (radians) |
| `tan()` | x | number | Tangent (radians) |
| `hypot()` | x1,x2,... | number | Euclidean distance |

#### Random & Conversion

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `rand()` | - | number | Random in [0,1) |
| `rand()` | a | number | Random in [0,a) |
| `rand()` | a,b | number | Random in [a,b) |
| `deg2rad()` | degrees | number | Convert degrees to radians |
| `rad2deg()` | radians | number | Convert radians to degrees |

#### Integer Math

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `gcd()` | a,b | number | Greatest common divisor |
| `lcm()` | a,b | number | Least common multiple |

#### Statistics

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `mean()` | ...values or array | number | Arithmetic mean |
| `median()` | ...values or array | number | Median value |
| `stddev()` | ...values or array | number | Standard deviation |

#### Utility

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `siNambaSahihi()` | x | boolean | Check if value is NaN |
| `kadiriaKtkDes()` | x, digits | number | Round to decimal places |

**Examples:**
```swazi
chapisha Hesabu.kadiria(3.7)           // 4
chapisha Hesabu.kubwa(1,5,3)           // 5
chapisha Hesabu.rand(1,10)             // Random between 1-10
chapisha Hesabu.mean(1,2,3,4,5)        // 3
```

---

### 3.3 swazi Object

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `swazi.exit()` | code? | - | Exit process (default code 0) |

---

## 4. Built-in Modules

**Import Syntax:** `tumia "module_name"`  
⚠️ **Must use double quotes!**

### 4.1 regex Module

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `match()` | str, pattern, flags? | array/null | Match pattern; with 'g' returns all matches |
| `test()` | str, pattern, flags? | boolean | Test if pattern exists |
| `fullMatch()` | str, pattern, flags? | boolean | Test if entire string matches |
| `search()` | str, pattern, flags? | number | Index of first match or -1 |
| `replace()` | str, pattern, replacement, flags? | string | Replace matches (all with 'g') |
| `split()` | str, pattern, flags? | array | Split by pattern |

**Flags:**
- `g` = global (find all)
- `i` = case insensitive
- `m` = multiline (^/$ per line)

**Example:**
```swazi
tumia "regex"
data matches = regex.match("a1 b2 c3", "\\w\\d", "g")
chapisha matches  // ["a1", "b2", "c3"]
```

---

### 4.2 fs (File System) Module

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `readFile()` | path | string/null | Read file contents or null if not found |
| `writeFile()` | path, content, binary? | boolean | Write file, returns success |
| `exists()` | path | boolean | Check if path exists |
| `listDir()` | path? | array | List directory contents (default ".") |
| `copy()` | src, dest, overwrite? | boolean | Copy file/directory |
| `move()` | src, dest, overwrite? | boolean | Move/rename file |
| `remove()` | path | boolean | Delete file/directory recursively |
| `makeDir()` | path, recursive? | boolean | Create directory |
| `stat()` | path | object | Get file metadata |

**stat() Returns:**
```swazi
{
  exists: boolean,
  isFile: boolean,
  isDir: boolean,
  size: number,        // bytes
  modifiedAt: string,  // ISO8601 UTC
  permissions: string  // e.g. "rw-"
}
```

**Example:**
```swazi
tumia "fs"
data content = fs.readFile("notes.txt")
kama content null:
  chapisha "File not found"
sawa:
  chapisha content
```

---

### 4.3 http Module

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `get()` | url, headers? | string | HTTP GET request |
| `post()` | url, body, contentType?, headers? | string | HTTP POST request |

⚠️ **Requires libcurl at build time**

**Example:**
```swazi
tumia "http"
data body = http.get("https://api.example.com/data")
chapisha body
```

---

### 4.4 json Module

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `parse()` | string | value | Parse JSON string to Swazi value |
| `stringify()` | value | string | Convert Swazi value to JSON string |

**Example:**
```swazi
tumia "json"
data obj = json.parse('{"name":"Amina","age":25}')
chapisha obj.name  // "Amina"

data text = json.stringify({ x: 1, y: 2 })
chapisha text  // {"x":1,"y":2}
```

---

### 4.5 path Module

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `join()` | ...segments | string | Join path segments (normalized) |
| `basename()` | path | string | Extract filename |
| `dirname()` | path | string | Extract directory |
| `extname()` | path | string | Extract extension (with dot) |
| `resolve()` | ...segments | string | Resolve to absolute path |

**Example:**
```swazi
tumia "path"
data full = path.join("/home", "user", "file.txt")
chapisha full  // /home/user/file.txt
```

---

### 4.6 os Module

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `platform()` | - | string | OS: "windows", "macos", "linux", "unknown" |
| `cwd()` | - | string | Current working directory |
| `hostname()` | - | string | Machine hostname |
| `tmpdir()` | - | string | System temp directory |
| `cpus()` | - | number | CPU core count |

---

### 4.7 process Module

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `getEnv()` | name | string/null | Get environment variable |
| `setEnv()` | name, value | boolean | Set environment variable |
| `unsetEnv()` | name | boolean | Remove environment variable |
| `pid()` | - | number | Process ID |

---

### 4.8 async Module

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `subiri()` | cb, ...args | void | Enqueue callback for next tick |
| `setTimeout()` | ms, cb or cb, ms | number | Schedule single-shot callback, returns ID |
| `clearTimeout()` | id | void | Cancel timeout |
| `setInterval()` | ms, cb or cb, ms | number | Schedule repeating callback, returns ID |
| `clearInterval()` | id | void | Cancel interval |
| `nap()` | ms or ms, cb or cb, ms | number | Delay or schedule callback |

**Example:**
```swazi
tumia "async"

async.setTimeout(1000, () => chapisha "1 second later")

data id = async.setInterval(500, () => chapisha "tick")
async.setTimeout(3000, () => async.clearInterval(id))
```

---

## 5. Member Methods by Type

### 5.1 Universal Properties

Available on all values:

| Property | Type | Description |
|----------|------|-------------|
| `.aina` | string | Type name (same as ainaya()) |
| `.ninamba` | boolean | Is number? |
| `.nineno` | boolean | Is string? |
| `.nibool` | boolean | Is boolean? |
| `.niorodha` | boolean | Is array? |
| `.nikazi` | boolean | Is function? |

---

### 5.2 String Methods

| Property/Method | Returns | Description |
|-----------------|---------|-------------|
| `.herufi` | number | String length |
| `.herufiNdogo()` | string | To lowercase |
| `.herufiKubwa()` | string | To uppercase |
| `.sawazisha()` | string | Trim whitespace |
| `.huanzaNa(prefix)` | boolean | Starts with prefix? |
| `.huishaNa(suffix)` | boolean | Ends with suffix? |
| `.kuna(sub)` | boolean | Contains substring? |
| `.tafuta(sub, from?)` | number | Index of substring (-1 if not found) |
| `.slesi(start?, end?)` | string | Extract substring |
| `.badilisha(old, new)` | string | Replace first occurrence |
| `.badilishaZote(old, new)` | string | Replace all occurrences |
| `.orodhesha(sep?)` | array | Split into array |
| `.unganisha(other)` | string | Concatenate strings |
| `.rudia(n)` | string | Repeat n times |
| `.herufiYa(index)` | string | Character at index |

**Example:**
```swazi
data s = "  Hello World  "
chapisha s.sawazisha()           // "Hello World"
chapisha s.herufiKubwa()         // "  HELLO WORLD  "
chapisha "abc".rudia(3)          // "abcabcabc"
data arr = "a,b,c".orodhesha(",") // ["a","b","c"]
```

---

### 5.3 Number Methods

#### Properties (Boolean)

| Property | Description |
|----------|-------------|
| `.siSahihi` | Is NaN? |
| `.inf` | Is infinite? |
| `.nzima` | Is integer? |
| `.desimali` | Has fractional part? |
| `.chanya` | Is positive? |
| `.hasi` | Is negative? |
| `.witiri` | Is odd integer? |
| `.shufwa` | Is even integer? |
| `.tasa` | Is prime? (integers only) |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `.abs()` | number | Absolute value |
| `.kadiria()` | number | Round to nearest |
| `.kadiriajuu()` | number | Ceiling |
| `.kadiriachini()` | number | Floor |
| `.kipeo(b?)` | number | Power (default: square) |
| `.kipeuo(b?)` | number | Root (default: square root) |
| `.kubwa(...)` | number | Max with other values |
| `.ndogo(...)` | number | Min with other values |
| `.kadiriaKwa(digits?)` | string | Format to fixed decimals |
| `.kwaKiwango(factor)` | number | Multiply by factor |

**Example:**
```swazi
chapisha (3.7).kadiria()     // 4
chapisha (2).kipeo(3)        // 8
chapisha (16).kipeuo()       // 4
chapisha (5).tasa            // kweli (true)
```

---

### 5.4 Array Methods

| Property/Method | Returns | Description |
|-----------------|---------|-------------|
| `.idadi` | number | Array length |
| `.ongeza(...values)` | number | Push (returns new length) |
| `.toa()` | value | Pop from end |
| `.ondoa(value)` | boolean | Remove first occurrence |
| `.ondoaZote(value)` | number | Remove all occurrences (returns count) |
| `.ondoaMwanzo()` | value | Shift (remove from start) |
| `.ongezaMwanzo(...values)` | number | Unshift (insert at start) |
| `.ingiza(value, index)` | number | Insert at index |
| `.futa()` | void | Clear array |
| `.panua(otherArray)` | array | Concat (returns new array) |
| `.geuza()` | array | Reverse in place |
| `.panga(comparator?)` | array | Sort in place |
| `.indexYa(value, start?)` | number | Index of value (-1 if not found) |
| `.tafuta(fn)` | value | Find first matching element |
| `.tafutaIndex(fn)` | number | Index of first match |
| `.kuna(value)` | boolean | Contains value? |
| `.slesi(start?, end?)` | array | Slice (new array) |
| `.pachika(start, count, ...items)` | array | Splice (returns removed) |
| `.badili(fn)` | array | Map (new array) |
| `.chambua(fn)` | array | Filter (new array) |
| `.punguza(fn, initial?)` | value | Reduce |
| `.unganisha(separator?)` | string | Join to string |

**Example:**
```swazi
data arr = Orodha(1,2,3)
arr.ongeza(4)              // [1,2,3,4]
arr.panga()                // Sort in place
data doubled = arr.badili(x => x * 2)
data evens = arr.chambua(x => x.shufwa)
```

---

## 6. Muda (Time) API

### 6.1 muda() Function Signatures

| Signature | Returns | Description |
|-----------|---------|-------------|
| `muda()` | number | Current epoch milliseconds |
| `muda("ms")` | number | Current epoch milliseconds |
| `muda(formatString)` | string | Format current time |
| `muda(ms, format)` | string | Format given milliseconds |
| `muda(dateString)` | number | Parse date to epoch ms |
| `muda(dateString, format)` | number | Parse with custom format |
| `muda(dateString, format, zone)` | number | Parse in specific timezone |

---

### 6.2 Muda Class Constructor

| Constructor | Description |
|-------------|-------------|
| `unda Muda()` | Current time |
| `unda Muda(ms)` | From epoch milliseconds |
| `unda Muda("ISO-string")` | Parse ISO date string |
| `unda Muda(year, month, day, hour?, min?, sec?)` | From components |

---

### 6.3 Muda Instance Methods

#### Getters

| Method | Returns | Description |
|--------|---------|-------------|
| `.mwaka()` | number | Year |
| `.mwezi()` | number | Month (1-12) |
| `.tarehe()` | number | Day of month |
| `.sikuYaJuma(fmt?)` | number/string | Day of week |
| `.saa(fmt?)` | number/string | Hour |
| `.dakika()` | number | Minutes |
| `.sekunde()` | number | Seconds |
| `.millis()` | number | Milliseconds (0-999) |
| `.ms()` | number | Epoch milliseconds |
| `.zone()` | string | Timezone (always "UTC") |

#### Formatters

| Method | Returns | Description |
|--------|---------|-------------|
| `.fmt(format, zone?)` | string | Format with tokens |
| `.iso()` | string | ISO 8601 format |
| `.object()` | object | Object with all components |

#### Comparisons

| Method | Returns | Description |
|--------|---------|-------------|
| `.eq(other)` | boolean | Equal to? |
| `.gt(other)` | boolean | Greater than? |
| `.lt(other)` | boolean | Less than? |
| `.diff(other, unit?)` | number | Difference (default: ms) |

#### Arithmetic (Returns new Muda instance)

| Method | Returns | Description |
|--------|---------|-------------|
| `.ongeza(unit, amount)` | Muda | Add time |
| `.punguza(unit, amount)` | Muda | Subtract time |
| `.setiMuda(field, value)` | Muda | Set specific field |

---

### 6.4 Time Units

| Unit String | Aliases | Description |
|-------------|---------|-------------|
| `"sekunde"` | `"s"` | Seconds |
| `"dakika"` | `"m"`, `"dk"` | Minutes |
| `"saa"` | `"masaa"`, `"h"` | Hours |
| `"siku"` | `"d"` | Days |
| `"wiki"` | - | Weeks |
| `"mwezi"` | `"miezi"`, `"M"` | Months |
| `"mwaka"` | `"miaka"`, `"y"` | Years |

---

### 6.5 Format Tokens

| Token | Output | Example |
|-------|--------|---------|
| `YYYY` | 4-digit year | 2025 |
| `YY` | 2-digit year | 25 |
| `MMMM` | Full month name | October |
| `MMM` | Short month name | Oct |
| `MM` | Month zero-padded | 10 |
| `M` | Month number | 10 |
| `DD` | Day zero-padded | 14 |
| `D` | Day number | 14 |
| `Do` | Day with ordinal | 14th |
| `dddd` | Full weekday | Tuesday |
| `ddd` | Short weekday | Tue |
| `HH` | Hour 24h padded | 19 |
| `H` | Hour 24h | 19 |
| `hh` | Hour 12h padded | 07 |
| `h` | Hour 12h | 7 |
| `mm` | Minutes padded | 05 |
| `m` | Minutes | 5 |
| `ss` | Seconds padded | 03 |
| `s` | Seconds | 3 |
| `SSS` | Milliseconds | 123 |
| `a` / `A` | am/pm | pm / PM |
| `ZZ` | Timezone offset | +0000 |
| `Z` | Timezone offset | +00:00 |
| `x` | Unix milliseconds | 1729023456789 |
| `X` | Unix seconds | 1729023456 |

**Example:**
```swazi
data d = unda Muda(2025, 10, 14, 15, 30)
chapisha d.fmt("YYYY-MM-DD HH:mm:ss")  // "2025-10-14 15:30:00"
chapisha d.fmt("MMMM Do, YYYY")        // "October 14th, 2025"

data future = d.ongeza("siku", 7)
chapisha future.iso()
```

---

## 7. Async API & Event Loop

### 7.1 Event Loop Behavior

| Concept | Description |
|---------|-------------|
| **Callback Execution** | All callbacks run on main evaluator thread |
| **Timer Threads** | Detached worker threads enqueue callbacks when timers fire |
| **Queue Safety** | Thread-safe queue for callback scheduling |
| **Loop Exit** | Event loop exits when queue is empty and no active timers |
| **Error Handling** | Exceptions in callbacks are caught and logged (don't crash loop) |

---

### 7.2 Scheduling Guarantees

| Guarantee | Description |
|-----------|-------------|
| **Order** | Callbacks execute in FIFO order from queue |
| **Single-threaded** | No concurrent callback execution |
| **Isolation** | Each callback runs to completion before next |
| **Best-effort timing** | Timers fire approximately at specified delay |

---

## 8. Module System

### 8.1 Import Syntax

| Syntax | Description |
|--------|-------------|
| `tumia "module"` | Import entire module |
| `tumia "./file.sl"` | Import local file |
| `tumia {a, b} kutoka "module"` | Named imports |
| `tumia a kutoka "module"` | Default import |
| `tumia * kutoka "module"` | Wildcard import |
| `tumia {a kama x} kutoka "module"` | Aliased import |

⚠️ **Must use double quotes for module specifiers**

---

### 8.2 Export Syntax

| Syntax | Description |
|--------|-------------|
| `ruhusu name` | Export single binding (default) |
| `ruhusu {a, b}` | Named exports |
| `ruhusu obj` | Export object |

⚠️ **Only one ruhusu per file, must be last statement**

---

### 8.3 Module Resolution

| Step | Description |
|------|-------------|
| 1 | Check built-in modules first |
| 2 | If absolute path, use directly |
| 3 | If relative, resolve from requester's directory |
| 4 | Try: `spec`, `spec.sl`, `spec.swz` |
| 5 | Cache module by canonical path |

---

### 8.4 Circular Dependencies

| Behavior | Description |
|----------|-------------|
| **Allowed** | Circular imports don't deadlock |
| **Partial Init** | Exports may be incomplete during cycle |
| **Best Practice** | Avoid cycles, extract shared utilities |
| **Cache Entry** | Module added to cache before evaluation |

---

## 9. Error Handling

### 9.1 Error Functions

| Function | Usage | Description |
|----------|-------|-------------|
| `Makosa(msg)` | `Makosa("error")` | Throw runtime error |
| `thibitisha(cond, msg)` | `thibitisha(x > 0, "positive")` | Assert or throw |

---

### 9.2 Try/Catch/Finally

| Keyword | Swazi | Description |
|---------|-------|-------------|
| **try** | `jaribu` | Try block |
| **catch** | `makosa` | Catch block |
| **finally** | `kisha` | Finally block |

---

## 10. Common Patterns

### 10.1 File I/O with JSON

```swazi
tumia "fs"
tumia "json"

data txt = fs.readFile("data.json")
kama txt null:
  chapisha "File not found"
sawa:
  data obj = json.parse(txt)
  chapisha obj.name
```

---

### 10.2 HTTP + JSON

```swazi
tumia "http"
tumia "json"

data response = http.get("https://api.example.com/users")
data users = json.parse(response)
chapisha users[0].name
```

---

### 10.3 Scheduled Tasks

```swazi
tumia "async"

data count = 0
data id = async.setInterval(1000, () => {
  count++
  chapisha `Tick ${count}`
  
  kama count == 5:
    async.clearInterval(id)
    chapisha "Done!"
})
```

---

### 10.4 Module Structure

**math.sl:**
```swazi
kazi add(a, b) {
  rudisha a + b
}

kazi multiply(a, b) {
  rudisha a * b
}

ruhusu { add, multiply }
```

**main.sl:**
```swazi
tumia { add, multiply } kutoka "./math.sl"

chapisha add(2, 3)       // 5
chapisha multiply(4, 5)  // 20
```

---

### 10.5 Date Arithmetic

```swazi
data today = unda Muda()
data nextWeek = today.ongeza("siku", 7)
data lastMonth = today.punguza("mwezi", 1)

chapisha today.fmt("YYYY-MM-DD")
chapisha nextWeek.fmt("YYYY-MM-DD")
chapisha lastMonth.fmt("MMMM YYYY")
```

---

## 11. Troubleshooting

### 11.1 Common Pitfalls

| Issue | Solution |
|-------|----------|
| **Wrong quotes in imports** | Always use double quotes: `tumia "fs"` |
| **Code after ruhusu** | Code after export statement won't run |
| **Circular imports** | Extract shared code to third module |
| **Mixed chagua styles** | Use consistent `:` or `{}` in switch cases |
| **Timer not firing** | Ensure event loop runs (program stays alive) |
| **Regex limitations** | std::regex may not support all JS features |
| **HTTP not working** | Check if libcurl available at build time |
| **Precision issues** | Use integers within 53-bit range for exact math |

---

### 11.2 Debugging Checklist

| Check | Action |
|-------|--------|
| **Type errors** | Use `ainaya()` or `.aina` to inspect types |
| **Module not found** | Check path, extension, and quotes |
| **Undefined variables** | Check scope and module exports |
| **Async not working** | Verify callback syntax and timer IDs |
| **Date parsing fails** | Check format string matches input |
| **File operations fail** | Use `fs.exists()` and `fs.stat()` to debug |

---

## 12. Quick Reference Card

### Most Used Functions

```swazi
// Console
chapisha "Hello"
data input = soma("Prompt: ")

// Types
ainaya(value)
Bool(x), Namba(x), Neno(x)

// Arrays
data arr = Orodha(1,2,3)
arr.ongeza(4)
arr.panga()

// Objects
Object.keys(obj)
Object.values(obj)

// Math
Hesabu.kadiria(3.7)
Hesabu.rand(1, 10)
Hesabu.mean(1,2,3)

// Time
data now = muda("YYYY-MM-DD")
data d = unda Muda()
d.ongeza("siku", 1)

// Modules
tumia "fs"
tumia { add } kutoka "./math.sl"

// Async
async.setTimeout(1000, () => chapisha "Hi")
```

---

## Appendix