# Swazi Template Literals

SwaziLang supports **template literals** for easy string formatting and interpolation.  
Template literals let you embed variables and expressions directly inside strings using backticks (`` ` ``) and `${ ... }` syntax.

---

## Basic Syntax

```swazi
data age = 25
data msg = `I am ${age} years old`
chapisha msg    // I am 25 years old
```

- Use backticks `` `...` `` to define a template literal.
- Wrap expressions or variables in `${ ... }` to interpolate their values into the string.

---

## Embedding Expressions

You can insert any valid expression inside `${ ... }`:

```swazi
data a = 5
data b = 10
data result = `Sum is ${a + b}`
chapisha result    // Sum is 15
```

```swazi
data name = "Amina"
data score = 82
data status = score >= 50 ? "pass" : "fail"
data message = `${name} scored ${score} and is a ${status}`
chapisha message   // Amina scored 82 and is a pass
```

---

## Multiline Strings

Template literals can span multiple lines:

```swazi
data info = `Name: ${name}
Score: ${score}
Status: ${status}`
chapisha info
```

Output:
```
Name: Amina
Score: 82
Status: pass
```

---

## Use Cases

- **Variable interpolation:** Easily insert values into text.
- **Dynamic strings:** Build messages with expressions and logic.
- **Multiline formatting:** Create readable, multi-line outputs.

**Examples:**

```swazi
data user = "David"
data age = 30
chapisha `User ${user} is ${age} years old.`

data x = 8
chapisha `Double of ${x} is ${x * 2}`
```

---

## Common Mistakes

- **Forgetting backticks:**  
  Only backticks `` `...` `` allow interpolation. Single or double quotes do not:
  ```swazi
  data wrong = "Value is ${x}"    // ❌ Does NOT interpolate
  ```

- **Incorrect syntax inside `${ ... }`:**  
  Only valid SwaziLang expressions are allowed.

---

## Practice Challenge

Write a template literal that prints "Hello, [name]! You have [count] new messages."

<details>
<summary>Solution</summary>

```swazi
data name = "Amina"
data count = 5
chapisha `Hello, ${name}! You have ${count} new messages.`
```
</details>

---

**Summary:**  
- Use backticks for template literals.
- Interpolate variables and expressions with `${ ... }`.
- Template literals make string formatting in SwaziLang simple and readable!