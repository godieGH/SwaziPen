# Strings (Neno) in SwaziLang

## What You Already Know

You've learned that `neno` is SwaziLang's data type for text. You know how to create strings:

```swazi
data jina = "Amina";
data ujumbe = 'Habari!';
```

But here's a question: What can you actually *do* with text in a program?

Think about text you interact with every day:
- Search boxes that find words in documents
- Uppercase/lowercase conversions in forms
- Finding and replacing words in messages
- Counting characters in tweets or texts

All of these involve manipulating strings! Let's explore how SwaziLang gives you the power to work with text.

## Understanding Strings as Sequences

Before we dive into methods, let's think about what a string really is.

Look at the word: **"HABARI"**

What do you notice about it?
- It has 6 letters (or characters)
- Each letter has a position: H is first, A is second, B is third...
- You can read it from left to right

A string in programming works the same way - it's a *sequence* of characters in a specific order.

### Quick Exploration

```swazi
data neno = "Swazi";
```

Can you answer these without running code?
- How many characters are in this string?
- What's the first character?
- What's the last character?

<details>
<summary>Check your thinking</summary>

- 5 characters: S-w-a-z-i
- First character: S
- Last character: i

</details>

## The `.herufi` Property - String Length

Every string knows how long it is! Use the `.herufi` property to find out:

```swazi
data jina = "Hassan";
chapisha jina.herufi;  // Prints: 6

data tupu = "";
chapisha tupu.herufi;  // Prints: 0

data ujumbe = "Habari yako!";
chapisha ujumbe.herufi;  // Prints: 12
```

**Note:** `.herufi` counts *all* characters including spaces and punctuation!
:::info
- You can also use `str.urefu()` to get the size of characters in a string
:::

### Your Turn

Without running the code, what will these print?

```swazi
chapisha "Hello".herufi;
chapisha "Hello World".herufi;
chapisha " ".herufi;
```

<details>
<summary>Check your predictions</summary>

- `"Hello".herufi` → 5
- `"Hello World".herufi` → 11 (the space counts!)
- `" ".herufi` → 1 (a single space is still a character)

</details>

### Real-World Use

When might you need to know the length of text?

```swazi
data password = "mypass";

// Check if password is long enough
chapisha password.herufi;  // 6 characters

// Is it at least 8 characters?
data ni_ndefu = password.herufi >= 8;
chapisha ni_ndefu;  // sikweli (only 6 characters)
```

Think about social media apps - they often show "280 characters remaining". They're using `.herufi` to calculate that!

## Case Conversion Methods

### `.herufiNdogo()` - Convert to Lowercase

Makes all letters lowercase:

```swazi
data jina = "HASSAN";
chapisha jina.herufiNdogo();  // Prints: hassan

data mixed = "HaBaRi";
chapisha mixed.herufiNdogo();  // Prints: habari
```

**Important:** This creates a *new* string. The original doesn't change:

```swazi
data asili = "KUBWA";
data mpya = asili.herufiNdogo();

chapisha asili;  // Still prints: KUBWA
chapisha mpya;   // Prints: kubwa
```

### `.herufiKubwa()` - Convert to Uppercase

Makes all letters uppercase:

```swazi
data jina = "amina";
chapisha jina.herufiKubwa();  // Prints: AMINA

data sauti = "help!";
chapisha sauti.herufiKubwa();  // Prints: HELP!
```

### Why Do We Need Case Conversion?

Great question! Let me show you:

```swazi
data input1 = "Hassan";
data input2 = "hassan";

chapisha input1 sawa input2;  // Prints: sikweli (they're different!)
```

Even though they look similar to us, computers see uppercase and lowercase as completely different. Case conversion helps us compare text fairly:

```swazi
data input1 = "Hassan";
data input2 = "hassan";

// Compare them both in lowercase
chapisha input1.herufiNdogo() sawa input2.herufiNdogo();  // Prints: kweli!
```

**Real-world example:** Search functionality

```swazi
data search_query = "swazi";
data title1 = "Learning SwaziLang";
data title2 = "Python Programming";

// Check if title contains search term (case-insensitive)
chapisha title1.herufiNdogo().kuna(search_query);  // kweli
chapisha title2.herufiNdogo().kuna(search_query);  // sikweli
```

## Trimming Whitespace

### `.sawazisha()` - Remove Leading and Trailing Spaces

Removes spaces from the beginning and end of a string:

```swazi
data messy = "   hello   ";
chapisha messy.sawazisha();  // Prints: "hello"

data name = "  Amina  ";
chapisha name.sawazisha();  // Prints: "Amina"
```

**What about spaces in the middle?**

```swazi
data text = "  hello world  ";
chapisha text.sawazisha();  // Prints: "hello world"
// Notice: middle space stays!
```

### Why Is This Useful?

Think about form inputs. Users often accidentally add spaces:

```swazi
// User types "  hassan  " in a form
data input = "  hassan  ";

// Clean it up
data clean = input.sawazisha();
chapisha clean;  // "hassan" - much better!
```

**Your Challenge:** What happens with this?

```swazi
data weird = "   ";
chapisha weird.herufi;
chapisha weird.sawazisha().herufi;
```

<details>
<summary>Think it through</summary>

- `weird.herufi` → 3 (three spaces)
- `weird.sawazisha().herufi` → 0 (all spaces removed, empty string!)

</details>

## Checking String Content

### `.huanzaNa(prefix)` - Does it Start With?

Checks if a string begins with specific text:

```swazi
data jina = "Hassan";

chapisha jina.huanzaNa("H");      // kweli
chapisha jina.huanzaNa("Has");    // kweli
chapisha jina.huanzaNa("san");    // sikweli (not at start)
chapisha jina.huanzaNa("h");      // sikweli (case matters!)
```

**Case sensitivity:** Notice how "H" works but "h" doesn't? Let's fix that:

```swazi
data jina = "Hassan";

// Check in lowercase
chapisha jina.herufiNdogo().huanzaNa("h");  // kweli!
```

### `.huishaNa(suffix)` - Does it End With?

Checks if a string ends with specific text:

```swazi
data file = "document.pdf";

chapisha file.huishaNa(".pdf");    // kweli
chapisha file.huishaNa(".docx");   // sikweli
chapisha file.huishaNa("pdf");     // kweli (works without dot too)
```

**Practical use:** File type checking!

```swazi
data filename = "photo.jpg";

chapisha filename.huishaNa(".jpg");   // kweli
chapisha filename.huishaNa(".png");   // sikweli
```

### `.kuna(substring)` - Does it Contain?

Checks if a string contains specific text *anywhere*:

```swazi
data ujumbe = "Habari ya asubuhi";

chapisha ujumbe.kuna("Habari");     // kweli (at start)
chapisha ujumbe.kuna("asubuhi");    // kweli (at end)
chapisha ujumbe.kuna("ya");         // kweli (in middle)
chapisha ujumbe.kuna("jioni");      // sikweli (not there)
```

### Comparing These Three Methods

Let's see the difference clearly:

```swazi
data text = "SwaziLang";

chapisha text.huanzaNa("Swazi");    // kweli - starts with
chapisha text.huishaNa("Lang");     // kweli - ends with
chapisha text.kuna("Lang");         // kweli - contains

chapisha text.huanzaNa("Lang");     // sikweli - doesn't start with this
chapisha text.huishaNa("Swazi");    // sikweli - doesn't end with this
chapisha text.kuna("Swazi");        // kweli - but does contain it!
```

**Your Turn:** Can you predict these?

```swazi
data neno = "programming";

neno.huanzaNa("pro");
neno.huishaNa("ing");
neno.kuna("gram");
neno.huanzaNa("gram");
```

<details>
<summary>Check yourself</summary>

- `huanzaNa("pro")` → kweli
- `huishaNa("ing")` → kweli
- `kuna("gram")` → kweli (it's in the middle)
- `huanzaNa("gram")` → sikweli (not at the start)

</details>

## Finding Text Positions

### `.tafuta(substring)` - Find Position

Returns the position where text is found (or -1 if not found):

```swazi
data text = "Habari yako";

chapisha text.tafuta("yako");     // Prints: 7
chapisha text.tafuta("Habari");   // Prints: 0 (starts at position 0!)
chapisha text.tafuta("jambo");    // Prints: -1 (not found)
```

**Important:** Positions start at 0, not 1!

```
H a b a r i   y a k o
0 1 2 3 4 5 6 7 8 9 10
```

So "yako" starts at position 7.

**Searching from a specific position:**

```swazi
data text = "ana ana ana";

chapisha text.tafuta("ana");       // Prints: 0 (first occurrence)
chapisha text.tafuta("ana", 1);    // Prints: 4 (search starts from position 1)
chapisha text.tafuta("ana", 5);    // Prints: 8 (search starts from position 5)
```

### Why Is This Useful?

Imagine checking if an email address has "@":

```swazi
data email = "user@example.com";

data at_position = email.tafuta("@");
chapisha at_position;  // 4

// If -1, no @ symbol found - invalid email!
```

## Extracting Parts of Strings

### `.slesi(start, end)` - Slice/Substring

Extracts a portion of a string:

```swazi
data text = "SwaziLang";

chapisha text.slesi(0, 5);    // Prints: "Swazi"
chapisha text.slesi(5, 9);    // Prints: "Lang"
chapisha text.slesi(5);       // Prints: "Lang" (to end if no end specified)
```

**Understanding positions:**

```
S w a z i L a n g
0 1 2 3 4 5 6 7 8 9
```

`.slesi(0, 5)` means: start at position 0, stop *before* position 5.

**Negative positions** (count from the end):

```swazi
data text = "SwaziLang";

chapisha text.slesi(-4);      // Prints: "Lang" (last 4 characters)
chapisha text.slesi(0, -4);   // Prints: "Swazi" (everything except last 4)
```

**Your Challenge:** Extract just "wazi" from "SwaziLang"

<details>
<summary>One solution</summary>

```swazi
data text = "SwaziLang";
chapisha text.slesi(1, 5);  // "wazi"
```

Starting at position 1 (w) and stopping before position 5 (L).

</details>

### `.herufiYa(index)` - Get Character at Position

Gets a single character at a specific position:

```swazi
data neno = "Habari";

chapisha neno.herufiYa(0);    // Prints: "H"
chapisha neno.herufiYa(3);    // Prints: "a"
chapisha neno.herufiYa(10);   // Prints: "" (empty - position doesn't exist)
```

**Quick Exercise:** How would you get the last character of any string?

Think about it before looking...

<details>
<summary>Hint and solution</summary>

*Hint:* Use `.herufi` to find the length, then subtract 1 for the last position.

```swazi
data text = "Swazi";
data last = text.herufiYa(text.herufi - 1);
chapisha last;  // "i"
```

Why subtract 1? Because positions start at 0!

</details>

## Replacing Text

### `.badilisha(old, new)` - Replace First Occurrence

Replaces the *first* occurrence of text:

```swazi
data text = "ana ana ana";

chapisha text.badilisha("ana", "nina");  // Prints: "nina ana ana"
```

Notice: Only the first "ana" changed!

### `.badilishaZote(old, new)` - Replace All Occurrences

Replaces *all* occurrences:

```swazi
data text = "ana ana ana";

chapisha text.badilishaZote("ana", "nina");  // Prints: "nina nina nina"
```

All instances changed!

### Real-World Example: Text Correction

```swazi
data essay = "I like programing. Programing is fun. Programing helps me.";

// Fix spelling error (note the missing 'm')
data fixed = essay.badilishaZote("programing", "programming");
chapisha fixed;
// "I like programming. Programming is fun. Programming helps me."
```

**Your Turn:** What's the difference between these?

```swazi
data text = "hello hello hello";

text.badilisha("hello", "hi");
text.badilishaZote("hello", "hi");
```

<details>
<summary>Think about it</summary>

- `.badilisha()` → "hi hello hello" (only first one)
- `.badilishaZote()` → "hi hi hi" (all of them)

</details>

## Combining and Repeating

### `.unganisha(other)` - Concatenate

Joins two strings together:

```swazi
data jina_kwanza = "Hassan";
data jina_mwisho = "Ali";

data jina_kamili = jina_kwanza.unganisha(" ").unganisha(jina_mwisho);
chapisha jina_kamili;  // "Hassan Ali"
```

**But wait!** You already know an easier way:

```swazi
data jina_kamili = jina_kwanza + " " + jina_mwisho;
chapisha jina_kamili;  // "Hassan Ali"
```

So when would you use `.unganisha()`? It's useful when chaining methods:

```swazi
data first = "hello";
data full = first.herufiKubwa().unganisha(" WORLD");
chapisha full;  // "HELLO WORLD"
```

### `.rudia(n)` - Repeat String

Repeats a string n times:

```swazi
data star = "*";
chapisha star.rudia(5);       // Prints: "*****"

data laugh = "ha";
chapisha laugh.rudia(3);      // Prints: "hahaha"

data line = "-";
chapisha line.rudia(20);      // Prints: "--------------------"
```

**Creative uses:**

```swazi
// Create a border
data border = "=".rudia(30);
chapisha border;
chapisha "TITLE";
chapisha border;
```

Output:
```
==============================
TITLE
==============================
```

**What happens with 0 or negative numbers?**

```swazi
chapisha "x".rudia(0);    // "" (empty string)
chapisha "x".rudia(-5);   // "" (empty string)
```

## Splitting Strings into Parts

### `.orodhesha(separator)` - Split into Array

Splits a string into multiple parts. Don't worry if you haven't learned about arrays yet - just know this creates a list of parts.

**Split by spaces:**

```swazi
data sentence = "Habari ya asubuhi";
data parts = sentence.orodhesha(" ");

// This creates a list: ["Habari", "ya", "asubuhi"]
```

**Split by commas:**

```swazi
data names = "Ali,Fatuma,Hassan,Zaina";
data list = names.orodhesha(",");

// Creates: ["Ali", "Fatuma", "Hassan", "Zaina"]
```

**Split into individual characters (no separator):**

```swazi
data word = "Swazi";
data letters = word.orodhesha("");

// Creates: ["S", "w", "a", "z", "i"]
```

We'll explore working with these lists in detail when we learn about arrays. For now, just understand that `.orodhesha()` breaks text into pieces.

## Putting It All Together

Let's combine multiple string methods to solve real problems!

### Example 1: Username Validator

```swazi
data username = "  Hassan123  ";

// Clean and standardize
data clean = username.sawazisha().herufiNdogo();
chapisha clean;  // "hassan123"

// Check length
data ni_ndefu = clean.herufi >= 5;
chapisha `Urefu ni sahihi: ${ni_ndefu}`;  // kweli

// Check if it contains numbers
data ina_namba = clean.kuna("1") au clean.kuna("2") au clean.kuna("3");
chapisha `Ina namba: ${ina_namba}`;  // kweli
```

### Example 2: Email Simple Check

```swazi
data email = "user@example.com";

// Convert to lowercase for checking
data email_clean = email.herufiNdogo();

// Basic checks
data ina_at = email_clean.kuna("@");
data ina_dot = email_clean.kuna(".");

chapisha `Email ina @: ${ina_at}`;     // kweli
chapisha `Email ina .: ${ina_dot}`;    // kweli

// Find @ position
data at_pos = email_clean.tafuta("@");
data before_at = email_clean.slesi(0, at_pos);
chapisha `Jina la mtumiaji: ${before_at}`;  // "user"
```

### Example 3: Title Formatter

```swazi
data title = "introduction to swazilang programming";

// Capitalize first letter (simple approach)
data first = title.herufiYa(0).herufiKubwa();
data rest = title.slesi(1);
data formatted = first.unganisha(rest);

chapisha formatted;  // "Introduction to swazilang programming"
```

### Example 4: Censoring Words

```swazi
data message = "This is a bad word in my message";
data censored = message.badilishaZote("bad", "***");

chapisha censored;  // "This is a *** word in my message"
```

## Practice Challenges

Now it's your turn! Try to solve these before looking at hints:

### Challenge 1: Count Words
How would you count how many words are in a sentence? (Hint: think about splitting by spaces)

<details>
<summary>Approach to consider</summary>

```swazi
data sentence = "Habari ya asubuhi";
data words = sentence.orodhesha(" ");
// The number of parts = number of words
// We'll learn how to count array elements in the Arrays chapter!
```

</details>

### Challenge 2: Check File Extension
Write code that checks if a filename ends with ".txt" or ".pdf"

<details>
<summary>One solution</summary>

```swazi
data filename = "document.pdf";
data ni_pdf = filename.huishaNa(".pdf");
data ni_txt = filename.huishaNa(".txt");

chapisha ni_pdf au ni_txt;  // kweli if either
```

</details>

### Challenge 3: Extract Domain from Email
Given "user@example.com", extract just "example.com"

<details>
<summary>Hint and solution</summary>

*Hint:* Find the @ position, then slice everything after it.

```swazi
data email = "user@example.com";
data at_pos = email.tafuta("@");
data domain = email.slesi(at_pos + 1);
chapisha domain;  // "example.com"
```

Why +1? To skip the @ symbol itself!

</details>

### Challenge 4: Palindrome Checker
How would you check if a word reads the same forwards and backwards? (Like "radar")

Think about what tools you have...

<details>
<summary>Think it through</summary>

You'd need to reverse the string and compare! Unfortunately, SwaziLang doesn't have a built-in reverse method, but you could:
1. Split into characters
2. Rearrange them (we'll learn this with arrays!)
3. Join them back
4. Compare with original

We'll be able to do this better once we learn about arrays and loops!

</details>

## Common Patterns and Tips

### Pattern 1: Case-Insensitive Comparison

```swazi
data input = "SWAZI";
data correct = "swazi";

// Always compare in same case
chapisha input.herufiNdogo() sawa correct.herufiNdogo();  // kweli
```

### Pattern 2: Cleaning User Input

```swazi
data input = "  Hassan  ";

// Clean it up
data clean = input.sawazisha().herufiNdogo();
// Now it's ready to use!
```

### Pattern 3: Building Formatted Output

```swazi
data name = "Hassan";
data age = 25;

// Method chaining
data formatted = "Name: ".unganisha(name).unganisha(", Age: ").unganisha(Neno(age));
chapisha formatted;  // "Name: Hassan, Age: 25"

// Or simpler with template strings:
chapisha `Name: ${name}, Age: ${age}`;  // Same result!
```

### Pattern 4: Checking Multiple Conditions

```swazi
data password = "MyPass123";

data ni_ndefu = password.herufi >= 8;
data ina_namba = password.kuna("1") au password.kuna("2") au password.kuna("3");
data ina_kubwa = password.kuna("M") au password.kuna("P");

data ni_sahihi = ni_ndefu na ina_namba na ina_kubwa;
chapisha `Password ni sahihi: ${ni_sahihi}`;
```

## Important Things to Remember

### 1. Strings Don't Change (Immutable)

```swazi
data asili = "hello";
data mpya = asili.herufiKubwa();

chapisha asili;  // Still "hello"
chapisha mpya;   // "HELLO"
```

Methods return *new* strings; they don't modify the original!

### 2. Positions Start at 0

```
H e l l o
0 1 2 3 4
```

Not 1, 2, 3, 4, 5!

### 3. Case Matters

```swazi
chapisha "Hello" sawa "hello";  // sikweli
```

Unless you convert to same case first!

### 4. Empty Strings Are Valid

```swazi
data empty = "";
chapisha empty.herufi;  // 0
chapisha empty.kuna("x");  // sikweli
```

## Reflection Questions

Before moving on, think about these:

1. **Why is `.sawazisha()` useful for form inputs?**
   
2. **When would you use `.badilisha()` vs `.badilishaZote()`?**

3. **How would you check if a string is empty?**

4. **What's the advantage of using `.herufiNdogo()` before comparing strings?**

<details>
<summary>Some thoughts</summary>

1. Users often add extra spaces by accident - cleaning them up improves data quality

2. Use `.badilisha()` when you only want to change the first occurrence (like replacing a title once), and `.badilishaZote()` when you want to change all instances (like fixing a repeated spelling error)

3. Check if `.herufi` equals 0, or just compare with `""`

4. It makes comparisons case-insensitive, which is usually what users expect (searching for "swazi" should find "Swazi")

</details>

## What's Next?

You now have powerful tools for working with text! Next, you'll learn about:
- **Boolean data type** - Understanding true/false values in depth
- **Null type** - Working with "nothing" values
- **Operations** - More ways to work with all data types together

Understanding strings deeply is crucial because almost every program works with text - user input, messages, file names, data display, and more!

---

**Key Takeaway:** Strings in SwaziLang aren't just passive text - they're objects with properties and methods that let you search, transform, extract, and manipulate text in powerful ways!