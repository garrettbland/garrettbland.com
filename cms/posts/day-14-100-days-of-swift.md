---
active: true
title: Day 14 - 100 Days of Swift
published: 2024-01-06
category: swift
id: day-14-100-days-of-swift
---

Day `14/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/14](https://www.hackingwithswift.com/100/swiftui/14)

---

Learning about optionals, optional unwrapping, nils, nil coalescing, etc.

We can think of `optionals` in Swift as boxes. A optional can be a box that can be opened to see if there's stuff in there for us, or to see if it's nothing, or `nil`. Swift calls this `unwrapping` optionals to use these values.

All types can be optional.

For example, here's one way to unwrap an optional. If the optional has a string inside, it gets unwrapped – that means the string inside gets placed into the marioOpposite constant.

```swift
let names = ["first": "Garrett", "last": "Bland"]

print(names["middle"]) // nil

// Below prints "there is no middle name"

if let middleName = names["middle"] {
    print("There is a middle name of \(middleName)")
} else {
    print("there is no middle name")
}
```

Here is another good example

```swift
// The "?" means optional and the value can be set to nil
var username: String? = nil

if let unwrappedName = username {
    print("We got a user: \(unwrappedName)")
} else {
    print("The optional was empty.")
}
```

It is common in Swift to name the temporary variable of the unwrapped variable as the same variable in question. This technique is called "shadowing"

```swift
var username: String? = nil

if let username = username {
  print("We have a user: \(username)")
}

// We can also do this
if let username {
  print("we have a username! \(username)")
}
```

There is another way to unwrap optionals in Swift, and that's to use the `guard` keyword. Its very similar to the `if let`, except it does the opposite. So `if let` runs if the optional _does_ have a value, and using `guard let` will run if the optional _does *not*_ have a value. It's basically the "else" of a if statement.

```swift
var name: String? = "Garrett"

// Prints if it does exists
if let name = name {
  print("Name exists")
}

// Prints if value does NOT exist
guard let name = name else {
  print("Name does not exist")
}
```

Using `guard` we also need to return or throw in the else block. This is so we can safely use the unwrapped values in the rest of our code. This is called an early return. Here are some examples.

```swift
// No unwrapping. Getting "nil" will cause errors since we are trying
// to use a unwrapped value
func sayHi(to name: String?) -> Void {
    print("Hi \(name!)")
}

// Using "if let" to unwrap name value
func sayHiUnwrap(to name: String?) -> Void {
    // "if let name = name" would also work
    // shorthand "shadowing" used
    if let name {
        print("Hi \(name)")
    } else {
        print("No name supplied...")
    }
}

// Using guard
func sayHiGuard(to name: String?) -> Void {
    // unwrap using guard. Could use "guard let name" shorthand
    // We have to return here, as the unwrapped value doesn't exist
    // and Swift forces us to handle this with an early return.
    guard let name = name else {
        print("No name supplied...")
        return
    }

    // Since we return early above using "guard", we can safely use
    // unwrapped values in the rest of our code nice and cleanly.
    print("Hello \(name)")
}

sayHi(to: "Garrett")
sayHiUnwrap(to: "Tom")
sayHiGuard(to: "Hanks")
```

Using `guard` doesn't have to be only to check optionals either. We can use `guard` to basically do the same thing for other "else" conditions. For example...

```swift
guard someArray.isEmpty else {
  return
}
```

There are some differences between `if let` and `guard let`. `guard let`` is designed to exit the current function, loop, or condition if the check fails, so any values you unwrap using it will stay around after the check.

> use if let if you just want to unwrap some optionals, but prefer guard let if you’re specifically checking that conditions are correct before continuing.

Another way of handling optionals and unwrap them is to use the nil coalescing operator `??` to provide a default value.

```swift
let person = [
  "first": "Garrett",
  "last": "Bland"
]

// middleName here is converted into an optional string
let middleName = person["middle"] ?? "No middle name present"

// Could also use the "default" parameter for dictonaries, they do the same thing as above
// nil coalescing works with all optionals
let phone = person["height", default: "N/a"]
```

Now "middleName" will not be an optional and will be a string regardless. This is pretty much exactly like the "nullish coalescing" in javascript.

Chaining nil coalesing is valid in Swift.

```swift
let savedData = first() ?? second() ?? ""
```

Swift also has optional chaining, which is again really similar to Javascripts. It basically says "if the optional has a value, continue on, otherwise return nil". We can add as many of the `?.` optional chaining operators as we want. The first time it comes across something invalid or can't evaluate, the whole line returns `nil`, and then we can use `??` to return a default value.

```swift
let names = ["Garrett", "Michelle", "Kendall"]
let randomName = names.getRandomElement()?.uppercased() ?? "n/a"
print(randomName)
```

When working with functions that might throw errors, we could use `try` within a `do/catch` block. However we can do something similar, by using an _optional try_. [Day 8 note about try/do/catch here](/posts/day-8-100-days-of-swift.md)

Using this will have the functional return be optional value. If the function runs without throwing an error, then it will return the value, otherwise it will just return `nil`. It won't care about _what_ the error was.

> Refresher. We could use "try!", but if the error throws, then our program goes 💥

```swift
func getUserId(for username: String) throws -> Int {
    if (username == "garrett") {
        return 11112
    }
    throw UserError.inputFailure
}

// This prints "user id is 11112" since func returns a value
if let userId = try? getUserId(for: "garrett") {
    print("user id is \(userId)")
}

// This doesn't print anything. Our "try?" makes the return type of the
// function optional, and therefor returns "nil" if an error is thrown.
if let userId = try? getUserId(for: "tom_hanks") {
    print("this wont print")
}
```

We can also user nil co-el-less-sing to achieve this same thing with a default value. We have to add parenthesis around what we want to happen first though so our optional takes presendence.

```swift
let userId = (try? getUserId(for: "kendall")) ?? "anonomyous"
print(userId) // prints "user id is anonomyous"
```

### Challenge (Checkpoint 9)

> Your challenge is this:
> write a function that accepts an optional array of integers, and returns one randomly. If the array is
> missing or empty, return a random number in the range 1 through 100.
>
> If that sounds easy, it’s because I haven’t explained the catch yet: I want you to write your function in a
> single line of code. No, that doesn’t mean you should just write lots of code then remove all the line
> breaks – you should be able to write this whole thing in one line of code.

```swift
func getRandomNumber(numbers: [Int]?) -> Int { numbers?.randomElement() ?? Int.random(in: 1...100) }

print(getRandomNumber(numbers: [1,2,3]))
print(getRandomNumber(numbers: nil))
```

I wouldn't probably every write this in a single line. There also might be better/more clever ways to handle this, but the more I get into my software career the less I like fancy/clever things.
