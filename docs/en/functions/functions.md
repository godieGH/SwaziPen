# Functions (Kazi) in SwaziLang

## What Is a Function?

A function is a reusable block of code that does a specific job. Think of it like a recipe:
- You write the recipe once (define the function)
- You can follow it many times (call the function)
- Each time, you might use different ingredients (parameters)

In SwaziLang, we use the keyword **`kazi`** (which means "work" or "task" in Swahili) to define functions.

## Basic Function Definition

The simplest function looks like this:

```swazi
kazi greet {
    chapisha "Habari!";
}
```

This function:
- Starts with `kazi`
- Has a name: `greet`
- Has a body (the code it runs)
- Does nothing fancy - just prints a greeting

## Calling a Function

To use a function, you **call** it by writing its name followed by parentheses:

```swazi
kazi greet {
    chapisha "Habari!";
}

// Call the function
greet();  // Prints: Habari!
greet();  // Prints: Habari! (again)
```

Every time you call `greet()`, it runs the code inside the function.

## Functions with Parameters

Most functions need information to work with. That's where **parameters** come in.

### Important: SwaziLang Parameters Don't Use Parentheses

This is different from many languages! In SwaziLang:

```swazi
// ✅ Correct - parameters without ()
kazi add a, b {
    chapisha a + b;
}

// ❌ Wrong - don't use () for parameters
kazi add (a, b) {
    // This is incorrect syntax
}
```

### Simple Parameters

```swazi
kazi greet jina {
    chapisha "Habari, " + jina + "!";
}

// Call with an argument
greet("Hassan");  // Prints: Habari, Hassan!
greet("Amina");   // Prints: Habari, Amina!
```

Notice: When defining the function, no parentheses. When calling, yes parentheses!

### Multiple Parameters

```swazi
kazi add a, b {
    data result = a + b;
    chapisha result;
}

add(5, 10);   // Prints: 15
add(100, 50); // Prints: 150
```

**Important:** You must call with the exact number of arguments unless you use default parameters or rest parameters (we'll cover those soon).

```swazi
add(5);       // Error! Missing argument b
add(5, 10, 20);  // No Error! 20 is ignored 
```

## Block Styles: C-Style vs Pythonic

SwaziLang supports TWO different block styles:

### C-Style Blocks (with `{}`)

```swazi
kazi add a, b {
    data sum = a + b;
    chapisha sum;
}
```

### Pythonic Blocks (with `:` and indentation)

```swazi
kazi add a, b :
    data sum = a + b
    chapisha sum
```

Both work exactly the same way! Use whichever you prefer.
:::info
But note, pythonic blocks need proper indentations before it blows you with errors, don't use it if you not used to it.
:::

## Returning Values from Functions

Usually, you want a function to give you back a result. Use the **`rudisha`** keyword (meaning "return"):

```swazi
kazi add a, b {
    rudisha a + b;
}

data result = add(5, 10);
chapisha result;  // Prints: 15
```

### C-Style Return

```swazi
kazi multiply a, b {
    rudisha a * b;
}

chapisha multiply(4, 5);  // Prints: 20
```

### Pythonic Return

```swazi
kazi multiply a, b :
    rudisha a * b

chapisha multiply(4, 5)  // Prints: 20
```

## Default Parameters

Sometimes you want a parameter to have a default value if the caller doesn't provide one:

```swazi
kazi greet jina = "Friend" {
    chapisha "Habari, " + jina + "!";
}

greet();           // Uses default: Habari, Friend!
greet("Hassan");   // Uses provided value: Habari, Hassan!
```

With multiple parameters:

```swazi
kazi calculate a, b = 10, c = 5 {
    rudisha (a + b) * c;
}

chapisha calculate(2);        // b=10, c=5: (2+10)*5 = 60
chapisha calculate(2, 20);    // b=20, c=5: (2+20)*5 = 110
chapisha calculate(2, 20, 3); // b=20, c=3: (2+20)*3 = 66
```

**Important:** Parameters with defaults must come AFTER required parameters:

```swazi
// ✅ Correct
kazi fn a, b = 5 {
}

// ❌ Wrong
kazi fn a = 5, b {
}
```

## Rest Parameters (`...`)

Rest parameters let a function accept any number of arguments:

```swazi
kazi sum ...numbers {
    data total = 0;
    // We'll learn about loops and Arrays later, but rest is an array
    rudisha numbers; // numbers is an array of all passed arguments
}

sum(5, 10);           // Works
sum(5, 10, 20);       // Works
sum(5, 10, 20, 30);   // Works
```

### Rest with Minimum Requirements

You can specify a minimum number of arguments for rest parameters:

```swazi
kazi process ...items[2] {
    // This function requires AT LEAST 2 arguments
    // items[2] means "take at least 2 items"
}

process(1);        // Error! Need at least 2
process(1, 2);     // OK
process(1, 2, 3);  // OK (extra ignored)
```

The notation `...items[4]` means: "Give me at least 4 arguments, and put them in items"

### Combining Regular and Rest Parameters

```swazi
kazi introduce jina, ...hobbies {
    chapisha "Jina: " + jina;
    // hobbies is an array of all other arguments
}

introduce("Hassan", "football", "reading", "coding");
// jina = "Hassan"
// hobbies = ["football", "reading", "coding"]
```

## Important: Block Style Restrictions

### You CAN Use Pythonic Style at the Top Level

```swazi
kazi greet jina :
    chapisha "Habari, " + jina
```

### You CANNOT Use Pythonic Style Inside Function Calls

This is WRONG:

```swazi
// ❌ WRONG - Pythonic style in a call
call(x => 
    kama condition:
        // This is invalid here
)
```

You must use C-style blocks inside function calls:

```swazi
// ✅ CORRECT - C-style blocks in calls
call(x => {
    kama condition {
        // This is valid
    }
})
```

**Rule:** Only Pythonic style (`:`  and indentation) at the top level or some other places for function definitions especially not inside a `(...)`. Use C-style (`{}`) for blocks inside other constructs.

## Practical Examples

### Example 1: Simple Calculator

```swazi
kazi add a, b {
    rudisha a + b;
}

kazi subtract a, b {
    rudisha a - b;
}

kazi multiply a, b {
    rudisha a * b;
}

kazi divide a, b {
    kama b sawa 0 {
        rudisha tupu;  // Return nothing if dividing by zero
    }
    rudisha a / b;
}

// Use them
chapisha add(10, 5);       // 15
chapisha subtract(10, 5);  // 5
chapisha multiply(10, 5);  // 50
chapisha divide(10, 2);    // 5
chapisha divide(10, 0);    // tupu
```

### Example 2: String Utilities

```swazi
kazi reverse_string text {
    // Simple reversal (we'd use proper methods with loops later)
    rudisha text;
}

kazi is_palindrome text {
    // Check if same forwards and backwards
    // More complex - we'll learn better ways later
    rudisha sikweli;
}

kazi capitalize text {
    kama text.herufi > 0 {
        data first = text.herufiYa(0).herufiKubwa();
        data rest = text.slesi(1);
        rudisha first.unganisha(rest);
    }
    rudisha text;
}

chapisha capitalize("hassan");  // Hassan
```

### Example 3: With Default Parameters

```swazi
kazi describe jina, umri = "unknown", jiji = "unknown" {
    chapisha `${jina}, age ${umri}, from ${jiji}`;
}

describe("Hassan");                           // Hassan, age unknown, from unknown
describe("Hassan", 25);                       // Hassan, age 25, from unknown
describe("Hassan", 25, "Dar es Salaam");     // Hassan, age 25, from Dar es Salaam
```

### Example 4: With Rest Parameters

```swazi
kazi createUser jina, ...permissions {
    chapisha `User: ${jina}`;
    chapisha `Permissions: `;
    // We'll iterate through permissions with loops later
}

createUser("admin", "read", "write", "delete");
createUser("user", "read");
```

### Example 5: Pythonic Style

```swazi
kazi calculate a, b, operation = "add" :
    kama operation sawa "add" :
        rudisha a + b
    vinginevyo kama operation sawa "subtract" :
        rudisha a - b
    vinginevyo kama operation sawa "multiply" :
        rudisha a * b
    vinginevyo:
        rudisha tupu

chapisha calculate(10, 5)              // 15 (default add)
chapisha calculate(10, 5, "subtract")  // 5
chapisha calculate(10, 5, "multiply")  // 50
```

## Common Patterns

### Pattern 1: Guard Clauses (Early Return)

```swazi
kazi process data {
    kama data sawa tupu {
        chapisha "Error: No data";
        rudisha tupu;
    }
    
    kama data.herufi sawa 0 {
        chapisha "Error: Empty";
        rudisha tupu;
    }
    
    // Process the valid data
    rudisha data.herufiKubwa();
}
```

### Pattern 2: Optional Parameters

```swazi
kazi greet jina, formal = sikweli {
    kama formal {
        chapisha "Good day, " + jina;
    } vinginevyo {
        chapisha "Hey " + jina;
    }
}

greet("Hassan");         // Hey Hassan
greet("Hassan", kweli);  // Good day, Hassan
```

### Pattern 3: Flexible Arguments with Rest

```swazi
kazi sum ...numbers {
    // We'll sum them all (with loops later)
    rudisha 0;  // Placeholder
}

sum(5);
sum(5, 10);
sum(5, 10, 15);
```

## Parameter Guidelines

| Parameter Type | Syntax | Required? | Example |
|---|---|---|---|
| **Regular** | `name` | Yes | `kazi fn a { }` |
| **Multiple** | `a, b, c` | Yes | `kazi fn a, b, c { }` |
| **Default** | `name = value` | No | `kazi fn a = 5 { }` |
| **Rest** | `...items` | Any | `kazi fn ...items { }` |
| **Rest with Min** | `...items[n]` | At least n | `kazi fn ...items[2] { }` |

## Important Notes

### 1. Function Names Should Be Descriptive

```swazi
// ✅ Good
kazi calculateAge umri {
}

// ❌ Not helpful
kazi fn x {
}
```

### 2. Return Early for Errors

```swazi
kazi divide a, b {
    kama b sawa 0 {
        rudisha tupu;  // Return early
    }
    // Only execute if no error
    rudisha a / b;
}
```

### 3. Keep Functions Focused

Each function should do ONE thing well. If you're doing multiple things, break it into multiple functions.

```swazi
// ❌ Too much
kazi process data {
    // validate, transform, save, log...
}

// ✅ Better
kazi validate data {
}

kazi transform data {
}

kazi save data {
}
```

## Practice Challenges

### Challenge 1: Greeting Function

Write a function that takes a name and greets them:

<details>
<summary>Solution</summary>

```swazi
kazi greet jina {
    chapisha "Habari, " + jina + "!";
}

greet("Hassan");
greet("Amina");
```

</details>

### Challenge 2: Function with Default

Write a function that calculates area of a square. If no size given, use 10:

<details>
<summary>Solution</summary>

```swazi
kazi squareArea side = 10 {
    rudisha side * side;
}

chapisha squareArea();    // 100
chapisha squareArea(5);   // 25
```

</details>

### Challenge 3: Function with Multiple Parameters and Return

Write a function that takes age and returns a life stage:

<details>
<summary>Solution</summary>

```swazi
kazi lifeStage age {
    kama age < 13 {
        rudisha "mtoto";
    } vinginevyo kama age < 18 {
        rudisha "kijana";
    } vinginevyo kama age < 65 {
        rudisha "mtu mzima";
    } vinginevyo {
        rudisha "mzee";
    }
}

chapisha lifeStage(10);   // mtoto
chapisha lifeStage(25);   // mtu mzima
chapisha lifeStage(70);   // mzee
```

</details>

### Challenge 4: Function with Rest Parameters

Write a function that takes a title and any number of items:

<details>
<summary>Solution</summary>

```swazi
kazi showList title, ...items {
    chapisha title + ":";
    // We'll iterate with loops later
    // For now, just know items is an array
}

showList("Favorites", "reading", "coding", "gaming");
```

</details>

## What's Next?

Now you understand the basics of functions! In future chapters, you'll learn:
- **Loops** - To process arrays and repeat code
- **Lambda Functions** - Quick, anonymous functions
- **Scope** - Understanding where variables exist
- **Recursion** - Functions calling themselves

Functions are a fundamental building block of programming. Master them and you can build complex programs by breaking them into manageable pieces!

---

**Remember:** Functions let you write code once and use it many times. Use them to make your code reusable, organized, and easier to understand!