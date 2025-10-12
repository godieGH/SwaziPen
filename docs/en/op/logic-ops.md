# Logical Operators in SwaziLang

## What Are Logical Operators?

You've learned how to ask single yes/no questions using comparison operators:

```swazi
data age = 20;
chapisha age > 18;  // kweli
```

But what if you need to ask **multiple questions at once**?

For example: "Is the person over 18 AND do they have a driver's license?"

That's where logical operators come in. They let you combine multiple conditions and ask more complex questions.

## The Three Logical Operators

| Operator | Swahili | What It Means | Example | Result |
|----------|---------|--------------|---------|--------|
| `na` or `&&` | AND | ALL conditions must be true | `kweli na kweli` | `kweli` |
| `au` or `\|` | OR | AT LEAST ONE condition must be true | `kweli au sikweli` | `kweli` |
| `!` | NOT | Flips the value (true becomes false, false becomes true) | `!sikweli` | `kweli` |

## The `na` Operator (AND) — can also use `&&`

**`na` means "AND" - both sides must be true for the result to be true.**

```swazi
chapisha kweli na kweli;      // kweli (both true)
chapisha kweli na sikweli;    // sikweli (one false)
chapisha sikweli na kweli;    // sikweli (one false)
chapisha sikweli na sikweli;  // sikweli (both false)
```

Think of it like a doorway with TWO guards. Both guards must let you through or you don't get in.

### Real Example: Eligibility

```swazi
data age = 20;
data ana_kitambulisho = kweli;

// Can enter club?
data anaweza_kuingia = (age >= 18) na ana_kitambulisho;

chapisha anaweza_kuingia;  // kweli (meets both conditions)
```

### Another Example: Login

```swazi
data username = "hassan";
data password = "mypass123";

data username_sahihi = username sawa "hassan";
data password_sahihi = password sawa "mypass123";

data login_ok = username_sahihi na password_sahihi;

chapisha login_ok;  // kweli (both correct)
```

### What If One Fails?

```swazi
data username = "hassan";
data password = "wrong123";

data username_sahihi = username sawa "hassan";
data password_sahihi = password sawa "mypass123";

data login_ok = username_sahihi na password_sahihi;

chapisha login_ok;  // sikweli (username ok but password wrong)
```

**Key point:** With `na`, if even ONE side is false, the whole result is false!

## The `au` Operator (OR) — can also use `||`

**`au` means "OR" - at least ONE side must be true for the result to be true.**

```swazi
chapisha kweli au kweli;      // kweli (both true)
chapisha kweli au sikweli;    // kweli (one true - that's enough!)
chapisha sikweli au kweli;    // kweli (one true - that's enough!)
chapisha sikweli au sikweli;  // sikweli (both false)
```

Think of it like a menu where you can choose this OR that. As long as at least ONE option is available, you're happy.

### Real Example: Day Off

```swazi
data siku = "Jumamosi";

data ni_Jumamosi = siku sawa "Jumamosi";
data ni_Jumapili = siku sawa "Jumapili";

data ni_wikendi = ni_Jumamosi au ni_Jumapili;

chapisha ni_wikendi;  // kweli (it's one of the weekend days)
```

### Another Example: Free Shipping

```swazi
data order_value = 5000;
data ina_premium = sikweli;

// Free shipping if: order is over 10000 OR customer is premium
data free_shipping = (order_value > 10000) au ina_premium;

chapisha free_shipping;  // sikweli (neither condition met)
```

If premium member:
```swazi
data order_value = 5000;
data ina_premium = kweli;

data free_shipping = (order_value > 10000) au ina_premium;

chapisha free_shipping;  // kweli (premium member counts!)
```

**Key point:** With `au`, if EITHER side is true, the whole result is true!

## The `!` Operator (NOT)

**`!` means "NOT" - it flips the boolean value.**

```swazi
chapisha !kweli;     // sikweli (opposite of true)
chapisha !sikweli;   // kweli (opposite of false)
```

It's like saying "the opposite is true."

### Simple Example

```swazi
data imefungwa = kweli;

// Is it NOT closed? (i.e., is it open?)
data imebuukwa = !imefungwa;

chapisha imebuukwa;  // sikweli (it IS closed, so it's NOT open)
```

### Practical Example: Access Control

```swazi
data ni_admin = kweli;

// Only NON-admins can request approval
data anahitaji_approval = !ni_admin;

chapisha anahitaji_approval;  // sikweli (admin doesn't need approval)
```

With regular user:
```swazi
data ni_admin = sikweli;

data anahitaji_approval = !ni_admin;

chapisha anahitaji_approval;  // kweli (regular user needs approval)
```

## Combining Operators

You can combine all three operators together to create complex conditions!

### Example 1: Purchase Authorization

```swazi
data amount = 15000;
data ina_pesa = kweli;
data suspended = sikweli;

// Can purchase if: amount is reasonable AND has funds AND account not suspended
data anaweza_kununua = (amount <= 50000) na ina_pesa na (!suspended);

chapisha anaweza_kununua;  // kweli (all conditions met)
```

### Example 2: Commenting Policy

```swazi
data ni_member = kweli;
data account_age_days = 5;
data ni_verified = sikweli;

// Can comment if: member for 7+ days OR verified email
data anaweza_kukamatia = (account_age_days >= 7) au ni_verified;

chapisha anaweza_kukamatia;  // sikweli (not old enough and not verified)
```

With older account:
```swazi
data ni_member = kweli;
data account_age_days = 30;
data ni_verified = sikweli;

data anaweza_kukamatia = (account_age_days >= 7) au ni_verified;

chapisha anaweza_kukamatia;  // kweli (account old enough)
```

## Truth Tables (Reference)

### Truth Table for `na` (AND)

| Left | Right | Result |
|------|-------|--------|
| kweli | kweli | **kweli** |
| kweli | sikweli | **sikweli** |
| sikweli | kweli | **sikweli** |
| sikweli | sikweli | **sikweli** |

**Pattern:** Only all-true gives true.

### Truth Table for `au` (OR)

| Left | Right | Result |
|------|-------|--------|
| kweli | kweli | **kweli** |
| kweli | sikweli | **kweli** |
| sikweli | kweli | **kweli** |
| sikweli | sikweli | **sikweli** |

**Pattern:** Any true gives true.

### Truth Table for `!` (NOT)

| Input | Result |
|-------|--------|
| kweli | **sikweli** |
| sikweli | **kweli** |

**Pattern:** Just flips it.

## Important: Short-Circuit Evaluation

Here's something important to know: SwaziLang evaluates logical operators from left to right and can stop early.

### With `na`:

```swazi
data result = sikweli na kweli;
```

When the first part is false, SwaziLang knows the whole thing must be false (because both need to be true). It doesn't even check the second part!

### With `au`:

```swazi
data result = kweli au sikweli;
```

When the first part is true, SwaziLang knows the whole thing must be true (because only one needs to be true). It doesn't check the second part!

This saves processing time when you have complex conditions.

## Practical Examples

### Example 1: Login Form Validation

```swazi
data username = "alice";
data password = "pass123";
data email = "alice@example.com";

// All must be valid
data username_valid = username.herufi >= 3;
data password_valid = password.herufi >= 8;
data email_valid = email.kuna("@");

data form_valid = username_valid na password_valid na email_valid;

chapisha form_valid;  // Check if all valid
```

### Example 2: Game Rules

```swazi
data user_score = 5000;
data computer_score = 3000;
data round_limit = 5;
data rounds_played = 3;

// Game continues if: not all rounds played OR scores are close
data game_continues = (rounds_played < round_limit) au 
                      ((user_score - computer_score).abs() < 500);

chapisha game_continues;  // kweli (more rounds to play)
```

### Example 3: Permission Check

```swazi
data ni_owner = sikweli;
data ni_admin = kweli;
data post_public = kweli;

// Can edit if: owner OR admin
data can_edit = ni_owner au ni_admin;

chapisha can_edit;  // kweli (admin can edit)

// Can view if: public OR (admin AND not deleted)
data can_view = post_public au (ni_admin na !post_public);

chapisha can_view;  // This is complex!
```

### Example 4: Grading with Multiple Conditions

```swazi
data alama = 85;
data attendance = 90;

// Get A if: score > 80 AND attendance > 80
data ni_A = (alama > 80) na (attendance > 80);

// Get B if: score > 70 AND attendance > 70
data ni_B = (alama > 70) na (attendance > 70) na !ni_A;

// Get C if: neither A nor B
data ni_C = !ni_A na !ni_B;

chapisha `Grade A: ${ni_A}`;
chapisha `Grade B: ${ni_B}`;
chapisha `Grade C: ${ni_C}`;
```

## Common Patterns

### Pattern 1: Multiple OR Conditions

```swazi
data day = "Jumatano";

// Check if it's a weekend OR holiday
data isOffDay = (day sawa "Jumamosi") au 
               (day sawa "Jumapili") au 
               (day sawa "Sikukuu");
```

### Pattern 2: Range with AND

```swazi
data namba = 50;

// Is it between 10 and 100?
data in_range = (namba >= 10) na (namba <= 100);
```

### Pattern 3: Negating Complex Conditions

```swazi
data age = 16;
data ana_idhini = sikweli;

// Cannot enter if: under 18 AND no permission
data haweza = (age < 18) na (!ana_idhini);

// Or: CAN enter if NOT (under 18 AND no permission)
data anaweza = !((age < 18) na (!ana_idhini));
```

### Pattern 4: NOT with Multiple Values

```swazi
data status = "processing";

// Not done if it's not completed, not failed, not cancelled
data still_going = (status sisawa "completed") na 
                  (status sisawa "failed") na 
                  (status sisawa "cancelled");
```

## Practice Challenges

### Challenge 1: Age and Verification

Write a condition for: "Can access if age is 18+ AND email is verified"

<details>
<summary>Solution</summary>

```swazi
data age = 20;
data email_verified = kweli;

data can_access = (age >= 18) na email_verified;
chapisha can_access;  // kweli
```

</details>

### Challenge 2: Multiple Conditions with OR

Write: "Weekend if Saturday OR Sunday OR holiday"

<details>
<summary>Solution</summary>

```swazi
data day = "Jumamosi";
data is_holiday = sikweli;

data ni_wikendi = (day sawa "Jumamosi") au 
                 (day sawa "Jumapili") au 
                 is_holiday;

chapisha ni_wikendi;  // kweli
```

</details>

### Challenge 3: Complex AND/OR

"Can post if: (has account AND verified) OR admin"

<details>
<summary>Solution</summary>

```swazi
data has_account = kweli;
data verified = sikweli;
data ni_admin = kweli;

data can_post = ((has_account na verified) au ni_admin);

chapisha can_post;  // kweli (admin can post)
```

</details>

### Challenge 4: Using NOT

"Cannot enter if: age < 18 AND NOT parent_permission"

<details>
<summary>Solution</summary>

```swazi
data age = 16;
data parent_permission = sikweli;

data cannot_enter = (age < 18) na (!parent_permission);

chapisha cannot_enter;  // kweli (cannot enter)

// Or: CAN enter if NOT that condition
data can_enter = !cannot_enter;  // sikweli
```

</details>

## Quick Decision Guide

| Situation | Use | Example |
|-----------|-----|---------|
| **All must be true** | `na` | `(age >= 18) na ni_member` |
| **At least one must be true** | `au` | `ni_admin au ni_owner` |
| **Flip the result** | `!` | `!is_closed` |
| **Multiple all-true** | `na na na` | `a na b na c` |
| **Multiple at-least-one** | `au au au` | `a au b au c` |

## Important Notes

### 1. Use Parentheses for Clarity

```swazi
// Clear
data result = (a na b) au (c na d);

// Confusing
data result = a na b au c na d;
```

### 2. Order of Operations

`!` evaluates first, then `na`, then `au`:

```swazi
// These are different:
data a = !kweli na kweli;        // (NOT kweli) AND kweli = sikweli na kweli = sikweli
data b = !(kweli na kweli);      // NOT (kweli AND kweli) = NOT kweli = sikweli
```

### 3. Don't Overcomplicate

```swazi
// Overcomplicated:
data result = !(!(a) na !(b));

// Simpler (using De Morgan's Law):
data result = a au b;
```

## Reflection Questions

1. **When would `na` be more important than `au` in real-world security?** (Hint: think about passwords and usernames)

2. **How does `!` help make code more readable?** Give an example where `!closed` is clearer than writing the opposite condition.

3. **Why is understanding truth tables important if you're writing code?**

<details>
<summary>Some thoughts</summary>

1. Security typically uses `na` - both username AND password must be correct. Using `au` would be terrible security (either one being right would work!).

2. `!closed` clearly says "it's not closed" which people understand immediately. The opposite might be `open sawa "true"` which requires more thinking.

3. Truth tables help you predict exactly what your code will do before running it, catching bugs early and making sure complex conditions work as intended.

</details>

## What's Next?

You now understand how to combine multiple conditions! Next, we'll explore:
- **Identity Operators** - Special operators like `katika`, `ni`, and how they work
- **Ternary Operators** - Quick decision making in one line

Logical operators are fundamental to programming - they let you handle real-world complexity where decisions depend on multiple factors!

---

**Remember:** `na` means "all must be true", `au` means "at least one must be true", and `!` means "flip it"!