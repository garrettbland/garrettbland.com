---
active: true
title: Day 4 - 100 Days of Swift
published: 2023-11-19
category: swift
id: day-4-100-days-of-swift
---

Day `4/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/4](https://www.hackingwithswift.com/100/swiftui/4)

---

-   Learning about type annotations. Very similar to typescript. Swift infers types when declaring a variable with a value. Adding type annotation forces value to be of that type.

```swift
let username: String = "gbland"
var score: Double = 0
```

-   Arrays, Sets, and Dictionaries can be set with type annotations as well

```swift
var drinks: [String] = ["pepsi", "coke"] // array of strings
var user: [String: String] = ["id": "gbland"] // Dictionary
var books: Set<String> = Set([
  "Dune",
  "Where the crawdads sing"
])

// These all do the same thing
var teams: [String] = [String]()
var teams: [String] = []
var teams = [String]()
```

-   Enums are a little different, since we are creating new types with the values itself.

```swift
enum UIStyle {
    case light, dark, system
}

// We can just use the shorthand after "style" variable knows that it's of "UIStyle"
var style: UIStyle = .dark
style = .light

```

-   Not really related, but with Swift, it's kind of clever. You can create a new constant with no value, assign later on, and then use within your code. However you can only assign it one time, and Swift guarantee's that it will be available by the time the code using the constant exists. Example...

```swift
let myname: String // not assigning a constant yet, but assigning type
// A bunch of other complex code...
myname = "garrett" // assigning the constant once
// myname = "hank" // <-- This would throw
// more code...
print(myname) // print "garrett" and swift is happy.
```

### Challenge (Checkpoint 2)

The challenge is to create an array of strings, then write some code that prints the number of items in the array and also the number of unique items in the array.

My solution. Ended up being really similar to Javascript.

```swift
let names = [
    "garrett",
    "michelle",
    "lane",
    "michael",
    "garrett"
]

print("There are \(names.count) items in \"names\"")
let uniqueNames = Set(names)
print("There are \(uniqueNames.count) unique items in \"names\"")
```

Also led me down the path of combining two arrays, wondering how that differed from the spread operator in JS.

```swift
var array1 = ["something", "here"]
var array2 = ["more", "stuff"]
var combined = array1 + array2
print(combined)
```

### Random Additional Stuff

Also learned about Swift and passing arguments as reference type vs value type. In functions, Swift will pass arguments by value type (as a const, so we have to create a new variable inside the function to manipulate). You can pass things by reference type, and those are things like classes.

Seems really dangerous to pass things around by reference type as it is in Javascript. There are things you can do in Swift like using the `inout` operator to work with some of these challenges, and I'm sure I'll learn more.
