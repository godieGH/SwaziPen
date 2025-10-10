# Arithmetic Operations in SwaziLang

## What Are Operations?

Before we dive in, let me ask you: What happens when you add 5 and 3 together? You get 8, right?

That process - taking values and doing something with them to get a result - is what we call an **operation**.

In programming, arithmetic operations let you perform mathematical calculations on numbers. You've actually used these already without even thinking about it!

Remember when you did `bei_asili.kwaKiwango(1.5)` to increase a price by 50%? That involved multiplication underneath!

## The Basic Arithmetic Operators

SwaziLang gives you tools to do math just like a calculator. Let me show you all of them:

### The Arithmetic Operators Table

| Operator | Name | What It Does | Example | Result |
|----------|------|--------------|---------|--------|
| `+` | Addition | Adds two numbers together | `10 + 5` | `15` |
| `-` | Subtraction | Subtracts the second number from the first | `10 - 5` | `5` |
| `*` | Multiplication | Multiplies two numbers | `10 * 5` | `50` |
| `/` | Division | Divides the first number by the second | `10 / 5` | `2` |
| `%` | Modulo/Remainder | Gives the remainder after division | `10 % 3` | `1` |
| `**` | Exponentiation/Power | Raises the first number to the power of the second | `2 ** 3` | `8` |

Let's explore each one in detail.

## Addition (`+`)

Combines two numbers:

```swazi
data a = 10;
data b = 5;
data jumla = a + b;

chapisha jumla;  // Prints: 15
```

**You already know this adds numbers, but here's something interesting:** What happens when you add to a string?

```swazi
data text = "Hello";
data more = text + " World";

chapisha more;  // Prints: Hello World
```

Notice something? When you `+` with strings, it concatenates (joins) them instead of adding mathematically!

### Practice Question

What do you think happens here?

```swazi
data x = "10";
data y = 5;
chapisha x + y;  // What will this print?
```

Think before looking at the answer...

<details>
<summary>Check your thinking</summary>

This prints: `105` (as text)

Why? Because `x` is a string, so the `+` operator treats this as string concatenation, not math. The number `5` gets converted to text `"5"`, and they join together.

If you wanted math:
```swazi
data x = Namba("10");
data y = 5;
chapisha x + y;  // 15 (actual math)
```

</details>

## Subtraction (`-`)

Removes one number from another:

```swazi
data akaunti = 1000;
data gharama = 250;
data balanse = akaunti - gharama;

chapisha balanse;  // Prints: 750
```

**With negative numbers:**

```swazi
data x = 5;
data y = 10;
data result = x - y;

chapisha result;  // Prints: -5
```

**Your Turn:** What will this print?

```swazi
data a = -10;
data b = -3;
chapisha a - b;  // ?
```

<details>
<summary>Work it through</summary>

This prints: `-7`

Because: -10 - (-3) = -10 + 3 = -7

Wait, that doesn't look right. Let me recalculate:
-10 - 3 = -13

Actually, I need to be careful here. In the code `a - b` where a = -10 and b = -3:
-10 - (-3) = -10 + 3 = -7

So the answer is `-7`.

</details>

## Multiplication (`*`)

Repeats a number a certain number of times:

```swazi
data idadi = 5;
data bei_kwa_kila = 20;
data jumla = idadi * bei_kwa_kila;

chapisha jumla;  // Prints: 100
```

**Real-world:** If you buy 5 items at 20 shilingi each, you pay 100 shilingi.

**Quick question:** What's the result of `5 * 0`?

```swazi
chapisha 5 * 0;  // ?
```

<details>
<summary>Think about it</summary>

`0` - anything multiplied by zero is zero. This is a fundamental rule of math!

</details>

## Division (`/`)

Splits a number into equal parts:

```swazi
data piza = 8;
data wageni = 4;
data kwa_kila_mtu = piza / wageni;

chapisha kwa_kila_mtu;  // Prints: 2
```

**With decimals:**

```swazi
data namba = 10;
data kigazi = 3;
data matokeo = namba / kigazi;

chapisha matokeo;  // Prints: 3.333...
```

### Important: Division by Zero

Remember when we learned about special number values like `Infinity`?

```swazi
data x = 10 / 0;

chapisha x;  // Prints: Infinity
```

SwaziLang doesn't crash - it gives you `Infinity` as the result!

**Your Challenge:** What happens with this?

```swazi
data zero = 0;
data result = zero / zero;

chapisha result;  // ?
```

<details>
<summary>Think it through</summary>

This prints: `NaN` (Not a Number)

Why? Because 0/0 is mathematically undefined - there's no good answer for it. So SwaziLang represents it as NaN.

</details>

## Modulo (`%`) - The Remainder Operator

This gives you what's LEFT OVER after division:

```swazi
data sweets = 10;
data children = 3;
data leftover = sweets % children;

chapisha leftover;  // Prints: 1
```

**Why?** 10 ÷ 3 = 3 remainder 1 (because 3 × 3 = 9, leaving 1)

### Real-World Uses

**Checking if a number is even or odd:**

```swazi
data namba = 7;
data ni_witiri = namba % 2;  // If odd, remainder is 1

chapisha ni_witiri;  // Prints: 1 (so it's odd)
```

Odd numbers always have remainder 1 when divided by 2!
Even numbers always have remainder 0!

**Cycling through values:**

```swazi
data position = 5;
data max_positions = 3;
data actual_position = position % max_positions;

chapisha actual_position;  // Prints: 2 (wraps around)
```

**Your Turn:** What's the result of these?

```swazi
chapisha 10 % 2;   // ?
chapisha 10 % 3;   // ?
chapisha 10 % 4;   // ?
```

<details>
<summary>Check yourself</summary>

- `10 % 2` = 0 (10 ÷ 2 = 5 remainder 0, so 10 is even)
- `10 % 3` = 1 (10 ÷ 3 = 3 remainder 1)
- `10 % 4` = 2 (10 ÷ 4 = 2 remainder 2)

</details>

## Exponentiation (`**`) - Power/Raising to a Power

Multiplies a number by itself a certain number of times:

```swazi
data base = 2;
data power = 3;
data result = base ** power;

chapisha result;  // Prints: 8 (because 2 × 2 × 2 = 8)
```

**Also written as:** 2³ = 8

**Another way to think about it:** You've seen this method before!

```swazi
data x = 2;
chapisha x.kipeo(3);   // Also prints: 8

// These are the same:
chapisha 2 ** 3;       // 8
chapisha 2.kipeo(3);   // 8
```

**Special cases:**

```swazi
chapisha 5 ** 0;   // Prints: 1 (anything to power 0 is 1)
chapisha 5 ** 1;   // Prints: 5 (anything to power 1 is itself)
chapisha 2 ** -1;  // Prints: 0.5 (negative power = fraction)
```

**Question:** What's `2 ** 10`?

<details>
<summary>Calculate it</summary>

2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 1024

</details>

## Order of Operations (BODMAS/PEMDAS)

When you have multiple operations, which one happens first?

```swazi
data result = 2 + 3 * 4;

chapisha result;  // What do you think? 20 or 14?
```

<details>
<summary>Think about it before checking</summary>

The answer is `14`, not 20.

Why? Because multiplication happens BEFORE addition!

- First: 3 * 4 = 12
- Then: 2 + 12 = 14

This follows the standard order: Exponents, then Multiplication/Division (left to right), then Addition/Subtraction (left to right).

</details>

**To force a different order, use parentheses:**

```swazi
data result1 = 2 + 3 * 4;      // 14 (multiply first)
data result2 = (2 + 3) * 4;    // 20 (add first)

chapisha result1;  // 14
chapisha result2;  // 20
```

**Rule of thumb:** When in doubt, use parentheses to make your intention clear!

```swazi
// Better to write:
data result = (2 + 3) * 4;

// Than rely on remembering order of operations
```

### Order of Operations Table

| Rank | Operations | Direction |
|------|-----------|-----------|
| 1 | `**` (Exponentiation) | Right to left |
| 2 | `*`, `/`, `%` (Multiply, Divide, Modulo) | Left to right |
| 3 | `+`, `-` (Add, Subtract) | Left to right |

## Practical Examples

### Example 1: Calculate Total Cost with Tax

```swazi
data bei = 1000;
data kiwango_cha_kodi = 0.16;  // 16% tax

data kodi = bei * kiwango_cha_kodi;
data jumla = bei + kodi;

chapisha `Bei asili: ${bei}`;
chapisha `Kodi: ${kodi}`;
chapisha `Jumla: ${jumla}`;
```

### Example 2: Calculate Average

```swazi
data alama1 = 85;
data alama2 = 90;
data alama3 = 78;

data wastani = (alama1 + alama2 + alama3) / 3;

chapisha `Wastani: ${wastani.kadiriaKwa(1)}`;
```

### Example 3: Convert Minutes to Hours and Minutes

```swazi
data jumla_dakika = 125;

data saa = jumla_dakika / 60;        // How many hours?
data saa_kamili = saa.kadiriachini(); // Hours without decimals
data dakika_zilizobaki = jumla_dakika % 60;  // Leftover minutes

chapisha `${jumla_dakika} dakika = ${saa_kamili} saa na ${dakika_zilizobaki} dakika`;
// Prints: 125 dakika = 2 saa na 5 dakika
```

### Example 4: Simple Interest Calculation

```swazi
data kiasi = 10000;      // Principal amount
data kiwango = 0.05;     // 5% interest rate per year
data miezi = 6;          // Months

// Simple interest = Principal × Rate × Time
data riba = kiasi * kiwango * (miezi / 12);
data jumla = kiasi + riba;

chapisha `Kiasi asili: ${kiasi}`;
chapisha `Riba: ${riba.kadiriaKwa(2)}`;
chapisha `Jumla baada ya ${miezi} miezi: ${jumla.kadiriaKwa(2)}`;
```

## Practice Challenges

### Challenge 1: Calculate Area of a Rectangle

Given length = 8 and width = 5, calculate the area.

<details>
<summary>Think about the formula</summary>

Area = length × width

```swazi
data length = 8;
data width = 5;
data area = length * width;
chapisha area;  // 40
```

</details>

### Challenge 2: Calculate Circumference of a Circle

Given radius = 7, calculate the circumference (hint: 2πr)

<details>
<summary>Remember the formula</summary>

```swazi
data thabiti PI = 3.14159;
data radius = 7;
data circumference = 2 * PI * radius;
chapisha circumference.kadiriaKwa(2);
```

</details>

### Challenge 3: Find Remainder

What's the remainder when 47 is divided by 5?

<details>
<summary>Use the modulo operator</summary>

```swazi
chapisha 47 % 5;  // 2
```

Because 47 ÷ 5 = 9 remainder 2

</details>

### Challenge 4: Complex Calculation

Calculate: (10 + 5) × 2 - 8 ÷ 2

Work it out step by step!

<details>
<summary>Step by step</summary>

1. (10 + 5) = 15
2. 15 × 2 = 30
3. 8 ÷ 2 = 4
4. 30 - 4 = 26

```swazi
data result = (10 + 5) * 2 - 8 / 2;
chapisha result;  // 26
```

</details>

## Common Patterns

### Pattern 1: Increment and Decrement

```swazi
data counter = 5;

counter = counter + 1;   // Increment by 1
chapisha counter;        // 6

counter = counter - 1;   // Decrement by 1
chapisha counter;        // 5
```

### Pattern 2: Running Total

```swazi
data total = 0;

total = total + 100;     // Add purchase
total = total + 50;      // Add another purchase
total = total - 25;      // Remove return

chapisha total;          // 125
```

### Pattern 3: Percentage Calculation

```swazi
data bei = 1000;
data asilimia = 20;

data kiasi = (bei * asilimia) / 100;
chapisha kiasi;  // 200 (20% of 1000)
```

## Important Notes

### 1. Integer vs Decimal Division

```swazi
chapisha 10 / 4;      // 2.5 (decimal result)
chapisha 10 / 4.0;    // 2.5 (same)
chapisha 10 / 4;      // 2.5 (SwaziLang always gives decimals)
```

### 2. Type Conversion in Operations

```swazi
data namba = 5;
data neno = "10";

// This converts the string to a number first
data sum = namba + Namba(neno);
chapisha sum;  // 15

// Without conversion, it concatenates:
data concat = namba + neno;  // "510"
```

### 3. Using Variables in Calculations

```swazi
data x = 10;
data y = 3;

// All of these work:
chapisha x + y;
chapisha x - y;
chapisha x * y;
chapisha x / y;
chapisha x % y;
chapisha x ** y;
```

## Quick Reference

**When to use each operator:**

| Use | Operator | Example |
|-----|----------|---------|
| **Add values together** | `+` | `10 + 5` |
| **Subtract one from another** | `-` | `10 - 5` |
| **Multiply/Repeat** | `*` | `5 * 20` |
| **Divide/Split equally** | `/` | `100 / 5` |
| **Find remainder** | `%` | `10 % 3` |
| **Raise to power** | `**` | `2 ** 8` |

## Reflection Questions

1. **When would you use the modulo operator (`%`) in a real program?**

2. **Why do you think multiplication happens before addition?** (Hint: think about what 2 + 3 × 4 should mean)

3. **How would you check if a number is divisible by another number?** (Hint: think about remainders)

<details>
<summary>Some thoughts</summary>

1. Modulo is useful for: finding even/odd numbers, cycling through positions, extracting digits, checking divisibility

2. Because mathematically, multiplication is "stronger" than addition. Think of it as grouping: 2 + (3 × 4) makes more sense than (2 + 3) × 4 in most contexts

3. If `a % b` equals 0, then a is divisible by b! For example, `20 % 5 == 0` means 20 is divisible by 5

</details>

## What's Next?

You now understand how to perform mathematical operations! Next, we'll explore:
- **Assignment Operators** - Shortcuts for updating variables
- **Comparison Operators** - How to compare values
- **Logical Operators** - How to combine conditions
- **Identity Operators** - Checking specific relationships
- **Ternary Operators** - Quick decision making

---

**Remember:** Arithmetic operations are the foundation of computation. Master them, and you can build almost any calculation!