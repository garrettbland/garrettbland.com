---
active: true
title: Day 7 - 100 Days of Swift
published: 2023-11-27
category: swift
id: day-7-100-days-of-swift
---

Day `7/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/7](https://www.hackingwithswift.com/100/swiftui/7)

---

Learning about functions, part one

The `func` keyword is used to create a new function.

```swift
// create function
func printName() {
  print("Garrett")
}

// functions call site
printName() // -> Garrett
```

Function arguments and calls are pretty similar to typescript.

```swift
func printName(name: String) {
  print("Your name is \(name)")
}

printName(name: "Garrett") // -> Your name is Garrett
```

Function arguments have argument labels. `printName(name: "garrett")`. These are super cool, and by default are set to the argument name. We can customize the label name if we want to as well.

We also _have_ to pass in arguments in the order they appear in the function declaration. We can't change the order around. Any data created inside the function is destroyed when the function finishes.

```swift
// Create new function with a "name" argument, but the argument label is "to"
func sayHi(to name: String) {
  print("Hi \(name)")
}

// call the function, and notice the argument label
sayHi(to: "garrett b") // -> Hi garrett b
```

If argument label isn't desired, we can omit it by using the `_` symbol.

```swift
func DrinkSome(_ drink: String) {
  print("Drink Some \(drink)")
}

// Notice we didn't use the argument label here
DrinkSome("Coolaid")
```

Return values from functions can be defined with `->`, followed by the type. We also need to use the `return` keyword with the value. We can omit the `return` keyword only if single-expression closures.

```swift
func rollDice() -> Int {
  return Int.random(in: 1...6)
}

// or we can omit the return keyword if single expression closure
func yeetDice() -> Int {
  Int.random(in: 1...6)
}

let result = rollDice()
print(result) // -> some integer
```

If we want the function to exit and we don't specify a return type or something, we can still call `return` on it's own to immediately exit a function. This could be a logical check or something, not totally sure what situations this might be used yet.

```swift
func aThing() {
  return
}
```

We can return multiple values from functions by using an array or set, but a common/easy way is to return a `tuple`

```swift
func getUser() -> (firstName: String, lastName: String) {
  return (firstName: "Taylor", lastName: "Swift")
}

// Tuples are smart and will remember the order, so we can omit the label
// (and the return, since it's a single expression)
func getUser2() -> (firstName: String, lastName: String) {
    ("Garrett", "Bland")
}

let user = getUser()
print("Name: \(user.firstName) \(user.lastName)")

let user2 = getUser2()
print("Hello \(user2.firstName) \(user2.lastName)")

// Can also use numerical access
print("Hello \(user2.0)") // -> Garrett

```

Very similar to dictionaries, but Swift can't know ahead of time if dictionary keys are present. When accessinga a tuple, Swift knows its there. It's also nice to access values using `user.firstName` for example, so it's nicer.

We can also do destructuring like we can in javascript.

```swift
let (firstName, lastName) = getUser2()
print(firstName) // -> Garrett

// Or another way, to ignore tuple values
// If we don't destructure them all, Swift yells at us so this is a handy little thing
// to basically tell Swift we don't care about the other values. One `_` per tuple item.
let (firstName, _, _) = getUser2()
print(firstName) // -> Garrett
```

When deciding between an `Array`, a `Set`, or `Tuple`...

-   Arrays keep their order and can have duplicates
-   Sets don't keep their order and _cant_ have duplicates (more optimized than arrays)
-   Tuples have a fixed number of values of fixed types, and they can have duplicates

Parameter names can be thought of like this. `{Exteral Param Name} {Internal Param Name}: {Type}`

```swift
// function name is "sayHello"
// external param name is "to"
// internal param name is "personsName"
func sayHello(to personsName: String) {
  print("hi \(personsName)")
}

sayHello(to: "billy bob") // -> hi billy bob
```
