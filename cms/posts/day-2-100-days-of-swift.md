---
active: true
title: Day 1 - 100 Days of Swift
published: 2023-11-13
category: swift
id: day-1-100-days-of-swift
---

Day `2/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/2](https://www.hackingwithswift.com/100/swiftui/2)

---

-   Covering booleans. So far it's extremely similar to javascript. There is a method on `Booleans` called `Boolean.toggle()`
-   Joining strings can be used with the `+` sign. This is called `operator overloading`. That means we can use the plus sign to concate strings together, or to add two numbers.
-   String interpolation works with `\()`

```swift
var name = "Garrett"
var age = 29
let greeting2 = "Hello \(name), I'm \(age) years old" // Hello Garrett, I'm 29 years old
print(greeting2)
```

-   Logic can be done inside string interpolation. `print("5 x 5 is \(5 * 5)")`
-   Swift gives us string interpolation as a way of injecting custom data into strings at runtime
-   Completed checkpoint 1, which was creating a celcius to fahrenheit converter. Code below

```swift
import Cocoa

// Using decimal, so implicit Double type
let CELSIUS_TEMP = 20.0

// Added parenthesis to make sure logic order was set (worked the same without)
let fahrenheit = (((CELSIUS_TEMP * 9) / 5) + 32)

// String interpolation
print("Celcius: \(CELSIUS_TEMP)")
print("Fahrenheit: \(fahrenheit)")
```
