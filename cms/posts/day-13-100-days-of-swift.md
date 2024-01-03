---
active: true
title: Day 13 - 100 Days of Swift
published: 2024-01-02
category: swift
id: day-13-100-days-of-swift
---

Day `13/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/13](https://www.hackingwithswift.com/100/swiftui/13)

---

Learning about protocols and extensions.

They seem very similar to `interfaces` in Typescript. We can describe the type and the methods and properties and their types inside. Protocols let us define how structs, classes, and enums ought to work - what methods they should have, and what properties they should have.

```swift
protocol Vehicle {
    func driveDistance(for miles: Int) -> Void
}
```

The protocol describes the minimum needed to conform. So we can add more properties and methods if we wanted. Take a `struct` for example.

```swift
protocol Person {
    func sayHello(to name: String) -> Void
}

struct Employee: Person {
    var name: String // We can add more if we want. This isn't part of protocol
    func sayHello(to name: String) {
        print("Hello \(name)!")
    }
}
```

Another example, showing that the function argument just needs the type to conform to a certain protocol.

```swift
protocol Employee {
    func printPosition() -> Void
    func salaryType() -> Int
}

struct Manager: Employee {
    let position = "Manager"
    func printPosition() {
        print("My position is \(position)")
    }
    func salaryType() -> Int {
        return 1
    }
}

struct Contributor: Employee {
    let position = "Contributor"
    func printPosition() {
        print("My position is \(position)")
    }
    func salaryType() -> Int {
        return 2
    }
}

// Below we don't care if the employee is manager or contributor or whatever,
// just as long as it conforms to "Employee" protocol
func describeEmployee(using employee: Employee) {
    if employee.salaryType() == 1 {
        employee.printPosition()
    } else {
        employee.printPosition()
    }
}

let garrett = Manager()

describeEmployee(using: garrett) // -> prints "My position is Manager"
```

We can set properties on protocols as well, and we havet to use the special `get` and `set` keywords to declare it. This forces appropriate `var` and `let` assignments. It's not possible to create "set only" properties in swift

```swift
protocol Employee {
    var name: String { get set }
    var position: String { get } // read only property
    func printPosition() -> Void
    func salaryType() -> Int
}
```

We can also use many protocols separating by a comma.

```swift
protocol Vehicle {
    var seats: Int { get set }
}

protocol USMadeVehicle {
    var isUSMade: Bool { get set }
}

// We can use many protocols comma separated
// If subclassing, make sure the subclass is first, followed by protocols
struct Ford: Vehicle, USMadeVehicle {
    var seats: Int
    var isUSMade: Bool
}
```

### Opaque return types

Opaque return types give us the ability to make things more flexible in our code, but to the Swift compiler everything is still there. For example, if we have two functions that both return `Equatable`. (This is a swift type, and most of the built in types conform to this protocol. It means it can be used to test equality.)

Here we use the `some` keyword to say that our function will return "some" kind of Equatable conforming type. This could mean a `Int`, `Double`, `Bool`, etc. However it's nicer for us a dev's, Swift will still complain if we try to do things like compare two return values of different types.

The benefit of this, is we can change up the logic in these functions, and the return type can remain the same. For example, we could change `Int.random(1...60)` to `Double.random(1...60)` and since it's return type is still `some Equatable` value, we're good to go.

```swift
func getRandomNum() -> some Equatable {
  Int.random(1...60)
}

func getRandomBool() -> some Equatable {
  Bool.random()
}

// Errors. Swift compiler still cant compare two different types
print(getRandomNum() == getRandomBool())

// Happy as a clam
print(getRandomNum() == getRandomNum())
```

When getting into Swift UI, it returns `some View` for example. I had no idea what this meant until right now. It's saying that we are returning stuff and it conforms to the View protocol, but we can be flexible and we don't have to specific each and every single stack, image, button, etc in our View.

### Extensions

Writing extensions are very similar to adding to the `prototype` in javascript. For example, we can add a `trimmed` function to the `String` struct to make a much less wordy implementation.

```swift
var something = "  this is a string  "

extension String {
    func trimmed() -> String {
        self.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}

// Much shorter
print(something.trimmed())
```

It's not really that much different than writing our own function to do the same thing. However then we are creating a `global` function since it's available everywhere in our project.

If we wanted to add a function that directly modifies the value in place, rather than returning a new value, we can do that as well.

```swift
var something = "      this has extra space   "

extension String {
  mutating func trim() -> String {
    self = self.trimmed() // our other extension. Modify the string directly in place
  }
}

something.trim() // Mutate variable
print(test) // "this has extra space"
```

> Notice how the method has slightly different naming now: when we return
> a new value we used trimmed(), but when we modified the string directly
> we used trim(). This is intentional, and is part of Swift’s design
> guidelines: if you’re returning a new value rather than changing it in
> place, you should use word endings like ed or ing, like reversed().

We can also use extensions to add properties, but it _has_ to be a computed property, not stored. This is because adding new stored properties would affect the actual size of the data types.

Extra note for myself - Computed properties have to have a type annotation.

Swift also allows us to provide our own initializer with extensions. With `structs`, this can be nice because we can provide an initializer inside the extension, and it won't disable the automatic memberwise initializer. For example

```swift
// Swift automatically generates a memberwise initializer for structs, so we don't have
// to write our own initializer
struct Book {
    let title: String
    let pageCount: Int
    let readingHours: Int
}

// With an extension, we can provide our own initializer, keep the memberwise one above, and
// add some additional custom logic
extension Book {
    init(title: String, pageCount: Int) {
        self.title = title
        self.pageCount = pageCount
        self.readingHours = pageCount / 50
    }
}
```

### When or why should we use extensions?

> Extensions let us add functionality to classes, structs, and more,
> which is helpful for modifying types we don’t own – types that were
> written by Apple or someone else, for example

### Extending Protocols

For example, here we can extend the `Array` Struct. We can add a `isNotEmpty` computed property, and then use that for Arrays and get autocomplete and stuff. However, this is just for Arrays. What if we wanted to do this for `Dictionaries` and `Sets` as well?

```swift
extension Array {
    var isNotEmpty: Bool {
        isEmpty == false // implicit return
    }
}

let names = ["bill", "burr", "tom", "hanks"]

print("There are \(names.isNotEmpty ? names.count : 0) names") // There are 4 names

```

With Swift we can do that, and it's protocol oriented programming. We can extend protocols just like Structs. Going off the example above, we know that `Array`, `Set`, and `Dictionary` types conform to the `Collection` protocol.

We can extend that protocol, and give it a default implementation.

```swift
extension Collection { // extend Collection protocol
    var isNotEmpty: Bool {
        isEmpty == false // implicit return
    }
}

let names = ["bill", "burr", "tom", "hanks"]

print("There are \(names.isNotEmpty ? names.count : 0) names") // There are 4 names
```

A better example. Here we create a new protocol, then extend it and give it a default implementation of "printSalary". So any structs conforming to this protocol can now use that default "printSalary" method, or can overwrite with their own implementation.

```swift
// List required methods and properties
protocol Employee {
    var name: String { get }
    func printSalary ()
}

// Using protocolo oriented programming practices,
// we extend the Employee protocol with a default implementation
// of the "printSalary" function.
extension Employee {
    func printSalary () {
        print("This employee makes $10")
    }
}

// Our struct doesn't have to define "printSalary" method since
// we extended with a default implementation
struct Engineer: Employee {
    var name: String
}

let garrett = Engineer(name: "Garrett Bland")
garrett.printSalary() // This employee makes $10

```

### Challenge (Checkpoint 8)

> Your challenge is this: make a protocol that describes a building, adding various properties and methods
> then create two structs, House and Office, that conform to it. Your protocol should require the following:
>
> -   A property storing how many rooms it has.
> -   A property storing the cost as an integer (e.g. 500,000 for a building costing $500,000.)
> -   A property storing the name of the estate agent responsible for selling the building.
> -   A method for printing the sales summary of the building, describing what it is along with its other properties.

Here is my implementation to solve the problem

```swift
// Not really rounding the decimal, but was annoyed with trying to figure
// out the arithmatic for this. So just resorted to truncating.
extension Double {
    var roundDecimals: String {
        String(format:"%.2f", self)
    }
}

let commissionRate: Double = 4.7543243

// Building protocol. "cost" and "agent" can be updated. Not changed in this example.
protocol Building {
    var rooms: Int { get }
    var cost: Int { get set }
    var agent: String { get set }
    func printSalesSummary()
}

// Gives building protocol a default printSalesSummary method available to
// all structs conforming to "Building" protocol
extension Building {
    func printSalesSummary () {
        print("\(agent) sold this \(rooms) bedroom house for $\(cost).")
    }
}

struct House: Building {
    var rooms: Int
    var cost: Int
    var agent: String
}

// Extending house with "commission" computed property
extension House {
    var commission: Double {
        Double(cost) * (commissionRate / 100)
    }
}

struct Office: Building {
    var rooms: Int
    var cost: Int
    var agent: String
}

var soldHouse = House(rooms: 4, cost: 123456, agent: "Bill Burr")
soldHouse.printSalesSummary() // Bill Burr sold this 4 bedroom house for $123456.
print("Commission to be paid: $\(soldHouse.commission.roundDecimals)") // Commission to be paid: $5869.50

```
