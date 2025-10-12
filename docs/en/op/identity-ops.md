# Identity Operators in SwaziLang

## What Are Identity Operators?

You already know how to compare values using comparison operators (`>`, `<`, `sawa`, etc.) and how to combine conditions using logical operators (`na`, `au`, `!`).

But there are some special operators that do unique things in SwaziLang. These are **identity operators** - they help you check specific relationships or create special syntax patterns.

## Quick Reference

| Operator/Keyword | Purpose | Status |
|------------------|---------|--------|
| `sawa` | Check equality | Already covered in Comparisons |
| `sisawa` | Check inequality | Already covered in Comparisons |
| `ni` | Syntax sugar for assignments in conditions | We'll cover this now |
| `katika` | Loop membership checking | We'll cover this with loops later |

## The `ni` Keyword - Syntax Sugar for Conditions

The `ni` keyword is a special operator that lets you assign a condition's result to a variable and use it in the same statement. It's syntax sugar - a shortcut that makes code more readable.

### How `ni` Works

**Basic syntax:**
```swazi
kama x ni condition :
  // x is available here as kweli or sikweli
```

What `ni` does:
1. Evaluates the condition on the right
2. Assigns the result (`kweli` or `sikweli`) to the variable on the left
3. Makes that variable available in the scope of the statement

### Simple Example

```swazi
data age = 20;

// Without ni:
data is_adult = age >= 18;
kama is_adult {
    chapisha "Wewe ni mtu mzima";
}

// With ni - cleaner!
kama age ni age >= 18 {
    chapisha "Wewe ni mtu mzima";
}
```

Wait, that looks a bit weird because we're using `age` twice. Let me show a better example:

### Better Example: Making a Variable Available

```swazi
data temperature = 37.5;

// This creates a variable `is_fever` and uses it
kama is_fever ni temperature > 37.5 {
    chapisha "Una homa";
}

// Now `is_fever` is available in this block as kweli or sikweli
```

This is equivalent to:
```swazi
data temperature = 37.5;
data is_fever = temperature > 37.5;

kama is_fever {
    chapisha "Una homa";
}
```

But more concise!

### The Power of `ni`: Multiple Levels

You can nest `ni` assignments:

```swazi
data score1 = 85;
data score2 = 90;

kama avg ni (score1 + score2) / 2 {
    chapisha `Average: ${avg}`;
}

// Or with a condition:
kama high_average ni ((score1 + score2) / 2) > 80 {
    chapisha "Both students performed well";
}
```

Here, the variable `high_average` gets the result of whether the average is greater than 80.

### When to Use `ni`

Use `ni` when:
1. You want to make the result available in a scope
2. You want cleaner, more readable code
3. You're checking a result and want to reference it

```swazi
data password = "mypass";
data min_length = 8;

// Check if password is long enough and use that result
kama password_ok ni password.herufi >= min_length {
    chapisha "Password accepted";
}
```

### The Flow with `ni`

```swazi
kama result ni condition :
  // Inside this block, result is kweli or sikweli based on condition
  // You can use result here
vinginevyo:
  // Here, result is the opposite value
  // So if it was kweli above, it's sikweli here
```

## Real-World Examples

### Example 1: User Registration

```swazi
data email = "user@example.com";
data min_age = 18;
data age = 25;

kama email_valid ni email.kuna("@") {
    chapisha "Email format valid";
}

kama age_valid ni age >= min_age {
    chapisha "Age requirement met";
}
```

### Example 2: File Type Checking

```swazi
data filename = "photo.jpg";

kama ni_image ni filename.huishaNa(".jpg") au 
               filename.huishaNa(".png") au 
               filename.huishaNa(".gif") {
    chapisha "File is an image";
}

vinginevyo {
    chapisha "File is not an image";
}
```

### Example 3: Access Control

```swazi
data user_role = "editor";

kama is_editor ni user_role sawa "editor" {
    chapisha "Editor access granted";
}

kama is_admin ni user_role sawa "admin" {
    chapisha "Admin access granted";
}
```

### Example 4: Range Checking

```swazi
data score = 85;

kama in_range ni (score >= 0) na (score <= 100) {
    chapisha "Score is valid";
}

vinginevyo {
    chapisha "Score out of range";
}
```

## Understanding the Scope

One important thing about `ni`: the variable you create is only available within that block:

```swazi
kama is_valid ni password.herufi > 8 {
    chapisha is_valid;  // kweli (available here)
}

chapisha is_valid;  // Error! is_valid doesn't exist outside the block
```

If you need the variable outside the block, create it separately:

```swazi
data is_valid = password.herufi > 8;

kama is_valid {
    chapisha is_valid;  // kweli
}

chapisha is_valid;  // Still works - exists in outer scope
```

## `ni` with Logical Operators

You can use `ni` with complex conditions:

```swazi
data age = 20;
data has_license = kweli;

kama can_drive ni (age >= 18) na has_license {
    chapisha "Can drive";
}
```

## Future: `katika` Operator

**Note:** The `katika` operator is used to check if a value is "in" a collection (like an array). For example:

```swazi
// We'll learn this when we study loops and arrays
kwa item katika items {
    // Do something with each item
}
```

For now, just know it exists and we'll cover it in detail when we learn about loops and arrays.

## Comparison: With and Without `ni`

### Scenario: Checking Login

**Without `ni`:**
```swazi
data username = "hassan";
data password = "pass123";

data username_correct = username sawa "hassan";
data password_correct = password sawa "pass123";

data login_ok = username_correct na password_correct;

kama login_ok {
    chapisha "Login successful";
}
```

**With `ni`:**
```swazi
data username = "hassan";
data password = "pass123";

kama login_ok ni (username sawa "hassan") na (password sawa "pass123") {
    chapisha "Login successful";
}
```

Both work the same way, but `ni` is more concise.

## Practice Challenges

### Challenge 1: Simple Condition with `ni`

Use `ni` to check if a number is positive:

<details>
<summary>Try it first</summary>

```swazi
data number = 42;

kama is_positive ni number > 0 {
    chapisha "Number is positive";
}
```

</details>

### Challenge 2: String Validation with `ni`

Check if a username is valid (not empty AND at least 3 characters):

<details>
<summary>Solution</summary>

```swazi
data username = "ali";

kama username_valid ni (username.herufi > 0) na (username.herufi >= 3) {
    chapisha "Username is valid";
}
```

</details>

### Challenge 3: Multiple Conditions

Check if someone can vote (18+) and is registered:

<details>
<summary>Solution</summary>

```swazi
data age = 20;
data registered = kweli;

kama can_vote ni (age >= 18) na registered {
    chapisha "Can vote";
}
```

</details>

### Challenge 4: Complex Logic with `ni`

Check if a password is strong: at least 8 chars AND contains a number:

<details>
<summary>Solution</summary>

```swazi
data password = "MyPass123";

kama is_strong ni (password.herufi >= 8) na 
                (password.kuna("1") au password.kuna("2") au password.kuna("3")) {
    chapisha "Password is strong";
}
```

</details>

## Important Notes

### 1. `ni` Creates a Local Variable

The variable only exists in that specific scope:

```swazi
kama result ni 5 > 3 {
    chapisha result;  // Works
}

chapisha result;  // Doesn't work
```

### 2. `ni` Is Just Syntax Sugar

It's more readable but not required:

```swazi
// These are equivalent:
kama x ni condition { }
kama condition { }
```

Use `ni` when it makes your code clearer!

### 3. Use Parentheses for Complex Conditions

```swazi
// Clear
kama result ni (a > 5) na (b < 10) {
}

// Confusing
kama result ni a > 5 na b < 10 {
}
```

## Reflection Questions

1. **When would `ni` make your code more readable?** (Hint: when the condition name is meaningful)

2. **Why do you think the variable created with `ni` doesn't exist outside the block?**

3. **How is `ni` different from just assigning to a variable normally?** When would you use each?

<details>
<summary>Some thoughts</summary>

1. When you have a meaningful name like `is_adult` or `can_vote`, using `ni` makes the intent clear right in the condition statement.

2. Because it's scope-limited - it only applies to that specific block. Once the block ends, the decision is made and the variable isn't needed anymore.

3. `ni` creates a variable only for that scope, while normal assignment creates it in the outer scope. Use `ni` for temporary condition checks, normal assignment for variables you need to reference later.

</details>

## What's Next?

You now understand identity operators, particularly the `ni` syntax sugar! Next, we'll explore:
- **Ternary Operators** - Making quick decisions in one line

You're almost through all the operators! After ternary operators, you'll have a complete understanding of how to work with values and make decisions in SwaziLang.

---

**Remember:** `ni` is syntax sugar that makes your conditions more readable by creating a named variable for the result!