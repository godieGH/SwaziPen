# Swazi If...Else Statements (`kama`, `vinginevyo`)

Control flow in SwaziLang is powered by intuitive if...else structures. The main keywords are:

- **`kama`** — "if"
- **`vinginevyo kama`** — "else if"
- **`vinginevyo`** — "else"

These let you run code *conditionally*, based on whether an expression is true or not.

---

## Syntax Styles

SwaziLang supports two main block styles for control flow:

### 1. **C-Style Blocks (Braces)**
```swazi
kama cond {
    chapisha "Hello world"
}
```
- Use `{}` to enclose the block.
- Can be single-line or multi-line.

### 2. **Pythonic Style (Colon & Indentation)**
```swazi
kama cond :
    chapisha "Hello world"
```
- Use `:` at the end of the condition.
- Body must be on a new line, indented.

**Important:**  
- *Do NOT* use single-line pythonic style:  
  ```swazi
  kama cond: chapisha "Hello world"    // ❌ Not allowed!
  ```
  Always use a new line and indentation after `:`.

---

## Else and Else If

- **`vinginevyo`** for "else"
- **`vinginevyo kama`** for "else if"

```swazi
kama x > 10 :
    chapisha "Greater than 10"
vinginevyo kama x > 5 :
    chapisha "Greater than 5"
vinginevyo :
    chapisha "5 or less"
```

Or using C-style:
```swazi
kama x > 10 {
    chapisha "Greater than 10"
} vinginevyo kama x > 5 {
    chapisha "Greater than 5"
} vinginevyo {
    chapisha "5 or less"
}
```

---

## Mixing Block Styles (Advanced / Not Recommended)

You *can* mix C-style and Pythonic blocks, but it's **not recommended** as it can lead to confusing code.  
SwaziLang allows it, but for clarity, stick to one style per statement.

```swazi
kama cond:
    chapisha "Yes"
vinginevyo {
    chapisha "No"
}
```

---

## Single-Line Shorthand

For quick checks, you can use C-style blocks on a single line:
```swazi
kama cond { chapisha "Hello world" }
```
- Shorthand and secure.
- Pythonic style does **not** support single-line shorthand.

---

## The `ni` Keyword (Syntax Sugar)

You may see:
```swazi
kama x ni cond :
    chapisha "Condition met"
```
- The `ni` keyword is currently just syntax sugar for readability.
- It does **not** assign or define variables yet, but may do so in future versions.

---

## Practical Patterns

### 1. Nested If...Else

```swazi
kama x > 0 :
    chapisha "Positive"
    kama x % 2 sawa 0 :
        chapisha "Even"
    vinginevyo :
        chapisha "Odd"
vinginevyo :
    chapisha "Not positive"
```

### 2. Complex Conditionals

```swazi
kama a > b && c < d {
    chapisha "A is bigger and C is smaller"
}
```

### 3. Using Functions in Conditions

```swazi
kazi isEven n {
    rudisha n % 2 sawa 0
}

kama isEven(8) :
    chapisha "Even"
vinginevyo :
    chapisha "Odd"
```

---

## Common Mistakes

- **Single-line pythonic style:**  
  ```swazi
  kama cond: chapisha "Hello"     // ❌ Not allowed
  ```
  Use newline and indentation after `:`.

- **Mixed block styles:**  
  SwaziLang allows it, but avoid for clarity.

- **Confusing indentation:**  
  Pythonic style requires correct indentation or errors will occur.

---

## Summary Table

| Keyword           | Meaning      | Usage Example                            |
|-------------------|-------------|------------------------------------------|
| `kama`            | if          | `kama cond { ... }` or `kama cond : ...` |
| `vinginevyo kama` | else if     | `vinginevyo kama cond { ... }`           |
| `vinginevyo`      | else        | `vinginevyo { ... }` or `vinginevyo : ...`|
| `ni`              | readable    | `kama x ni cond : ...`                   |

---

## Practice Challenge

Write a SwaziLang conditional that prints "Adult", "Teen", or "Child" based on age.

<details>
<summary>Solution</summary>

```swazi
data age = 16

kama age >= 18 :
    chapisha "Adult"
vinginevyo kama age >= 13 :
    chapisha "Teen"
vinginevyo :
    chapisha "Child"
```
</details>

---

**Remember:**  
- Use `{}` for C-style or `:` + indentation for Pythonic blocks.
- Never use single-line pythonic style.
- You can mix styles, but keep your code clear and consistent!