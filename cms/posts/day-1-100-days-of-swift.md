---
active: true
title: Day 1 - 100 Days of Swift
published: 2023-11-13
category: swift
id: day-1-100-days-of-swift
---

Day `0/100` and `1/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/1](https://www.hackingwithswift.com/100/swiftui/1)

---

-   Read Day 0 and skills required to get a job as a iOS developer. I zipped past this pretty quickly, as a lot of it made sense already.
-   Swift came out in 2014, SwiftUI in 2019
-   Created new playground in xcode. Played around with the IDE, ran the playground
-   Creating new variables
    -   `var` is used for variables `var name = "garrett"`
    -   `let` is used for constants that don't change `let name = "tom"`
    -   Xcode yells at us if we try to change constants. Apparently the name `let` comes from the mathmatical world. It's weird coming from Javascript land where it's `let` and `const`
-   `print()` is used to display variables and things in swift.
-   Swift coding convention uses camel case for variable names. I assume Swift has linting. I do like naming conventions of using all caps
-   Creating a string uses double quotes `var name = "garrett"`
-   You can use a quote inside a string by using the backslash character `var quote = "the \"code\" is cool"`
-   Triple quotes let us create multiline strings

```swift
var quote = """
this is
a
multiline
"""
```

-   There a lot of built in things with strings in swift, just like Javsascript. `name.count` returns how many characters there are in a string. `name.uppercased()` and `name.hasPrefix("gar")` or `name.hasSufix("ett")`
-   Creating numbers (or Integers - latin for whole, or `Int`) is created the same way in javascript. `var age = 29`
-   Creating big numbers can use underscores to seperate `var houseCost = 1_200_000`. Swift ignores underscores regardless of how many. You could have `var catLives = 1_____0` and this means `10`
-   Same arithmatic operator type of stuff as javascript. Shorthand operator of `+=` to add something to variable. (_compound assignment operators_)
-   Numbers have a lot of built in operators just like javascript as well. `120.isMultiple(of: 3)`
-   When working with decimal places, Swift considers these `Doubles` to represent a double precision floating point number
-   Can't mix `Int` and `Double` since it's different types. Although we can convert types by using `Int(2.0)` or `Double(1)`
-   An old way of naming decimals is `CGFloat` in older API's. Just give it a `Double`
