# Variables in SwaziLang

## What is a Variable?

Think about a box where you can store something. You can:
- Put something in the box
- Look at what's inside
- Replace what's inside with something else
- Write a label on the box so you know what's in it

A **variable** in programming works exactly like this box! It's a named container that stores a value. The label on the box is the variable's name, and what's inside is the variable's value.

## Why Do We Need Variables?

Before we dive into syntax, let's understand why variables are essential:

1. **Store information** - Keep data that your program needs to remember
2. **Reuse values** - Use the same value multiple times without retyping it
3. **Change values** - Update information as your program runs
4. **Make code readable** - Give meaningful names to values instead of using raw numbers or text

### Quick Question for You
Can you think of a real-life situation where you might need to store and update information? (Like keeping track of your age, bank balance, or game score?)

## Creating Variables in SwaziLang

In SwaziLang, we use the keyword **`data`** to create a variable. Here's the basic syntax:

```swazi
data variableName = value;
```

Let's break this down:
- `data` - The keyword that tells SwaziLang "I want to create a variable"
- `variableName` - The name you choose for your variable
- `=` - The assignment operator (puts the value into the variable)
- `value` - The actual data you want to store
- `;` - Semicolon to end the statement (optional in some cases)

## Basic Examples

```swazi
data jina = "Amina";
data umri = 25;
data bei = 1500.50;
data imeuzwa = kweli;
```

What do you notice about the different types of values? We have:
- Text (strings) in quotes: `"Amina"`
- Whole numbers: `25`
- Decimal numbers: `1500.50`
- Boolean (true/false): `kweli` (means "true")

## Variable Naming Rules

When choosing names for your variables, follow these rules:

✅ **Allowed:**
- Letters (a-z, A-Z)
- Numbers (but not at the start)
- Underscores (_)

```swazi
data jina = "Hassan";
data umri_wangu = 30;
data namba2 = 100;
data _private = "secret";
```

❌ **Not Allowed:**
- Starting with a number
- Using special characters (@, #, $, %, etc.) - except in special cases
- Using SwaziLang keywords (data, kama, kwa, etc.), See the reserved keywords [here](/en/references/keywords)
- Spaces in names

```swazi
// These are WRONG:
data 2namba = 50;        // Can't start with number
data jina-langu = "Ali"; // Can't use hyphen
data data = 5;           // Can't use keywords
```

You can also declare a variable without initializing it eg.

```swazi
data umri;

// and Later
umri = 30; 

chapisha umri 
```



### Challenge for You
Which of these variable names are valid?
1. `data player_score = 100;`
2. `data 1st_place = "Winner";`
3. `data total$amount = 500;`
4. `data _privateValue = 42;`

(Think about it before checking the answers below!)

<details>
<summary>Click to see answers</summary>

1. ✅ Valid - uses underscore
2. ❌ Invalid - starts with a number
3. ❌ Invalid - uses special character $
4. ✅ Valid - can start with underscore
</details>

## Changing Variable Values

Once you create a variable, you can change its value anytime:

```swazi
data hesabu = 10;
chapisha hesabu;  // Prints: 10

hesabu = 20;      // Changed the value
chapisha hesabu;  // Prints: 20

hesabu = hesabu + 5;  // Now it's 25
chapisha hesabu;      // Prints: 25
```

Notice: After the first declaration with `data`, you just use the variable name to change it.

## Constants: Values That Don't Change

Sometimes you want a variable whose value should **never change** after it's set. In SwaziLang, we use the **`thabiti`** keyword to create constants.

```swazi
data thabiti PI = 3.14159;
data thabiti MAX_USERS = 100;
data thabiti JINA_LA_APP = "SwaziApp";
```

The word **thabiti** means "constant" or "fixed" - the value is locked!

### What Happens If You Try to Change a Constant?

```swazi
data thabiti UMRI_WA_KUANZA = 18;

// This will cause an error:
UMRI_WA_KUANZA = 21;  // ❌ Error! Can't change a constant
```

The interpreter will raise an error because you declared it as `thabiti`.

### When Should You Use Constants?

Think about these questions:
- Should the value of PI ever change in your program?
- Should the maximum number of players in a game change randomly?
- Should tax rates be accidentally modified?

Use `thabiti` when the answer is "No, this should stay fixed!"

**Not: You shouldn't declare a constant without initializing it**
```swazi
data thabiti PI // ❌  this will raise an Error
PI = 3.14 
```


## Common Variable Patterns

### 1. Declare First, Assign Later

```swazi
data jina;           // Variable exists but has no value yet
jina = "Fatuma";     // Now we give it a value
chapisha jina;       // Prints: Fatuma
```

### 2. Multiple Operations

```swazi
data akaunti = 1000;
akaunti = akaunti + 500;   // Deposit
akaunti = akaunti - 200;   // Withdrawal
chapisha akaunti;          // Prints: 1300
```

### 3. Shorthand Operators

```swazi
data namba = 10;

namba += 5;   // Same as: namba = namba + 5
namba -= 3;   // Same as: namba = namba - 3
namba *= 2;   // Same as: namba = namba * 2
namba++;      // Same as: namba = namba + 1
namba--;      // Same as: namba = namba - 1

chapisha namba;
```

### Practice Exercise
What will this code print? Try to figure it out before running it:

```swazi
data jumla = 100;
jumla += 50;
jumla -= 20;
jumla *= 2;
chapisha jumla;
```

<details>
<summary>Click to see the answer</summary>

The answer is **260**.

Step by step:
1. `jumla = 100`
2. `jumla += 50` → `jumla = 150`
3. `jumla -= 20` → `jumla = 130`
4. `jumla *= 2` → `jumla = 260`
</details>

## Key Points to Remember

1. **`data`** creates a variable
2. **`data thabiti`** creates a constant (can't be changed)
3. Variables can store different types of data (numbers, text, booleans, etc.) will talk about these data types later.
4. Use meaningful names for your variables
5. You can change variable values, but not constants

## Reflection Questions

Before moving on, make sure you can answer these:

1. What's the difference between a variable and a constant?
2. Why should we use meaningful variable names?
3. When would you use `thabiti`?
4. What happens if you try to use a variable before declaring it?

## What's Next?

Now that you understand variables, you're ready to learn about:
- **Data types in detail** - Deep dive into strings, numbers, booleans
- **Operators** - How to perform operations on variables
- **Arrays and Objects** - Storing collections of data
- **Type conversion** - Changing data from one type to another

## Practice Exercises

Try these on your own:

### Exercise 1: Personal Information
Create variables to store:
- Your name
- Your age
- Your favorite number
- Whether you like programming (true/false)

Then print them all out with labels.

### Exercise 2: Simple Calculator
Create a program that:
1. Stores two numbers in variables
2. Calculates their sum, difference, product, and quotient
3. Prints all results

### Exercise 3: Temperature Converter
Create a program that:
1. Has a constant for the conversion formula
2. Stores a temperature in Celsius
3. Converts it to Fahrenheit
4. Prints both temperatures

Formula: `Fahrenheit = (Celsius × 9/5) + 32`

---

Remember: Variables are the foundation of programming. Take your time to understand them well - everything else builds on this concept!