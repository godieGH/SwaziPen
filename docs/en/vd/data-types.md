# Data Types in SwaziLang

## What Are Data Types?

In the previous chapter, you learned how to create variables to store values. But have you noticed that not all values are the same?

Think about it for a moment:
- What's the difference between `25` and `"25"`?
- Can you do math with the word "five" the same way you can with the number `5`?
- What does `kweli` (true) represent compared to `1`?

A **data type** tells the computer what kind of data you're working with. Different types of data behave differently - you can add numbers together, but you can't multiply words!

## Why Do Data Types Matter?

Before we dive into specific types, let's understand why this is important:

```swazi
data a = 5;
data b = 10;
chapisha a + b;  // What do you think this prints?

data x = "5";
data y = "10";
chapisha x + y;  // What about this one?
```

Take a moment to predict what each will output. Then check below:

<details>
<summary>Click to see the results</summary>

```
15
510
```

Surprised? The first adds numbers (5 + 10 = 15), while the second combines text ("5" + "10" = "510")!

</details>

This is why understanding data types is crucial - the same operation (`+`) behaves differently depending on the data type!

## Primitive Data Types in SwaziLang

SwaziLang has **four primitive data types**. Think of "primitive" as "basic building blocks" - these are the simplest types of data.

Let's explore each one:

### 1. Namba (Numbers)

The `namba` type represents any numeric value - whole numbers, decimals, positive, or negative.

```swazi
data umri = 25;              // Whole number
data bei = 99.99;            // Decimal number
data joto = -5;              // Negative number
data zero = 0;               // Zero
data kubwa = 1000000;       // Large number
```

**What can you do with numbers?**
- Arithmetic operations: `+`, `-`, `*`, `/`, `%`, `**`
- Comparisons: `>`, `<`, `>=`, `<=`
- Increment/Decrement: `++`, `--`

```swazi
data x = 10;
data y = 3;

chapisha x + y;   // Addition: 13
chapisha x - y;   // Subtraction: 7
chapisha x * y;   // Multiplication: 30
chapisha x / y;   // Division: 3.333...
chapisha x % y;   // Remainder: 1
chapisha x ** y;  // Power: 1000
```

#### Quick Challenge
Without running the code, what will these output?
```swazi
data a = 15;
data b = 4;
chapisha a / b;
chapisha a % b;
```

<details>
<summary>Click to see answers</summary>

- `a / b` = 3.75 (division)
- `a % b` = 3 (remainder when 15 is divided by 4)

</details>

### 2. Neno (Strings/Text)

The `neno` type represents text - any sequence of characters enclosed in quotes.

```swazi
data jina = "Hassan";
data ujumbe = "Habari yako!";
data namba_kama_neno = "123";
data tupu = "";                    // Empty string
data quote = 'Tunaweza kutumia single quotes pia';
```

**Important:** Notice that `"123"` is text, not a number! You can't do math with it directly.

**What can you do with strings?**
- Combine them (concatenation): `+`
- Access their length
- Compare them

```swazi
data jina_la_kwanza = "Amina";
data jina_la_mwisho = "Hassan";
data jina_kamili = jina_la_kwanza + " " + jina_la_mwisho;
chapisha jina_kamili;  // Prints: Amina Hassan
```

**String templates** (for easier text building):
```swazi
data jina = "Omar";
data umri = 30;
chapisha `Jina langu ni ${jina} na nina miaka ${umri}`;
// Prints: Jina langu ni Omar na nina miaka 30
```

Notice the backticks `` ` `` and `${}` syntax? This lets you insert variables directly into text!

#### Think About This
What's the difference between these two?
```swazi
data a = 5 + 5;
data b = "5" + "5";
```

### 3. Bool (Boolean)

The `bool` type has only **two possible values**: `kweli` (true) or `sikweli` (false).

```swazi
data ipo = kweli;              // kweli = true
data imefungwa = sikweli;      // sikweli = false
data ni_mkulima = kweli;
data ana_gari = sikweli;
```

**When do you use booleans?**
- Making decisions (we'll learn about `kama` statements later)
- Checking conditions
- Representing yes/no, on/off, true/false states

```swazi
data umri = 20;
data ni_mkubwa = umri >= 18;   // This creates a boolean!
chapisha ni_mkubwa;             // Prints: kweli
```

**Boolean operations:**
```swazi
data a = kweli;
data b = sikweli;

chapisha a na b;        // AND: sikweli (both must be true)
chapisha a au b;        // OR: kweli (at least one is true)
chapisha !a;            // NOT: sikweli (opposite of a)
```

#### Your Turn
What will this output?
```swazi
data x = 10;
data y = 5;
data result = (x > y) na (y > 0);
chapisha result;
```

<details>
<summary>Click to see the answer</summary>

`kweli` - because both conditions are true: 10 > 5 (kweli) AND 5 > 0 (kweli)

</details>

### 4. null (Null/Undefined)

The `null` type represents "nothing" or "no value". It's used when a variable exists but doesn't have a meaningful value yet.

```swazi
data x = null;
chapisha x;  // Prints: null

data jina;   // Not initialized - will be tupu
chapisha jina;
```

**When is `null` literal useful?**
- Representing missing or unknown data
- Resetting a variable
- Checking if something exists

```swazi
data simu;  // No phone number yet

kama simu sawa null {
    chapisha "Hakuna namba ya simu";
} vinginevyo {
    chapisha("Namba ya simu: ", simu);
}
```

## Collection Types (Preview)

SwaziLang also has collection types that can hold multiple values:

**Orodha (Arrays)** - Ordered lists of values:
```swazi
data majina = ["Ali", "Fatuma", "Hassan"];
data namba = [10, 20, 30, 40];
```

**Objects** - Collections of key-value pairs:
```swazi
data mtu = {
    jina: "Amina",
    umri: 28,
    jiji: "Dar es Salaam"
};
```

Don't worry about these yet! We'll explore arrays and objects in detail in upcoming chapters. For now, just know they exist for storing multiple related values.

## Checking Data Types

How do you find out what type a variable is? Use the **`ainaya()`** function!

```swazi
data x = 42;
chapisha ainaya(x);          // Prints: namba

data jina = "Hassan";
chapisha ainaya(jina);       // Prints: neno

data hali = kweli;
chapisha ainaya(hali);       // Prints: bool

data hakuna = null;
chapisha ainaya(hakuna);     // Prints: null

data orodha = [1, 2, 3];
chapisha ainaya(orodha);     // Prints: orodha

data obj = {a: 1};
chapisha ainaya(obj);        // Prints: object
```

**Why check types?** Sometimes you need to verify what you're working with, especially when dealing with user input or complex programs.

#### Practice Exercise
What will each `ainaya()` call return?
```swazi
data a = 100;
data b = "100";
data c = kweli;
data d = 100 > 50;
data e;
```

<details>
<summary>Click to see answers</summary>

- `ainaya(a)` → namba
- `ainaya(b)` → neno
- `ainaya(c)` → bool
- `ainaya(d)` → bool (because comparisons return booleans!)
- `ainaya(e)` → null (not initialized)

</details>

## Type Checking with Special Properties

SwaziLang also provides convenient properties to check if a value is of a specific type:

```swazi
data x = 60;
chapisha x.ninamba;          // Prints: kweli

data jina = "Hassan";
chapisha jina.nineno;        // Prints: kweli

data hali = kweli;
chapisha hali.nibool;        // Prints: kweli

data orodha = [1, 2, 3];
chapisha orodha.niorodha;    // Prints: kweli
```

These return `kweli` if the value matches that type, `sikweli` otherwise.

**When would you use this?**
```swazi
data input = "25";

kama input.ninamba {
    chapisha "Ni namba";
} vinginevyo kama input.nineno {
    chapisha "Ni maneno";  // This will print!
}
```
**Don't worry about the `kama` statements if you don't understand it, we are going to cover it later, It is just what they call control flow statement**

## Data Type Conversion

Sometimes you need to convert from one type to another. This is called **type conversion** or **casting**.

### Converting to Numbers

**Scenario:** You get user input as text, but need to do math with it.

```swazi
data neno_la_umri = "25";
data umri = Namba(neno_la_umri);  // Convert string to number
chapisha umri + 5;                 // Prints: 30
```

**What happens with invalid conversions?**
```swazi
data text = "hello";
data namba = Namba(text);
chapisha namba;  // Prints: NaN (Not a Number)
```

### Converting to Strings

You can convert any value to a string:

```swazi
data namba = 42;
data neno = Neno(namba);
chapisha ainaya(neno);    // Prints: neno
chapisha neno;            // Prints: 42 (but as text)

data hali = kweli;
data text = Neno(hali);
chapisha text;            // Prints: kweli (as text)
```

**Alternative: String templates automatically convert:**
```swazi
data umri = 25;
chapisha `Nina miaka ${umri}`;  // No manual conversion needed!, unless necessary.
```

### Converting to Booleans

Any value can be converted to a boolean, but what becomes `kweli` vs `sikweli`?

```swazi
// These become kweli (truthy):
chapisha Bool(1);           // kweli
chapisha Bool("text");      // kweli (non-empty strings)
chapisha Bool(42);          // kweli (non-zero numbers)

// These become sikweli (falsy):
chapisha Bool(0);           // sikweli
chapisha Bool("");          // sikweli (empty string)
chapisha Bool(null);        // sikweli
```

**Rule of thumb:**
- Empty/zero/null values → `sikweli`
- Everything else → `kweli`

#### Think About This
Why do you think empty values are considered "false"?

<details>
<summary>One way to think about it</summary>

Empty values represent "nothing" or "absence", which naturally maps to "false" or "no". It's like asking "Is there something here?" - if it's empty, the answer is no (false).

</details>

### Automatic Type Conversion (Coercion)

Sometimes SwaziLang automatically converts types for you:

```swazi
data x = "5" + 3;
chapisha x;              // Prints: 53 (3 converted to string)

data y = "10" - 5;
chapisha y;              // Prints: 5 (string converted to number)

data z = kweli + 1;
chapisha z;              // Prints: 2 (kweli becomes 1)
```

**Be careful!** Automatic conversion can be confusing. It's often better to be explicit:

```swazi
// Instead of this:
data result = "10" + 5;  // What type will result be?

// Do this:
data result = Namba("10") + 5;  // Clear intention!
```

## Common Type Conversion Functions

Here's a quick reference:

| Function | Purpose | Example |
|----------|---------|---------|
| `Namba(value)` | Convert to number | `Namba("42")` → 42 |
| `Neno(value)` | Convert to string | `Neno(42)` → "42" |
| `Bool(value)` | Convert to boolean | `Bool(1)` → kweli |

## Practical Examples

### Example 1: Calculator with User Input

```swazi
// Imagine we get these as user input (strings)
data input1 = "25";
data input2 = "17";

// Convert to numbers
data namba1 = Namba(input1);
data namba2 = Namba(input2);

// Now we can do math!
data jumla = namba1 + namba2;
chapisha `${input1} + ${input2} = ${jumla}`;
// Prints: 25 + 17 = 42
```

### Example 2: Age Verification

```swazi
data umri = 16;
data umri_wa_lazima = 18;

data ni_mkubwa = umri >= umri_wa_lazima;
chapisha ainaya(ni_mkubwa);  // What type is this?
chapisha ni_mkubwa;           // What value?

kama ni_mkubwa {
    chapisha "Unaweza kuingia";
} vinginevyo {
    chapisha "Samahani, ni wadogo sana";
}
```

### Example 3: Type Checking Before Operations

```swazi
data thamani = "123";

kama thamani.nineno {
    chapisha "Ni maneno, tunahitaji kubadilisha...";
    thamani = Namba(thamani);
}

kama thamani.ninamba {
    chapisha "Sasa ni namba, tunaweza kuhesabu!";
    chapisha thamani * 2;
}
```

## Your Turn: Hands-On Practice

Let's test your understanding! Try to predict the output before checking:

### Exercise 1
```swazi
data a = "10";
data b = 20;
data c = a + b;
chapisha c;
chapisha ainaya(c);
```

What will be printed? Why?

<details>
<summary>Show answer</summary>

```
1020
neno
```

The number `20` gets converted to a string, so you get string concatenation "10" + "20" = "1020".

</details>

### Exercise 2
```swazi
data x = 0;
data y = "";
data z = null;

chapisha Bool(x);
chapisha Bool(y);
chapisha Bool(z);
```

What will each line print?

<details>
<summary>Show answer</summary>

```
sikweli
sikweli
sikweli
```

All three are "falsy" values - zero, empty string, and null all convert to `sikweli`.

</details>

### Exercise 3
```swazi
data umri = "25";
data ni_namba = umri.ninamba;
chapisha ni_namba;

data umri_halisi = Namba(umri);
data ni_namba_sasa = umri_halisi.ninamba;
chapisha ni_namba_sasa;
```

What's the difference between the two checks?

<details>
<summary>Show answer</summary>

```
sikweli
kweli
```

First check: `"25"` is a string, so `.ninamba` returns `sikweli`.
Second check: After conversion, `25` is actually a number, so `.ninamba` returns `kweli`.

</details>

## Common Mistakes to Avoid

### 1. Forgetting Type Conversion
```swazi
// ❌ Wrong
data input = "10";
data result = input + 5;  // "105" (string concatenation)

// ✅ Correct
data input = "10";
data result = Namba(input) + 5;  // 15 (numeric addition)
```

### 2. Comparing Different Types
```swazi
data a = "10";
data b = 10;
chapisha a sawa b;  // sikweli - different types!

// Better:
chapisha Namba(a) sawa b;  // kweli - same type now
```

### 3. Assuming Empty Values Are Numbers
```swazi
data x;  // This is null, not 0!
chapisha ainaya(x);  // Prints: null

// If you need zero:
data y = 0;
chapisha ainaya(y);  // Prints: namba
```

## Key Takeaways

Let's review what we've learned. Can you answer these without looking back?

1. What are the four primitive data types in SwaziLang?
2. How do you check what type a variable is?
3. What's the difference between `5` and `"5"`?
4. How do you convert a string to a number?
5. What values become `sikweli` when converted to boolean?

<details>
<summary>Check your answers</summary>

1. `namba`, `neno`, `bool`, and `null`
2. Use `ainaya(variable)` or properties like `.ninamba`, `.nineno`, etc.
3. `5` is a number (you can do math), `"5"` is text (you can't do math directly)
4. Use `Namba("string")`
5. Zero, empty string, and `null` become `sikweli` (falsy values)

</details>

## Reflection Questions

Before moving on, think about these:

1. **Real-world scenario:** You're building a calculator app. The user types "25" in a text box. What steps do you need to take before you can add it to another number?

2. **Type safety:** Why might it be important to check types before performing operations?

3. **When to convert:** Can you think of a situation where you'd want to convert a number to a string?

## What's Next?

Now that you understand data types, you're ready to explore:
- **Operators** - Performing operations on different types
- **Control Flow** - Using booleans to make decisions (`kama`, `vinginevyo`)
- **Arrays** - Working with lists of values (the `orodha` type)
- **Objects** - Organizing related data together

Understanding data types is fundamental to everything else in programming. Take time to experiment with the examples and exercises!

---

**Remember:** Every value in SwaziLang has a type, and that type determines what you can do with it. When in doubt, use `ainaya()` to check!