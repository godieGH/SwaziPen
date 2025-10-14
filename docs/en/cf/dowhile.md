# Swazi Do-While (`fanya-wakati`) Loop

SwaziLang introduces a flexible **do-while loop** using the keywords `fanya` (do) and `wakati` (while).  
This loop is unique because it **always executes at least once**, then checks the condition to see if it should continue.

---

## Syntax

### C-Style Block

```swazi
fanya {
    // body
} wakati cond
```

### Pythonic Style

```swazi
fanya :
    // body
wakati cond
```

- The loop body runs **once before checking `cond`**.
- If `cond` is true, the loop runs again; if false, it stops.

---

## Loop Controls: `simama` & `endelea`

You can use `simama` (break) and `endelea` (continue) inside a `fanya-wakati` loop, just like in other SwaziLang loops.

**Example:**

```swazi
data x = 0
fanya {
    kama x == 5:
        simama;
    kama x % 2 sawa 0:
        endelea;
    chapisha x
    x++
} wakati x < 10
```
- Skips even values, prints odd values, stops when `x == 5`.

---

## How Is `fanya-wakati` Different from `wakati`?

- `fanya-wakati` always runs **at least once** (body runs, then condition checked).
- `wakati` loops may **never run** if the condition is false from the start.

**Comparison Example:**

```swazi
data y = 10

// wakati loop (may not run)
wakati y < 10 {
    chapisha "Never runs; y is already 10"
}

// fanya-wakati loop (runs once, then checks condition)
fanya {
    chapisha "Runs at least once"
    y++
} wakati y < 10
```

---

## Fanya as a Block (Not a Loop)

If you use `fanya` **without** `wakati`, it's just a block—**not a loop**.

```swazi
fanya {
    chapisha "This executes once"
    data temp = 5
}
// Only runs once, like `{}` in C++ or a local scope block.
```

- Variables declared inside a `fanya` block are *scoped* to that block.
- Useful for grouping statements and controlling variable scope.

### Use in Functions, Objects, Lambdas

You can use `fanya` blocks anywhere:
```swazi
kazi greet:
    fanya:
        chapisha "Hello world"

    fanya {
        data x = 2
        chapisha x
    }
```

---

## Fanya in Switch Statements

`fanya` blocks are often used to group code in switch cases (see switch documentation later).  
They help scope variables and ensure code clarity inside complex statements.

---

## Advanced Sample: Nested Fanya Blocks

You can nest `fanya` blocks for more granular scope and control:

```swazi
data x = 0
fanya {
    fanya {
        kama x == 5:
            simama;
    }
    x++
} wakati x < 10
```
- The inner `fanya` block scopes its own variables and logic.

---

## Common Mistakes

- **Assuming `fanya` is always a loop:**  
  Only when followed by `wakati` is it a loop.
- **Trying to assign the result of a `fanya` block:**  
  `fanya` is a statement, not an expression; it cannot be assigned to a variable.
- **Forgetting about scope:**  
  Variables declared in `fanya` blocks cannot be accessed outside that block.

---

## Practice Challenge

Write a loop that prints "Hello" three times using `fanya-wakati`, regardless of the starting condition.

<details>
<summary>Solution</summary>

```swazi
data i = 0
fanya {
    chapisha "Hello"
    i++
} wakati i < 3
```
</details>

---

**Summary:**  
- Use `fanya { ... } wakati cond` or `fanya : ... wakati cond` for do-while loops.
- Body always runs once before checking the condition.
- Use `simama` and `endelea` for loop control.
- Use `fanya` as a block for local scope anywhere in your code.