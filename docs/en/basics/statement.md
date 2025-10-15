# Statements in SwaziLang

## What is a Statement?

A **statement** is a single instruction that tells the computer to perform a specific action. Think of statements as sentences in a programming language - each statement is a complete instruction that does something.

Just like how you give someone instructions step by step ("Open the door", "Turn on the light", "Sit down"), a computer program is made up of statements that execute one after another.

## Basic Statement Structure

In SwaziLang, statements are written one per line, and each statement performs one action. Here's what makes a statement:

- It's a complete instruction
- It performs a specific action
- It usually ends at the end of the line
- Statements are executed in order, from top to bottom

***And Remember I said one statement per line, didn't mean you should always write a statement in a single line, No, You can write a statement in multiple lines, well you can and you should especially those involving blocks of other statements. You will see more in examples later.***

## Types of Statements

### 1. Declaration Statements
These statements create, or intruduce something new to be stored.

eg.
```swazi
data jina = "John"
data umri = 25
```

### 2. Assignment Statements
These statements change the value of existing variables(declared variables).

```swazi
jina = "Mary"
umri = 30
```

### 3. Expression Statements
These statements perform calculations or operations.

```swazi
jumla = 10 + 20
matokeo = umri * 2
```

### 4. Output Statements
These statements display information to the user.

```swazi
chapisha("Hello, World!")
chapisha(jina)
```

### 5. Control Flow Statements
These statements control how the program runs (we'll learn more about these later).

```swazi
kama umri > 18 {
    chapisha("You are an adult")
}
```

## Simple Examples

Let's look at a program with multiple statements:

```swazi
// This is a simple program with several statements

data jina = "Amina"           // Statement 1: Declare a variable
data umri = 22                 // Statement 2: Declare another variable

chapisha("Habari!")              // Statement 3: Print a greeting
chapisha(jina)                   // Statement 4: Print the name
chapisha("Una miaka:")           // Statement 5: Print text
chapisha(umri)                   // Statement 6: Print the age
```

**Output:**
```
Habari!
Amina
Una miaka:
22
```

Each line is a statement that executes one after another, from top to bottom.

## Statement vs Expression

It's important to understand the difference:

- **Statement**: A complete instruction that performs an action
  - Example: `data x = 5`
  
- **Expression**: A piece of code that produces a value
  - Example: `5 + 3` (produces 8)

An expression can be part of a statement:
```swazi
data jumla = 10 + 5  // "10 + 5" is an expression, the whole line is a statement
```
This is like telling the computer, "Hey `10 + 5` resolves to something(expression) take that and store it in variable called `jumla`" — That sentences is statement, an instruction.

**So in short a quick note, An expression prodeuces a value, while a statement gives an action.**

## Key Points to Remember

1. **One action at a time**: Each statement does one thing
2. **Order matters**: Statements execute from top to bottom
3. **Clarity is important**: Write clear statements that are easy to understand
4. **Build complexity gradually**: Combine simple statements to create complex programs

## Practice Exercise

Try writing a program with these statements:

1. Create a variable for your name
2. Create a variable for your favorite number
3. Print a greeting
4. Print your name
5. Print your favorite number

```swazi
// Your code here
data jina = "Your Name"
data nambari = 7

chapisha "Habari! Jina langu ni:"
chapisha jina
chapisha "Nambari yangu favorite ni:"
chapisha nambari
```

## What's Next?

Now that you understand statements, you're ready to learn about:
- Variables and data types in detail
- Different types of expressions
- Control flow statements (conditions and loops)
- Functions and more complex program structures

Remember: Every program is just a collection of statements working together to accomplish a task!