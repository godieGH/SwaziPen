# Array Methods in SwaziLang

## Introduction to Array Methods

Arrays have special methods (functions) you can call on them to manipulate, search, and transform data. These methods make working with collections much more powerful.

**Quick reminder:** We'll learn about loops in detail later, but many array methods let you loop through items automatically!

## Creating Arrays of Empty Slots

Before we explore methods, here's a useful technique: creating an array with a specific number of empty slots (all `null`):

```swazi
data empty_arr = Orodha(5);
// Creates: [null, null, null, null, null]

chapisha empty_arr.idadi;  // 5
```

This is useful when you want to prepare an array of a certain size before filling it in, or for looping purposes.

## Looping Through Arrays: The `kwa kila` Loop

The simplest way to go through each element in an array is the `kwa kila` loop:

```swazi
data colors = ["red", "green", "blue"];

kwa kila color katika colors:
    chapisha color

// Prints:
// red
// green
// blue
```

**Syntax:** `kwa kila variable katika array : ...` or `kwa kila variable katika array { ... }`

This automatically goes through each element. We'll learn more about loops in the next chapter!

### Looping with Standard `kwa` Loop

```swazi
data fruits = ["apple", "banana", "orange"];

kwa(i=0; i<fruits.idadi; i++) {
    chapisha i + ": " + fruits[i];
}
// Prints:
// 0: apple
// 1: banana
// 2: orange
```

We'll explore loops properly later!

## Core Array Methods

### Length and size of an array

#### `.urefu()` — returns the size of an array
```swazi
chapisha [4,6,7].urefu() # output 3
```

### Adding Elements

#### `.ongeza(value, ...)` - Add to End

Adds one or more elements to the end. Returns the new length:

```swazi
data numbers = [1, 2, 3];

numbers.ongeza(4);
numbers.ongeza(5, 6);

chapisha numbers;  // [1, 2, 3, 4, 5, 6]
chapisha numbers.idadi;  // 6
```

#### `.ongezaMwanzo(value, ...)` - Add to Beginning

Adds one or more elements to the start. Returns the new length:

```swazi
data numbers = [2, 3];

numbers.ongezaMwanzo(0, 1);

chapisha numbers;  // [0, 1, 2, 3]
```

#### `.ingiza(value, index)` - Insert at Position

Inserts a value at a specific position. Returns the new length:

```swazi
data letters = ["a", "c", "d"];

letters.ingiza("b", 1);

chapisha letters;  // ["a", "b", "c", "d"]
```

### Removing Elements

#### `.toa()` - Remove from End (Pop)

Removes and returns the last element:

```swazi
data numbers = [1, 2, 3];

data last = numbers.toa();

chapisha last;     // 3
chapisha numbers;  // [1, 2]
```

#### `.ondoaMwanzo()` - Remove from Beginning (Shift)

Removes and returns the first element:

```swazi
data numbers = [1, 2, 3];

data first = numbers.ondoaMwanzo();

chapisha first;    // 1
chapisha numbers;  // [2, 3]
```

#### `.ondoa(value)` - Remove First Occurrence

Removes the first matching element. Returns `kweli` if found, `sikweli` if not:

```swazi
data colors = ["red", "blue", "red"];

data found = colors.ondoa("red");

chapisha found;   // kweli
chapisha colors;  // ["blue", "red"]
```

#### `.ondoaZote(value)` - Remove All Occurrences

Removes all matching elements. Returns the count of elements removed:

```swazi
data numbers = [1, 2, 1, 3, 1];

data removed = numbers.ondoaZote(1);

chapisha removed;   // 3
chapisha numbers;   // [2, 3]
```

#### `.futa()` - Clear Array

Removes all elements. Returns nothing:

```swazi
data items = [1, 2, 3, 4, 5];

items.futa();

chapisha items;  // []
```

### Finding Elements

#### `.kuna(value)` - Check if Contains

Returns `kweli` if value exists, `sikweli` otherwise:

```swazi
data colors = ["red", "green", "blue"];

chapisha colors.kuna("red");    // kweli
chapisha colors.kuna("yellow"); // sikweli
```

#### `.indexOf(value, start?)` or `.indexYa(value, start?)` - Find Position

Returns the index of first occurrence, or -1 if not found. Optional start parameter:

```swazi
data fruits = ["apple", "banana", "orange", "banana"];

chapisha fruits.indexOf("banana");     // 1 (first position)
chapisha fruits.indexOf("banana", 2);  // 3 (search from index 2)
chapisha fruits.indexOf("grape");      // -1 (not found)
```

#### `.tafuta(function)` - Find First Element Matching Condition

Returns the first element where the function returns true, or `null` if not found:

```swazi
data numbers = [5, 12, 8, 130, 44];

data result = numbers.tafuta(x => x > 10);
chapisha result;  // 12
```

#### `.tafutaIndex(function)` - Find Index of First Match

Returns the index of first element matching the condition, or -1 if not found:

```swazi
data numbers = [5, 12, 8, 130, 44];

data index = numbers.tafutaIndex(x => x > 10);
chapisha index;  // 1
```

### Slicing and Extracting

#### `.slesi(start, end)` - Get a Portion (Slice)

Creates a new array with elements from start to end (end not included):

```swazi
data numbers = [1, 2, 3, 4, 5];

data portion = numbers.slesi(1, 4);

chapisha portion;  // [2, 3, 4]
chapisha numbers;  // [1, 2, 3, 4, 5] (unchanged)
```

#### `.pachika(start, deleteCount, ...items)` - Remove and Insert

Removes elements starting at index and optionally inserts new ones. Returns an array of deleted elements:

```swazi
data arr = [1, 2, 3, 4, 5];

data removed = arr.pachika(1, 2, 99, 100);

chapisha removed;  // [2, 3]
chapisha arr;      // [1, 99, 100, 4, 5]
```

### Transforming Arrays

#### `.panua(otherArray)` - Combine Arrays

Creates a new array by combining two arrays:

```swazi
data arr1 = [1, 2];
data arr2 = [3, 4];

data combined = arr1.panua(arr2);

chapisha combined;  // [1, 2, 3, 4]
chapisha arr1;      // [1, 2] (unchanged)
```

#### `.geuza()` - Reverse

Reverses the array in place. Returns the reversed array:

```swazi
data numbers = [1, 2, 3];

numbers.geuza();

chapisha numbers;  // [3, 2, 1]
```

#### `.panga(comparator?)` - Sort

Sorts elements alphabetically by default. Pass an optional comparator function for custom sorting:

```swazi
data words = ["zebra", "apple", "mango"];

words.panga();

chapisha words;  // ["apple", "mango", "zebra"]
```

**With Custom Comparator:**

The comparator function receives two elements (a, b) and should return:
- Negative number if a should come before b
- 0 if they're equal
- Positive number if b should come before a

```swazi
data numbers = [5, 7, 5, 7, 9, 9];

numbers.panga((a, b) => b - a);  // Sort in descending order

chapisha numbers;  // [9, 9, 7, 7, 5, 5]
```

#### `.badili(function)` - Map/Transform

Creates a new array by transforming each element using the function:

```swazi
data numbers = [1, 2, 3, 4];

data doubled = numbers.badili(x => x * 2);

chapisha doubled;  // [2, 4, 6, 8]
```

#### `.chambua(function)` - Filter

Creates a new array with only elements that match the condition:

```swazi
data numbers = [1, 2, 3, 4, 5, 6];

data evens = numbers.chambua(x => x % 2 sawa 0);

chapisha evens;  // [2, 4, 6]
```

#### `.punguza(function, initial?)` - Reduce

Reduces array to a single value by applying a function cumulatively:

```swazi
data numbers = [1, 2, 3, 4];

data sum = numbers.punguza((acc, x) => acc + x, 0);

chapisha sum;  // 10
```

**Without initial value (starts with first element):**

```swazi
data numbers = [1, 2, 3, 4];

data product = numbers.punguza((acc, x) => acc * x);

chapisha product;  // 24 (1*2*3*4)
```

### String Operations

#### `.unganisha(separator)` - Join to String

Combines all elements into a string with a separator:

```swazi
data words = ["Hello", "World"];

data text = words.unganisha(" ");

chapisha text;  // "Hello World"
```

## Practical Examples

### Example 1: Shopping List Management

```swazi
data shopping = ["milk", "bread"];

// Add items
shopping.ongeza("eggs");
shopping.ongeza("butter", "cheese");

chapisha shopping;  // ["milk", "bread", "eggs", "butter", "cheese"]

// Check if we have milk
chapisha shopping.kuna("milk");  // kweli

// Remove bread
shopping.ondoa("bread");

chapisha shopping;  // ["milk", "eggs", "butter", "cheese"]
```

### Example 2: Working with Indices

```swazi
data scores = [85, 90, 78, 92];

// Find a score
data position = scores.indexOf(78);
chapisha position;  // 2

// Check if high score exists
chapisha scores.kuna(100);  // sikweli

// Get first three scores
data first_three = scores.slesi(0, 3);
chapisha first_three;  // [85, 90, 78]
```

### Example 3: Filtering and Transforming

```swazi
data numbers = [1, 2, 3, 4, 5, 6];

// Get only even numbers
data evens = numbers.chambua(x => x % 2 sawa 0);
chapisha evens;  // [2, 4, 6]

// Double each number
data doubled = numbers.badili(x => x * 2);
chapisha doubled;  // [2, 4, 6, 8, 10, 12]
```

### Example 4: Sorting with Custom Logic

```swazi
data scores = [85, 92, 78, 95, 88];

// Sort in descending order
scores.panga((a, b) => b - a);

chapisha scores;  // [95, 92, 88, 85, 78]
```

### Example 5: Reducing to Calculate

```swazi
data items = [10, 20, 30, 40];

// Calculate sum
data sum = items.punguza((total, item) => total + item, 0);
chapisha sum;  // 100

// Calculate product
data product = items.punguza((result, item) => result * item);
chapisha product;  // 24000000
```

### Example 6: Looping Example

```swazi
data items = ["apple", "banana", "orange"];

// Loop using kwa kila
kwa kila item katika items:
    chapisha "I have: " + item

// Or using traditional loop
kwa(i=0; i<items.idadi; i++) {
    chapisha items[i];
}
```

## Important Notes

### 1. Methods Modify in Place or Return New Array

Methods that modify the original array:
- `.ongeza()`, `.ongezaMwanzo()`, `.ingiza()`, `.toa()`, `.ondoaMwanzo()`, `.ondoa()`, `.ondoaZote()`, `.futa()`, `.pachika()`, `.geuza()`, `.panga()`

Methods that return new arrays:
- `.slesi()`, `.panua()`, `.badili()`, `.chambua()`

Methods that return single values:
- `.kuna()`, `.indexOf()`, `.tafuta()`, `.tafutaIndex()`, `.punguza()`, `.unganisha()`

### 2. Returns Matter

```swazi
data arr = [1, 2, 3];

// ongeza returns the new length
data new_length = arr.ongeza(4);
chapisha new_length;  // 4

// toa returns the removed element
data removed = arr.toa();
chapisha removed;  // 4

// indexOf returns the index
data pos = arr.indexOf(2);
chapisha pos;  // 1

// kuna returns a boolean
data exists = arr.kuna(2);
chapisha exists;  // kweli
```

### 3. Search Methods Return -1 When Not Found

```swazi
chapisha [1, 2, 3].indexOf(99);  // -1 (not found)
chapisha [1, 2, 3].tafutaIndex(x => x > 100);  // -1 (no match)
```

### 4. Creating Empty Arrays

```swazi
// Empty array
data empty = [];

// Array with n empty slots (all null)
data slots = Orodha(5);
```

## Array Methods Reference Table

| Method | What It Does | Returns | Modifies Original |
|--------|-------------|---------|-----------------|
| `.ongeza(val, ...)` | Add to end | New length | Yes |
| `.ongezaMwanzo(val, ...)` | Add to beginning | New length | Yes |
| `.ingiza(val, idx)` | Insert at position | New length | Yes |
| `.toa()` | Remove from end | Removed element | Yes |
| `.ondoaMwanzo()` | Remove from beginning | Removed element | Yes |
| `.ondoa(val)` | Remove first match | Boolean found | Yes |
| `.ondoaZote(val)` | Remove all matches | Count removed | Yes |
| `.futa()` | Clear array | null | Yes |
| `.kuna(val)` | Check if contains | Boolean | No |
| `.indexOf(val, start?)` | Find position | Index or -1 | No |
| `.tafuta(fn)` | Find first matching element | Element or null | No |
| `.tafutaIndex(fn)` | Find index of first match | Index or -1 | No |
| `.slesi(start, end)` | Get portion | New array | No |
| `.pachika(start, del, ...)` | Remove and insert | Deleted elements | Yes |
| `.panua(arr)` | Combine arrays | New array | No |
| `.geuza()` | Reverse | The array | Yes |
| `.panga(fn?)` | Sort with optional comparator | The array | Yes |
| `.badili(fn)` | Map/transform elements | New array | No |
| `.chambua(fn)` | Filter elements | New array | No |
| `.punguza(fn, init?)` | Reduce to single value | Result value | No |
| `.unganisha(sep)` | Join to string | String | No |
| `.idadi` | Get length | Number | No |

## Quick Decision Guide

| Need to Do | Method | Example |
|-----------|--------|---------|
| **Add to end** | `.ongeza()` | `arr.ongeza(5)` |
| **Add to start** | `.ongezaMwanzo()` | `arr.ongezaMwanzo(1)` |
| **Remove from end** | `.toa()` | `arr.toa()` |
| **Remove from start** | `.ondoaMwanzo()` | `arr.ondoaMwanzo()` |
| **Find position** | `.indexOf()` | `arr.indexOf("x")` |
| **Check if exists** | `.kuna()` | `arr.kuna("x")` |
| **Find first match** | `.tafuta()` | `arr.tafuta(x => x > 10)` |
| **Find index of match** | `.tafutaIndex()` | `arr.tafutaIndex(x => x > 10)` |
| **Get portion** | `.slesi()` | `arr.slesi(1, 3)` |
| **Combine arrays** | `.panua()` | `arr1.panua(arr2)` |
| **Reverse** | `.geuza()` | `arr.geuza()` |
| **Sort** | `.panga()` | `arr.panga()` or `arr.panga((a,b) => b-a)` |
| **Transform elements** | `.badili()` | `arr.badili(x => x * 2)` |
| **Filter elements** | `.chambua()` | `arr.chambua(x => x > 5)` |
| **Reduce to value** | `.punguza()` | `arr.punguza((a, b) => a + b, 0)` |
| **Join to text** | `.unganisha()` | `arr.unganisha(", ")` |

## Practice Challenges

### Challenge 1: Basic Operations

Create an array, add elements, then remove some:

<details>
<summary>Solution</summary>

```swazi
data items = ["a", "b"];

items.ongeza("c");
items.ongezaMwanzo("z");

chapisha items;  // ["z", "a", "b", "c"]

items.toa();

chapisha items;  // ["z", "a", "b"]
```

</details>

### Challenge 2: Finding and Filtering

Create an array and find elements:

<details>
<summary>Solution</summary>

```swazi
data numbers = [10, 20, 30, 40];

chapisha numbers.indexOf(30);     // 2
chapisha numbers.kuna(20);        // kweli
chapisha numbers.tafuta(x => x > 25);  // 30
```

</details>

### Challenge 3: Sorting with Custom Logic

Sort array in descending order:

<details>
<summary>Solution</summary>

```swazi
data numbers = [3, 1, 4, 1, 5, 9, 2, 6];

numbers.panga((a, b) => b - a);

chapisha numbers;  // [9, 6, 5, 4, 3, 2, 1, 1]
```

</details>

### Challenge 4: Transform and Filter

Double all even numbers:

<details>
<summary>Solution</summary>

```swazi
data numbers = [1, 2, 3, 4, 5, 6];

data result = numbers
    .chambua(x => x % 2 sawa 0)
    .badili(x => x * 2);

chapisha result;  // [4, 8, 12]
```

</details>

## What's Next?

In the next chapters, you'll learn:
- **Control Flow & Loops** - Different loop structures in detail
- **Objects** - Storing related data together
- **Advanced Operations** - Complex data transformations

Array methods are powerful tools for manipulating collections. Master them and you can perform sophisticated data operations!

---

**Remember:** Some methods change the array in place, others return new arrays. Check the reference table to know which is which!