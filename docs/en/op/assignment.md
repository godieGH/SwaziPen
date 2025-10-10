# Assignment Operators in SwaziLang

## What's an Assignment Operator?

You already know the basic assignment operator - the `=` sign:

```swazi
data x = 10;
```

This takes the value on the right (10) and puts it into the variable on the left (x).

But what if I told you there are ways to assign values AND perform operations at the same time? That would save you typing, wouldn't it?

**Think about this:** If you have a bank account with 1000 shilingi and you want to add 500 more, you could write:

```swazi
data akaunti = 1000;
akaunti = akaunti + 500;

chapisha akaunti;  // 1500
```

It works, but you're typing "akaunti" twice on the same line. What if there was a shorter way?

There is! **Assignment operators** combine an operation with assignment in one go.

## The Assignment Operators Table

Here's the complete set:

| Operator | What It Does | Example | Equivalent To |
|----------|--------------|---------|---------------|
| `=` | Basic assignment | `x = 5` | Assigns 5 to x |
| `+=` | Add and assign | `x += 3` | `x = x + 3` |
| `-=` | Subtract and assign | `x -= 3` | `x = x - 3` |
| `*=` | Multiply and assign | `x *= 3` | `x = x * 3` |
| `/=` | Divide and assign | `x /= 3` | `x = x / 3` |
| `%=` | Modulo and assign | `x %= 3` | `x = x % 3` |
| `**=` | Power and assign | `x **= 3` | `x = x ** 3` |

:::warning
The `/=`, `%=` and `**=` may not be available in the current interpreter but it will be supported soon. 
:::


## Addition Assignment (`+=`)

Adds a value to the current value:

```swazi
data alama = 50;
alama += 10;

chapisha alama;  // 60
```

**What just happened?** The `+=` operator:
1. Took the current value of `alama` (50)
2. Added 10 to it
3. Stored the result (60) back into `alama`

**Without the shortcut:**
```swazi
data alama = 50;
alama = alama + 10;  // Same result, but more typing
chapisha alama;      // 60
```

### Real-World Example

```swazi
data akaunti = 1000;

// Deposit 500
akaunti += 500;
chapisha akaunti;  // 1500

// Deposit 200 more
akaunti += 200;
chapisha akaunti;  // 1700
```

## Subtraction Assignment (`-=`)

Subtracts a value from the current value:

```swazi
data akaunti = 1000;
akaunti -= 250;

chapisha akaunti;  // 750
```

### Real-World Example

```swazi
data karata = 100;

// Spend 30
karata -= 30;
chapisha karata;  // 70

// Spend 15 more
karata -= 15;
chapisha karata;  // 55
```

## Multiplication Assignment (`*=`)

Multiplies the current value:

```swazi
data idadi = 5;
idadi *= 2;

chapisha idadi;  // 10 (5 × 2)
```

### Real-World Example: Scaling Values

```swazi
data width = 100;   // Original width in pixels

// Double the width
width *= 2;
chapisha width;     // 200

// Double again
width *= 2;
chapisha width;     // 400
```

## Division Assignment (`/=`)

Divides the current value:

```swazi
data namba = 100;
namba /= 4;

chapisha namba;  // 25 (100 ÷ 4)
```

### Real-World Example: Splitting Costs

```swazi
data jumla = 3000;  // Total bill

// Split among 3 people
jumla /= 3;
chapisha jumla;  // 1000 each
```

## Modulo Assignment (`%=`)

Takes the remainder and assigns it:

```swazi
data namba = 17;
namba %= 5;

chapisha namba;  // 2 (remainder when 17 is divided by 5)
```

This one is less common, but useful when you need to cycle or wrap values.

## Power Assignment (`**=`)

Raises to a power and assigns:

```swazi
data namba = 2;
namba **= 3;

chapisha namba;  // 8 (2³ = 2 × 2 × 2)
```

### Real-World Example: Compound Growth

```swazi
data idadi = 100;   // Starting population

// Doubles each generation
idadi **= 2;  // Wait, that's not quite right for compound growth...

// Actually, for compound growth you'd use:
idadi *= 2;   // Population doubles
```

## The Shortcut Operators: `++` and `--`

These are super handy for adding or subtracting exactly 1:

### Increment (`++`)

Adds 1 to a value:

```swazi
data counter = 0;
counter++;

chapisha counter;  // 1
```

**Instead of:**
```swazi
counter = counter + 1;
// or
counter += 1;
```

### Decrement (`--`)

Subtracts 1 from a value:

```swazi
data countdown = 5;
countdown--;

chapisha countdown;  // 4
```

### When to Use Them

Use `++` and `--` when you're adding or subtracting exactly 1. For anything else, use the longer operators:

```swazi
// Use ++ or --
data score = 0;
score++;      // 1 - clear and concise

// Use += or -=
data score = 0;
score += 5;   // Adding 5 - clearer than +++++
```

## Why Use Assignment Operators?

Let's think about the benefits:

### 1. Less Typing

```swazi
// Without assignment operator
data balance = 1000;
balance = balance + 500;
balance = balance + 250;
balance = balance - 100;

// With assignment operators
data balance = 1000;
balance += 500;
balance += 250;
balance -= 100;
```

Which is easier to read?

### 2. Clearer Intent

```swazi
// What's happening here?
balance = balance + 100;

// Much clearer
balance += 100;  // "Add 100 to balance"
```

### 3. Fewer Mistakes

When you use `x = x + 5`, it's easy to accidentally type `x = y + 5` and break your code. With `x += 5`, there's less chance of error.

## Practical Examples

### Example 1: Bank Account Operations

```swazi
data akaunti = 5000;

// Deposit salary
akaunti += 2000;
chapisha `Baada ya malipo: ${akaunti}`;  // 7000

// Pay rent
akaunti -= 1500;
chapisha `Baada ya kodi: ${akaunti}`;    // 5500

// Pay utilities
akaunti -= 300;
chapisha `Baada ya huduma: ${akaunti}`;  // 5200

// Interest (5%)
akaunti *= 1.05;
chapisha `Baada ya riba: ${akaunti.kadiriaKwa(2)}`;  // 5460
```

### Example 2: Game Score

```swazi
data score = 0;

// Player scores 10 points
score += 10;
chapisha `Score: ${score}`;  // 10

// Bonus multiplier (×2)
score *= 2;
chapisha `Baada ya bonus: ${score}`;  // 20

// Penalty (-5)
score -= 5;
chapisha `Baada ya adhabu: ${score}`;  // 15

// Next round - reset? No, keep score
score += 15;
chapisha `Jumla: ${score}`;  // 30
```

### Example 3: Inventory Management

```swazi
data stock = 100;

// Sold 5 items
stock -= 5;
chapisha `Stock baada ya mauzo: ${stock}`;  // 95

// Received new shipment of 30
stock += 30;
chapisha `Stock baada ya kukuja: ${stock}`;  // 125

// Damaged 3 items
stock -= 3;
chapisha `Stock baada ya kuoza: ${stock}`;  // 122
```

### Example 4: Counting with Increment

```swazi
data count = 0;

// Process first item
count++;
chapisha `Items processed: ${count}`;  // 1

// Process more items
count++;
chapisha `Items processed: ${count}`;  // 2

count++;
chapisha `Items processed: ${count}`;  // 3

// Bulk add
count += 5;
chapisha `Items processed: ${count}`;  // 8
```

## Chain vs. Assignment Operators

Here's a question: Can you do arithmetic without assignment operators?

**Yes!** You can chain methods together:

```swazi
data namba = 100;

// Using arithmetic
namba = namba.kadiriachini() / 2;

// Or just do it in one line
data result = 100.kadiriachini() / 2;
```

But when you're **updating a variable**, assignment operators are cleaner:

```swazi
// This is clearer:
namba += 10;

// Than:
namba = namba + 10;
```

## Important Notes

### 1. Order Matters

Assignment operators take the current value, do the operation, and put the result back:

```swazi
data x = 10;
x += 5;

// Step 1: Take current x (10)
// Step 2: Add 5 (10 + 5 = 15)
// Step 3: Store back in x (x is now 15)
```

### 2. Type Matters

```swazi
// Works with numbers
data num = 10;
num += 5;  // 15

// Works with strings too!
data text = "Hello";
text += " World";
chapisha text;  // "Hello World"
```

### 3. Don't Mix Operators Carelessly

```swazi
data x = 20;

// Clear
x += 5;     // 25
x -= 3;     // 22

// Also clear
x *= 2;     // 44

// But writing all at once is confusing
x += 5 -= 3;  // Don't do this!
```

## Practice Challenges

### Challenge 1: Update Variables

Starting with `data x = 100`, use assignment operators to:
1. Add 50
2. Subtract 25
3. Multiply by 2

What's the final value?

<details>
<summary>Work through it</summary>

```swazi
data x = 100;
x += 50;    // x is now 150
x -= 25;    // x is now 125
x *= 2;     // x is now 250
chapisha x; // 250
```

</details>

### Challenge 2: Bank Account Simulation

```swazi
data balance = 5000;

// Add salary of 2000
// Subtract rent of 1500
// Subtract food of 400
// Add interest (multiply by 1.02 for 2% gain)

// What's the final balance?
```

<details>
<summary>Solution</summary>

```swazi
data balance = 5000;
balance += 2000;   // 7000
balance -= 1500;   // 5500
balance -= 400;    // 5100
balance *= 1.02;   // 5202

chapisha balance;
```

</details>

### Challenge 3: Counter

Start with `counter = 0` and:
1. Increment 5 times (using `++`)
2. Add 10 more (using `+=`)
3. Subtract 3 (using `-=`)

What's the final count?

<details>
<summary>Work it out</summary>

```swazi
data counter = 0;
counter++;  // 1
counter++;  // 2
counter++;  // 3
counter++;  // 4
counter++;  // 5
counter += 10;  // 15
counter -= 3;   // 12

chapisha counter;  // 12
```

</details>

### Challenge 4: Price with Discount and Tax

```swazi
data price = 1000;

// Apply 20% discount (multiply by 0.8)
// Add 16% tax (multiply by 1.16)

// What's the final price?
```

<details>
<summary>Calculate it</summary>

```swazi
data price = 1000;
price *= 0.8;   // After 20% discount: 800
price *= 1.16;  // After 16% tax: 928

chapisha price;  // 928
```

</details>

## Quick Comparison

When should you use each form?

| Situation | Use | Example |
|-----------|-----|---------|
| **Adding/subtracting 1** | `++` or `--` | `counter++` |
| **Adding/subtracting other values** | `+=` or `-=` | `balance += 100` |
| **Multiplying/dividing** | `*=` or `/=` | `price *= 1.1` |
| **Powers** | `**=` | `namba **= 2` |
| **Other operations** | Regular `=` | `x = calculate(y)` |


## Reflection Questions

1. **When would you prefer `x += 5` over `x = x + 5`?** What makes one better than the other?

2. **Why do you think `++` and `--` exist if we already have `+=` and `-=`?**

3. **Can you think of a real-world scenario where you'd use `*=`?** (Hint: scaling, growth, discounts)

<details>
<summary>Some thoughts</summary>

1. `x += 5` is clearer about intent (add 5 to x), shorter, and less error-prone because you only write x once

2. `++` and `--` are so common (counting, looping) that having a super short syntax saves typing and makes code clearer

3. Any compound growth: population growth, investment returns, scaling graphics, applying percentage discounts, multiplying quantities

</details>

## What's Next?

You now understand how to update variables efficiently! Next, we'll explore:
- **Comparison Operators** - How to compare values (`>`, `<`, `sawa`, etc.)
- **Logical Operators** - How to combine conditions (`na`, `au`, `!`)
- **Identity Operators** - Checking relationships (`katika`, `ni`, etc.)
- **Ternary Operators** - Quick conditional decisions

---

**Remember:** Assignment operators are just shortcuts for combining an operation with assignment. They make your code cleaner and your intent clearer!