# Objects in SwaziLang

## What Is an Object?

Think about a real-world "thing" - like a person. A person has:
- Properties: name, age, height, email
- Actions/Methods: can walk, can talk, can learn

An **object** in programming is similar. It's a collection of related data (properties) and actions (methods) bundled together.

Instead of having separate variables like:
```swazi
data student_name = "Hassan";
data student_age = 20;
data student_grade = "A";
```

You can group them together in an object:
```swazi
data student = {
    jina: "Hassan",
    umri: 20,
    grade: "A"
};
```

Much cleaner, right?

## Creating Objects

### Basic Object Syntax

```swazi
data student = {
    jina: "Hassan",
    umri: 20,
    grade: "A"
};
```

**Structure:**
- Use curly braces `{ }`
- Inside, list key-value pairs
- Separate pairs with commas
- Format: `key: value`

### More Examples

```swazi
data book = {
    title: "Learning SwaziLang",
    author: "Expert",
    pages: 350,
    available: kweli
};

data location = {
    city: "Dar es Salaam",
    country: "Tanzania",
    latitude: -6.8,
    longitude: 39.2
};
```

### Empty Object

```swazi
data empty = {};
```

## Accessing Object Properties

### Dot Notation (Most Common)

```swazi
data student = {
    jina: "Hassan",
    umri: 20
};

chapisha student.jina;   // Prints: Hassan
chapisha student.umri;   // Prints: 20
```

### Bracket Notation

```swazi
data student = {
    jina: "Hassan",
    umri: 20
};

chapisha student["jina"];   // Prints: Hassan
chapisha student["umri"];   // Prints: 20
```

**When to use bracket notation:**
- When the property name has spaces or special characters
- When you're storing the property name in a variable

```swazi
data person = {
    "full name": "Hassan Ali",
    "email address": "hassan@example.com"
};

chapisha person["full name"];  // Hassan Ali

// Or with a variable:
data key = "email address";
chapisha person[key];  // hassan@example.com
```

## Modifying Object Properties

You can change property values:

```swazi
data student = {
    jina: "Hassan",
    umri: 20
};

student.umri = 21;
chapisha student.umri;  // 21

student["jina"] = "Ali";
chapisha student.jina;  // Ali
```

### Adding New Properties

You can add properties that didn't exist before:

```swazi
data student = {
    jina: "Hassan"
};

student.umri = 20;      // Add new property
student.email = "hassan@example.com";

chapisha student;
// { jina: "Hassan", umri: 20, email: "hassan@example.com" }
```

### Using Operations on Properties

```swazi
data account = {
    balance: 1000
};

account.balance += 500;
chapisha account.balance;  // 1500

account.balance *= 2;
chapisha account.balance;  // 3000
```

## Object Methods (Tabia)

Objects can contain methods - functions that do actions on the object's data.

### Basic Method Definition

```swazi
data student = {
    jina: "Hassan",
    umri: 20,
    
    tabia greet {
        chapisha "Habari, nina jina " + $.jina;
    }
};

// Call the method
student.greet();  // Prints: Habari, nina jina Hassan
```

### Methods with Parameters

```swazi
data calculator = {
    value: 0,
    
    tabia add amount {
        $.value += amount;
        rudisha $;  // Return the object for chaining
    },
    
    tabia display {
        chapisha $.value;
    }
};

calculator.add(10);
calculator.display();  // 10

calculator.add(5);
calculator.display();  // 15
```

### Understanding `$` - Reference to the Object

Inside a method, `$` refers to the object itself:

```swazi
data person = {
    jina: "Hassan",
    umri: 25,
    
    tabia introduce {
        chapisha "Mimi ni " + $.jina + " mwenye miaka " + $.umri;
    }
};

person.introduce();  // Prints: Mimi ni Hassan mwenye miaka 25
```

### Method Chaining with `rudisha $`

By returning `$` from a method, you can chain method calls:

```swazi
data calculator = {
    result: 0,
    
    tabia add x {
        $.result += x;
        rudisha $;  // Return the object
    },
    
    tabia multiply x {
        $.result *= x;
        rudisha $;
    },
    
    tabia display {
        chapisha $.result;
    }
};

// Chain methods!
calculator.add(5).multiply(2).add(3).display();
// Step 1: 0 + 5 = 5
// Step 2: 5 * 2 = 10
// Step 3: 10 + 3 = 13
// Prints: 13
```

## Nested Objects

Objects can contain other objects:

```swazi
data student = {
    jina: "Hassan",
    
    contact: {
        email: "hassan@example.com",
        phone: "0654321789"
    },
    
    address: {
        city: "Dar es Salaam",
        country: "Tanzania"
    }
};

chapisha student.jina;              // Hassan
chapisha student.contact.email;     // hassan@example.com
chapisha student.address.city;      // Dar es Salaam
```

### Accessing with Variables

```swazi
data person = {
    jina: "Ali",
    location: {
        city: "Zanzibar"
    }
};

data prop = "location";
data nested = "city";

chapisha person[prop][nested];  // Zanzibar
```

## Practical Examples

### Example 1: Student Object

```swazi
data student = {
    jina: "Hassan",
    umri: 20,
    grade: "A",
    
    tabia show_info {
        chapisha "Jina: " + $.jina;
        chapisha "Umri: " + $.umri;
        chapisha "Grade: " + $.grade;
    },
    
    tabia pass_exam new_grade {
        $.grade = new_grade;
        chapisha $.jina + " sasa ana grade " + $.grade;
    }
};

student.show_info();
// Prints:
// Jina: Hassan
// Umri: 20
// Grade: A

student.pass_exam("B");
// Prints: Hassan sasa ana grade B
```

### Example 2: Bank Account

```swazi
data account = {
    account_number: "12345",
    balance: 5000,
    owner: "Ali",
    
    tabia deposit amount {
        $.balance += amount;
        chapisha "Deposit: " + amount + ". New balance: " + $.balance;
        rudisha $;
    },
    
    tabia withdraw amount {
        kama amount <= $.balance {
            $.balance -= amount;
            chapisha "Withdrawal: " + amount + ". New balance: " + $.balance;
        } vinginevyo {
            chapisha "Insufficient funds!";
        }
        rudisha $;
    },
    
    tabia check_balance {
        chapisha "Account: " + $.owner;
        chapisha "Balance: " + $.balance;
    }
};

account.deposit(1000).withdraw(500).check_balance();
```

### Example 3: Product in a Store

```swazi
data product = {
    jina: "Laptop",
    bei: 800000,
    stock: 5,
    
    tabia reduce_stock quantity {
        kama quantity <= $.stock {
            $.stock -= quantity;
            rudisha kweli;
        } vinginevyo {
            rudisha sikweli;
        }
    },
    
    tabia get_info {
        chapisha "Product: " + $.jina;
        chapisha "Price: " + $.bei;
        chapisha "Stock: " + $.stock;
    }
};

product.get_info();

data sold = product.reduce_stock(2);
kama sold {
    chapisha "Sold 2 units!";
} vinginevyo {
    chapisha "Not enough stock!";
}

product.get_info();
```

### Example 4: Rectangle with Calculations

```swazi
data rect = {
    length: 10,
    width: 5,
    
    tabia area {
        rudisha $.length * $.width;
    },
    
    tabia perimeter {
        rudisha 2 * ($.length + $.width);
    },
    
    tabia display {
        chapisha "Length: " + $.length;
        chapisha "Width: " + $.width;
        chapisha "Area: " + $.area();
        chapisha "Perimeter: " + $.perimeter();
    }
};

rect.display();
// Prints:
// Length: 10
// Width: 5
// Area: 50
// Perimeter: 30
```

## Important Notes

### 1. Properties Can Be Any Type

```swazi
data mixed = {
    name: "Hassan",
    age: 25,
    scores: [85, 90, 78],
    active: kweli,
    nothing: null,
    details: {
        city: "Dar",
        country: "Tanzania"
    }
};
```

### 2. Accessing Non-Existent Properties

```swazi
data person = {
    jina: "Hassan"
};

chapisha person.email;  // Prints: null (doesn't exist)
```

### 3. Methods Can Call Other Methods

```swazi
data calculator = {
    value: 0,
    
    tabia add x {
        $.value += x;
        rudisha $;
    },
    
    tabia display {
        chapisha $.value;
    },
    
    tabia add_and_show x {
        $.add(x);
        $.display();
    }
};

calculator.add_and_show(5);  // Adds 5 and displays it
```

### 4. Objects Are Reference Types

When you assign an object to another variable, both refer to the same object:

```swazi
data obj1 = { value: 10 };
data obj2 = obj1;

obj2.value = 20;

chapisha obj1.value;  // 20 (both point to same object!)
```

### 5. Method Declaration Syntax

Methods in objects are declared using the `tabia` keyword:

```swazi
data obj = {
    tabia method_name param1 param2 {
        // Method body
        chapisha "Hello";
    }
};
```

For methods without parameters:

```swazi
data obj = {
    tabia method_name {
        chapisha "Hello";
    }
};
```

## Practice Challenges

### Challenge 1: Create a Simple Object

Create a `book` object with title, author, and pages. Add a method to display the information:

**Solution:**

```swazi
data book = {
    title: "Learning SwaziLang",
    author: "Expert",
    pages: 350,
    
    tabia display {
        chapisha "Title: " + $.title;
        chapisha "Author: " + $.author;
        chapisha "Pages: " + $.pages;
    }
};

book.display();
```

### Challenge 2: Object with Methods That Modify

Create a `counter` object that can increment, decrement, and display:

**Solution:**

```swazi
data counter = {
    count: 0,
    
    tabia increment {
        $.count += 1;
        rudisha $;
    },
    
    tabia decrement {
        $.count -= 1;
        rudisha $;
    },
    
    tabia display {
        chapisha "Count: " + $.count;
    }
};

counter.increment().increment().decrement().display();
// Prints: Count: 1
```

### Challenge 3: Nested Objects

Create a `company` object with a `ceo` object inside it:

**Solution:**

```swazi
data company = {
    name: "TechCorp",
    
    ceo: {
        jina: "Hassan",
        email: "hassan@techcorp.com"
    },
    
    tabia show_ceo {
        chapisha "CEO: " + $.ceo.jina;
        chapisha "Email: " + $.ceo.email;
    }
};

company.show_ceo();
```

### Challenge 4: Method Chaining

Create a `string_builder` object with methods that return `$` for chaining:

**Solution:**

```swazi
data builder = {
    text: "",
    
    tabia add str {
        $.text += str;
        rudisha $;
    },
    
    tabia add_space {
        $.text += " ";
        rudisha $;
    },
    
    tabia result {
        chapisha $.text;
    }
};

builder.add("Hello").add_space().add("World").result();
// Prints: Hello World
```

## What's Next?

In the next chapter, you'll learn about:
- **Object Privacy** - Using `@` for private properties and methods (private methods or roperties not accassible outiside)
- **Locked Properties** - Using `&` for locked members (can not be overwritten/reassigned but visible outiside)
- **Advanced Object Patterns** - More complex object structures

Objects are fundamental to organizing code. They let you group related data and behavior together, making programs easier to understand and maintain!

---

**Remember:** Objects let you bundle related data and methods together. Use `tabia` to declare methods, use `$` inside methods to refer to the object itself, and return `$` for method chaining!