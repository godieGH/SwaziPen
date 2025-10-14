# Swazi Lambda Functions

## What Are Lambda Functions?

**Lambdas** are quick, lightweight functions you can create without a full `kazi` declaration.  
They're perfect for short, one-off operations—especially as arguments to array methods, callbacks, and control flow utilities.

In SwaziLang, lambdas use the arrow syntax: `=>`.

---

## Lambda Syntax

- **Single parameter:** Parentheses are optional.
  ```swazi
  data double = x => x * 2
  chapisha double(5)      // 10
  ```
- **Multiple parameters:** Parentheses are **required**.
  ```swazi
  data sum = (a, b) => a + b
  chapisha sum(3, 4)      // 7
  ```
- **No parameters:** Use empty parentheses.
  ```swazi
  data sayHi = () => chapisha "Habari!"
  sayHi()                 // Habari!
  ```
- **Block body:** Use `{}` for multiple statements, must use `rudisha` for return value.
  ```swazi
  data add = (a, b) => {
      chapisha "Adding " + a + " and " + b
      rudisha a + b
  }
  chapisha add(2, 3)      // Adding 2 and 3 \n 5
  ```

---

## Key Differences from Regular Functions (`kazi`)

- **Definition:** Lambdas are expressions, not statements.
- **Placement:** You can declare lambdas inside variables, objects, pass them as arguments, etc.
- **Parameter Syntax:** Use parentheses for more than one parameter.
- **No `$` binding:** Lambdas do **not** have access to `$` (object context), even if defined inside objects.
- **No `tabia` keyword:** Only use arrow syntax for lambdas.

---

## Using Lambdas in Control Flow

Lambdas are especially useful for:

- **Array methods**
  ```swazi
  data nums = [1, 2, 3, 4]
  data evens = nums.chambua(x => x % 2 sawa 0)
  chapisha evens            // [2, 4]
  ```
- **Callbacks**
  ```swazi
  kazi doTwice fn, val {
      fn(val)
      fn(val)
  }
  doTwice(x => {chapisha x * 2}, 5) // 10 \n 10
  ```
- **Inline Conditionals**
  ```swazi
  data status = (score => score >= 50 ? "pass" : "fail")(60)
  chapisha status           // pass
  ```

---

## Lambdas in Objects

You can assign a lambda as a property in an object, but remember:  
**Lambdas do not have `$` bound to them.**

```swazi
data ob = {
    x: 5,
    show: () => {chapisha "Value: " + x}   // x here is NOT $.x!
}
ob.show()    // Error! x is undefined

// For object context, use tabia:
data ob2 = {
    x: 5,
    tabia show {
        chapisha "Value: " + $.x
    }
}
ob2.show()   // Value: 5
```

---

## Practical Patterns

### 1. Lambdas as Shortcuts

Quickly define a function for one-time use:
```swazi
chapisha(((a, b) => a * b)(4, 5))   // 20
```

### 2. Passing Lambdas to Methods

```swazi
data nums = [10, 15, 20]
data bigNums = nums.chambua(x => x > 12)
chapisha bigNums   // [15, 20]
```

### 3. Lambdas for Event-like Logic

```swazi
kazi triggerEvent cb {
    cb("Event occurred!")
}
triggerEvent(msg => {chapisha msg})   // Event occurred!
```

---

## Common Mistakes

- **Forgetting parentheses** for multiple parameters:
  ```swazi
  // ❌ Wrong:
  data sum = a, b => a + b
  // ✅ Correct:
  data sum = (a, b) => a + b
  ```
- **Trying to use `$` in a lambda:**  
  `$` is not available in lambdas. Use `tabia` for object context.

- **Using lambda as method and expecting `$`:**
  ```swazi
  data ob = { x: 10, f: () => $.x }
  chapisha ob.f() // Error!
  ```

---

## Summary Table

| Feature             | Lambda (`=>`)         | kazi Function         | tabia Method        |
|---------------------|-----------------------|----------------------|---------------------|
| Syntax              | `a => a + 1`          | `kazi add a {}`      | `tabia add x {}`    |
| Parentheses         | Req. if >1 param      | Never                | Allowed             |
| `$` (object access) | ❌ Not available      | ❌ Not available      | ✅ Available        |
| Placement           | Anywhere (expr)       | Top-level (stmt)     | Inside obj/class    |

---

## Practice Challenge

Write an array filter using a lambda to select items over 50.

<details>
<summary>Solution</summary>

```swazi
data scores = [45, 67, 88, 33]
data high = scores.chambua(x => x > 50)
chapisha high    // [67, 88]
```
</details>

---

**Next:** Learn about Swazi If...else Statements (`kama`, `vinginevyo`) and how they power decision-making in your code!