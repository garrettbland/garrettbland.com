---
active: true
title: Day 5 - 100 Days of Swift
published: 2023-11-20
category: swift
id: day-5-100-days-of-swift
---

Day `5/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/5](https://www.hackingwithswift.com/100/swiftui/5)

---

Learning about conditions and operators today. Things like `if` and `swift` statements

-   Swift doesn't use `()` parenthesis for if statements

```swift
let score = 10
if score < 20 {
  print("less than 20")
}
```

-   Very similar to `if` statements in Javascript
-   Checking types uses `==` and `!=` for _not_ comparisons. There is no `===` like in Javascript since there isn't any type conversion going on. This will throw an error for example

```swift
var name = "garrett"
var age = 29

if name == age {
    print("hello")
}
```

-   `else` statements and `else if` statements are very similar to JS.

```swift
if name == "garrett" {
  print("is garrett")
} else if name == "michelle" {
  print("is michelle")
} else {
  print("who knows")
}
```

-   Using `&&` logical operators (or `||`) can be used to combine booleans in an if statement to check multiple conditions.

```swift

// Logical "and" operator. Both have to evaluate to true
if name == "garrett" && age == 29 {
  print("i am garrett and i'm 29")
}

// Logical "or" operator with the pipes. Only one has to eval to true
if name == "garrett" || name == "michelle" {
  print("it's garrett or michelle")
}
```

-   Also works as expected with `enums`

```swift
enum TransportOptions {
    case plane, helicopter, car
}

let transportMode: TransportOptions = .plane

if transportMode == .helicopter || transportMode == .plane {
    print("lets fly ✈️")
} else {
    print("let drive")
}

```

-   Parenthesis can be used for multiple `if` checks to group evaluations. In this example below, we check to see if `isOwner and isEditingEnabled` are both true to satisfy the `if` statement. If one of those conditions are false, then it checks to see if `isAdmin` is `true`.

```swift
var isAdmin = true
var isOwner = false
var isEditingEnabled = true

if (isOwner && isEditingEnabled) || isAdmin {
  print("can edit post")
}
```

-   Switch statements must be exhaustive when it can be. Meaning that if a switch is used with an `enum` or something, Swift compiler will yell at us if we don't have a `case` for every one. For example

```swift
enum TransportOptions {
    case plane, helicopter, car, bike
}

let transportMode: TransportOptions = .plane

// We don't have a case below for "bike" so we get errors
switch transportMode {
case .car:
    print("this is a car")
case .helicopter:
    print("this thing can go brrr")
case .plane:
    print("flying so hiiiigghhh")
}
```

-   Using a switch statement obviously can't be exhaustive on a `String` for example, so we have default cases.

```swift
var city = "Hays"

switch city {
  case "Ellis":
    print("In Ellis!")
  case "Hays":
    print("In Hays!")
  case "Lucas":
    print("In Lucas")
  default:
    print("no idea where you are")
}
```

-   By default, when Swift finds the satisfying `case` it ends there and doesn't continue. We can tell Swift we want to keep going through for whatever reason by calling `fallthrough` keyword and it doesn't check the next case.

```swift
var city = "Hays"

switch city {
  case "Ellis":
    print("In Ellis!")
  case "Hays":
    print("In Hays!")
    fallthrough
  case "Lucas":
    print("In Lucas")
  default:
    print("no idea where you are")
}

// This whole thing prints "In Hays!", "In Lucas"
```

-   Ternary operators exist in Swift.

```swift
var name = "garrett"

var isGarrett = name == "garrett" ? "Yup it's garrett" : "Nope, not garrett"
```
