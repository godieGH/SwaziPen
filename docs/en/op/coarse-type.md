# Type Coercion and Truthy/Falsy Values in Swazilang

This document explains how Swazilang manages automatic type conversions—a process known as Type Coercion and defines the language's Truthy and Falsy values, which are critical for conditional logic. It also details the built-in functions for Explicit Type Conversion.

# Type Coercion (Implicit Conversion)
Type Coercion is the automatic, implicit conversion of a value from one data type to another that occurs during an operation. Swazilang frequently performs coercion to resolve expressions where operands have different types.

# How Coercion Works
Swazilang's interpreter handles coercion primarily in the context of operators (like +, -, comparison operators) and contextual assignments (like evaluating an expression in an if statement).
1. Coercion in Arithmetic and Concatenation (+ Operator)
When the addition operator (+) is used, Swazilang prioritizes string concatenation if any operand is a string.
 * If both operands are numbers (namba), standard numerical addition is performed.
 * If one or both operands are strings (neno), the non-string operand is coerced to a string, and the two strings are concatenated.

| Operation | Coercion Process | Result | Type of Result |
|-----------|------------------|--------|----------------|
| `"A" + 5` | 5 (namba) is coerced to the string "5" (neno). | "A5" | String (neno) |
| `10 + " apples"` | 10 (namba) is coerced to the string "10" (neno). | "10 apples" | String (neno) |
| `3 + 2` | No coercion needed. | 5 | Number (namba) |

2. Coercion in Comparison Operators (>, <, ==, etc.)
When using comparison operators, Swazilang attempts to coerce values to a consistent type for the comparison. The interpreter decides the target type based on the values being compared.
 * If comparing a number and a string containing a valid number, the string is typically coerced to a number for numerical comparison.
   * Example: 10 > "5" results in true.
 * The loose equality operator (==) is a common source of coercion, as it attempts to find a common type before comparing values. (It's generally recommended to use the strict equality operator === to avoid unexpected coercions, if available.)

🏗 Explicit Type Conversion
Swazilang provides built-in functions that allow developers to explicitly convert a value from one type to another. This is often necessary when you need guaranteed type behavior, especially with user input.
| Function | Purpose | Input Types | Notes on Behavior |
|----------|---------|-------------|-------------------|
| Neno(any) | Converts a value to a String (neno). | neno, namba, bool, null | Converting complex types like orodha (array), kazi (function), or object will not work, but will fail silently without throwing an error. |
| Namba(any) | Converts a value to a Number (namba). | All types. | If the value cannot be converted to a number (e.g., "hello"), it returns nan (Not a Number). Booleans (true/false) convert to 1/0. null converts to 0. |
| Bool(any) | Explicitly determines the Boolean (bool) equivalent of a value. | All types. | Returns true if the value is Truthy, and false if the value is Falsy. |


Examples of Explicit Conversion
```swazi
Neno(123)       // returns "123" (string)
Neno(kweli)      // returns "kweli" (string)

Namba("45.6")   // returns 45.6 (number)
Namba("hello")  // returns nan (number)
Namba(kweli)     // returns 1 (number)
Namba(null)     // returns 0 (number)

Bool(1)         // returns kweli (bool)
Bool(0)         // returns sikweli (bool)
Bool("A")       // returns kweli (bool)
Bool("")        // returns sikweli (bool)
```

## Truthy and Falsy Values

In Swazilang, every value has an inherent boolean context. When a non-boolean value is evaluated in a boolean context (such as an if statement or a while loop), it is converted to either true or false.

### Falsy Values

The following are the only values in Swazilang that coerce to false in a boolean context. These are known as Falsy values:

| Falsy Value | Type | Description |
|---|---|---|
| `null` | Null | The intentional absence of any object value. |
| `nan` | Number | Represents "Not a Number". |
| `0` | Number (namba) | The numerical value zero. |
| `""` | String (neno) | An empty string. |
| `[]` | Array (orodha) | An empty array. |
| `{}` | Object | An empty object. |
| `sikweli` | Boolean (bool) | The explicit boolean keyword for false. |

## Truthy Values

All other values in Swazilang are considered Truthy. When evaluated in a boolean context, they coerce to true.
This includes:
 * Any non-zero number (e.g., `1`, `-10`, `3.14`).
 * Any non-empty string (e.g., `"sikweli"`, `"0"`, `"hello"`).
 * Non-empty arrays or objects (e.g., `[1]`, `{ key: "value" }`).
 * The boolean keyword for `kweli`.

Example: Falsy Values in Conditional Logic
```swazi
data user_name = "Thandi"; // Truthy
data cart_items = [];      // Falsy (empty array)

kama user_name {
    // This block executes
    chapisha "Welcome back, Thandi!";
}

kama cart_items {
    // This block DOES NOT execute because [] is falsy
    chapisha "Your cart has items.";
} vinginevyo {
    // This block WILL execute
    chapisha "Your cart is empty.";
}
```
