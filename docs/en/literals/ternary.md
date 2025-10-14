# Swazi Ternary Expressions

SwaziLang supports **ternary expressions** for quick, inline conditional value assignment.  
Ternary expressions are a concise way to choose between two values based on a condition—similar to the `kama...vinginavyo` statement, but written in a single line.

---

## Basic Syntax

```swazi
data x = cond ? s1 : s2;
```

- **`cond`**: The condition to check (must be an expression that evaluates to `kweli` or `sikweli`)
- **`s1`**: The value if the condition is true (`kweli`)
- **`s2`**: The value if the condition is false (`sikweli`)

**Example:**
```swazi
data score = 75
data result = score >= 50 ? "pass" : "fail"
chapisha result     // pass
```

---

## Chaining Ternary Expressions

You can nest or chain ternaries to test multiple conditions in a compact way.

```swazi
data x = cond1 ? (cond2 ? s1 : s2) : s3
```

**Example:**
```swazi
data age = 17
data status = age < 13 ? "child" : (age < 18 ? "teen" : "adult")
chapisha status     // teen
```

Or, using more conditions:

```swazi
data temp = 37
data label = temp < 0 ? "freezing" : (temp < 20 ? "cold" : (temp < 30 ? "warm" : "hot"))
chapisha label     // hot
```

---

## How Ternary Works

- The condition before `?` is evaluated first.
- If it is `kweli` (true), the expression after `?` and before `:` is used.
- If it is `sikweli` (false), the expression after `:` is used.
- You can assign the result to a variable or use it directly in other expressions.

---

## Use Cases

- **Quick Value Assignment**
  ```swazi
  data color = isDark ? "black" : "white"
  ```
- **Shorten kama...vinginavyo Logic**
  ```swazi
  data msg = loggedIn ? "Welcome!" : "Please log in."
  ```
- **Function Return Values**
  ```swazi
  kazi grade score {
      rudisha score >= 50 ? "pass" : "fail"
  }
  ```
- **Inline Expressions in Methods**
  ```swazi
  data person = {
      age: 20,
      tabia thabiti status {
          rudisha $.age < 18 ? "minor" : "adult"
      }
  }
  chapisha person.status    // adult
  ```

---

## Chaining vs. Readability

Chaining ternaries is powerful, but can get hard to read with many conditions.  
For complex logic, prefer `kama...vinginavyo` statements for clarity.

- **Good for 2-3 conditions**
- **Avoid excessive nesting**

---

## Practical Challenge

Write a ternary expression to assign "even" or "odd" to a variable based on whether a number is even.

<details>
<summary>Solution</summary>

```swazi
data n = 7
data type = n % 2 sawa 0 ? "even" : "odd"
chapisha type    // odd
```
</details>

---

**Summary:**  
- Use ternary expressions for quick, inline conditional value assignment.
- Syntax: `cond ? valueIfTrue : valueIfFalse`
- Nest ternaries for multiple conditions, but keep code readable!