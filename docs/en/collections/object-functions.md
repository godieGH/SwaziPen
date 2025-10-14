# Object Methods (`tabia`) in SwaziLang

## Deep Dive: Methods in Objects

In SwaziLang, **object methods** are powerful tools that let your objects *do things*. These methods are called **`tabia`** (Swahili for "behavior" or "method"). You've already seen `tabia` in basic objects and privacy, but here we'll explore them fully—how they work, how `$` binds to them, how getters differ, and best practices for method design.

---

## What Is `tabia`?

A `tabia` is a function **attached to an object**. It lets the object perform actions, access and change its properties, and respond to messages.

**Example:**
```swazi
data person = {
    jina: "Amina",
    umri: 22,

    tabia introduce {
        chapisha "Nina jina " + $.jina + " na umri " + $.umri;
    }
};

person.introduce();   // Nina jina Amina na umri 22
```

---

## How Is `tabia` Different from Regular Functions?

- Regular functions are declared with `kazi` or as lambdas, and **aren't attached to objects**.
- Tabia are *inside* objects, declared with the `tabia` keyword.
- Inside a tabia, the special symbol `$` **always refers to the object itself** (like `this` in other languages).

**Outside an object:**
```swazi
kazi greet name {
    chapisha "Hello " + name;
}
greet("Amina");   // Hello Amina
```

**Inside an object (tabia):**
```swazi
data car = {
    model: "Toyota",

    tabia show {
        chapisha "Car: " + $.model;
    }
};
car.show();    // Car: Toyota
```

---

## The Role of `$` in Tabia

`$` is always **bound** to the object *for tabia only*. This means inside a tabia, `$` gives access to all properties and methods of the object.

**Example:**
```swazi
data bank = {
    balance: 1000,

    tabia deposit amount {
        $.balance += amount;
        chapisha "Balance: " + $.balance;
    }
};
bank.deposit(500);    // Balance: 1500
```

**Key Point:**  
- `$` is **automatic** in tabia—no need to pass it or bind it yourself.
- `$` is **not available in regular functions** (`kazi`) or lambdas declared outside objects.

---

## Why Only Tabia?

Tabia are designed for *object-specific behavior*.  
**You should not use `tabia` outside objects.** If you need a standalone function, use `kazi` or lambdas.

**Wrong usage (will cause error):**
```swazi
tabia greet {
    chapisha "Hello";
}
// Error! tabia must be inside an object
```

**Use regular function instead:**
```swazi
kazi greet {
    chapisha "Hello";
}
greet();
```

---

## Using Regular Functions and Lambdas Inside Objects

You can declare normal functions or lambdas as properties inside objects.  
**However, `$` is NOT bound in them.**  
They behave like regular functions, not methods.

**Example:**
```swazi
kazi myFunc {
  // no $ in here
}

data obj = {
    x: 5,

    myFunc,

    myLambda: a => a * 2
};

obj.myFunc();         // No $ binding here!
chapisha obj.myLambda(10);   // 20
```

**Why use these?**
- For utility functions that don't need object context
- For callbacks, event handlers, etc.

---

## Mixing Tabia and Regular Functions

You can combine both in an object, but remember:
- Tabia gets `$` and can access/modify object properties
- Regular functions/lambdas inside objects are just properties with function values—no `$` binding

```swazi
data calc = {
    value: 10,

    tabia double {
        $.value *= 2;
        rudisha $;
    },

    triple: a => a * 3
};

calc.double();               // $.value becomes 20
chapisha calc.triple(5);     // 15
```

---

## Tabia with Parameters & Chaining

Tabia can take parameters.  
If you return `$` from a tabia, you enable *method chaining* (calling methods one after another).

```swazi
data builder = {
    text: "",

    tabia add word {
        $.text += word;
        rudisha $;
    },

    tabia space {
        $.text += " ";
        rudisha $;
    },

    tabia result {
        chapisha $.text;
    }
};

builder.add("Hello").space().add("World").result();
// Prints: Hello World
```

---

## Getters: `tabia thabiti`

Getters are **special tabia** that behave like properties.  
- Declared with `tabia thabiti`
- **No parentheses when accessing**
- **Cannot take parameters**
- `$` is bound, so can use object context

**Example:**
```swazi
data product = {
    bei: 800,

    tabia thabiti tax {
        rudisha $.bei * 0.18;
    }
};

chapisha product.tax;      // 144
product.tax();             // Error! thabiti methods are not callable
```

### Why Use Getters?

- To expose *computed properties* (e.g., totals, summaries)
- To hide calculation logic
- To enable property-like access to methods

---

## Privacy and Locking in Tabia

As covered previously, you can make tabia **private** (`@`) or **locked** (`&`).

- `@tabia` is only accessible inside the object
- `&tabia` cannot be overwritten or reassigned
- You can combine both (`@&tabia`)—though usually unnecessary

```swazi
data user = {
    jina: "Amina",
    @password: "secret",

    tabia thabiti displayName {
        rudisha $.jina;
    },

    @tabia checkPassword pass {
        rudisha $.password == pass;
    }
};

chapisha user.displayName;         // Amina
user.checkPassword("secret");      // Error! Private method
```

---

## Best Practices

- **Use tabia for actions that need object context.**
- **Use regular functions/lambdas for utility or stateless logic.**
- **Always access properties and other tabia via `$` inside tabia.**
- **Return `$` from tabia for method chaining when you want a fluent API.**
- **Declare tabia inside objects only.**
- **Use getters (`tabia thabiti`) for computed values.**
- **Use privacy (`@`) for sensitive/internal tabia.**
- **Use locking (`&`) for methods that should not be changed.**

---

## Advanced: Passing Tabia/Lambdas as Callbacks

You can pass tabia or lambdas as arguments to other methods or functions.

**Example:**
```swazi
data processor = {
    tabia process fn {
        rudisha fn($.value);
    },
    value: 10
};

data result = processor.process(x => x * 5);
chapisha result;    // 50
```
- When passing a tabia as a callback, remember `$` will only be bound if it's called in object context.

---

## Common Mistakes

- Declaring tabia outside an object—**not allowed**.
- Trying to use `$` in a regular function or lambda—**won't work**.
- Calling a getter with parentheses—**error**.
- Forgetting to use `$` inside tabia to access object members.

---

## Practice Challenges

### Challenge 1: Chained Calculator

Create an object with tabia for `add`, `multiply`, and `display`. Support method chaining.

<details>
<summary>Solution</summary>

```swazi
data calc = {
    value: 0,

    tabia add x {
        $.value += x;
        rudisha $;
    },

    tabia multiply x {
        $.value *= x;
        rudisha $;
    },

    tabia display {
        chapisha $.value;
    }
};

calc.add(5).multiply(2).display();   // Prints: 10
```
</details>

---

### Challenge 2: Getters for Product Info

Create an object with a locked price and a getter for discounted price.

<details>
<summary>Solution</summary>

```swazi
data item = {
    &price: 1000,

    tabia thabiti discounted {
        rudisha $.price * 0.9;
    }
};

chapisha item.discounted;    // 900
item.price = 800;            // Error! Locked property
```
</details>

---

### Challenge 3: Combining Tabia and Lambdas

Make an object with both a tabia and a lambda property. Show how `$` is only available in tabia.

<details>
<summary>Solution</summary>

```swazi
data obj = {
    x: 5,

    tabia show {
        chapisha $.x;
    },

    double: a => a * 2
};

obj.show();         // 5
chapisha obj.double(10);   // 20
```
</details>

---

## Summary Table

| Method Type     | Syntax                  | `$` Bound? | Callable | Use Case                 |
|-----------------|------------------------|:----------:|:--------:|--------------------------|
| Tabia           | `tabia name {}`        | ✅ Yes     | With ()  | Object actions           |
| Getter Tabia    | `tabia thabiti name {}`| ✅ Yes     | Prop     | Computed properties      |
| Private Tabia   | `@tabia name {}`       | ✅ Yes     | With ()  | Internal object actions  |
| Locked Tabia    | `&tabia name {}`       | ✅ Yes     | With ()  | Unchangeable actions     |
| Lambda Property | `name: a => ...`       | ❌ No      | With ()  | Utility/callback         |
| Regular Function| `kazi name {}`         | ❌ No      | With ()  | Global/standalone logic  |

---

## What's Next?

Now that you understand object methods in depth, you're ready to build expressive, powerful objects in SwaziLang. Next, dive into **advanced collections** or explore **object patterns** to design robust applications!

---

**Remember:**  
- Use `tabia` for object-specific behavior  
- `$` is your gateway to the object's data  
- Prefer getters for computed values  
- Keep lambdas and regular functions for stateless logic  

Mastering tabia will unlock the full power of objects in SwaziLang!