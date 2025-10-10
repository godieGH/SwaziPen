# Boolean (Bool) in SwaziLang

## A Simple Question

Before we start, let me ask you something:

**Is the sky blue?**

What's your answer? Yes or No?

**Is 5 greater than 10?**

Again - Yes or No?

**Are you currently reading this document?**

One more time - what's your answer?

---

Notice something? For all these questions, you could only answer in one of **two ways**: Yes or No. True or False.

This is exactly what boolean values represent in programming - simple yes/no, true/false answers.

## What is a Boolean?

A **boolean** (or `bool` in SwaziLang) is the simplest data type. It can only have **two possible values**:

- **`kweli`** - meaning "true" or "yes"
- **`sikweli`** - meaning "false" or "no"

That's it! Just these two values. Nothing else.

```swazi
data ni_siku = kweli;
data ina_mvua = sikweli;
data nina_njaa = kweli;
```

### Quick Check

Can you tell me: What data type would you use for each of these?

1. Someone's age
2. Whether a door is open or closed
3. Someone's name
4. Whether a student passed an exam

<details>
<summary>Think about it, then check</summary>

1. Age → `namba` (it's a number like 25)
2. Door open/closed → `bool` (only two states: kweli or sikweli)
3. Name → `neno` (it's text)
4. Passed exam → `bool` (either passed=kweli or failed=sikweli)

</details>

## Creating Boolean Values

There are several ways to get boolean values:

### 1. Direct Assignment

Simply assign `kweli` or `sikweli`:

```swazi
data ipo = kweli;
data imefungwa = sikweli;

chapisha ipo;         // Prints: kweli
chapisha imefungwa;   // Prints: sikweli
```

### 2. From Comparisons

When you compare things, you get a boolean result:

```swazi
data umri = 20;
data ni_mkubwa = umri > 18;

chapisha ni_mkubwa;  // What do you think this prints?
```

<details>
<summary>Think before clicking</summary>

It prints `kweli` because 20 is indeed greater than 18!

The comparison `umri > 18` asks "Is umri greater than 18?" and the answer is yes (kweli).

</details>

Let's try more comparisons:

```swazi
chapisha 5 sawa 5;      // What will this print?
chapisha 10 > 20;       // How about this?
chapisha "Ali" sawa "Ali";  // And this?
```

<details>
<summary>Check your predictions</summary>

- `5 sawa 5` → kweli (5 equals 5)
- `10 > 20` → sikweli (10 is not greater than 20)
- `"Ali" sawa "Ali"` → kweli (same text)

</details>

### 3. From Expressions

You can combine comparisons:

```swazi
data x = 15;
data y = 10;

data both_positive = (x > 0) na (y > 0);
chapisha both_positive;  // kweli (both are positive)

data either_big = (x > 100) au (y > 100);
chapisha either_big;  // sikweli (neither is > 100)
```

**Question for you:** Before we explain `na` and `au`, can you guess what they might mean based on the code above?

<details>
<summary>Your thinking?</summary>

- `na` means "and" - both conditions must be true
- `au` means "or" - at least one condition must be true

Did you figure it out?

</details>

## Understanding `kweli` and `sikweli`

Let's explore these values more deeply.

### `kweli` (True)

`kweli` is Swahili for "true" or "truth". It represents:
- Yes
- Correct
- Affirmative
- Something that exists or is the case
- A condition that is met

**Think of everyday situations where you'd use "true":**

```swazi
data jua_linawaka = kweli;           // The sun is shining
data nina_kitabu = kweli;            // I have a book
data gari_linaendeshwa = kweli;      // The car is running
```

### `sikweli` (False)

`sikweli` means "not true" or "false". It represents:
- No
- Incorrect
- Negative
- Something that doesn't exist or isn't the case
- A condition that is not met

```swazi
data ina_mvua = sikweli;             // It's not raining
data nina_gari = sikweli;            // I don't have a car
data mlango_umefungwa = sikweli;     // The door is not closed
```

### Language Note

Notice the pattern? In Swahili:
- `kweli` = true
- `si-kweli` = not-true (false)

The prefix "si-" means "not", so `sikweli` literally means "not true"!

## Why Do We Need Booleans?

Great question! Let me show you why booleans are so important.

### Making Decisions

Imagine you're building a program that checks if someone can vote:

```swazi
data umri = 17;
data anaweza_kupiga_kura = umri >= 18;

chapisha anaweza_kupiga_kura;  // sikweli (17 is less than 18)
```

The program needs to **decide** something. Can this person vote or not? The answer is a boolean.

### Representing State

Think about a light switch - it's either ON or OFF:

```swazi
data taa_imewaka = kweli;    // Light is ON
// ... later ...
taa_imewaka = sikweli;       // Light is OFF
```

### Checking Conditions

Is the password correct?

```swazi
data password_iliyoingizwa = "mypass123";
data password_sahihi = "mypass123";

data ni_sahihi = password_iliyoingizwa sawa password_sahihi;
chapisha ni_sahihi;  // kweli
```

**Your turn to think:** What other real-world situations can you think of that are basically yes/no decisions?

<details>
<summary>Some examples to consider</summary>

- Is the user logged in?
- Has the payment been processed?
- Is the file uploaded?
- Did the student pass?
- Is the form complete?
- Is the item in stock?

All of these are boolean questions!

</details>

## Comparison Operators

These operators compare values and give you boolean results:

### Equality

```swazi
chapisha 5 sawa 5;           // kweli (equal)
chapisha 5 sisawa 3;         // kweli (not equal)
chapisha "Ali" sawa "ali";   // sikweli (case matters!)
```

**Question:** Why do you think `"Ali" sawa "ali"` returns `sikweli`?

<details>
<summary>Think about it</summary>

Because uppercase "A" and lowercase "a" are different characters! Computers see them as different unless you convert them to the same case first.

Remember from the Strings chapter: you can use `.herufiNdogo()` to make them both lowercase before comparing!

</details>

### Greater/Less Than

```swazi
chapisha 10 > 5;             // kweli (10 is greater than 5)
chapisha 10 < 5;             // sikweli (10 is not less than 5)
chapisha 10 >= 10;           // kweli (10 is greater than OR equal to 10)
chapisha 5 <= 3;             // sikweli (5 is not less than or equal to 3)
```

### Practice Predictions

Before running these, what do you think they'll output?

```swazi
data alama = 85;

chapisha alama >= 50;        // ?
chapisha alama sawa 100;     // ?
chapisha alama > 80;         // ?
chapisha alama < 90;         // ?
```

<details>
<summary>Check yourself</summary>

- `alama >= 50` → kweli (85 is >= 50)
- `alama sawa 100` → sikweli (85 ≠ 100)
- `alama > 80` → kweli (85 > 80)
- `alama < 90` → kweli (85 < 90)

How did you do?

</details>

## Logical Operators

These let you combine boolean values:

### `na` (AND)

Both conditions must be true:

```swazi
chapisha kweli na kweli;       // kweli
chapisha kweli na sikweli;     // sikweli
chapisha sikweli na kweli;     // sikweli
chapisha sikweli na sikweli;   // sikweli
```

**Think about it like this:** Both sides must be true for the result to be true.

Real example:

```swazi
data umri = 20;
data ana_kitambulisho = kweli;

data anaweza_kuingia = (umri >= 18) na ana_kitambulisho;
// You need BOTH: to be 18+ AND to have ID
```

### `au` (OR)

At least one condition must be true:

```swazi
chapisha kweli au kweli;       // kweli
chapisha kweli au sikweli;     // kweli
chapisha sikweli au kweli;     // kweli
chapisha sikweli au sikweli;   // sikweli
```

**Think about it like this:** If either side is true, the result is true.

Real example:

```swazi
data ni_wikendi = sikweli;
data ni_likizo = kweli;

data ruhusa_ya_kupumzika = ni_wikendi au ni_likizo;
// You can rest if it's weekend OR holiday (or both!)
```

### `!` (NOT)

Flips the value - true becomes false, false becomes true:

```swazi
chapisha !kweli;               // sikweli
chapisha !sikweli;             // kweli

data mlango_umefungwa = sikweli;
chapisha !mlango_umefungwa;    // kweli (not closed = open!)
```

**Your Challenge:** What will these print?

```swazi
data x = kweli;
data y = sikweli;

chapisha !x;
chapisha !y;
chapisha !(x na y);
chapisha !(x au y);
```

<details>
<summary>Work through it</summary>

- `!x` → sikweli (opposite of kweli)
- `!y` → kweli (opposite of sikweli)
- `!(x na y)` → !(kweli na sikweli) → !sikweli → kweli
- `!(x au y)` → !(kweli au sikweli) → !kweli → sikweli

</details>

## Combining Comparisons

You can create complex conditions:

```swazi
data umri = 25;
data alama = 85;

// Must be 18+ AND have score 50+
data amestahili = (umri >= 18) na (alama >= 50);
chapisha amestahili;  // kweli (both conditions met)
```

```swazi
data bei = 150;

// Too cheap (< 100) OR too expensive (> 200)
data bei_mbaya = (bei < 100) au (bei > 200);
chapisha bei_mbaya;  // sikweli (150 is in good range)
```

**Think about this:** How would you check if a number is between 10 and 20?

<details>
<summary>One way to think about it</summary>

```swazi
data namba = 15;
data ni_katikati = (namba >= 10) na (namba <= 20);
chapisha ni_katikati;  // kweli
```

It must be BOTH: >= 10 AND <= 20.

</details>

## Truthy and Falsy Values

Here's something interesting: In SwaziLang, values of other types can be treated as "truthy" or "falsy".

### Falsy Values (act like `sikweli`)

These values are considered "false-like":
- `0` (the number zero)
- `""` (empty string)
- `tupu` (null/undefined)

```swazi
data x = 0;
chapisha Bool(x);  // sikweli (zero is falsy)

data text = "";
chapisha Bool(text);  // sikweli (empty string is falsy)
```

### Truthy Values (act like `kweli`)

Everything else is "true-like":
- Any non-zero number
- Any non-empty string
- Any object or array

```swazi
data y = 5;
chapisha Bool(y);  // kweli (non-zero is truthy)

data name = "Ali";
chapisha Bool(name);  // kweli (non-empty string is truthy)
```

**Why does this matter?** Sometimes you want to check "is there something?" rather than checking a specific boolean:

```swazi
data jina = "";

// Instead of checking if empty
data lipo = jina sisawa "";

// You can just convert to boolean
data lipo2 = Bool(jina);
// Empty string becomes sikweli, non-empty becomes kweli
```

## Practical Examples

Let's see booleans in real scenarios:

### Example 1: Age Verification

```swazi
data umri = 16;

data ni_mtoto = umri < 13;
data ni_kijana = (umri >= 13) na (umri < 18);
data ni_mtu_mzima = umri >= 18;

chapisha `Ni mtoto: ${ni_mtoto}`;           // sikweli
chapisha `Ni kijana: ${ni_kijana}`;         // kweli
chapisha `Ni mtu mzima: ${ni_mtu_mzima}`;   // sikweli
```

### Example 2: Password Strength

```swazi
data password = "MyPass123";

data ni_ndefu = password.herufi >= 8;
data ina_namba = password.kuna("1") au password.kuna("2") au password.kuna("3");

data ni_imara = ni_ndefu na ina_namba;
chapisha `Password ni imara: ${ni_imara}`;  // kweli
```

### Example 3: Temperature Check

```swazi
data joto = 37.5;

data ni_kawaida = (joto >= 36.1) na (joto <= 37.2);
data ni_homa = joto > 37.5;
data ni_baridi = joto < 36.1;

chapisha `Joto la kawaida: ${ni_kawaida}`;  // sikweli
chapisha `Homa: ${ni_homa}`;                 // sikweli (37.5 is not > 37.5)
chapisha `Baridi: ${ni_baridi}`;             // sikweli
```

**What do you notice about these three booleans?** Can more than one be true at a time?

<details>
<summary>Think about it</summary>

No! Only one can be true at any time because:
- If it's normal range, it can't be fever or cold
- If it's fever, it can't be normal or cold
- If it's cold, it can't be normal or fever

These are **mutually exclusive** conditions - they can't overlap.

</details>

### Example 4: Form Validation

```swazi
data username = "ali123";
data email = "ali@example.com";
data age_text = "25";

// Validation checks
data username_halali = username.herufi >= 5;
data email_halali = email.kuna("@") na email.kuna(".");
data age_number = Namba(age_text);
data age_halali = !age_number.siSahihi na age_number >= 18;

// Overall form validity
data form_ni_sahihi = username_halali na email_halali na age_halali;

chapisha `Form ni sahihi: ${form_ni_sahihi}`;  // kweli
```

## Common Patterns

### Pattern 1: Range Checking

```swazi
data alama = 75;

// Between 0 and 100
data ni_halali = (alama >= 0) na (alama <= 100);
```

### Pattern 2: Multiple Conditions

```swazi
data siku = "Jumamosi";

// Is it a weekend?
data ni_wikendi = (siku sawa "Jumamosi") au (siku sawa "Jumapili");
```

### Pattern 3: Negating Complex Conditions

```swazi
data umri = 15;
data ana_idhini = sikweli;

// Can't enter if under 18 AND no permission
data hawawezi_kuingia = (umri < 18) na !ana_idhini;
```

### Pattern 4: Flag Variables

```swazi
data imesajiliwa = sikweli;
data imefaulu = sikweli;

// Later in program
imesajiliwa = kweli;  // User registered
// ... more code ...
imefaulu = kweli;     // User passed
```

## Understanding Boolean Logic

Let's visualize how `na` and `au` work:

### Truth Table for `na` (AND)

| Left | Right | Result |
|------|-------|--------|
| kweli | kweli | kweli |
| kweli | sikweli | sikweli |
| sikweli | kweli | sikweli |
| sikweli | sikweli | sikweli |

**Pattern:** Only all `kweli` gives `kweli`

### Truth Table for `au` (OR)

| Left | Right | Result |
|------|-------|--------|
| kweli | kweli | kweli |
| kweli | sikweli | kweli |
| sikweli | kweli | kweli |
| sikweli | sikweli | sikweli |

**Pattern:** Any `kweli` gives `kweli`

### Truth Table for `!` (NOT)

| Value | Result |
|-------|--------|
| kweli | sikweli |
| sikweli | kweli |

**Pattern:** Just flips it!

## Practice Challenges

Test your understanding:

### Challenge 1
What will this print?

```swazi
data x = 10;
data y = 20;
chapisha (x > 5) na (y > 15);
```

<details>
<summary>Think first</summary>

`kweli` - because both conditions are true:
- x > 5 → 10 > 5 → kweli
- y > 15 → 20 > 15 → kweli
- kweli na kweli → kweli

</details>

### Challenge 2
What about this?

```swazi
data a = 5;
data b = 5;
data c = 10;
chapisha (a sawa b) au (a sawa c);
```

<details>
<summary>Work it out</summary>

`kweli` - because:
- a sawa b → 5 sawa 5 → kweli
- a sawa c → 5 sawa 10 → sikweli
- kweli au sikweli → kweli

Only one needs to be true for `au`!

</details>

### Challenge 3
How would you check if a number is NOT between 10 and 20?

<details>
<summary>Think about it</summary>

```swazi
data namba = 25;
data si_katikati = (namba < 10) au (namba > 20);
chapisha si_katikati;  // kweli (25 is > 20)
```

It's outside if it's EITHER too small OR too large!

Alternatively:
```swazi
data katikati = (namba >= 10) na (namba <= 20);
data si_katikati = !katikati;
```

</details>

### Challenge 4
Create a boolean that checks if a string is a valid name (not empty and only contains letters, no numbers):

<details>
<summary>One approach</summary>

```swazi
data jina = "Hassan";

data si_tupu = jina.herufi > 0;
data hakuna_namba = !jina.kuna("0") na !jina.kuna("1") na !jina.kuna("2") 
                    na !jina.kuna("3") na !jina.kuna("4") na !jina.kuna("5") 
                    na !jina.kuna("6") na !jina.kuna("7") na !jina.kuna("8") 
                    na !jina.kuna("9");

data ni_halali = si_tupu na hakuna_namba;
```

(There are more elegant ways once you learn loops!)

</details>

## Common Mistakes to Avoid

### Mistake 1: Confusing Assignment with Comparison

```swazi
data x = 5;

// ❌ Wrong - this assigns 10 to x
data result = (x = 10);

// ✅ Correct - this compares x with 10
data result = (x sawa 10);
```

### Mistake 2: Forgetting Parentheses

```swazi
data a = 5;
data b = 10;

// Might not work as expected
data result = a > 3 na b < 15;

// Better - clearer intention
data result = (a > 3) na (b < 15);
```

### Mistake 3: Using `sawa` for Strings Without Case Handling

```swazi
// ❌ This might fail
data match = "Hassan" sawa "hassan";  // sikweli

// ✅ Better
data match = "Hassan".herufiNdogo() sawa "hassan";  // kweli
```

## Key Takeaways

Before moving on, make sure you understand:

1. **Two values only:** Booleans can only be `kweli` or `sikweli`

2. **From comparisons:** You get booleans when you compare things (`>`, `<`, `sawa`, etc.)

3. **Logical operators:**
   - `na` = both must be true
   - `au` = at least one must be true
   - `!` = opposite

4. **Truthy/Falsy:** Other values can act like booleans (0, "", tupu are falsy)

5. **No methods or properties:** Unlike numbers and strings, booleans don't have methods - they're just true or false!

## Reflection Questions

Think about these:

1. **Why do we need both `na` and `au`?** Can you think of situations where each is more appropriate?

2. **What's the difference between `sawa` and `sisawa`?** How is `sisawa` related to `!` ?

3. **In everyday life, when do you make yes/no decisions?** How would you represent those as booleans?

<details>
<summary>Some thoughts</summary>

1. We need both because they represent different logical relationships:
   - `na` for "all conditions must be met" (stricter)
   - `au` for "any condition can be met" (more flexible)

2. `sisawa` checks if things are NOT equal. It's like saying `!(x sawa y)` but more readable!

3. Examples: Is the door locked? Are you hungry? Did you finish homework? All yes/no → boolean!

</details>

## What's Next?

You now understand booleans - the foundation of decision-making in programs! Next, you'll learn about:
- **Null type** - Representing "nothing" or "unknown" values
- **Operations** - More ways to work with all data types
- Using booleans to make decisions (in later chapters)

Understanding booleans is crucial because every program needs to make decisions. You'll use them constantly!

---

**Remember:** Booleans are simple but powerful - just two values that answer the fundamental question: "Is it true or false?"