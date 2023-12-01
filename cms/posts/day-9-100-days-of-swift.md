---
active: true
title: Day 9 - 100 Days of Swift
published: 2023-11-30
category: swift
id: day-9-100-days-of-swift
---

Day `9/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/9](https://www.hackingwithswift.com/100/swiftui/9)

---

Learning about Closures in swift. Closures are similar to anonomys functions in JS. Here's how we create a closure.

```swift
let sayHello = {
  print("Hi there")
}

sayHello()
```

If we want to create a closure with parameters. Must use the `in` keyword here. It marks the end of the parameters, and the beginning of the closure body. So far I have no idea why I would need to use these yet.

Closures also _cannot_ have keyword arguments like normal function declarations can.

```swift
let sayHello = { (name: String) -> String in
  print("hello \(name)")
}

sayHello("Garrett")
```

For example, we could have a custom sorting function, that we pass into the array sort method. This would put "garrett" at the front always and sort everything else alphabetically.

```swift

let names = ["tom", "hanks", "garrett", "michelle"]

func customSorter(name: String, name2: String) -> Bool {
  if name == "garrett" {
    return true
  } else if name2 == "garrett" {
    return false
  }

  return name < name2
}

let someNames = names.sorted(by: customSorter)
print(someNames) // ["garrett", ...]

```

Using closures though, we could inline this like so.

```swift
let someNames = names.sorted(by: { (name: String, name2: String) -> Bool in
  if name == "garrett" {
    return true
  } else if name2 == "garrett" {
    return false
  }

  return name < name2
})

print(someNames) // ["garrett", ...]
```

A closure defining a return type with no arguments has to be written with `()`. We also don't have to define a return type, just like with a normal function. Swift will infer it if possible.

```swift
// No paramaters
let payment = { () -> Bool in
    print("Paying an anonymous person…")
    return true
}

// This _isnt_ valid. Swift thinks you are trying to return an empty tuple with "()"
// and will error out since a tuple type isn't callable
func brewTea(steps: ()) {
  print("brew tea")
  steps()
}

// We have to add the return type
func brewTea(steps: () -> Void) {
  print("brew tea")
  steps()
}
```

There is some shorthand with closures. Take our example above. We can remove the argument types, since our sorted type is already sending that, and the return type has to be a `Bool`.

```swift
// Here we removed the "()" around the argument names as well as their types,
// and also the "-> Bool" return type.
let someNames = names.sorted(by: { name, name2 in
  // logic...
})

// We can go even further...
// We can use trailing closure syntax. This means we can remove the "by" label and
// the outer parenthesis, and start the closure directly.
let someNames = names.sorted { name, name2 in
  // logic...
}
```

There's another "shorthand syntax" as well. We can get specially named variables in our closure with `$0`, `$1` etc, which are our variables. (I really don't like this at all, I like named variables for readability). Might be handy if there was only a single variable.

```swift
let sorted = team.sorted {
  if $0 == "garrett" {
    return true
  } else if $1 == "garrett" {
    return false
  }
  return $0 < $1
}
```

A nice example of this might be using the array `filter` method. Makes a very short conciese closure. This works since we're returning a single expression as well, which is why we can omit the `return` keyword.

```swift
let names = ["garrett", "bland", "michelle"]

names.filter { $0.hasPrefix("m")} // -> ["garrett", "bland"]
```

Played around in playground, experimenting with the shorthand closure syntax and the trailing closure (which also, not a fan of really). Pretty clean how it works all in all. Trailing closure's only work if the last argument is a function argument. Closures that accept parameters or return a value must declare this inside their braces, followed by the keyword `in`

```swift
func animateSomething(duration: Int, animate: () -> Void) {
    print("Starting a \(duration) second animation...")
    animate()
}

func animateTwoThings(animation1: () -> Void, animation2: () -> Void, duration: Int) {
    print("Starting a \(duration) second animation2...")
    animation1()
}

animateSomething(duration: 12, animate: {
    print("Fade or something")
})

// With trailling closure, we can do this
animateSomething(duration: 20) {
    print("Appear I guess...")
}

animateTwoThings(animation1: {
    print("woooo")
}, animation2: {
    print("yeeee")
}, duration: 1000)
```

We can also use mutliple trailing closure syntax if we have multiple functions at the end of our arguments. Example...Apparently this trailing closure stuff is used heavily within Swift UI. If one or more of a function’s final parameters are functions, you can use trailing closure syntax

```swift
func doStuff(func1: () -> Void, func2: () -> Void, func3: () -> Void) {
    print("About to start func 1")
    func1()
    print("About to start func 2")
    func2()
    print("About to start func 3")
    func3()
}

// Trailing Closure Syntax
doStuff {
 print("Doing function 1")
} func2: {
    print("Doing function 2")
} func3: {
    print("Doing func 3")
}
```

When copying functions in swift, we can do it and they work the same as the original except they lose their external parameter names.

### Challenge (Checkpoint 5)

This challenge is to use some array methods, and do the following.

-   Filter out any numbers that are even
-   Sort the array in ascending order
-   Map them to strings in the format “7 is a lucky number”
-   Print the resulting array, one item per line

The output should be below

```txt
7 is a lucky number
15 is a lucky number
21 is a lucky number
31 is a lucky number
33 is a lucky number
49 is a lucky number
```

Here is my solution...

```swift
let luckyNumbers = [7, 4, 38, 21, 16, 15, 12, 33, 31, 49]

// 7 is a lucky number
// 15 is a lucky number
// 21 is a lucky number
// 31 is a lucky number
// 33 is a lucky number
// 49 is a lucky number

let answer = luckyNumbers.filter{item in
    item % 2 != 0 ? true : false

    // This also works and probably makes more sense
    // !item.isMultiple(of: 2)
}.sorted().map{item in
    "\(item) is a lucky number"
}.joined(separator: "\n")

print(answer)
```

Took a few tries, it was a little awkward looking at it all first. Pretty similiar to Javascript and mapping/sorting/etc on an array. The closures I originally went through and added the types manually, and then used the shorthand.

```swift
// First implementation with types and explicity return statements
let answer = lukcyNumbers.filter({(item: Int) -> Bool in
    if item % 2 != 0 {
        return true
    }
    return false
}).sorted().map({(item: Int) -> String in
    return "\(item) is a lucky number"
}).joined(separator: "\n")
```
