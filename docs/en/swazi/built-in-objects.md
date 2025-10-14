# SwaziLang Built-in Global Objects

SwaziLang doesn’t just offer global functions—you also get powerful **global objects** with built-in methods for working with arrays, math, objects, time, and the program itself.  
These are always available, and you don’t need to import anything!

---

## What Are Global Objects?

- **Global objects** are special built-in "toolboxes" for handling common data types and features.
- They contain useful methods grouped by topic (math, array, object, time, etc).
- You access their methods using dot notation: `Object.keys(...)`, `Hesabu.kubwa(...)`.

---

## Main SwaziLang Global Objects

### 1. `Object`

Work with objects: get keys, values, entries.

**Methods:**
- `Object.keys(obj)` — Returns array of keys.
- `Object.values(obj)` — Returns array of values.
- `Object.entry(obj)` — Returns array of `[key, value]` pairs (as arrays).

**Example:**
```swazi
data ob = { name: "Amina", age: 20 }
chapisha Object.keys(ob)      // ["name", "age"]
chapisha Object.values(ob)    // ["Amina", 20]
chapisha Object.entry(ob)     // [["name", "Amina"], ["age", 20]]
```

---

### 2. `Hesabu`

Math toolbox: numbers, statistics, trigonometry, and more.

**Methods:**
- `Hesabu.kadiria(x)` — Round to nearest integer.
- `Hesabu.kadiriajuu(x)` — Round up.
- `Hesabu.kadiriachini(x)` — Round down.
- `Hesabu.kubwa(a, b, ...)` — Largest number.
- `Hesabu.ndogo(a, b, ...)` — Smallest number.
- `Hesabu.log(n, base?)` — Logarithm (base 10 default).
- `Hesabu.ln(n)` — Natural logarithm.
- `Hesabu.sin(x)` — Sine.
- `Hesabu.cos(x)` — Cosine.
- `Hesabu.tan(x)` — Tangent.
- `Hesabu.hypot(a, b, ...)` — Hypotenuse (distance).
- `Hesabu.rand(a?, b?)` — Random number (see below).
- `Hesabu.siNambaSahihi(x)` — Is NaN (not a number).
- `Hesabu.deg2rad(degrees)` — Degrees to radians.
- `Hesabu.rad2deg(radians)` — Radians to degrees.
- `Hesabu.alama(x)` — Sign (-1, 0, 1).
- `Hesabu.gcd(a, b)` — Greatest common divisor.
- `Hesabu.lcm(a, b)` — Least common multiple.
- `Hesabu.mean(...)` — Mean/average.
- `Hesabu.median(...)` — Median.
- `Hesabu.stddev(...)` — Standard deviation.
- `Hesabu.kadiriaKtkDes(x, digits)` — Round to decimal places.

**Random Number Examples:**
```swazi
Hesabu.rand()         // random float [0, 1)
Hesabu.rand(10)       // random float [0, 10)
Hesabu.rand(5, 10)    // random float [5, 10)
```

---

### 3. `Muda`

Work with time, dates, and timestamps.

**Usage:**  
- `Muda(...)` — Function: get current time, parse/format dates, convert between formats.
- `unda Muda(...)` — Class: create Muda object for advanced date manipulation.

**Common Methods (on Muda objects):**
- `.mwaka()` — Year
- `.mwezi()` — Month
- `.tarehe()` — Day of month
- `.sikuYaJuma(fmt?)` — Day of week (number or formatted)
- `.saa(fmt?)` — Hour (number or formatted)
- `.dakika()` — Minute
- `.sekunde()` — Second
- `.millis()` — Milliseconds
- `.zone()` — Timezone (usually "UTC")
- `.ms()` — Epoch milliseconds
- `.iso()` — ISO string
- `.object()` — Object with all time parts
- `.eq(other)` — Equal to other date
- `.gt(other)` — Greater than other date
- `.lt(other)` — Less than other date
- `.diff(other, unit?)` — Difference between dates
- `.ongeza(unit, amount)` — Add time (unit: "saa", "dakika", "siku", etc)
- `.punguza(unit, amount)` — Subtract time
- `.setiMuda(field, value)` — Set parts of date (returns new object)
- `.fmt(fmt, zone?)` — Format with custom pattern and timezone

**Quick Examples:**
```swazi
chapisha Muda("YYYY-MM-DD H:mm:ss")      // Format current time
data d = unda Muda(2025, 10, 14, 19, 12, 17) // Create time object
chapisha d.iso()                         // Print ISO string
chapisha d.sikuYaJuma("ddd")             // Print day name ("Tue")
chapisha d.ongeza("siku", 5).iso()       // Add 5 days
```

---

### 4. `swazi`

Control the program itself.

**Methods:**
- `swazi.exit(code?)` — Exit the program with a code (0 default).

**Example:**
```swazi
swazi.exit()         // Exit program with code 0
swazi.exit(1)        // Exit program with code 1
```

---

## Summary Table

| Object   | Purpose        | Example Methods                        |
|----------|---------------|----------------------------------------|
| Object   | Objects       | `keys`, `values`, `entry`              |
| Hesabu   | Math/Numbers  | `kubwa`, `mean`, `log`, `rand`, ...    |
| Muda     | Time/Dates    | `iso`, `mwaka`, `ongeza`, `fmt`, ...   |
| swazi    | Program Ctrl  | `exit`                                 |

---

## Pro Tips

- You can use these objects and their methods anywhere in your program.
- They’re always available—no need to import!
- For advanced use, check the class features and method signatures in the docs.

---

**Next:**  
Explore sample projects and advanced patterns using SwaziLang’s full power!