# Comparison Operators in SwaziLang

## Starting Point: What Are We Comparing?

Let me ask you: Think about the last time you compared two things. Maybe you compared prices at a store, or heights of two people, or test scores.

When you compare, you're asking a question that has only two possible answers - yes (true) or no (false).

**Before we go further:** Do you remember what data type represents yes/no answers?

<details>
<summary>Think about it first...</summary>

Booleans! `kweli` and `sikweli`.

</details>

Now here's the key insight: **Comparison operators are how you ask yes/no questions about values in your code, and they always give you back a boolean answer.**

## The Comparison Operators

Let me show you the complete toolkit:

| Operator | What It Asks | Example | Result |
|----------|-------------|---------|--------|
| `>` | Is left greater than right? | `10 > 5` | `kweli` |
| `<` | Is left less than right? | `10 < 5` | `sikweli` |
| `>=` | Is left greater than OR equal to right? | `10 >= 10` | `kweli` |
| `<=` | Is left less than OR equal to right? | `5 <= 10` | `kweli` |
| `sawa` or `==`` | Are they equal? | `5 sawa 5` or `5 == 5` | `kweli` |
| `sisawa` or `!=` | Are they NOT equal? | `5 sisawa 10` or `5 != 10` | `kweli` |
| `===` | Are they strictly equal? | `5 === "5"` | `sikweli` |
| `!==` | Are not they strictly equal? | `5 !== "5"` | `kweli` |

## The Basic Comparisons

### Greater Than (`>`)

```swazi
data age = 20;
chapisha age > 18;  // What do you think this prints?
```

<details>
<summary>Think before looking</summary>

`kweli` - because 20 is indeed greater than 18.

</details>

**Try this:** Without running it, what will print?

```swazi
chapisha 5 > 5;
```

<details>
<summary>Check your thinking</summary>

`sikweli` - because 5 is NOT greater than 5. They're equal, but `>` only returns true if strictly greater.

</details>

### Less Than (`<`)

```swazi
data score = 50;
chapisha score < 100;  // kweli (50 is less than 100)
```

### Greater Than or Equal (`>=`)

Here's where it gets interesting. What's the difference between `>` and `>=`?

```swazi
data age = 18;

chapisha age > 18;   // ?
chapisha age >= 18;  // ?
```

<details>
<summary>Think about the difference</summary>

- `age > 18` → `sikweli` (18 is not strictly greater than 18)
- `age >= 18` → `kweli` (18 equals 18, so it satisfies the "or equal" part!)

The `>=` operator gives you a second chance - if it's not greater, it still returns true if they're equal.

</details>

### Less Than or Equal (`<=`)

Same idea as `>=`, but for the less-than direction:

```swazi
data umri = 65;

chapisha umri <= 65;  // kweli (exactly equal counts as "less than or equal")
chapisha umri < 65;   // sikweli (not strictly less than)
```

## Equality: The Important Ones

### Equal (`sawa`)

Checks if two values are exactly the same:

```swazi
chapisha 5 sawa 5;          // kweli
chapisha "Ali" sawa "Ali";  // kweli
chapisha kweli sawa kweli;  // kweli
```

But watch out:

```swazi
chapisha "5" sawa 5;        // sikweli (string vs number - different types!)
chapisha "Hassan" sawa "hassan";  // sikweli (case matters!)
```

**Quick question:** Why do you think `"Hassan" sawa "hassan"` returns `sikweli`?

<details>
<summary>Think about it</summary>

Computers are very literal. Capital H and lowercase h are different characters. They look similar to us, but the computer sees them as completely different.

If you want to compare strings without caring about case, you'd convert both to the same case first:

```swazi
chapisha "Hassan".herufiNdogo() sawa "hassan";  // kweli
```

Remember that from the Strings chapter?

</details>

### Not Equal (`sisawa`)

The opposite of `sawa`. Returns true if values are different:

```swazi
chapisha 5 sisawa 10;       // kweli (they're different)
chapisha 5 sisawa 5;        // sikweli (they're the same)
```

**Notice something?** `sisawa` is basically `!(sawa)` - the opposite!

## Practical Examples

### Example 1: Age Eligibility

```swazi
data age = 21;

// Can vote? (Must be 18 or older)
data anaweza_kupiga_kura = age >= 18;
chapisha anaweza_kupiga_kura;  // kweli

// Can drive? (Must be 16 or older)
data anaweza_kuendesha = age >= 16;
chapisha anaweza_kuendesha;  // kweli

// Is senior citizen? (65+)
data ni_mzee = age >= 65;
chapisha ni_mzee;  // sikweli
```

### Example 2: Grading System

```swazi
data alama = 75;

// Different grade thresholds
data ni_A = alama >= 90;
data ni_B = alama >= 80 na alama < 90;
data ni_C = alama >= 70 na alama < 80;
data ni_D = alama >= 60 na alama < 70;
data ni_F = alama < 60;

chapisha `Alama: ${alama}`;

kama ni_A {
    chapisha "Grade: A";
} vinginevyo kama ni_B {
    chapisha "Grade: B";
} vinginevyo kama ni_C {
    chapisha "Grade: C";
} vinginevyo kama ni_D {
    chapisha "Grade: D";
} vinginevyo {
    chapisha "Grade: F";
}
```

(We'll learn the full `kama` syntax later - just showing the idea here)

### Example 3: Validating Input

```swazi
data password = "MyPass123";
data min_length = 8;

data ni_ndefu = password.herufi >= min_length;
chapisha `Password long enough: ${ni_ndefu}`;  // kweli

data username = "jo";
data username_min = 3;

data username_ok = username.herufi >= username_min;
chapisha `Username ok: ${username_ok}`;  // sikweli (only 2 chars)
```

### Example 4: Range Checking

```swazi
data temperature = 25;

// Normal body temperature range: 36.1 - 37.2°C
data ni_kawaida = temperature >= 36.1 na temperature <= 37.2;

// Fever: above 37.5°C
data ni_homa = temperature > 37.5;

// Hypothermia: below 35°C
data ni_baridi = temperature < 35;
```

## Common Comparison Patterns

### Pattern 1: Checking Boundaries

```swazi
data score = 85;
data min_score = 0;
data max_score = 100;

// Is score in valid range?
data valid = score >= min_score na score <= max_score;
```

### Pattern 2: Checking for Exact Value

```swazi
data day = "Jumatatu";

// Is it Monday?
data ni_Jumatatu = day sawa "Jumatatu";
```

### Pattern 3: Checking NOT a Value

```swazi
data status = "pending";

// Is it NOT pending?
data completed = status sisawa "pending";

// Or equivalently:
completed = status sawa "completed";
```

## Comparing Different Types

This is important - what happens when you compare different types?

```swazi
chapisha 5 sawa "5";  // sikweli
```

Number 5 and string "5" are different! If you want to compare them, convert to the same type:

```swazi
chapisha 5 sawa Namba("5");  // kweli
```

**With booleans:**

```swazi
chapisha kweli sawa 1;      // sikweli (different types)
chapisha kweli sawa kweli;  // kweli (same type)
```

## Comparison Chains - A Pattern to Know

In mathematics, you can write `5 < 10 < 15` to mean "10 is between 5 and 15."

**But in SwaziLang, comparison operators don't chain like that.** You must write it as:

```swazi
// ❌ Don't do this (might not work as expected):
data x = 10;
chapisha 5 < x < 15;

// ✅ Do this instead:
chapisha (5 < x) na (x < 15);  // kweli (10 is between 5 and 15)
```

Always use `na` to combine multiple comparisons!

## Important Notes

### 1. Order Matters for Some Operators

```swazi
// These are NOT the same:
chapisha 5 > 10;   // sikweli
chapisha 10 > 5;   // kweli
```

### 2. `>=` and `<=` Include the Boundary Value

```swazi
chapisha 10 >= 10;  // kweli (equal counts!)
chapisha 10 > 10;   // sikweli (strictly greater doesn't include equal)
```

### 3. Comparisons Always Return Booleans

```swazi
data result = 5 > 3;
chapisha ainaya(result);  // Prints: bool
```

No matter what you compare, you always get back a boolean.

## Practice Challenges

### Challenge 1: Temperature Categories

Write comparisons to determine:
- Is temperature hot? (above 30)
- Is temperature cold? (below 15)
- Is temperature comfortable? (between 15 and 25)

<details>
<summary>Try it first, then check</summary>

```swazi
data temp = 20;

data ni_hot = temp > 30;
data ni_cold = temp < 15;
data ni_comfortable = temp >= 15 na temp <= 25;

chapisha ni_hot;          // sikweli
chapisha ni_cold;         // sikweli
chapisha ni_comfortable;  // kweli
```

</details>

### Challenge 2: Username Validation

Check if:
- Username is not empty
- Username has at least 3 characters
- Username is exactly "admin"

<details>
<summary>Work through it</summary>

```swazi
data username = "alice";

data si_tupu = username sisawa "";
data ndefu = username.herufi >= 3;
data ni_admin = username sawa "admin";

chapisha si_tupu;    // kweli (not empty)
chapisha ndefu;      // kweli (has 5 chars)
chapisha ni_admin;   // sikweli (not "admin")
```

</details>

### Challenge 3: Price Range Check

Given a price, check:
- Is it affordable? (less than or equal to 5000)
- Is it premium? (greater than 10000)
- Is it mid-range? (between 5000 and 10000)

<details>
<summary>Solution</summary>

```swazi
data price = 7500;

data affordable = price <= 5000;
data premium = price > 10000;
data mid_range = price > 5000 na price <= 10000;

chapisha affordable;  // sikweli
chapisha premium;     // sikweli
chapisha mid_range;   // kweli
```

</details>

### Challenge 4: String Comparison

Compare these strings and predict the output:

```swazi
data a = "Swazi";
data b = "swazi";
data c = "Swazi";

chapisha a sawa b;  // ?
chapisha a sawa c;  // ?
chapisha b sisawa c;  // ?
```

<details>
<summary>Think about case sensitivity</summary>

- `a sawa b` → `sikweli` (different case: "Swazi" vs "swazi")
- `a sawa c` → `kweli` (exactly the same)
- `b sisawa c` → `kweli` (they're different from each other)

Remember: computers are case-sensitive!

</details>

## Quick Reference Table

| Need to Check | Use | Example |
|---------------|-----|---------|
| **Strictly greater** | `>` | `age > 18` |
| **Strictly less** | `<` | `score < 100` |
| **Greater or equal** | `>=` | `age >= 18` |
| **Less or equal** | `<=` | `score <= 100` |
| **Exactly equal** | `sawa` | `name sawa "Ali"` |
| **Not equal** | `sisawa` | `status sisawa "done"` |

## Reflection Questions

1. **What's the practical difference between `>` and `>=`?** When would each one matter in the real world?

2. **Why do you think `"5" sawa 5` returns false?** What would happen if computers treated all equal-looking values as the same regardless of type?

3. **When would you use `sisawa` instead of just using the opposite with `>`?** (Hint: think about non-numeric comparisons)

<details>
<summary>Some thoughts</summary>

1. `>` excludes the boundary value, `>=` includes it. Example: if minimum age to vote is 18, you'd use `>=` not `>`. Someone exactly 18 should be allowed!

2. If computers didn't distinguish types, it would be chaos! "5" (text) and 5 (number) behave completely differently - you can't add text numbers together, for instance. The computer needs to know what type it's dealing with.

3. `sisawa` is most natural when comparing strings or other non-numeric values, like `status sisawa "pending"`. It reads more naturally than the opposite approach.

</details>

## What's Next?

You now understand how to ask yes/no questions about values! Next, we'll explore:
- **Logical Operators** - How to combine multiple comparisons (`na`, `au`, `!`)
- **Identity Operators** - Checking specific relationships
- **Ternary Operators** - Quick conditional decisions

Comparison operators are the foundation of decision-making in programs - they let you ask questions about your data!

---

**Remember:** Every comparison returns a boolean. You're always asking a yes/no question, and you always get a yes/no answer!