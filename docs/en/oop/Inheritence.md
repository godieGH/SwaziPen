# SwaziLang OOP: Inheritance (`rithi`)

Inheritance is a key concept in Object-Oriented Programming (OOP).  
It lets you create a new class (child/derived) that **inherits** properties and methods from another class (parent/base), so you can reuse and extend code efficiently.

---

## Analogy: Inheritance as Family Traits

Imagine a family:
- The parent has certain traits (hair color, eye color, skills).
- The child **inherits** those traits, but can also have their own unique features.

In SwaziLang, inheritance lets you build new classes from existing ones, gaining all their features automatically.

---

## What is Inheritance (`rithi`) in SwaziLang?

- **Base class:** The original blueprint (parent).
- **Derived class:** The new blueprint (child) that extends the base.
- Derived classes get all the properties and methods of the base class, and can add or override their own.

---

## Syntax

### Direct Inheritance (Parentheses)

```swazi
muundo Base {
    // base properties and methods
}

muundo Derived(Base) {
    // derived properties and methods
}
```

### Using the `rithi` Keyword

```swazi
muundo Derived rithi Base {
    // derived properties and methods
}
```

Both patterns work and mean the same thing.

---

## Constructor Chaining: `supa`

When a derived class has a constructor, you often want to call the parent class's constructor to set up inherited features.  
Use the **`supa`** keyword for this.

```swazi
muundo University {
    University(uni_name) {
        $.uni_name = uni_name
    }
}

muundo Dipartment(University) {
    Dipartment(uni_name, department_name) {
        supa(uni_name)      // calls University constructor
        $.department_name = department_name
    }
}
```

- **`supa(...)`** always calls the immediate base class constructor.

---

## Why Use Inheritance?

- **Code Reuse:** Avoid duplication; share common logic.
- **Extension:** Add or override new features for specific cases.
- **Organization:** Model real-world relationships.

---

## Practical Example

```swazi
muundo Animal:
    name
    Animal(name):
        $.name = name
    tabia speak {
        chapisha `${$.name} makes a sound`
    }

muundo Dog(Animal):
    breed
    Dog(name, breed):
        supa(name)
        $.breed = breed
    tabia speak {
        chapisha `${$.name} barks!`
    }

data pet = unda Dog("Bingo", "Maltese")
pet.speak()      // Bingo barks!
```

- `Dog` inherits from `Animal`.
- `Dog` overrides the `speak` method.

---

## Tips and Warnings

- You can only inherit from **one** base class (no multiple inheritance).
- Use `supa(...)` inside the child constructor to initialize the parent.
- The derived class gets all public, locked, and static members from the base class, but not private members (`@`).
- You can override methods by defining them again in the derived class.

---

## Practice Challenge

Define a `Vehicle` class and a `Car` class that inherits from it.  
`Vehicle` has a method `move`, and `Car` overrides it.

<details>
<summary>Solution</summary>

```swazi
muundo Vehicle:
    Vehicle():
        // constructor
    tabia move {
        chapisha "Vehicle is moving"
    }

muundo Car(Vehicle):
    Car():
        supa()
    tabia move {
        chapisha "Car is driving"
    }

data v = unda Vehicle()
data c = unda Car()
v.move()     // Vehicle is moving
c.move()     // Car is driving
```
</details>

---

**Summary:**  
- Use inheritance to build on existing classes.
- Choose either `muundo Derived(Base)` or `muundo Derived rithi Base`.
- Use `supa(...)` in the child constructor to initialize the base class.
- Override methods to customize behavior.