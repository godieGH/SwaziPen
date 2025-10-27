# Swazi For Loops (`kwa`)

SwaziLang provides two powerful types of for loops:

- **Normal for loop** (counting/step-based)
- **For-each loop** (iterating over arrays and objects)

Both use the `kwa` keyword ("for" in Swahili), but with different syntax and use cases.

---

## 1. Normal For Loop

This loop lets you repeat code a specific number of times, or while a condition is met.

**Syntax:**  
```
kwa(init; condition; updater) {
  // loop body
}
```
:::info
**Things to notice and be carefully with.**
- You **must** wrap the parameters in parentheses `( )`.
- parameters are optional in the `kwa` loop, but make sure you keep the two semicolons between them. `kwa(;;){}`
- `init` can only be an assignment statement eg. `a = 3` do not use `data a = 3`
- `condition` runs after every iteration, if true the loop iterates if false it stops
- it can be anything that resolves to true/false
- swazi supports two kinds of `updater` can only be `i++`/`i--` as increment/decrement.
- Invalid updater patterns like `i+=2` or `i=i+1` are not allowed if you want to use these you should omit the updater and use it inside the loop body as a statement.
eg.
```swazi
data i = 0; # init used outside here
kwa(;i < 10;) {
  
  i+=2  # step by two
}
```
:::




```swazi
kwa(x=0; x<10; x++):
    chapisha x
```
or with C-style braces:
```swazi
kwa(x=0; x<10; x++) {
    chapisha x
}
```

- **Parameters required in parentheses:**  
  - Start value: `x=0`
  - Condition: `x<10`
  - Increment/update: `x++`

**Single-line shorthand (C-style only):**
```swazi
kwa(x=0; x<5; x++) { chapisha "Hello, " + x }
```

**Invalid patterns:**
```swazi
kwa x=0; x<10; x++ {}         // ❌ Parameters not wrapped: Invalid!
kwa(x=0; x<10; x++): chapisha "Hello world"  // ❌ Pythonic single-line: Invalid!
```
**Always** use parentheses for parameters, and only use single-line shorthand with braces `{}`.

---

## 2. For-Each Loop (`kwa kila`)

When you want to loop through items in an array, or keys/values in an object, use `kwa kila`.

### **Array Iteration**
```swazi
data arr = [1, 2, 4, 10]

kwa kila value, index katika arr:
    chapisha value + ", index: " + index
```
- **`value`**: the current item
- **`index`**: optional; position in array (0, 1, 2...)

You can omit the index:
```swazi
kwa kila value katika arr {
    chapisha value
}
```

### **Object Iteration**
```swazi
data obj = { a: 4, b: 17, c: 21 }

kwa kila key, value katika obj:
    chapisha key + " => " + value
```
- For objects:
  - **`key`**: property name (required)
  - **`value`**: optional; property value

**Note:**  
- Object keys are **unordered**; don't expect a specific order.
- Array iteration uses values (with optional index), object iteration uses keys (with optional value).

---

## Important Note: Iterables in `kwa kila` Loops

- **Non-iterable values** like numbers cannot be used directly:
  ```swazi
  kwa kila value katika 9:
      // ❌ Invalid! 9 is not iterable
  ```

- To create a range for iteration, use the built-in function **`Orodha(n)`**:
  - `Orodha(n)` creates an array of `n` null values.
  - Now you can safely iterate:
  ```swazi
  kwa kila val, i katika Orodha(100):
      // val is always null
      // i (optional) is the position/index (0 to 99)
      chapisha "Current index: " + i
  ```

- This pattern is useful for running code a set number of times, or generating indices for further logic.

---

## Loop Controls: `simama` & `endelea`

SwaziLang supports loop control keywords:

- **`simama`** — "break" (stops the loop immediately)
- **`endelea`** — "continue" (skips to the next loop iteration)

### Example with `endelea` (continue):

```swazi
kwa(i=1; i<=10; i++):
    kama i == 2:
        endelea;

    kama i % 2 sawa 1 :
        chapisha i
```
- When `i == 2`, the loop skips the rest of the body and continues to next `i`.

### Example with `simama` (break):

```swazi
kwa kila val, i katika Orodha(100):
    kama i > 10:
        simama;
    chapisha i
```
- The loop stops entirely when `i > 10`.

---

## Practical Patterns

### Counting Loop
```swazi
kwa(i=1; i<=5; i++):
    chapisha "Count: " + i
```

### Looping Over an Array
```swazi
data colors = ["red", "green", "blue"]

kwa kila color katika colors:
    chapisha "Color: " + color
```

### Looping Over Object Properties
```swazi
data person = { name: "Amina", age: 22, city: "Dar" }

kwa kila key, value katika person:
    chapisha key + ": " + value
```

---

## Common Mistakes

- **Missing parentheses in normal kwa loop:**
  ```swazi
  kwa x=0; x<10; x++ {}     // ❌ Invalid!
  ```
- **Pythonic single-line for is not allowed:**
  ```swazi
  kwa(x=0; x<5; x++): chapisha "Hello"   // ❌ Invalid!
  ```
- **Confusing array/object kwa kila params:**
  - Array:  `kwa kila value, index katika arr { ... }`
  - Object: `kwa kila key, value katika obj { ... }`
- **Trying to use a number as an iterable:**
  ```swazi
  kwa kila val katika 5: ...   // ❌ Invalid!
  ```

---

## Summary Table

| Loop Type           | Syntax Example                        | Use Case                   |
|---------------------|---------------------------------------|----------------------------|
| Normal kwa loop     | `kwa(x=0; x<10; x++) { ... }`         | Counting, custom steps     |
| For-each kwa kila   | `kwa kila value katika arr { ... }`   | Loop through array values  |
| For-each kwa kila   | `kwa kila key, value katika obj { ... }`| Loop through object keys   |
| Range loop          | `kwa kila val, i katika Orodha(n) { ... }` | Loop n times (val is null) |
| Loop break/continue | `simama`, `endelea`                   | Control loop execution     |

---

## Practice Challenge

Write a loop to print all odd numbers from 1 to 10, skipping 2.

<details>
<summary>Solution</summary>

```swazi
kwa(i=1; i<=10; i++):
    kama i == 2:
        endelea;

    kama i % 2 sawa 1 :
        chapisha i
```
</details>

Write a loop to print indices 0 to 10 using `kwa kila` and `simama`.

<details>
<summary>Solution</summary>

```swazi
kwa kila val, i katika Orodha(100):
    kama i > 10:
        simama;
    chapisha i
```
</details>

---

**Remember:**  
- Always wrap normal kwa loop parameters in parentheses.
- Use kwa kila for arrays (values/index) or objects (key/value).
- Use `Orodha(n)` for range-style loops.
- Use `simama` and `endelea` for loop control.
- Prefer one block style per loop for clarity.