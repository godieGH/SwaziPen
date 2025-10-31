# SwaziLang shorthand operators

You must have seen this `=>` sign before. but wait we talked about it lambdas right.
Yes that is a lambda opeartor it is used to create a lamda function as we descussed earlier.

- SwaziLang has some of these operators that are used in different contexts

## The shorthand block operator `=>>`
- Woah, it looks like the lambda operator but not quite a lambda operator because this operator has a different context and it produces different results in swazi differently from what lambda `=>` does.
- The `=>>` operator is called  the block short shorthand operator.
- And what does it exactly do. Well it is just a a shorthand block in swazi. In this page we are going to see with examples how it can be used and why we should use it in our swazi programs.

### Syntax
```
block statement =>> body statements
```
- Well its syntax is just as simple as that.
- A block statement is any statements that uses blocks to encapsulate other statement eg. `kama`, `kazi`, `muundo`, `chagua`, `ikiwa`, etc. as we already learnt each one if the most.
- In these block statements as we learnt earlier they may use pythonic / c-style blocks as their bodies.
eg.
```swazi
# simple kama statement
kama cond {
  // body here
}
# how you would write that using =>> operator
kama cond =>> // body here
```

### other eg.
```swazi
# lamda like kazi
kazi add(a,b) =>> rudisha a + b;

# a lambda of the same idea would be like this
data add = (a,b) => a+b;
```
- That above feels like a lambda, but it is not it is just a normal kazi function so it needs explicit `rudisha` statement to return value because `=>>` doesn't return value it just starts a block.
- so what does `=>>` does behinde the scene.
  1) when swazi meets `=>>` it replaces it with `{`  and then goes until it finds the end of the line then appends `}`. so, that kazi function above is just like this ``` kazi add(a,b) {rudisha a+b}``` in real life.

:::info
Things to note when using the shorthand operator.
- reduce the use of nested statements because it is a bit tricky to work with it in hard code patterns
- eg.
```swazi
kama x > 5 =>> chapisha kweli; kama x < 5 =>> chapisha "less";
```
- Well like in this eg. the second kama is wrapped in the first kama so it will only execute if first kama is true.
- In that sense `=>>` is used to wrap the whole line after it in single block so if there is other `=>>` that means it the second is in the first block.
:::

Let us see some usefull usage.
```swazi

kazi call() =>> rudisha soma("Enter grade: ");

chagua kweli {
  ikiwa call() sawa "A" =>> chapisha "Excellent";simama;
  ikiwa call() sawa "B" =>> chapisha "Good"; simama;
  ikiwa call() sawa "C" =>> chapisha "avarage"; simama;
  ikiwa call() sawa "D" =>> chapisha "minimum"; simama;
  kaida {
  chapisha "Failed";
  }
}
```
### Other more examples.

```swazi

# used in shorthand single line object literals
data obj = =>> name:"John Doe", age:20, isMarried:kweli

# used in short muundo declarations
muundo Car =>> name;make;Car(name,make) =>> $.name=name;$.make=make;
data bmw = unda Car("BMW", "2023")
chapisha bmw // outputs {make: '2023',name: 'BMW'}
# you will study about muundo(classes) later in OOP if not yet.

# kama statement shorthand
data age = 20;
kama age > 18 =>> chapisha "Over 18"; # true here
vinginevyo =>> chapisha "Under 18";

# in loops
kwa(i=0;i<10;i++) =>> chapisha i

data x = 0;
wakati x < 10 =>> chapisha x; x++;

fanya =>> /* works same */ chapisha "fanya blocks";

# you can not use =>> in fanya-wakati loop because it needs the wakati to be just after fanya to distinguish iy from the regular fanya block
```
:::info
This feature is supported only from version `2.3.0` and more not less
:::