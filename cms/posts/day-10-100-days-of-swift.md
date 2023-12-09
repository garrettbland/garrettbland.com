---
active: true
title: Day 10 - 100 Days of Swift
published: 2023-12-04
category: swift
id: day-10-100-days-of-swift
---

Day `10/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/10](https://www.hackingwithswift.com/100/swiftui/10)

---

Learning about Structs in swift, part one. Structs at this point look very similar to objects in Javascript. Below creates a new type called `Album`

```swift
struct Album {
    let title: String
    let artist: String
    let year: Int

    func printSummary() {
        print("\(title) (\(year)) by \(artist)")
    }
}

let red = Album(title: "Red", artist: "Taylor Swift", year: 2012)
let wings = Album(title: "Wings", artist: "BTS", year: 2016)

print(red.title)
print(wings.artist)

red.printSummary()
wings.printSummary()
```

We create a new `Album` by using it simliar to a function call. Both `red` and `wings` are different, even though they refer to the same Struct. If we have functions inside a Struct that mutate variables, we must use the `mutating` keyword in front of the function, otherwise Swift will yell at us. Any functions that just read data inside the Struct are fine, but if mutating a variable, must use the `mutating` keyword.

```swift
struct Employee {
    let name: String
    var age: Int = 29

    // this will error
    // "mutating operator isn't mutable: 'self' is immutable"
    func increaseAge() -> Void {
        age += 1
        print("Increasing age from \(age) to \(age)")
    }
}

// Fix it by adding "mutating"
struct Employee {
    let name: String
    var age: Int = 29

    mutating func increaseAge() -> Void {
        age += 1
        print("Increasing age from \(age) to \(age)")
    }
}
```

Another thing when using Structs, if we use `let` constants to initialize the Struct, it will make all of it's members immutable. So even though we used `mutating`, this below won't work.

```swift
let garrett = Employee(name: "garrett", age: 29)
print(garrett.age)
garrett.increaseAge() // Cannot use mutating member on immutable value: 'garrett' is a 'let' constant
print(garrett.age)
```

We need to change it to a `var`.

```swift
var garrett = Employee(name: "garett", age: 29)
```

We defined `age` as 29 in the Employee Struct as a `var`, but this can be treated as a default option. So this is valid below. However if we said `let age = 29`, then obviously that would ovverride as it wouldn't be changed/initialized. (Swift also would yell at us and wouldn't compile.)

```swift
var garrett = Employee(name: "garett")
```

Similar to Objects & Classes in Javascript. There are some common things between Structs in swift.

-   variables and constants that belong to Structs are called "properties"
-   Functions that belong to Structs are called "methods"
-   It's called "instance" when we initialize a new Struct
-   Initializers can be passed in after the Struct with parenthesis - similar to function calls.

The initializer with arguments is some fancy-ness Swift does for us. From the blog post

> Swift silently creates a special function inside the struct called init(), using all the properties of the struct as its parameters. It then automatically treats these two pieces of code as being the same

```swift
// These are the same thing
var archer1 = Employee(name: "Sterling Archer", vacationRemaining: 14)
var archer2 = Employee.init(name: "Sterling Archer", vacationRemaining: 14)
```

Doubles are actually implemented as Structs in swift as well. So this is why we need to pass the initial arguments to the `Double` function here to add. This is clicking a lot more in my head now. I was getting confused between types in Typescript and Structs in Swift.

```swift
let a = 1
let b = 2.0
let c = Double(a) + b
```

Tuples are pretty similar to Structs, as they can kind of be thought about as Structs without a name. However returning a single one off type for a function Tuples can be useful, however if we are sharing some sort of Struct as a response for multiple functions, then we would want to use a Struct for code reusability.

Methods and Functions are pretty much exactly the same, with the difference being that Methods can use other variables inside Structs.

A `stored` property is a variable or constant that holds some sort of value, and a `computed` property calculates the value dynamically every time it's accessed.

```swift
struct Employee {
    let name: String
    var age: Int
    var vacationDays = 14
    var vacationDaysTaken = 0

    // Computed property, calculates each time it's accessed
    // By default, a computed property is default only. You can add your own "get" and "set"
    // if you want
    var vacationDaysRemaining: Int {
        vacationDays - vacationDaysTaken
    }

    mutating func increaseAge() -> Void {
        age += 1
    }
}

var person = Employee(name: "garrett", age: 29)
person.vacationDaysTaken += 1
print(person.vacationDaysRemaining) // -> 13
```

Behind the scenes, this computed property is doing some logic for us, and is technically a `getter`. If we want to write to vacation days though, we can defined a `setter`.

```swift
struct Employee {
    var name: String

    // Must be "var" since a computed property
    var employeeId: String {
        get {
            "id_\(name.lowercased())"
        }
        set {
            // "newValue" is automatically provided to us by Swift,
            // and stores whatever value the user was trying to assign
            // to the property
            name = newValue
        }
    }
}

var Garrett = Employee(name: "Garrett")
print(Garrett.employeeId) // id_garrett
Garrett.employeeId = "Hank" // "Hank" gets assigned to "newValue" in setter
print(Garrett.name) // Hank
```

Another couple of important things to note

-   computed properties must always have a type defined
-   computed properties must be `var`. Constants can't be computed properties

Swift lets us create property observers. These are useful to do things each time a value changes, or when it's about to change. These are `willSet` and `didSet`. For example let's say we wanted to print out the games score each time it changed.

```swift
struct Game {
  var score = 0
}

var game = Game()
game.score += 1
print(game.score)
game.score += 1
print(game.score)
```

This works just fine, but we can use property observers, like this.

```swift
struct Game {
    var score = 0 {
        didSet {
            print("Set property to \(score)")
        }
    }
}

var game = Game()
game.score += 1 // Set property to 1
game.score += 1 // Set property to 2
```

Besides `didSet`, we can also use `willSet` to do something right before the value changes.

```swift
struct Game {
    var score = 0 {

        // Happens right before the property changes
        // Swift gives us "newValue" to see what the value will be
        willSet {
            print("Will set to \(newValue)")
        }

        // Happens after the property changes
        // Swift gives us "oldValue" to see what it was
        didSet {
            print("Set property to \(score) from \(oldValue)")
        }
    }
}

var game = Game()
game.score += 1 // prints two lines for both willSet and didSet
game.score += 1 // prints two lines for both willSet and didSet
```

Struct initializers are silenty set for us in the background when we initialize them. For example...

```swift
struct Player {
    let name: String
    let number: Int
}

let player = Player(name: "Megan R", number: 15)
```

Above is the same as below. Except below we are setting our own initializer. This lets us customize and do various things. We just have to make sure our variables are initialized before the special `init` call. We also must make sure all stored properties have a default value in our init function.

```swift
struct Player {
    let name: String
    let number: Int

    init(name: String, number: Int) {
        // We could also omit the "self" part, it just reads awkwardly
        // name = name
        // number = number
        self.name = name
        self.number = number
    }
}

let player = Player(name: "Megan R", number: 15)
```

We can run methods and functions inside `init`, but only _after_ stored properties have been given an initial value. By using the default initializers, this is called `memberwise initializer`. As soon as we set our own initializer, we have to do a little extra work to make sure stored properties have initial value.

We can use the `extension` keyword to use the memberwise initializer in combination with our own initializer, like this.

Inside a method, Swift lets us refer to the current instance of a struct using self

> Copied example from https://www.hackingwithswift.com/quick-start/understanding-swift/how-do-swifts-memberwise-initializers-work

```swift
struct Employee {
    var name: String
    var yearsActive = 0
}

extension Employee {
    init() {
        self.name = "Anonymous"
        print("Creating an anonymous employee…")
    }
}

// creating a named employee now works
let roslin = Employee(name: "Laura Roslin")

// as does creating an anonymous employee
let anon = Employee()
```
