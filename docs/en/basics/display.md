# SwaziLang Display and Output

Since we lastly stored number 5 to a variable x, then we would want to retriev it somehow. let say we would want to print it to the console.
in SwaziLang we use the keyword `chapisha` to print something to the console.

```swazi
chapisha x
```
That would print 5 to the console since x = 5 ( we stored it in the previous page)

With the `chapisha` You could print anything. A number, a text etc.
eg.
```swazi
chapisha "Habari Tanzania!"
```
That prints the text `Habari Tanzania!` To the console.

### Printing two or more texts.
To print two or more text you would use `chapisha` with the parethesis "()" and separate the texts with a coma ","
eg.
```swazi
chapisha("Habari", "Tanzania")
```
That would print `Habari Tanzania!`

### Printing with keyword `andika`
Another way to print to the console you would use the keyword `andika` which prints to the console just like chapisha but the difference is it does not end with a new line "`\n`".
The same usage above eg.
```swazi
andika x
andika "Habari Tanzania!"
andika("Habari", "Tanzania")
```
The Output of these will be in a single line

