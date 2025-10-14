# SwaziLang OOP: Classes (`muundo`)

Object-Oriented Programming (**OOP**) lets you build programs using objects that represent real-world "things" or concepts.  
Think of it like organizing your life:  
- You have "categories" (classes) like Car, Student, Teacher, Book.
- Each "category" has details (properties) and actions (methods).

## Analogy: OOP as Blueprints

Imagine you want to build houses in a city:
- You first create a **blueprint** (class).
- Each time you use the blueprint, you build a new **house** (object/instance).
- Every house can have different colors, owners, etc., but all follow the same design.

In SwaziLang, a **class** is called a **`muundo`** (structure/blueprint).

---

## What Is a `muundo`?

A **muundo** is a template for creating objects with the same shape but different data.  
- It defines what properties and methods its objects have.
- It lets you create multiple similar objects easily.
- It helps organize code, prevents repetition, and lets you model real things in your program.

### Why Use Classes (`muundo`)?

- Group related data and behaviors together.
- Reuse code by creating many objects from the same blueprint.
- Keep code clean, organized, and scalable.

---

## SwaziLang Class (`muundo`) Syntax

### Basic Structure

```swazi
muundo Student:
    name              // property declaration
    name = "John Doe" // property with initial value

    &age = 40         // locked property (visible, can't be reassigned)
    @age = 70         // private property (hidden from outside)

    Student(name):    // constructor (same name as class)
        $.name = name;

    ~Student {        // destructor (optional, ~ before class name)
        // cleanup code
    }

    tabia getName arg, arg2 {
        rudisha $.name
    }

    tabia thabiti getName {
        rudisha $.name
    }

    &tabia lockedMethod {}       // locked method
    @tabia privateMethod {}      // private method

    @tabia thabiti privateGetter {} // private getter
    &tabia thabiti lockedGetter {}  // locked getter

    *count = 123                 // static property (belongs to class, not instance)
    *tabia thabiti getCount {}   // static getter method
```

- **Properties:** Declared directly (no `data` keyword).
- **Locked (`&`) and private (`@`)**: Work like in objects.
- **Constructor:** Must have same name as class.
- **Destructor:** Optional, starts with `~`.
- **Methods:** Use `tabia`; getters use `tabia thabiti`.
- **Static Members (`*`)**: Belong to the class, not instances.

---

## Creating an Instance

```swazi
data ob = unda Student()      // Create a Student object
```

## Calling the Destructor

```swazi
futa ob                      // Manually destroy an object, calls destructor
data a = futa(ob)            // Also valid
```

---

## How Classes Work

- **Blueprint:** The `muundo` defines what every Student will have and can do.
- **Instance:** Each time you use `unda Student()`, you get a new Student object.
- **Methods:** Use `tabia` to add actions, use `$` inside methods to refer to "this" object.

---

## Practical Example

```swazi
muundo Car:
    name
    @engineNumber
    &manufacturer = "SwaziMotors"

    Car(name, engineNumber):
        $.name = name
        $.engineNumber = engineNumber

    tabia display {
        chapisha `Car: ${$.name}, Engine: ${$.engineNumber}, Maker: ${$.manufacturer}`
    }

    *totalCars = 0
    *tabia thabiti getTotal {
        rudisha Car.totalCars
    }

data myCar = unda Car("Safari", "ENG123")
myCar.display()      // Car: Safari, Engine: ENG123, Maker: SwaziMotors
```

---

## OOP Features in SwaziLang Classes

- **Encapsulation:** Keep data and related actions together.
- **Privacy & Locking:** Control access and immutability of members.
- **Getters:** Use `tabia thabiti` for computed/read-only properties.
- **Static Members:** Use `*` for class-level properties/methods.
- **Constructors/Destructors:** Initialize and clean up objects.

---

## Tips and Warnings

:::warning
**Mixing block styles in `muundo` definition is allowed, but can lead to confusion.**
- Pick one style (C-style `{}` or Pythonic style `:` + indentation) for clarity and maintainability.
- Unlike `chagua` (switch), mixing doesn't throw errors, but be careful!
:::

- **Do not use `data` keyword for property declarations inside a class** (use `data` only inside methods if needed).
- Only use static members with `*`—they belong to the class, not individual objects.

---

## Practice Challenge

Define a `Book` class with a title, author, and a locked ISBN property.  
Add a method to display the book info.

<details>
<summary>Solution</summary>

```swazi
muundo Book:
    title
    author
    &isbn

    Book(title, author, isbn):
        $.title = title
        $.author = author
        $.isbn = isbn

    tabia display {
        chapisha `Title: ${$.title}, Author: ${$.author}, ISBN: ${$.isbn}`
    }

data b = unda Book("SwaziLang Guide", "Amina", "ISBN123456")
b.display()
```
</details>

---

**Summary:**  
- `muundo` is a SwaziLang class/struct—your blueprint for objects.
- Use for organizing related data and methods.
- Supports privacy, locking, static members, constructors, destructors, and more.