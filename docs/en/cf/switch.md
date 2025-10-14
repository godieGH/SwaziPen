# Swazi Switch Statements (`chagua`)

SwaziLang uses the keyword **`chagua`** ("choose/switch" in Swahili) for switch-case logic, allowing you to execute different code based on a value or condition.

Switch statements support two block styles:
- **C-style** (with `{ ... }`)
- **Pythonic style** (with `:` and indentation)

However, **you must use only one style per switch statement**.  
Mixing C-style and Pythonic cases in the same `chagua` will throw an error.

---

## Basic Syntax

### Pythonic Style

```swazi
chagua x:
    ikiwa 5:
        chapisha "It is five"
        simama;
    ikiwa 6:
        chapisha "it is 6"
        simama;
    kaida:
        chapisha "not 5 or 6"
        simama;
```

### C-Style

```swazi
chagua x {
    ikiwa 5 {
        chapisha "It is five"
        simama;
    }
    ikiwa 6 {
        chapisha "it is 6"
        simama;
    }
    kaida {
        chapisha "not 5 or 6"
        simama;
    }
}
```

- **`chagua`**: starts the switch, followed by the value/expression to match.
- **`ikiwa`**: "case" — each condition to test against.
- **`kaida`**: "default" — the fallback if no cases match.

---


:::warning
**Do NOT mix styles in the same switch statement!**



- You cannot use Pythonic style for some cases and C-style for others.
- The following will **throw an error**:
  ```swazi
  chagua x {
      ikiwa 5:
          chapisha "This will error!"
      ikiwa 6 {
          chapisha "This also errors!"
      }
      kaida:
          chapisha "This errors too!"
  }
  ```
- Choose **one style** for the whole switch statement (except for `fanya` blocks in the body—they can use either style).

**Always use either all Pythonic (`:` + indentation) or all C-style (`{}`) blocks in a single switch.**
:::

---

## Using `fanya` Blocks in Switch Statements

`fanya` blocks can be used inside any case (regardless of switch style) to group statements or scope variables.

```swazi
chagua x {
    ikiwa 5 {
        fanya :
            chapisha "Scoped"
            simama;
        // simama; # but only use one simama per case
    }
    ikiwa 7 {
        fanya {
            chapisha "Also scoped"
        }
        simama;
    }
    kaida {
        chapisha "Default"
        simama;
    }
}
```

---

## How It Works

- The switch value (`chagua x`) is compared to each `ikiwa`.
- If a match is found, that block runs.
- `simama` breaks out of the switch after a case runs—recommended to avoid falling through.
- If no cases match, the `kaida` (default) block runs.

---

## Practical Patterns

### Simple Switch (Pythonic style)

```swazi
data color = "red"
chagua color:
    ikiwa "red":
        chapisha "Red selected"
        simama;
    ikiwa "blue":
        chapisha "Blue selected"
        simama;
    kaida:
        chapisha "Unknown color"
        simama;
```

### Switch with Expressions (C-style)

```swazi
data age = 20
chagua kweli {
    ikiwa age < 18 {
        chapisha "Young"
        simama;
    }
    ikiwa age >= 18 && age < 40 {
        chapisha "intermidiate"
        simama;
    }
    ikiwa age >= 40 {
        chapisha "Old"
        simama;
    }
    kaida {
        chapisha "wrong age range"
        simama;
    }
}
```

---

## Common Mistakes

- **Mixing block styles in a switch:**  
  This throws an error! Always use one style per switch.
- **Forgetting `simama`:**  
  Without `simama`, code may fall through to other cases—always use it to break out.
- **Multiple `simama` in one case:**  
  Only one `simama` per case is recommended.

---

## Practice Challenge

Write a switch statement that prints "Weekend", "Weekday", or "Invalid day" based on a variable, using **one style only**.

<details>
<summary>Solution</summary>

```swazi
data day = "Saturday"
chagua day:
    ikiwa "Saturday":
        chapisha "Weekend"
        simama;
    ikiwa "Sunday":
        chapisha "Weekend"
        simama;
    ikiwa "Monday":
        chapisha "Weekday"
        simama;
    ikiwa "Tuesday":
        chapisha "Weekday"
        simama;
    ikiwa "Wednesday":
        chapisha "Weekday"
        simama;
    ikiwa "Thursday":
        chapisha "Weekday"
        simama;
    ikiwa "Friday":
        chapisha "Weekday"
        simama;
    kaida:
        chapisha "Invalid day"
        simama;
```
</details>

---

**Summary:**  
- Use `chagua` for switch statements, `ikiwa` for cases, and `kaida` for default.
- Pick one style (C-style or Pythonic style) for all cases in a switch.
- You can use `fanya` blocks inside case bodies, with either block style.
- Always use `simama` to break out of cases.