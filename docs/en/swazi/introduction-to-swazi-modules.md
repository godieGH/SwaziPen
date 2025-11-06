# Introduction to Swazi Modules

## Why Do We Need Modules?

Imagine you tried to write a whole app—thousands of functions, variables, and logic—in a **single file** with 10,000+ lines.  
It would quickly become a **nightmare**: hard to find things, easy to break, and tough to work on with others.

**Modules** solve this problem!  
A module is a separate file containing code—functions, objects, classes, etc.—that can be imported and reused in other files.  
Modules help you:
- **Organize code** into logical units (e.g. math functions, user logic, data processing)
- **Avoid naming collisions** and bugs
- **Share code** between projects and people
- **Scale** your programs as they grow

Think of modules like folders in your computer:  
Each folder (module) keeps related stuff together, and you only open/use what you need.

---

## How SwaziLang Loads Programs and Modules

When you run a SwaziLang program, you start with a single main file:

```
swazi main.sl
swazi main.swz
swazi main      // (without extension; interpreter looks for main.sl or main.swz)
```

- The file you run is the **entry point**.
- It uses the **global environment** by default.
- You can import other modules/files from inside your entry point—**not by running multiple files at once!**

---

## The World of Modules

Instead of writing everything in one file, you split your code into **modules** (other `.sl` or `.swz` files).  
Inside your main file, you **import** modules as needed:

### Example

**main.sl**
```swazi
tumia "math"            // Import math module from math.sl or math.swz
tumia "./math.sl"       // Import with a relative path (recommended)
```
- Only use **double quotes** for module strings; single quotes/backticks cause an error!

When Swazi encounters `tumia`, it pauses execution of the current file, loads the new file/module, executes it, then continues.  
It keeps track of loaded modules and their exports to avoid reloading or circular problems.

---

## Exporting From a Module

To make parts of a module available to other files, use **`ruhusu`** (allow/export):

**math.sl**
```swazi
kazi add a, b {
    rudisha a + b
}
ruhusu add     // Export the add function (default export)
```
- Only **one `ruhusu` statement per file**!
- `ruhusu` can export a single value (default), or named values:
```swazi
ruhusu {
    add,
    subtract,
    arr,
    name
}
```
- Or export an object as default:
```swazi
data ob = { ... }
ruhusu ob
```
- **Code after `ruhusu` is ignored and never runs!**

---

## Importing in Main File

**main.sl**
```swazi
tumia add kutoka "math"              // Default import
tumia {add, subtract} kutoka "math"  // Named imports
tumia {add kama fff} kutoka "math"   // Rename import
tumia "math"                         // Import whole module
tumia * kutoka "math"                // Wildcard import
```
- After importing, you use the exported values/functions like normal:
```swazi
add(5, 8)         // Calls add from math module
```

# Other shorthand importing valid since swazi `v2.11.0^`
```swazi 
tumia module # that is same way as tumia module kutoka "module";
tumia module kama m # that is like saying tumia module kama m kutoka "module"

tumia console.print # this is like tumia {print} kutoka "console" for named Exports
tumia console.print kama pr # this is like tumia {print kama pr } kutoka "console" for named Exports with alias


```
:::info 
Note be careful using this shorthand they only support simple path specifier like "module" not "./modules/lib/app" or "@utils/str"
- if you want to use or module is accessible via complex path specifier do not use these shorthand.

### things to know if a module specifier is simple
- when it is on the same level as the file importing it. eg ./main.sl can import ./app.sl with just `tumia Default kutoka "app"` `tumia app` without even a `.sl` or `.swz`
- when it is an embeded module that swazi exposes it as simple eg. `console`, `math` but not `@utils/debounce` or `@utils/str` since these are not simple specifiers

:::

---

## The Power of Many Modules

- You can import **multiple modules** in a file.
- Modules can import **other modules** (even hundreds!).
- You can build a **network** of modules (A imports B, B imports C, …).
- SwaziLang handles most circular imports (A imports B, B imports A) gracefully, but beware of unpredictable results.

---

## Circular Dependencies Explained

**Circular dependency** happens when modules depend on each other directly or indirectly:

- A imports B, and B imports A.
- Or: A → B → C → A

This can cause problems like:
- Modules not fully loaded or initialized
- Unexpected behaviors or missing functions

SwaziLang handles most circular imports gracefully, but **avoid them** if you can.
- Organize code to minimize circular links.
- Consider splitting shared logic into a third module.

---

## Summary

- **Modules** help you organize, scale, and share code.
- Use `tumia` to import, `ruhusu` to export.
- Stick to double quotes for module paths.
- Only one `ruhusu` per module, and put it last!
- Circular dependencies can cause headaches—plan your module structure thoughtfully.

---

**Next:**  
Learn about Swazi's built-in modules and how they can supercharge your programs!