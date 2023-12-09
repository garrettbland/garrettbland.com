---
active: true
title: Day 11 - 100 Days of Swift
published: 2023-12-09
category: swift
id: day-11-100-days-of-swift
---

Day `11/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/11](https://www.hackingwithswift.com/100/swiftui/11)

---

Learning more about Structs, access control, and static properties

Before on day 10 using Structs, we could access any property or method we wanted and do stuff. This isn't always good, as sometimes we need custom logic to happen or something.

```swift
struct Employee {
    public var name: String = "Garrett" // public, anyone can change
    fileprivate var age: Int = 29 // Only this file can modify
    private var lovesCoffee: Bool // Private to this struct only
    private(set) var married: Bool // let anyone read this property, but only let my methods write it.
}
```

Access control is good to define for us and other developers how our code should be used. It's good for us to not make mistakes, and to make sure consumers are using our code as intended. How other people see our code is called "surface area"

🚨 If you use private access control for one or more properties (without a initial value), you’ll need to create your own initializer. Swift is unable to create the automatic memberwise initializer for us if `private` is used.

```swift
struct Employee {
  private var name: String
  private var age: Int

  init(name: String, age: Int) {
    self.name = name
    self.age = age
  }
}
```

Getting into `static` properties and methods.

Static properties and methods are attached to the struct itself, the static version, not the non-static version which is initialized with a let or var. (individual instances)

```swift
struct School {
    static var numberOfStudents: Int = 0

    static func addStudent(name: String) -> Void {
        print("\(name) joined the school...")
        numberOfStudents += 1
    }
}

// Accessing struct directly
School.addStudent(name: "Garrett")
School.addStudent(name: "Michelle")

print(School.numberOfStudents) // -> 2
```

Accessing "self" here for static properties and methods is a little different, `self` is a reference to the inidividual instances of a struct, or `Self` (the uppercase) refers to the actual struct itself. A good way to remember this - `Self` refers to the struct just like a type, and types in Swift normally have the first letter uppercased.

-   `self` gets the current value of the struct
-   `Self` gets the current type of struct

```swift
struct School {
    static var numberOfStudents: Int = 0

    static func addStudent(name: String) -> Void {
        print("\(name) joined the school...")
        numberOfStudents += 1
    }

    public func printTotalStudents() {
        print("The school has \(Self.numberOfStudents) students")
        print("The school has \(School.numberOfStudents)") // This also works in place of "Self"
    }
}

// Accessing struct directly
School.addStudent(name: "Garrett")
School.addStudent(name: "Michelle")

print(School.numberOfStudents)

let aNewSchool = School()
aNewSchool.printTotalStudents() // The school has 2 students
```

In his examples, he gave some use cases such as Application Data like version or where a settings file is stored or something. Kind of like a constants type of thing. A common use case is storing common functionality across your app. We can also make static methods and properties private

```swift
struct AppData {
  private(set) static var version: Int = 1

  public static func incrementVersion() {
    version += 1
  }
}

AppData.incrementVersion()
print(AppData.version)
```

### Challenge (Checkpoint 6)

Checkpoint 6 is asking the following...

> create a struct to store information about a car, including its model, number of seats, and current gear, then add a method to change gears up or down. Have a think about variables and access control: what data should be a variable rather than a constant, and what data should be exposed publicly? Should the gear-changing method validate its input somehow?

Here is my solution

```swift
// Available gears
enum PossibleGears {
    case first, second, third, fourth, fifth
}

struct Car {
    let model: String // Not going to change
    let numberOfSeats: Int // Not going to change
    private(set) var currentGear: PossibleGears = .first // Ready only property, but can change

    init(model: String, numberOfSeats: Int, currentGear: PossibleGears) {
        self.model = model
        self.numberOfSeats = numberOfSeats
        self.currentGear = currentGear
    }

    // mutating keyword to allow changing our variable
    mutating func shiftGear(to gear:PossibleGears) -> Void {
        print("Shifting gears from \(currentGear) to \(gear)")
        self.currentGear = gear // update the current gear with available enum value
    }
}

var ToyotaHighlander = Car(model: "Highlander", numberOfSeats: 4, currentGear: .first)

print(ToyotaHighlander.currentGear)
ToyotaHighlander.shiftGear(to: .second)
print(ToyotaHighlander.currentGear)
```
