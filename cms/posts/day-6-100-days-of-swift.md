---
active: true
title: Day 6 - 100 Days of Swift
published: 2023-11-25
category: swift
id: day-6-100-days-of-swift
---

Day `6/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/6](https://www.hackingwithswift.com/100/swiftui/6)

---

Learning about loops

-   For loops are pretty familiar, pretty similar to JS

```swift
let platforms = ["ios", "macos", "watchos", "tvOS"]

// "item" is variable that is only allowed in body
for item in platforms {
  // loop body
  print("Swift works on \(item)")
}
```

-   Nested loops are allowed
-   `Range` is a special type in Swift, and it creates an range of numbers.

```swift
for i in 1...5 {
  // this will loop from 1 to 5, including the 5th item
}

for i in 1..<5> {
  // this will loop from 1 to 5, _not_ including the 5th item
}
```

-   If we don't care about creating a variable name in a for loop, we can use a `_`

```swift
for _ in 1...5 {
  // Do stuff 5 times in here, we don't care about the variable name
}
```

-   Some more neat things about the `Range` type and how we can use them

```swift
let names = ["Garrett", "Michelle", "Kendall", "Owen"]

// print single name
print(names[1]) // ==> Garrett

// print a range of values (if index 3 doesn't exist though, this fails)
print(names[1...3]) // ==> Michelle, Kendall, Ownen

// One sided range operator
// Gives me 1 to the end of the array
print(names[1...]) // ==> Michelle, Kendall, Owen
```

-   While loops are similar, they just carry on while a condition is true
-   While loops are really useful when you just don’t know how many times the loop will go around

```swift
// create an integer to store our roll
var roll = 0

// carry on looping until we reach 20
while roll != 20 {
    // roll a new dice and print what it was
    roll = Int.random(in: 1...20)
    print("I rolled a \(roll)")
}

// if we're here it means the loop ended – we got a 20!
print("Critical hit!")
```

-   Overall, `for` loops are used for when we are using a finite sequence. With `while` loops we loop until any condition becomes false or we tell it to stop (such as a game loop, the server tells us to stop, weve generated enough data, etc)
-   `continue` will skip an item in a loop, and continue with the next ones.
-   `break` will stop the loop on that particular item

```swift
let filenames = ["me.jpg", "work.txt", "sophie.jpg"]

// prints picture name where filename has a suffix of ".jpg"
for filename in filenames {
    if filename.hasSuffix(".jpg") == false {
        // found keyword "continue", skip the rest of this iteration and
        // go to next item in loop
        continue
    }
    print("found picture \(filename)")
}

// break example
var readFiles = 0
for filename in filenames {
    readFiles += 1
    if filename.hasSuffix(".txt") {
        break
    }
}

// Prints "Read 2 files looking for a txt file"
print("Read \(readFiles) files looking for a txt file")
```

-   Labeled statements exist in swift and allow us to break out of nested loops if we needed. They can also be used with `continue` as well. For example...

```swift
let items = ["one", "two", "three"]

outerLoop: for option1 in items {
  for option2 in items {
    // do nested looping logic
    // if we want to exit _all_ loops at once, we can do this
    break outerLoop
  }
}
```

### Checkpoint 3

Checkpoint 3 is asking us to solve the fizzbuzz problem

-   If it’s a multiple of 3, print “Fizz”
-   If it’s a multiple of 5, print “Buzz”
-   If it’s a multiple of 3 and 5, print “FizzBuzz”
-   Otherwise, just print the number.

My solution below

```swift
// use the "..." operator to create a range from 1 to 100, including the number 100
for number in 1...100 {
    if number % 3 == 0 && number % 5 == 0 {
        print("FizzBuzz")
    } else if number % 3 == 0 {
        print("Fizz")
    } else if number % 5 == 0 {
        print("Buzz")
    } else {
        print(number)
    }
}
```

I used the modulo operator, and then checked to see if result was zero. In swift, there is a `Int` method called `isMultiple(of: Number)` that I could have used. This is much easier to read. We also use the `...` thee dots to create a range that includes the number `100`, and not the `1..<100` which wouldn't include the number `100`.

```swift
for number in 1...100 {
    if number.isMultiple(of: 3) && number.isMultiple(of: 5) {
        print("FizzBuzz")
    } else if number.isMultiple(of: 3) {
        print("Fizz")
    } else if number.isMultiple(of: 5) {
        print("Buzz")
    } else {
        print(number)
    }
}
```
