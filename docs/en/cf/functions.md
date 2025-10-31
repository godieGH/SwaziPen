# Swazi Functions in Control Flow

## Quick Recap: Functions (`kazi`)

Functions ("kazi") are the foundation of reusable code in SwaziLang. You already know how to define and use them, but let's quickly recall why they're so important for control flow:

- **Encapsulation:** Functions let you group related logic, making code easier to read and manage.
- **Decision Making:** You can use functions to wrap conditional logic (`kama`/`vinginevyo`), so decisions are reusable.
- **Loop Helpers:** Functions often power loops, letting you process arrays and collections efficiently.

---

## Functions in Control Flow

### 1. Using Functions in Conditions

You can call a function inside any SwaziLang conditional (`kama`, `vinginevyo kama`, `vinginevyo`):

```swazi
kazi isAdult age {
    rudisha age >= 18;
}

data userAge = 20;

kama isAdult(userAge) {
    chapisha "User is an adult";
} vinginevyo {
    chapisha "User is not an adult";
}
```

---

### 2. Early Returns to Control Flow

Inside a function, you can use `rudisha` to exit early if a condition is met:

```swazi
kazi processData value {
    kama value sawa null {
        chapisha "No value provided!";
        rudisha null;
    }
    chapisha "Processing: " + value;
}
```

---

### 3. Functions as Loop Helpers

Many loops are powered by functions—especially when processing arrays:

```swazi
kazi printItem fruit {
    chapisha "fruit: " + fruit;
}

data fruits = ["apple", "banana", "orange"];

kwa kila fruit katika fruits:
    printItem(fruit)
```

---

### 4. Returning Values to Drive Control Flow

The result of a function can be used to *decide* what happens next:

```swazi
kazi scoreStatus score {
    kama score >= 50 {
        rudisha "pass";
    }
    rudisha "fail";
}

data result = scoreStatus(75);

kama result sawa "pass" {
    chapisha "Congratulations!";
} vinginevyo {
    chapisha "Try again!";
}
```

---

## Block Styles Reminder

SwaziLang lets you use **C-style** (`{}`) or **Pythonic style** (`:` and indentation) for function bodies and control blocks.  
Pick the style that suits you, but keep indentation correct for Pythonic blocks!

```swazi
kazi greet name {
    chapisha "Hello, " + name;
}
// or
kazi greet name :
    chapisha "Hello, " + name
```

---

## Practice Challenge

Write a function that checks if a number is even, then use it in a conditional.

<details>
<summary>Solution</summary>

```swazi
kazi isEven n {
    rudisha n % 2 sawa 0;
}

data num = 7;

kama isEven(num) {
    chapisha "Even";
} vinginevyo {
    chapisha "Odd";
}
```
</details>

---

## Function Parameters

- **kazi functions**  
  - **Define** parameters without parentheses.
    ```swazi
    kazi add a, b {
        rudisha a + b;
    }
    ```
  - **Call** with parentheses:
    ```swazi
    add(5, 6)
    ```
:::info
As per version `2.3.0+` you can wrap parameters in `kazi` statements with parentheses.
::: 



- **Lambda functions**
  - **One parameter:** No parentheses needed.
    ```swazi
    data double = x => x * 2
    ```
  - **More than one:** Parentheses required.
    ```swazi
    data sum = (a, b) => a + b
    ```

- **tabia methods (in objects/classes)**
  - Parentheses for parameters are **allowed**.
    ```swazi
    tabia add(a, b) { ... }
    tabia show() { ... }
    ```
  - Or without parentheses:
    ```swazi
    tabia print x, y { ... }
    ```

## Null Value

- SwaziLang uses `null` for "no value"/empty/nothing.
---

**Summary:**  
- Define `kazi` parameters without parentheses.  
- Use parentheses for lambda with multiple params, and for `tabia` if you wish.  
- Always use `null` for empty values.



## Summary

- SwaziLang functions (`kazi`) are essential for organizing control flow.
- Use them inside conditions and loops to make code reusable and clean.
- Return values from functions to help guide your program's decisions.
- Mix and match block styles, but keep them consistent!

**Next:** Dive deeper into Swazi lambda functions for powerful, flexible control flow!