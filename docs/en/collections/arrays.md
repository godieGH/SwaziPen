# Arrays (Orodha) in SwaziLang

## What Is an Array?

Imagine you have a list of items you need to buy at the market:
- Sukuma (greens)
- Tomatoes
- Onions
- Potatoes

Instead of creating separate variables for each item, you can put them all in one place - a list. In programming, this list is called an **array** (or `orodha` in Swahili, which means "list").

An array is a collection of values stored in a single variable.

## Creating Arrays

### Basic Array Creation

Use square brackets `[ ]` to create an array:

```swazi
data fruits = ["apple", "banana", "orange"];
data numbers = [1, 2, 3, 4, 5];
data mixed = [10, "text", kweli, 3.14];
```

### Empty Array

You can create an empty array and add items later:

```swazi
data empty_list = [];
chapisha empty_list;  // Prints: []
```

### Array with Different Types

Arrays can hold any data type - numbers, strings, booleans, even other arrays:

```swazi
data everything = [42, "hello", kweli, 3.14, null];
```

## Accessing Array Elements

Think of an array like a numbered list. Each item has a **position** or **index**.

### Important: Indexing Starts at 0

```
Index:  0    1    2    3
       [42, "hi", "world", 3.14]
```

The first element is at index 0, not 1!

### Getting Values from Arrays

Use square brackets with the index:

```swazi
data colors = ["red", "green", "blue"];

chapisha colors[0];  // Prints: red
chapisha colors[1];  // Prints: green
chapisha colors[2];  // Prints: blue
```

### Out of Bounds Access

What happens if you try to access an index that doesn't exist?

```swazi
data colors = ["red", "green", "blue"];

chapisha colors[5];  // Prints: null (nothing/undefined)
```

SwaziLang returns `null` instead of crashing!

### Negative Indexing

You can count from the end of the array using negative numbers:

```swazi
data colors = ["red", "green", "blue"];

chapisha colors[-1];  // Prints: blue (last item)
chapisha colors[-2];  // Prints: green (second to last)
chapisha colors[-3];  // Prints: red (third from last)
```

**Quick Question:** What would `colors[-4]` return?

<details>
<summary>Think about it</summary>

`null` - because there's no element 4 positions from the end.

</details>

## Modifying Array Elements

You can change values in an array:

```swazi
data fruits = ["apple", "banana", "orange"];

chapisha fruits[0];  // apple

// Change it
fruits[0] = "mango";

chapisha fruits[0];  // mango
```

### Adding to Positions Beyond Current Length

```swazi
data items = [1, 2, 3];

items[5] = 100;

chapisha items;  // [1, 2, 3, null, null, 100]
```

SwaziLang fills in empty spots with `null`!

### Using Operations on Array Elements

```swazi
data numbers = [10, 20, 30];

numbers[0] += 5;  // Add 5 to first element
chapisha numbers[0];  // 15

numbers[1] *= 2;  // Double second element
chapisha numbers[1];  // 40
```

## The `.idadi` Property - Array Length

Every array has an `.idadi` property that tells you how many elements it has:

```swazi
data colors = ["red", "green", "blue"];

chapisha colors.idadi;  // Prints: 3
```

### Why `.idadi` Is Useful

**Example 1: Checking if array is empty**

```swazi
data items = [];

kama items.idadi sawa 0 {
    chapisha "List is empty";
}
```

**Example 2: Getting the last element**

```swazi
data fruits = ["apple", "banana", "orange"];

data last = fruits[fruits.idadi - 1];
chapisha last;  // orange

// Or using negative indexing (easier):
data last = fruits[-1];
chapisha last;  // orange
```

**Example 3: Checking bounds before access**

```swazi
data list = [10, 20, 30];
data index = 5;

kama index < list.idadi {
    chapisha list[index];
} vinginevyo {
    chapisha "Index out of bounds";
}
```

## Working with Arrays

### Example 1: List of Names

```swazi
data names = ["Hassan", "Amina", "Ali"];

chapisha names[0];      // Hassan
chapisha names[1];      // Amina
chapisha names.idadi;   // 3

// Change a name
names[1] = "Fatuma";

chapisha names;  // [Hassan, Fatuma, Ali]
```

### Example 2: Scores

```swazi
data scores = [85, 90, 78, 92];

chapisha scores[0];     // 85
chapisha scores.idadi;  // 4

// Add points to first score
scores[0] += 5;  // Now 90
```

### Example 3: Mixed Data

```swazi
data student = ["Hassan", 20, kweli, 85.5];

data name = student[0];      // Hassan
data age = student[1];       // 20
data registered = student[2]; // kweli
data score = student[3];     // 85.5
```

## Array Destructuring

Destructuring is a way to **unpack** values from an array into separate variables.

### Basic Destructuring

Instead of:
```swazi
data colors = ["red", "green", "blue"];

data first = colors[0];
data second = colors[1];
data third = colors[2];
```

You can do this in one line:
```swazi
data [first, second, third] = ["red", "green", "blue"];

chapisha first;   // red
chapisha second;  // green
chapisha third;   // blue
```

### Important: Always Use `data` Before `[...]`

This is crucial! You MUST use the `data` keyword when destructuring:

```swazi
// ✅ CORRECT - with data
data [a, b, c] = [1, 2, 3];

// ❌ WRONG - without data
[a, b, c] = [1, 2, 3];  // Error!
```

### Destructuring with Existing Array

```swazi
data fruits = ["apple", "banana", "orange"];

// Unpack the array
data [first, second, third] = fruits;

chapisha first;   // apple
chapisha second;  // banana
```

### Skipping Elements

You can skip elements you don't need by leaving spaces:

```swazi
data numbers = [10, 20, 30, 40, 50];

// Get first and third, skip second
data [a, , c] = numbers;

chapisha a;  // 10
chapisha c;  // 30
```

### Rest Parameters in Destructuring

Use `...` to capture remaining elements:

```swazi
data numbers = [1, 2, 3, 4, 5];

// Take first two, rest goes into others
data [first, second, ...others] = numbers;

chapisha first;   // 1
chapisha second;  // 2
chapisha others;  // [3, 4, 5]
```

### Real-World Example: Unpacking Function Return

```swazi
// Imagine this function returns multiple values in an array
kazi getCoordinates {
    rudisha [10, 20, 30];
}

// Destructure the result
data [x, y, z] = getCoordinates();

chapisha x;  // 10
chapisha y;  // 20
chapisha z;  // 30
```

## More Destructuring Examples

### Example 1: Swap Values

```swazi
data a = 5;
data b = 10;

// Swap using destructuring
data [a, b] = [b, a];

chapisha a;  // 10
chapisha b;  // 5
```

### Example 2: Getting Head and Tail

```swazi
data list = [1, 2, 3, 4, 5];

data [head, ...tail] = list;

chapisha head;  // 1
chapisha tail;  // [2, 3, 4, 5]
```

### Example 3: Default Values (Advanced)

When destructuring with fewer elements than variables, you can have defaults (we'll cover this more later):

```swazi
data [a, b] = [1];

chapisha a;  // 1
chapisha b;  // null (nothing assigned)
```

## Practical Examples

### Example 1: Shopping List

```swazi
data shopping = ["milk", "bread", "eggs", "butter"];

chapisha "Need to buy:";
chapisha shopping[0];  // milk
chapisha shopping[1];  // bread
chapisha shopping[2];  // eggs

chapisha "Total items: " + shopping.idadi;  // Total items: 4
```

### Example 2: Grades Tracking

```swazi
data math_grades = [85, 90, 78, 92, 88];

data [first, second, third, ...rest] = math_grades;

chapisha "First exam: " + first;    // 85
chapisha "Second exam: " + second;  // 90
chapisha "Third exam: " + third;    // 78
chapisha "Other exams: " + rest;    // [92, 88]
```

### Example 3: Extracting Specific Data

```swazi
data student_info = ["Hassan", 20, "A", 90];

data [name, , grade, score] = student_info;

chapisha "Student: " + name;           // Hassan
chapisha "Grade: " + grade;            // A
chapisha "Score: " + score;            // 90
```

## Important Notes

### 1. Arrays Are Mutable (Can Change)

```swazi
data list = [1, 2, 3];
list[0] = 99;  // Changes the array

chapisha list;  // [99, 2, 3]
```

### 2. Index Out of Bounds Returns `null`

```swazi
data arr = [1, 2, 3];

chapisha arr[10];  // null (not an error!)
```

### 3. `.idadi` Is Always Available

```swazi
data empty = [];
chapisha empty.idadi;  // 0

data full = [1, 2, 3];
chapisha full.idadi;   // 3
```

### 4. Destructuring Requires `data` Keyword

```swazi
// ✅ Correct
data [x, y] = [1, 2];

// ❌ Wrong
[x, y] = [1, 2];  // Error!
```

### 5. Arrays Can Contain Other Arrays

```swazi
data matrix = [[1, 2], [3, 4], [5, 6]];

chapisha matrix[0];      // [1, 2]
chapisha matrix[0][0];   // 1
chapisha matrix[1][1];   // 4
```

## Practice Challenges

### Challenge 1: Basic Access

Create an array of numbers and access the second and last elements:

<details>
<summary>Solution</summary>

```swazi
data nums = [10, 20, 30, 40, 50];

chapisha nums[1];                    // 20
chapisha nums[nums.idadi - 1];       // 50

// Or with negative indexing:
chapisha nums[-1];                   // 50
```

</details>

### Challenge 2: Modifying Elements

Create an array and double the first element, triple the last:

<details>
<summary>Solution</summary>

```swazi
data nums = [5, 10, 15];

nums[0] *= 2;                        // 10
nums[nums.idadi - 1] *= 3;           // 45

chapisha nums;  // [10, 10, 45]
```

</details>

### Challenge 3: Basic Destructuring

Destructure `["apple", "banana", "orange"]` into three variables:

<details>
<summary>Solution</summary>

```swazi
data [fruit1, fruit2, fruit3] = ["apple", "banana", "orange"];

chapisha fruit1;  // apple
chapisha fruit2;  // banana
chapisha fruit3;  // orange
```

</details>

### Challenge 4: Destructuring with Rest

Destructure an array to get the first element and the rest:

<details>
<summary>Solution</summary>

```swazi
data [first, ...rest] = [1, 2, 3, 4, 5];

chapisha first;  // 1
chapisha rest;   // [2, 3, 4, 5]
```

</details>

## Quick Reference

| Task | Syntax | Example |
|------|--------|---------|
| **Create array** | `[val1, val2, ...]` | `data nums = [1, 2, 3]` |
| **Access element** | `arr[index]` | `arr[0]` |
| **Modify element** | `arr[index] = value` | `arr[0] = 10` |
| **Get length** | `arr.idadi` | `arr.idadi` |
| **Destructure** | `data [a, b] = arr` | `data [x, y] = [1, 2]` |
| **Rest in destructure** | `data [a, ...rest] = arr` | `data [first, ...others] = [1, 2, 3]` |

## What's Next?

You now understand array basics! Next, you'll learn:
- **Array Methods** - Functions you can call on arrays to manipulate them
- **Looping Through Arrays** - Processing all elements at once
- **Advanced Operations** - Filtering, mapping, and more

Arrays are fundamental in programming. You'll use them constantly to store and work with collections of data!

---

**Remember:** Arrays are zero-indexed (start at 0), always use `data` when destructuring, and `.idadi` tells you how many elements an array has!