# Numbers (Namba) in SwaziLang

## What You Already Know

In the previous chapter, you learned that `namba` is one of SwaziLang's primitive data types for representing numeric values. But there's so much more to numbers than just storing values!

Before we dive deeper, let's check your understanding:
- Can you create a variable that stores a decimal number?
- What's the difference between `5` and `"5"`?
- Have you tried doing arithmetic with numbers yet?

If you feel confident with these basics, you're ready to explore the full power of numbers in SwaziLang!

## Numbers: More Than Just Values

Think about this for a moment: When you look at the number `42.7`, what can you tell me about it?
- Is it positive or negative?
- Is it a whole number or does it have decimals?
- Is it even or odd?

SwaziLang numbers aren't just passive values - they're intelligent objects that can answer these questions themselves! Let's explore how.

## Types of Numbers

SwaziLang handles several types of numeric values:

```swazi
data nzima = 42;              // Whole number (integer)
data desimali = 3.14159;      // Decimal number (float)
data hasi = -15;              // Negative number
data kubwa = 1000000;         // Large number
data ndogo = 0.0001;          // Small decimal
data sifuri = 0;              // Zero
```

### Quick Question
What do you think happens when you divide by zero in SwaziLang? Let's find out:

```swazi
data x = 10 / 0;
chapisha x;  // What do you expect?
```

<details>
<summary>Click to see the result</summary>

You'll get `Infinity` (inf) - a special numeric value representing an infinitely large number. SwaziLang raises an exception unless you handle it .

</details>

## Special Number Values

Before we explore number methods, you should know about three special values:

### 1. Infinity (inf)
```swazi
data x = 1000**1000; # inf
chapisha x;  // inf
```

### 2. -Infinity (Negative Infinity)
```swazi
data y = -(1000**1000);
chapisha y;  // -inf
```

### 3. NaN (Not a Number - siSahihi)
```swazi
data z = "hello" * 5;
chapisha z;  // nan
```

**Why do these exist?** Instead of crashing your program, SwaziLang uses these special values to indicate mathematical problems. You can check for them!

## Number Properties: Asking Questions About Numbers

Every number in SwaziLang has properties that tell you things about it. These properties return boolean values (`kweli` or `sikweli`).

### Checking Number Validity

#### `.siSahihi` - Is it a valid number?

```swazi
data a = 42;
chapisha a.siSahihi;      // Prints: sikweli (it IS valid, so NOT NaN)

data b = "text" * 5;
chapisha b.siSahihi;      // Prints: kweli (it IS NaN/invalid)
```

**Wait, this might seem backwards!** Think about the name: `siSahihi` means "is not valid" or "is NaN". So:
- `kweli` means "yes, it's NaN (invalid)"
- `sikweli` means "no, it's valid"

#### `.inf` - Is it infinite?

```swazi
data x = 1000**1000;
chapisha x.inf;  // Prints: kweli (yes, it's infinite)

data y = 42;
chapisha y.inf;  // Prints: sikweli (no, it's finite)
```

### Number Type Properties

#### `.nzima` - Is it a whole number?

```swazi
data a = 42;
chapisha a.nzima;         // Prints: kweli (yes, it's whole)

data b = 42.5;
chapisha b.nzima;         // Prints: sikweli (no, it has decimals)

data c = 42.0;
chapisha c.nzima;         // Prints: kweli (even 42.0 is considered whole!)
```

**Think about this:** Why would `42.0` be considered a whole number even though it's written with a decimal point?

<details>
<summary>Think it through</summary>

Because mathematically, 42.0 equals 42 exactly. The decimal point doesn't make it "not whole" - what matters is whether there's a fractional part. Since .0 means no fractional part, it's a whole number!

</details>

#### `.desimali` - Does it have a fractional part?

```swazi
data a = 3.14;
chapisha a.desimali;      // Prints: kweli (yes, it has decimals)

data b = 10;
chapisha b.desimali;      // Prints: sikweli (no decimals)
```

This is essentially the opposite of `.nzima`!

### Number Sign Properties

#### `.chanya` - Is it positive?

```swazi
data a = 42;
chapisha a.chanya;        // Prints: kweli

data b = -15;
chapisha b.chanya;        // Prints: sikweli

data c = 0;
chapisha c.chanya;        // Prints: sikweli (zero is NOT positive)
```

#### `.hasi` - Is it negative?

```swazi
data a = -42;
chapisha a.hasi;          // Prints: kweli

data b = 15;
chapisha b.hasi;          // Prints: sikweli

data c = 0;
chapisha c.hasi;          // Prints: sikweli (zero is NOT negative)
```

**Your Turn:** If zero is neither positive nor negative, how would you check if a number is exactly zero?

<details>
<summary>One approach</summary>

```swazi
data x = 0;
kama (!x.chanya na !x.hasi) {
    chapisha "Namba ni sifuri!";
}

// Or simply:
kama x sawa 0 {
    chapisha "Namba ni sifuri!";
}
```

</details>

### Mathematical Properties

#### `.shufwa` - Is it even?

```swazi
data a = 10;
chapisha a.shufwa;        // Prints: kweli

data b = 7;
chapisha b.shufwa;        // Prints: sikweli

data c = 3.5;
chapisha c.shufwa;        // Prints: sikweli (only works for whole numbers)
```

#### `.witiri` - Is it odd?

```swazi
data a = 7;
chapisha a.witiri;        // Prints: kweli

data b = 10;
chapisha b.witiri;        // Prints: sikweli
```

**Important:** `.shufwa` and `.witiri` only work with whole numbers. If you use them on decimals, they'll return `sikweli`.

#### `.tasa` - Is it prime?

This is a special one! A prime number is only divisible by 1 and itself.

```swazi
data a = 7;
chapisha a.tasa;          // Prints: kweli (7 is prime)

data b = 8;
chapisha b.tasa;          // Prints: sikweli (8 = 2 × 4, not prime)

data c = 2;
chapisha c.tasa;          // Prints: kweli (2 is the only even prime!)

data d = 1;
chapisha d.tasa;          // Prints: sikweli (1 is not considered prime)
```

**Challenge:** Can you predict what these will return before checking?
```swazi
chapisha 17.tasa;
chapisha 20.tasa;
chapisha 13.tasa;
```

<details>
<summary>Check your answers</summary>

- `17.tasa` → kweli (17 is prime)
- `20.tasa` → sikweli (20 = 4 × 5)
- `13.tasa` → kweli (13 is prime)

</details>

## Number Methods: Making Numbers Do Things

While properties ask questions, methods perform actions or calculations. Let's explore them!

### Basic Math Methods

#### `.abs()` - Absolute Value

Gets the distance from zero (always positive):

```swazi
data a = -42;
chapisha a.abs();         // Prints: 42

data b = 15;
chapisha b.abs();         // Prints: 15 (already positive)

data c = 0;
chapisha c.abs();         // Prints: 0
```

**Real-world use:** Calculating differences or distances where direction doesn't matter.

```swazi
data a = 30;
data b = 25;
data tofauti = (b - a).abs();
chapisha `Tofauti: ${tofauti} nyuzi`;  // Prints: Tofauti: 5 nyuzi
```

### Rounding Methods

Why do we need different types of rounding? Let's explore:

#### `.kadiria()` - Round to Nearest

Rounds to the nearest whole number:

```swazi
data a = 3.4;
chapisha a.kadiria();     // Prints: 3 (closer to 3)

data b = 3.6;
chapisha b.kadiria();     // Prints: 4 (closer to 4)

data c = 3.5;
chapisha c.kadiria();     // Prints: 4 (halfway rounds up)
```

**What happens with .5?** It rounds up (towards positive infinity).

#### `.kadiriajuu()` - Round Up (Ceiling)

Always rounds UP to the next whole number:

```swazi
data a = 3.1;
chapisha a.kadiriajuu();  // Prints: 4

data b = 3.9;
chapisha b.kadiriajuu();  // Prints: 4

data c = -3.1;
chapisha c.kadiriajuu();  // Prints: -3 (up means towards positive infinity)
```

**Real-world use:** Calculating how many boxes you need. If you need 3.2 boxes of supplies, you can't buy 0.2 of a box, so you round up to 4!

#### `.kadiriachini()` - Round Down (Floor)

Always rounds DOWN to the previous whole number:

```swazi
data a = 3.9;
chapisha a.kadiriachini();  // Prints: 3

data b = 3.1;
chapisha b.kadiriachini();  // Prints: 3

data c = -3.1;
chapisha c.kadiriachini();  // Prints: -4 (down means towards negative infinity)
```

**Your Challenge:** Without running the code, predict these outputs:
```swazi
data x = 7.8;
chapisha x.kadiria();
chapisha x.kadiriajuu();
chapisha x.kadiriachini();
```

<details>
<summary>Check your predictions</summary>

- `kadiria()` → 8 (nearest)
- `kadiriajuu()` → 8 (up)
- `kadiriachini()` → 7 (down)

</details>

#### `.kadiriaKwa(digits)` - Round to Decimal Places

This lets you control how many decimal places you want:

```swazi
data pi = 3.14159265;

chapisha pi.kadiriaKwa(2);   // Prints: 3.14
chapisha pi.kadiriaKwa(4);   // Prints: 3.1416
chapisha pi.kadiriaKwa(0);   // Prints: 3
```

**Important:** This returns a STRING, not a number! Why? Because it preserves trailing zeros:

```swazi
data x = 5;
chapisha x.kadiriaKwa(2);    // Prints: "5.00" (as text)
```

**Real-world use:** Displaying prices or measurements with consistent formatting.

```swazi
data bei = 1234.5;
chapisha `Bei: ${bei.kadiriaKwa(2)} shilingi`;  // Bei: 1234.50 shilingi
```

### Power and Root Methods

#### `.kipeo(exponent)` - Raise to Power

```swazi
data base = 2;

chapisha base.kipeo(3);      // Prints: 8 (2³ = 2×2×2)
chapisha base.kipeo(0);      // Prints: 1 (anything⁰ = 1)
chapisha base.kipeo();       // Prints: 4 (default: square = 2²)
```

**With no argument, it squares the number!**

```swazi
data x = 5;
chapisha x.kipeo();          // Prints: 25 (5²)
```

**Negative exponents?**
```swazi
data x = 2;
chapisha x.kipeo(-1);        // Prints: 0.5 (2⁻¹ = 1/2)
```

#### `.kipeuo(root)` - Take Root

```swazi
data x = 16;

chapisha x.kipeuo();         // Prints: 4 (square root √16)
chapisha x.kipeuo(2);        // Prints: 4 (same as above)
chapisha x.kipeuo(4);        // Prints: 2 (4th root: ⁴√16)
```

**Cube root:**
```swazi
data x = 27;
chapisha x.kipeuo(3);        // Prints: 3 (∛27 = 3, because 3³ = 27)
```

**Think about this:** What's the relationship between `.kipeo()` and `.kipeuo()`?

<details>
<summary>Reveal the pattern</summary>

They're inverses! 
- `x.kipeo(n)` raises x to the nth power
- `x.kipeuo(n)` takes the nth root (which is the same as raising to the power of 1/n)

For example:
- `16.kipeo(2)` = 256
- `256.kipeuo(2)` = 16 (gets you back!)

</details>

**Your Turn:** Calculate these without running code:
1. What is `8.kipeuo(3)`?
2. What is `125.kipeuo(3)`?

<details>
<summary>Check your work</summary>

1. `8.kipeuo(3)` = 2 (because 2³ = 8)
2. `125.kipeuo(3)` = 5 (because 5³ = 125)

</details>

### Comparison Methods

#### `.kubwa(other)` - Maximum

Returns the larger of two numbers:

```swazi
data a = 10;
chapisha a.kubwa(15);        // Prints: 15
chapisha a.kubwa(5);         // Prints: 10
```

**With multiple arguments, returns an array:** 
```swazi
data a = 10;
data result = a.kubwa(5, 15, 8, 20);
chapisha result;  // Prints: [10, 15, 10, 20]
// For each argument, it picks the max between 'a' and that argument
```
:::info
An Array is just an ordered list of values, you will learn about them later in the course
:::

#### `.ndogo(other)` - Minimum

Returns the smaller of two numbers:

```swazi
data a = 10;
chapisha a.ndogo(15);        // Prints: 10
chapisha a.ndogo(5);         // Prints: 5
```

**Real-world example:** Limiting a value within a range:

```swazi
data alama = 105;
data alama_max = 100;

// Ensure score doesn't exceed maximum
data alama_halali = alama.ndogo(alama_max);
chapisha alama_halali;  // Prints: 100 (capped at max)
```

**Challenge:** How would you limit a number to a range (e.g., keep it between 0 and 100)?

<details>
<summary>One solution</summary>

```swazi
data thamani = 150;
data chini = 0;
data juu = 100;

// First cap at maximum, then ensure it's not below minimum
data thamani_halali = thamani.ndogo(juu).kubwa(chini);
chapisha thamani_halali;  // Prints: 100
```

Try it with `thamani = -20` and see what happens!

</details>

### Scaling Method

#### `.kwaKiwango(factor)` - Scale by Factor

Multiply a number by a scaling factor:

```swazi
data bei_asili = 100;

chapisha bei_asili.kwaKiwango(1.5);   // Prints: 150 (50% increase)
chapisha bei_asili.kwaKiwango(0.8);   // Prints: 80 (20% discount)
chapisha bei_asili.kwaKiwango(2);     // Prints: 200 (double)
```

**Real-world use:** Calculating percentages, discounts, or scaling measurements.

```swazi
data kiasi_asili = 50;
data asilimia_ya_ongezeko = 0.15;  // 15% increase

data kiasi_kipya = kiasi_asili.kwaKiwango(1 + asilimia_ya_ongezeko);
chapisha kiasi_kipya;  // Prints: 57.5
```

**Your Turn:** A product costs 2000 shilingi. Calculate:
1. Price after 20% discount
2. Price after 10% tax is added to the discounted price

<details>
<summary>Try solving it yourself first!</summary>

```swazi
data bei_asili = 2000;

// 20% discount means pay 80% of original
data baada_ya_punguzo = bei_asili.kwaKiwango(0.8);
chapisha baada_ya_punguzo;  // 1600

// 10% tax means pay 110% of discounted price
data bei_ya_mwisho = baada_ya_punguzo.kwaKiwango(1.10);
chapisha bei_ya_mwisho;  // 1760
```

</details>

## Practical Applications

Let's combine what we've learned in real-world scenarios!

### Example 1: Grade Calculator

```swazi
data alama = 87.6;

// Round for display
chapisha `Alama: ${alama.kadiria()}`;  // Alama: 88

// Check if passed (50 or above)
data amepita = alama.kubwa(50) sawa alama;
kama amepita: 
  chapisha `amefaulu: ${alama}`;

// Check if it's a whole number grade
kama alama.nzima {
    chapisha "Alama kamili!";
} vinginevyo {
    chapisha `Alama ina desimali: ${alama.kadiriaKwa(1)}`;
}
```

### Example 2: Temperature Converter with Validation

```swazi
data celsius = 37.5;

// Convert to Fahrenheit
data fahrenheit = celsius.kwaKiwango(9/5).kipeo(1) + 32;
chapisha `${celsius}°C = ${fahrenheit.kadiriaKwa(1)}°F`;

// Check if temperature is valid (human body temp range)
data joto_la_mwili = celsius.kubwa(36).ndogo(38);
kama joto_la_mwili sawa celsius {
    chapisha "Joto la kawaida";
} vinginevyo {
    chapisha "Joto si la kawaida";
}
```

### Example 3: Circle Calculations

```swazi
data thabiti PI = 3.14159;
data radius = 7;

// Area = πr²
data eneo = PI * radius.kipeo(2);
chapisha `Eneo: ${eneo.kadiriaKwa(2)} cm²`;

// Circumference = 2πr
data mzunguko = 2 * PI * radius;
chapisha `Mzunguko: ${mzunguko.kadiriaKwa(2)} cm`;

// Check if radius is reasonable
kama radius.chanya na radius.nzima {
    chapisha "Radius ni sahihi";
}
```

### Example 4: Number Properties Inspector

Let's create a function that analyzes any number:

```swazi
kazi onyeshaTaarifa namba {
    chapisha `\nUchunguzi wa: ${namba}`;
    chapisha `-----------------------`;
    
    // Basic checks
    kama namba.siSahihi {
        chapisha "ONYO: Sio namba halali (NaN)!";
        rudisha;
    }
    
    kama namba.inf {
        chapisha "ONYO: Namba haina mwisho (Infinity)!";
        rudisha;
    }
    
    // Type checks
    chapisha `Nzima: ${namba.nzima ? "Ndio" : "Hapana"}`;
    chapisha `Desimali: ${namba.desimali ? "Ndio" : "Hapana"}`;
    
    // Sign
    kama namba.chanya {
        chapisha "Ishara: Chanya (+)";
    } vinginevyo kama namba.hasi {
        chapisha "Ishara: Hasi (-)";
    } vinginevyo {
        chapisha "Ishara: Sifuri (0)";
    }
    
    // Mathematical properties (only for integers)
    kama namba.nzima {
        chapisha `Shufwa: ${namba.shufwa ? "Ndio" : "Hapana"}`;
        chapisha `Witiri: ${namba.witiri ? "Ndio" : "Hapana"}`;
        chapisha `Tasa: ${namba.tasa ? "Ndio" : "Hapana"}`;
    }
    
    // Some calculations
    chapisha `\nMahesabu:`;
    chapisha `Absolute: ${namba.abs()}`;
    chapisha `Square: ${namba.kipeo()}`;
    chapisha `Square root: ${namba.kipeuo(3).kadiriaKwa(2)}`;
}

// Test it!
onyeshaTaarifa(17);
onyeshaTaarifa(-8.5);
onyeshaTaarifa(0);
```

## Common Patterns and Best Practices

### 1. Chaining Methods

You can chain methods together:

```swazi
data x = -42.7;
data result = x.abs().kadiria();
chapisha result;  // 43

// More complex chain
data y = 100;
data final = y.kwaKiwango(0.8).kadiriajuu().kipeo(2);
// Step by step: 100 → 80 → 80 → 6400
```

**Can you trace this chain?**
```swazi
data x = 16;
data result = x.kipeuo().kipeo(3);
```

<details>
<summary>Step-by-step trace</summary>

1. `x = 16`
2. `x.kipeuo()` = 4 (square root of 16)
3. `4.kipeo(3)` = 64 (4 cubed)
4. Final result: 64

</details>

### 2. Using Properties in Conditions

```swazi
data namba = soma("Ingiza namba: ");
namba = Namba(namba);

kama namba.siSahihi {
    chapisha "Tafadhali ingiza namba halali!";
} vinginevyo kama !namba.nzima {
    chapisha "Tafadhali ingiza namba kamili!";
} vinginevyo kama !namba.chanya {
    chapisha "Tafadhali ingiza namba chanya!";
} vinginevyo {
    chapisha "Asante! Namba ni sahihi.";
}
```

### 3. Safe Math Operations

Always check for special values before calculations:

```swazi
kazi gawanya a, b {
    kama b sawa 0 {
        chapisha "Huwezi kugawa kwa sifuri!";
        rudisha null;
    }
    
    data matokeo = a / b;
    
    kama matokeo.inf au matokeo.siSahihi {
        chapisha "Tatizo katika mahesabu!";
        rudisha null;
    }
    
    rudisha matokeo;
}
```

:::info
If you see some keywords that you haven't learn about and don't understand them. That doesn't mean you have lost track of SwaziLang, no this course is designed to make you learn SwaziLang easy Step-by-step, so the new keywords are just introduced but don't worry about them just stick to course flow you you will understand them later as we move on.
:::


## Reflection Questions

Before moving forward, make sure you can answer these:

1. **Conceptual:** Why does SwaziLang have special values like NaN and Infinity instead of just throwing errors?

2. **Practical:** When would you use `.kadiriajuu()` instead of `.kadiria()`?

3. **Problem-solving:** How would you check if a number is between 10 and 100 (inclusive) using number methods?

4. **Creative:** Can you think of a real-world scenario where you'd need to check if a number is prime?

<details>
<summary>Some thoughts to consider</summary>

1. Special values allow programs to continue running and handle errors gracefully, rather than crashing. You can check for these values and respond appropriately.

2. `.kadiriajuu()` is useful when you need to ensure you have "enough" of something (like boxes, seats, or materials) - better to have too much than too little!

3. One approach:
```swazi
data x = 45;
data ndani = (x.kubwa(10) sawa x) na (x.ndogo(100) sawa x);
```

4. Prime checking is used in cryptography, security systems, and generating unique IDs!

</details>

## Practice Challenges

Test your understanding with these exercises:

### Challenge 1: Perfect Square Detector
Write code that checks if a number is a perfect square (like 16, 25, 36).

<details>
<summary>Hint</summary>

A perfect square's square root should be a whole number! Use `.kipeuo()` and `.nzima`.

</details>

### Challenge 2: Price Formatter
Create a function that takes a price and formats it to 2 decimal places with proper rounding.

### Challenge 3: Number Range Validator
Write a function that ensures a number stays between a minimum and maximum value.

### Challenge 4: Prime Number Finder
Write code that finds all prime numbers between 1 and 50.

## What's Next?

Now that you've mastered numbers in SwaziLang, you're ready to explore:
- **Strings (Neno)** - Working with text in depth
- **Arithmetic Operators** - More ways to calculate with numbers
- **Comparison Operators** - Advanced ways to compare values
- **Math with Arrays** - Performing calculations on collections of numbers

Understanding numbers deeply is crucial because almost every program deals with calculations, measurements, or counting. Take your time with these concepts - they're the foundation of computational thinking!

---

**Key Takeaway:** Numbers in SwaziLang aren't just values - they're smart objects with properties and methods that let you ask questions about them and transform them in powerful ways!