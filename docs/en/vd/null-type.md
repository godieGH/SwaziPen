# Null Type (null) in SwaziLang

## What Does "Nothing" Mean?

Think about this: What do you have in your pocket if it's empty?

You have... nothing. Not zero items counted. Not "no pocket." Just... nothing. Emptiness.

In programming, we sometimes need to represent this idea of "nothing" or "no value". In SwaziLang, we call this **`null`**, which means "empty" or "nothing".

## The `null` Value

`null` is a data type that has exactly one value: `null` itself.

```swazi
data x = null;
chapisha x;  // Prints: null
```

That's it. That's the whole thing.

## When Do You Use `null`?

### 1. Uninitialized Variables

When you declare a variable without giving it a value, it becomes `null`:

```swazi
data jina;
chapisha jina;  // Prints: null (nothing assigned yet)

// Later, you give it a value
jina = "Hassan";
chapisha jina;  // Prints: Hassan
```

### 2. Representing "Nothing" Intentionally

Sometimes you want to say "there is no value here":

```swazi
data simu_number = null;  // Person doesn't have a phone number
data website = null;      // Company doesn't have a website
```

### 3. Placeholder Values

```swazi
data input = null;

// Later, user provides input
// ... after getting input ...
input = soma("Ingiza kitu: ");
```

## Checking for `null`

You can compare values with `null`:

```swazi
data x = null;

chapisha x sawa null;      // kweli (it is nothing)

data y = "something";
chapisha y sawa null;      // sikweli (it's not nothing)
```

### Real Example: Checking if a Value Exists

```swazi
data email = null;

chapisha email sawa null;  // kweli (no email provided)

// If you wanted to check if email is NOT nothing:
chapisha email sisawa null;  // sikweli
```

## The Difference Between Similar Concepts

Let's be clear about what `null` is NOT:

### `null` vs `0` (Zero)

```swazi
data empty = null;
data zero = 0;

chapisha empty sawa zero;  // sikweli (they're different!)
```

- `null` = no value at all
- `0` = a numeric value (zero)

### `null` vs `""` (Empty String)

```swazi
data nothing = null;
data blank = "";

chapisha nothing sawa blank;  // sikweli (they're different!)
```

- `null` = no value at all
- `""` = text that's empty (still text though)

### `null` vs `sikweli` (False)

```swazi
data nothing = null;
data false_val = sikweli;

chapisha nothing sawa false_val;  // sikweli (they're different!)
```

- `null` = no value
- `sikweli` = a boolean value meaning false

## Important Notes

### 1. `null` Has No Methods

Unlike numbers and strings, `null` doesn't have any methods or properties you can use. It's just nothing:

```swazi
data x = null;
// x.herufi won't work
// x.herufiKubwa() won't work
// Can't do anything with null except check if it equals null
```

### 2. You Can Reassign `null`

```swazi
data value = null;
chapisha value;  // null

value = 42;
chapisha value;  // 42

value = null;    // Back to nothing
chapisha value;  // null
```

### 3. Converting `null` to Boolean

If you convert `null` to a boolean, it becomes `sikweli` (false):

```swazi
chapisha Bool(null);  // sikweli
```

Remember from the Boolean chapter? Empty/nothing values are "falsy".

## Simple Examples

### Example 1: Checking Missing Information

```swazi
data jina = "Hassan";
data umri = null;
data jiji = "Dar es Salaam";

chapisha jina sawa null;   // sikweli (has name)
chapisha umri sawa null;   // kweli (age is missing!)
chapisha jiji sawa null;   // sikweli (has city)
```

### Example 2: Optional Data

```swazi
data username = "hassan123";
data bio = null;           // User didn't write a bio

kama bio sawa null {
    chapisha "Hakuna biography";
} vinginevyo {
    chapisha `Biography: ${bio}`;
}
```

### Example 3: Placeholder

```swazi
data result = null;

// Do some work...
// If successful:
result = "Success!";

// If we never changed it:
chapisha result sawa null;  // Check if work was done
```

## That's It!

The null type is really simple - it just represents "nothing". There's not much more to it!

## Key Takeaways

1. **`null` means "nothing"** - It's a value representing absence of data

2. **It's different from zero or false** - They're actual values; `null` is no value

3. **No methods** - You can't call methods on `null` like you can with numbers/strings

4. **Used for uninitialized or missing data** - When something hasn't been set or doesn't exist

5. **Check with `sawa null`** - Compare values to see if they're nothing

## What's Next?

You now understand all the primitive data types in SwaziLang:
- Numbers (Namba)
- Strings (Neno)
- Booleans (Bool)
- Null (null)

Next, you'll move into **Operations** - learning how to work with and combine these data types in powerful ways!

---

**Remember:** `null` represents nothing - it's the absence of a value, not a value itself.