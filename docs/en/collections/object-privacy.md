# Object Privacy & Locked Members

## Introduction

Sometimes you want to control how properties and methods in your objects can be accessed or modified. SwaziLang provides two powerful features for this:

- **Private Members (`@`)** - Properties and methods that are hidden from outside access
- **Locked Members (`&`)** - Properties and methods that are visible but cannot be reassigned

Think of it like a house:
- **Private (`@`)** - Like a locked bedroom. Only people inside the house (the object) can access it.
- **Locked (`&`)** - Like a window. Everyone can see through it, but nobody can change it.

## Private Members (`@`)

### What Are Private Members?

Private members are properties or methods that can **only be accessed from inside the object**. They're invisible to the outside world.

### Private Properties

```swazi
data person = {
    @age: 25,           // Private - can't access from outside
    jina: "Hassan",     // Public - can access from outside
    
    tabia getAge {
        rudisha $.age;  // Inside methods can access private members
    }
};

// Outside the object:
chapisha person.jina;       // ✓ Works: Hassan
chapisha person.age;        // ✗ Error: Cannot access private property 'age'
chapisha person.getAge();   // ✓ Works: 25 (accessed through public method)

person.age = 30;            // ✗ Error: Cannot modify private property 'age'
```

**Why use private properties?**
- Protect sensitive data
- Prevent accidental modifications
- Control how data is accessed

### Private Methods

```swazi
data calculator = {
    value: 0,
    
    @tabia validate amount {
        kama amount < 0 {
            chapisha "Error: Amount cannot be negative";
            rudisha sikweli;
        }
        rudisha kweli;
    },
    
    tabia add amount {
        kama $.validate(amount) {    // Can call private method internally
            $.value += amount;
        }
        rudisha $;
    }
};

// Outside the object:
calculator.add(10);           // ✓ Works
calculator.validate(5);       // ✗ Error: Cannot access private method 'validate'
```

### Real-World Example: Bank Account

```swazi
data account = {
    @balance: 5000,
    @pin: "1234",
    owner: "Hassan",
    
    @tabia verifyPin inputPin {
        rudisha $.pin == inputPin;
    },
    
    tabia withdraw amount, inputPin {
        kama !$.verifyPin(inputPin) {
            chapisha "Error: Wrong PIN!";
            rudisha sikweli;
        }
        
        kama amount > $.balance {
            chapisha "Error: Insufficient funds!";
            rudisha sikweli;
        }
        
        $.balance -= amount;
        chapisha "Withdrawn: " + amount;
        rudisha kweli;
    },
    
    tabia checkBalance inputPin {
        kama $.verifyPin(inputPin) {
            chapisha "Balance: " + $.balance;
        } vinginevyo {
            chapisha "Error: Wrong PIN!";
        }
    }
};

// Usage:
account.withdraw(1000, "1234");       // ✓ Works
account.checkBalance("1234");         // ✓ Works

// These will throw errors:
account.balance;                      // ✗ Error: Private property
account.pin;                          // ✗ Error: Private property
account.verifyPin("1234");            // ✗ Error: Private method
```

## Locked Members (`&`)

### What Are Locked Members?

Locked members are properties or methods that are **visible and accessible**, but **cannot be reassigned or overwritten**.

### Locked Properties

```swazi
data config = {
    &version: "1.0.0",
    &author: "Hassan",
    theme: "dark"
};

// Reading is allowed:
chapisha config.version;      // ✓ Works: 1.0.0
chapisha config.author;       // ✓ Works: Hassan

// Modifying regular properties works:
config.theme = "light";       // ✓ Works

// But locked properties cannot be changed:
config.version = "2.0.0";     // ✗ Error: Cannot reassign locked property 'version'
config.author = "Ali";        // ✗ Error: Cannot reassign locked property 'author'
```

### Locked Methods

```swazi
data math = {
    &tabia add x, y {
        rudisha x + y;
    },
    
    tabia subtract x, y {
        rudisha x - y;
    }
};

// Calling methods works normally:
chapisha math.add(5, 3);          // ✓ Works: 8
chapisha math.subtract(10, 4);    // ✓ Works: 6

// Regular methods can be reassigned:
math.subtract = (x, y) => {
    rudisha x * y;                // Changed behavior
};

// But locked methods cannot:
math.add = (x, y) => {
    rudisha x * y;
};  // ✗ Error: Cannot reassign locked method 'add'
```

### Real-World Example: API Configuration

```swazi
data api = {
    &baseURL: "https://api.example.com",
    &apiKey: "secret-key-12345",
    &version: "v1",
    timeout: 5000,
    
    &tabia getEndpoint path {
        rudisha $.baseURL + "/" + $.version + "/" + path;
    },
    
    tabia setTimeout ms {
        $.timeout = ms;
    }
};

// Reading locked properties:
chapisha api.baseURL;                    // ✓ Works
chapisha api.getEndpoint("users");       // ✓ Works: https://api.example.com/v1/users

// Modifying regular properties:
api.setTimeout(10000);                   // ✓ Works

// These will throw errors:
api.baseURL = "https://malicious.com";   // ✗ Error: Locked property
api.apiKey = "hacked";                   // ✗ Error: Locked property
api.getEndpoint = tabia { };             // ✗ Error: Locked method
```

## Combining `@` and `&`

You can use both `@` (private) and `&` (locked) together, though it's rarely necessary.

```swazi
data system = {
    @&secretKey: "ultra-secure-key",    // Private AND locked
    
    tabia getKey {
        rudisha $.secretKey;            // Can access internally
    }
};

system.secretKey;              // ✗ Error: Private (can't access)
system.secretKey = "new";      // ✗ Error: Private (can't access to modify)
```

**Note:** Using `@&` is redundant because if something is private (`@`), it's already inaccessible from outside, so locking it (`&`) adds no extra protection. Just use `@` in most cases.

## Getters (thabiti)

Getters are special methods that behave like properties when accessed. They're defined using `tabia thabiti`.

### What Is a Getter?

A getter is a method that:
- Takes **no parameters**
- Is accessed **without parentheses** (like a property)
- Usually returns a computed value

```swazi
data person = {
    @firstName: "Hassan",
    @lastName: "Ali",
    
    tabia thabiti fullName {
        rudisha $.firstName + " " + $.lastName;
    }
};

// Access like a property, not a method:
chapisha person.fullName;       // ✓ Works: Hassan Ali
chapisha person.fullName();     // ✗ Error: fullName is not callable
```

### Getters with Privacy and Locking

You can combine getters with `@` and `&`:

```swazi
data product = {
    @price: 100,
    @taxRate: 0.15,
    
    // Public getter - accessible from outside
    tabia thabiti totalPrice {
        rudisha $.price + ($.price * $.taxRate);
    },
    
    // Private getter - only accessible inside
    @tabia thabiti margin {
        rudisha $.price * 0.2;
    },
    
    // Locked getter - can't be reassigned
    &tabia thabiti currency {
        rudisha "TSH";
    },
    
    tabia getDetails {
        chapisha "Price: " + $.price;
        chapisha "Margin: " + $.margin;      // Can access private getter
        chapisha "Total: " + $.totalPrice;
        chapisha "Currency: " + $.currency;
    }
};

// Usage:
chapisha product.totalPrice;    // ✓ Works: 115
chapisha product.currency;      // ✓ Works: TSH

product.margin;                 // ✗ Error: Private getter
product.totalPrice = 200;       // ✓ Works (not locked)
product.currency = "USD";       // ✗ Error: Locked getter
```

### Real-World Example: Rectangle with Getters

```swazi
data rectangle = {
    &width: 10,
    &height: 5,
    
    tabia thabiti area {
        rudisha $.width * $.height;
    },
    
    tabia thabiti perimeter {
        rudisha 2 * ($.width + $.height);
    },
    
    @tabia thabiti diagonal {
        // Private: internal calculation
        rudisha ($.width ** 2 + $.height ** 2) ** 0.5;
    },
    
    tabia getInfo {
        chapisha "Width: " + $.width;
        chapisha "Height: " + $.height;
        chapisha "Area: " + $.area;
        chapisha "Perimeter: " + $.perimeter;
        chapisha "Diagonal: " + $.diagonal;     // Can access private getter
    }
};

// Access getters like properties:
chapisha rectangle.area;          // ✓ Works: 50
chapisha rectangle.perimeter;     // ✓ Works: 30

rectangle.diagonal;               // ✗ Error: Private getter

// Locked dimensions can't be changed:
rectangle.width = 20;             // ✗ Error: Locked property
```

### Getter Rules

1. **No Parameters**: Getters cannot accept arguments
   ```swazi
   data obj = {
       tabia thabiti getValue x {    // ✗ Error: Getters can't have parameters
           rudisha x * 2;
       }
   };
   ```

2. **No Parentheses When Calling**: Access getters like properties
   ```swazi
   data obj = {
       tabia thabiti name {
           rudisha "Hassan";
       }
   };
   
   chapisha obj.name;      // ✓ Correct
   chapisha obj.name();    // ✗ Error: Not callable
   ```

3. **Can Use Privacy and Locking**:
   ```swazi
   @tabia thabiti privateName { }    // Private getter
   &tabia thabiti lockedName { }     // Locked getter
   @&tabia thabiti both { }          // Both (redundant)
   ```

## Practical Examples

### Example 1: User Profile with Privacy

```swazi
data user = {
    @password: "secret123",
    @email: "hassan@example.com",
    jina: "Hassan",
    
    @tabia hashPassword {
        // Simulate hashing
        rudisha "***hashed***";
    },
    
    tabia changePassword oldPass, newPass {
        kama oldPass == $.password {
            $.password = newPass;
            chapisha "Password changed successfully!";
            rudisha kweli;
        } vinginevyo {
            chapisha "Wrong password!";
            rudisha sikweli;
        }
    },
    
    tabia thabiti displayEmail {
        // Show partially hidden email
        rudisha "h***n@example.com";
    }
};

user.changePassword("secret123", "newpass456");    // ✓ Works
chapisha user.displayEmail;                        // ✓ Works: h***n@example.com

user.password;                                     // ✗ Error: Private
user.email;                                        // ✗ Error: Private
```

### Example 2: Game Character with Locked Stats

```swazi
data character = {
    jina: "Warrior",
    &maxHealth: 100,
    @currentHealth: 100,
    &strength: 15,
    
    tabia thabiti healthPercent {
        rudisha ($.currentHealth / $.maxHealth) * 100;
    },
    
    tabia takeDamage amount {
        $.currentHealth -= amount;
        kama $.currentHealth < 0 {
            $.currentHealth = 0;
        }
        chapisha $.jina + " health: " + $.healthPercent + "%";
    },
    
    tabia heal amount {
        $.currentHealth += amount;
        kama $.currentHealth > $.maxHealth {
            $.currentHealth = $.maxHealth;
        }
        chapisha $.jina + " healed to: " + $.healthPercent + "%";
    }
};

character.takeDamage(30);           // ✓ Works
chapisha character.healthPercent;   // ✓ Works: 70

character.maxHealth = 200;          // ✗ Error: Locked property
character.currentHealth = 100;      // ✗ Error: Private property
character.strength = 50;            // ✗ Error: Locked property
```

### Example 3: Shopping Cart with Mixed Access

```swazi
data cart = {
    @items: [],
    &currency: "TSH",
    &taxRate: 0.18,
    
    tabia addItem jina, bei, quantity {
        $.items.push({
            jina: jina,
            bei: bei,
            quantity: quantity
        });
        chapisha jina + " added to cart";
    },
    
    @tabia calculateSubtotal {
        data total = 0;
        kwa item katika $.items {
            total += item.bei * item.quantity;
        }
        rudisha total;
    },
    
    tabia thabiti subtotal {
        rudisha $.calculateSubtotal();
    },
    
    tabia thabiti tax {
        rudisha $.subtotal * $.taxRate;
    },
    
    tabia thabiti total {
        rudisha $.subtotal + $.tax;
    },
    
    tabia display {
        chapisha "Subtotal: " + $.subtotal + " " + $.currency;
        chapisha "Tax: " + $.tax + " " + $.currency;
        chapisha "Total: " + $.total + " " + $.currency;
    }
};

cart.addItem("Laptop", 800000, 1);
cart.addItem("Mouse", 15000, 2);

cart.display();
// Subtotal: 830000 TSH
// Tax: 149400 TSH
// Total: 979400 TSH

cart.items;                  // ✗ Error: Private
cart.currency = "USD";       // ✗ Error: Locked
```

## Quick Reference

| Symbol | Name | Access Outside | Can Modify Outside |
|--------|------|----------------|-------------------|
| (none) | Public | ✓ Yes | ✓ Yes |
| `@` | Private | ✗ No | ✗ No |
| `&` | Locked | ✓ Yes | ✗ No |
| `@&` | Private + Locked | ✗ No | ✗ No (redundant) |

### When to Use What?

- **Public (no symbol)**: Default for most properties and methods
- **Private (`@`)**: Sensitive data, internal helper methods, implementation details
- **Locked (`&`)**: Constants, configuration, methods that shouldn't be overridden
- **Getters (`tabia thabiti`)**: Computed properties, formatted outputs, derived values

## Practice Challenges

### Challenge 1: Create a Secure Counter

Create a counter object where:
- The count is private
- It has public methods to increment and decrement
- It has a getter to display the count
- The increment amount is locked at 1

<details>
<summary>Solution</summary>

```swazi
data counter = {
    @count: 0,
    &incrementAmount: 1,
    
    tabia increment {
        $.count += $.incrementAmount;
        rudisha $;
    },
    
    tabia decrement {
        $.count -= $.incrementAmount;
        rudisha $;
    },
    
    tabia thabiti value {
        rudisha $.count;
    }
};

counter.increment().increment();
chapisha counter.value;    // 2
```

</details>

### Challenge 2: Temperature Converter

Create an object that:
- Stores temperature in Celsius (private)
- Has locked conversion formulas
- Has getters for Fahrenheit and Kelvin

<details>
<summary>Solution</summary>

```swazi
data temperature = {
    @celsius: 25,
    
    tabia setCelsius value {
        $.celsius = value;
    },
    
    tabia thabiti fahrenheit {
        rudisha ($.celsius * 9/5) + 32;
    },
    
    tabia thabiti kelvin {
        rudisha $.celsius + 273.15;
    },
    
    tabia display {
        chapisha "Celsius: " + $.celsius;
        chapisha "Fahrenheit: " + $.fahrenheit;
        chapisha "Kelvin: " + $.kelvin;
    }
};

temperature.setCelsius(100);
temperature.display();
```

</details>

## Summary

- **Private (`@`)**: Hides properties/methods from outside access
- **Locked (`&`)**: Prevents reassignment but allows reading
- **Getters (`tabia thabiti`)**: Methods that act like properties
- Use privacy to protect sensitive data
- Use locking to prevent accidental modifications
- Combine them thoughtfully based on your needs

---

**Remember**: Privacy and locking help you write more secure and maintainable code by controlling how your objects are accessed and modified!