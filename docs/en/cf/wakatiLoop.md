# Swazi While Loops (`wakati`)

SwaziLang uses the keyword **`wakati`** ("while" in Swahili) to repeat code as long as a condition is true.  
You can write while loops in two main styles: **C-style** (with braces) and **Pythonic style** (with colons and indentation).

---

## Basic Syntax

### 1. **C-Style Block**

Use braces `{}` for the loop body.

```swazi
wakati cond {
    // body
    chapisha "Looping!"
}
```

**Example:**
```swazi
data i = 0
wakati i < 5 {
    chapisha i
    i++
}
```

### 2. **Pythonic Style**

Use a colon `:` and indent the body.

```swazi
wakati cond :
    chapisha "Looping!"
```

**Example:**
```swazi
data i = 0
wakati i < 5 :
    chapisha i
    i++
```

---

## Loop Controls: `simama` & `endelea`

SwaziLang supports loop control keywords for while loops:

- **`simama`** — "break" (stops the loop immediately)
- **`endelea`** — "continue" (skips to the next loop iteration)

### Example with `endelea` (continue):

```swazi
data i = 0
wakati i < 10 :
    i++
    kama i % 2 sawa 0 :
        endelea;
    chapisha i
```
- Skips even numbers, prints odd numbers only.

### Example with `simama` (break):

```swazi
data i = 0
wakati i < 10 :
    i++
    kama i > 5 :
        simama;
    chapisha i
```
- Stops the loop when `i` becomes greater than 5.

---

## Important Notes

- **Single-line pythonic style is not allowed:**
  ```swazi
  wakati cond: chapisha "Hello"   // ❌ Invalid!
  ```
  Always start a new line and indent for pythonic blocks.
- **Do not wrap the condition in parentheses:**  
  Only write `wakati cond`, not `wakati (cond)`.

- **Mixing block styles is possible, but not recommended:**  
  You can technically write:
  ```swazi
  wakati cond :
      chapisha "A"
  wakati cond2 {
      chapisha "B"
  }
  ```
  But for clarity, stick to one style per loop.

---

## Typical Patterns

### Counting Example

```swazi
data i = 1
wakati i <= 5 {
    chapisha "Count: " + i
    i++
}
```

### Pythonic Style

```swazi
data n = 3
wakati n > 0 :
    chapisha n
    n--
```

### Using Functions Inside While Loops

```swazi
data x = 10
wakati x > 0 :
    chapisha x
    x = x - 2
```

---

## Common Mistakes

- **Wrapping condition in parentheses:**
  ```swazi
  wakati (i < 5) { ... }   // ❌ Invalid!
  ```
  Use `wakati i < 5 { ... }`
- **Single-line pythonic style:**
  ```swazi
  wakati x > 0: chapisha x   // ❌ Invalid!
  ```
  Use new line and indentation.

---

## Practice Challenge

Write a loop that prints numbers from 10 down to 1.

<details>
<summary>Solution</summary>

```swazi
data i = 10
wakati i >= 1 :
    chapisha i
    i--
```
</details>

---

**Summary:**  
- Use `wakati cond { ... }` for C-style, or `wakati cond : ...` with indentation for pythonic style.
- Don't use parentheses around the condition.
- Use `simama` and `endelea` for loop control.
- Always use a new line for pythonic loops.