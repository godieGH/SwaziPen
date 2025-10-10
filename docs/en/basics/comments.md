# Comments in SwaziLang

## What are Comments?

Comments are notes that you write in your code to explain what it does. They are ignored by the swazi interpreter when running your program - they exist only for humans to read.

Comments are essential for:
- Explaining complex code
- Leaving notes for yourself or other programmers
- Temporarily disabling code while testing
- Documenting what your program does

## Types of Comments in SwaziLang

SwaziLang supports **4 different ways** to write comments, giving you flexibility in how you document your code.

### 1. Single Line Comments with `//`

Use `//` to write a comment that lasts until the end of the line.

```swazi
// This is a single line comment
data jina = "John Doe"  // You can also put comments after code

// chapisha("This line won't run because it's commented out")
chapisha("This will run!")  // But this comment won't affect the code
```

**Output:**
```
This will run!
```

### 2. Single Line Comments with `#`

You can also use `#` for single line comments (Python style).

```swazi
# This is also a single line comment
data umri = 25  # Setting the age variable

# Both // and # work the same way
# Use whichever you prefer!
```

### 3. Multi-Line Comments with `/* */`

For longer comments that span multiple lines, use `/*` to start and `*/` to end.

```swazi
/*
This is a multi-line comment.
You can write as many lines as you want.
Everything between the opening and closing symbols
will be ignored by SwaziLang.
*/

data jumla = 10 + 20

/*
The code below calculates the sum
and prints the result to the screen
*/
chapisha(jumla)
```

**Note:** Multi-line comments are great for:
- Explaining complex algorithms
- Writing documentation at the top of files
- Temporarily disabling large blocks of code

### 4. String Literal Comments

SwaziLang also allows string literals to act as comments when they're not assigned to anything.

**Single line string comment:**
```swazi
"This is a comment using a string literal"
data umri = 42
```

**Multi-line string comment (Pythonic style):**
```swazi
"""
This is a multi-line comment using string literals.
Just like Python's docstrings!
You can write multiple lines here.
"""

data jina = "John"

'''
You can also use single quotes
for multi-line string comments
'''

chapisha jina
```

This style is especially useful if you're familiar with Python and want to write documentation in a similar way.

## Comparison of All Comment Styles

```swazi
// C-style single line comment
# Python-style single line comment

/*
C-style 
multi-line comment
*/

"String literal comment"

"""
Python-style
multi-line string comment
"""

'''
Alternative Python-style
multi-line string comment
'''
```

## When to Use Each Style

| Comment Style | Best For |
|--------------|----------|
| `//` | Quick inline comments, common in C-family languages |
| `#` | If you prefer Python or scripting language style |
| `/* */` | Longer explanations, header comments, temporarily disabling code blocks |
| `"..."` or `"""..."""` | Documentation strings, Python-style comments, docstring-like notes |

## Best Practices

### ✅ Good Comments

```swazi
// Calculate total price including tax
data bei = 100
data kodi = bei * 0.16  // 16% tax rate
data jumla = bei + kodi

"""
Function to greet a user
This will be explained more in the functions section
"""
```

### ❌ Avoid Over-Commenting

```swazi
// Bad: stating the obvious
data x = 5  // set x to 5
data y = 10  // set y to 10
data jumla = x + y  // add x and y

// Good: explaining why or what the purpose is
// Calculate discount for returning customers
data punguzo = bei * 0.10
```

## Practical Examples

### Example 1: Documenting a Program

```swazi
"""
Program: Simple Calculator
Author: Your Name
Date: 2025
Description: Calculates the sum of two numbers
"""

// Input values
data a = 15
data b = 25

// Perform calculation
data matokeo = a + b  # Store the result

// Display output
chapisha("Jibu ni:")
chapisha(matokeo)
```

### Example 2: Debugging with Comments

```swazi
data jina = "Hassan"

// chapisha("Debug: checking name value")
// chapisha(jina)

chapisha("Habari, " + jina + "!")

/*
TODO: Add age verification
kama umri < 18 {
    chapisha("You are a minor")
}
*/
```

### Example 3: Mixed Comment Styles

```swazi
# Configuration section
data max_users = 100
data timeout = 30  // seconds

"""
This section handles user authentication
We support multiple authentication methods
"""

/* 
Temporarily disabled old authentication code
data old_method = "basic"
chapisha(old_method)
*/

"New authentication system starts here"
data auth_method = "oauth2"
```

## Key Points to Remember

1. **Comments are ignored** - They don't affect how your program runs
2. **Four styles available** - `//`, `#`, `/* */`, and string literals
3. **Use them wisely** - Comment why, not what (unless it's complex)
4. **Keep them updated** - Old comments can be misleading
5. **Flexibility** - Choose the style that fits your background (C, Python, etc.)

## Practice Exercise

Try adding comments to this code:

```swazi
data radius = 7
data pi = 3.14159
data area = pi * radius * radius
chapisha(area)
```

**Solution:**

```swazi
// Calculate the area of a circle

data radius = 7  # Circle radius in centimeters
data pi = 3.14159  # Mathematical constant

"""
Formula: Area = π × r²
This calculates the area of a circle
given its radius
"""

data area = pi * radius * radius
chapisha(area)  // Output the result
```

## What's Next?

Now that you know how to document your code with comments, you're ready to learn about:
- Variables and data types
- Operators and expressions
- Control flow statements
- Functions and procedures

Remember: Good comments make your code easier to understand, maintain, and share with others!