# SwaziLang Built-in Functions

SwaziLang provides a set of **built-in global functions** you can use directly in your code.  
These functions are always available—you don’t need to import anything!

---

## What Are Built-in Global Functions?

- **Global functions** are available everywhere in your program.
- You call them by name, passing arguments as needed.
- They’re not attached to objects or modules—they’re always in the global environment.

---

## List of Built-in Global Functions

### 1. `ainaya(val)`

Returns the type of a value as a string.
- `"namba"` for numbers, `"neno"` for strings, `"null"` for null/empty, `"bool"` for booleans, `"object"` for objects, `"muundo"` for classes, `"orodha"` for arrays, `"kazi"` for functions.

**Example:**
```swazi
chapisha ainaya(5)          // namba
chapisha ainaya("hello")    // neno
chapisha ainaya([1,2,3])    // orodha
```

---

### 2. `Orodha(...)`

Creates an array (list).
- `Orodha(5)` — array of length 5 filled with `null`
- `Orodha([1,2,3])` — copies an array
- `Orodha(a, b, c)` — array with those values

**Example:**
```swazi
chapisha Orodha(3)          // [null, null, null]
chapisha Orodha(1,2,3)      // [1, 2, 3]
```

---

### 3. `Bool(val)`

Converts a value to a boolean (`kweli` or `sikweli`).

**Example:**
```swazi
chapisha Bool(0)      // sikweli
chapisha Bool(5)      // kweli
chapisha Bool("")     // sikweli
```

---

### 4. `Namba(val)`

Converts a value to a number (float).

**Example:**
```swazi
chapisha Namba("123")   // 123
chapisha Namba("abc")   // 0
```

---

### 5. `Neno(val)`

Converts a value to a string.

**Example:**
```swazi
chapisha Neno(100)     // "100"
chapisha Neno(kweli)   // "kweli"
```

---

### 6. `soma(prompt?)`

Reads input from the user (like `input()` in Python).
- Optional prompt string.

**Example:**
```swazi
data name = soma("Enter your name: ")
chapisha `Hello, ${name}!`
```

---

### 7. `Makosa(msg?)`

Throws an error (exception) with a message.
- Use to signal problems intentionally.

**Example:**
```swazi
Makosa("Something went wrong!")   // Stops execution, prints error
```

---

### 8. `thibitisha(cond, msg?)`

Asserts that a condition is true.  
If not, throws an error (with optional message).

**Example:**
```swazi
thibitisha(x > 0, "x must be positive")
```

---

## Summary Table

| Function    | Purpose                             | Example Use                      |
|-------------|-------------------------------------|----------------------------------|
| ainaya      | Get type of value                   | `ainaya(val)`                    |
| Orodha      | Create array/list                   | `Orodha(3)`                      |
| Bool        | Convert value to boolean            | `Bool("hello")`                  |
| Namba       | Convert value to number             | `Namba("123")`                   |
| Neno        | Convert value to string             | `Neno(100)`                      |
| soma        | Read user input                     | `soma("Prompt: ")`               |
| Makosa      | Throw error/exception               | `Makosa("Error!")`               |
| thibitisha  | Assert condition or throw error     | `thibitisha(cond, "msg")`        |

---

## Pro Tips

- These functions are safe to use anywhere in your program.
- If you need more specialized tools (math, objects, time), check out the **global objects** like Hesabu, Object, Muda, and swazi.

---

**Next:**  
Learn about SwaziLang’s built-in global objects and how they make working with numbers, objects, arrays, and time easier!