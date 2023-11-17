---
active: true
title: Day 3 - 100 Days of Swift
published: 2023-11-16
category: swift
id: day-3-100-days-of-swift
---

Day `3/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/3](https://www.hackingwithswift.com/100/swiftui/3)

---

### Arrays

-   Diving into arrays
-   Very similar to javascript. Has built in methods to sort or to see if an item is contained in an array.
-   Creating new array has to be same type. Swift infers just like Typescript does. A new array can be created with `var names = Array<String>()` or `var scores = [Int]()` with a shorthand.
-   Another way is `var cities: [String] = ["London", "Paris", "New York"]`
-   Methods like `Array.sort()` and `Array.contains()` exist with loads of others.
-   Remove items with `Array.remove(at: 1)` by index
-   Swift is zero based, so if we try to access an array item by index that didn't exist, swift crashes

### Dictionaries

-   Create new dictionaries with the following

```swift
var person = [
  "name": "garrett",
  "location": "hays"
]

var olympics = [
  2012: "London",
  2016: "Rio de Janeiro",
  2021: "Tokyo"
]
```

-   They can be access with `person["name"]`. However swift will see this is a `Optional` type, so we can pass in a default value. So `print(person["age", default: "29"])` would print `29` for example.
-   New dictionaries can be created with specific types using the following

```swift
var ages = [String: Int]()
ages["Garrett"] = 29
ages["Michelle"] = 30
```

-   Setting dictionary key will just overwrite. So `ages["Garrett"] = 30` will overwrite the old value of `29`
-   Loads of built in methods for Dictionaries
-   Dictionaries let us choose a “key” that identifies the item we want to add, whereas arrays just add each item sequentially
-   Reading back a key that doesn't exist, will return `nil`

### Sets

-   Sets are similar to Sets in javascript. No duplicates, doesn't keep track of order where it's stored for performance.
-   Very similar to `Arrays`, but use use `Set.insert` instead of `append`, since there is no order, append doesn't make sense.
-   Sets are highly organized and optimized for performance. So if there was a zillion items in an array, it would take a while to run `contains` or something. But running `contains` on a `Set` will be far quicker
-   New `Sets` can be created with type `var actors = Set<String>()`

### Enums

-   Enum is short for enumeration, is a set of named values
-   Enums are similar in how they work to Typescript, with a small difference

```swift
enum Weekdays {
  case monday
  case tuesday
  case wednesday
}

// Or shorthand
enum Weekdays {
  case monday, tuesday, wednesday
}

// Now we can assign variables to them and it's safer
var day = Weekdays.tuesday
day = Weekdays.wednesday

// And since we set "day" to the enum, it's type is now set to that Enum,
// and we can use shorthand
var day = .monday

print(day) // "monday"
```
