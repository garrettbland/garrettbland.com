---
active: true
title: Day 15 - 100 Days of Swift
published: 2024-01-06
category: swift
id: day-15-100-days-of-swift
---

Day `15/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/15](https://www.hackingwithswift.com/100/swiftui/15)

---

Day 15 is a review of everything we've learned so far. Todays tutorial is to review the swift essentials in one hour, article below.

[https://www.hackingwithswift.com/articles/242/learn-essential-swift-in-one-hour](https://www.hackingwithswift.com/articles/242/learn-essential-swift-in-one-hour)

### Random Notes

Everything is a short review of what I've learned, and is noted down in the previous days. Here are some bullet points of neat things that popped out to me.

-   You can flip booleans with `.toggle()` method on `Bool`
-   In a while loop, `continue` will proceed to the next iteration, and `break` will stop the loop all together and skip everything remaining.
-   Returning tuples from a function is a convenient way to send multiple values back to the initiator. Similar to returning an object in JS.
-   Destructuring tuples is like destructing objects in JS. `let (first, last) = myname` Must use `()` and can use `_` to ignore some.
-   Can provide default values to functions just like in JS. `func sayHi(to name: String = "no one"){...}`
-   Trailing closure syntax still looks weird to me. Or also using `$0` for the value provided to us from a `.filter` or something.
-   To be able to write to a computed value, we must both provide a `get` and `set`. The `set` will have a `newValue` variable named exaclty that provided to us by Swift
-   Classes have a `deinit` deinitializer used when the last reference is destroyed. Useful for logging or tracking something maybe?
-   Classes don't need `mutating` for methods that change properties like Structs do
-   With protocols, besides methods we can define properties using `var currentPassengers: Int { get set }` the `get` and `set` inside the curly braces. Looks a little funky. If we don't need the variable to change, it could be just `var currentPassengers: Int { get }`
-   Things can conform to multiple Protocols seperated by a comma.
-   We can list required methods and properties in a protocol. Then extending the protocol using `extension`, we can add default implementations of the logic.
-   Using `guard` in a function, we must use `return` in to exit if some conditions aren't met. This could be to make sure some inputs are valid or the unwrapped value isn't `nil`
-   When calling a function that throws, we can use `try?` with the whole `if let` thing to unwrap. If the function returns `nil`, then we can use `??` to return a default value. This way is basically just checking to see if the function did its thing or not. If the error throws, doing it this way we won't know what the error was specifically.
