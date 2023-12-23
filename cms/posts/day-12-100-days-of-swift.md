---
active: true
title: Day 12 - 100 Days of Swift
published: 2023-12-23
category: swift
id: day-12-100-days-of-swift
---

Day `12/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/12](https://www.hackingwithswift.com/100/swiftui/12)

---

Learning about classes in swift. There are similarities between structs and classes.

-   You get to create and name them.
-   You can add properties and methods, including property observers and access control.
-   You can create custom initializers to configure new instances however you want.

Here are some main differences between classes, with the biggest being _inheritance_

-   You can make one class build upon functionality in another class, gaining all its properties and methods as a starting point. If you want to selectively override some methods, you can do that too.
-   Because of that first point, Swift won’t automatically generate a memberwise initializer for classes. This means you either need to write your own initializer, or assign default values to all your properties.
-   When you copy an instance of a class, both copies share the same data – if you change one copy, the other one also changes.
-   When the final copy of a class instance is destroyed, Swift can optionally run a special function called a deinitializer.
-   Even if you make a class constant, you can still change its properties as long as they are variables.

We can create a new class similar to a struct

```swift
class Game {

  init(score: Int) {
    self.score = score
  }

  var score: Int {
    didSet {
      print("Score updated to \(score)")
    }
  }
}

var newGame = Game(score: 5)
newGame.score += 10
```

Why are there classes and structs in swift? Classes have inheritance, where structs do not. Classes also point to the same data in memory, where structs are unique.

Here we create our Game class from earlier, and then a BasketBall class that inherity the initializer as well as the `score` computed property. I also added a local `soundBuzzer` function to the BasketBall class.

```swift
class Game {

    init(score: Int) {
        self.score = score
    }

    var score: Int {
        didSet {
            print("Score updated to \(score)")
        }
    }
}

class BasketBall: Game {
    // initializer and score computed property is inherited

    // local class function
    func soundBuzzer () {
        print("ERRRRR")
    }
}

var bballGame = BasketBall(score: 0)
bballGame.score += 10
bballGame.soundBuzzer()
```

We can ovveride methods using the `override` keyword, and mark classes `final`, meaning nothing can inherit from it. (A `final` class can still inherit from other classes)

For example, if we wanted override some methods from `Employee` class below. If we attempted to override the method without using `override`, Swift woudln't compile. Also if we used `override` and it wasn't actually overriding any method, Swift will complain since it's probably a mistake.

```swift
class Employee {
    let name: String

    init(name: String) {
        self.name = name
    }

    func printSummary () {
        print("This employee's name is \(name)")
    }
}

class Developer: Employee {

}

class Manager: Employee {

    // We use the "override" keyword here
    override func printSummary() {
        print("This employee's name is \(name) and is a manager")
    }
}

var Earl = Manager(name: "Earl")
Earl.printSummary()
```

If we wanted to make sure that no other classes inherited from `Developer` or `Manager` classes, we could write it like so. They would still inherit from `Employee`. We might do this if we didn't want someone else overriding our methods or something.

```swift
final class Developer: Employee {}
final class Manager: Employee {}
```

From a class that is inheriting another class and we define our own customer initializer, we must also call the parents initializer as well. With classes, Swift will never do this automatically for us. If the custom class doesn't have it's own initializer, it will inherit the parents.

```swift
class Vehicle {
    let isElectric: Bool

    init(isElectric: Bool) {
        self.isElectric = isElectric
    }
}

class Car: Vehicle {
    let isConvertible: Bool

    // "super.init" isn't call on all paths before returning from initializer
    // since we aren't calling super.init
    init(isElectric: Bool, isConvertible: Bool) {
        self.isConvertible = isConvertible
        super.init(isElectric: isElectric) // This "super.init()" is required
    }
}

```

Classes are reference types in Swift, meaning that copies of class instances reference that same data.

```swift
class Employee {
  var name = "Garrett"
}

var user1 = Employee()
var user2 = user1
user2.name = "Michelle" // user1.name is now also "Michelle"
```

Structs do not do this, they are not reference types (Structs are value types). If we want to make a copy, we could do the following. This is also known as "deep copying". We can create a copy method, which creates a new instance and copies over all of the properties safely.

```swift
class User {
    var username = "Garrett"

    func copy() -> User {
        let user = User()
        user.username = username
        return user
    }
}

var user1 = User()
var user2 = user1.copy()
user2.username = "Michelle"

print(user1.username) // Garrett
print(user2.username) // Michelle
```

When a class is destroyed, we can use the optional deinitializer using the `deinit` keyword. This runs when the final reference to the class instance is destroyed. This function is special, and just like `init`, doesn't need the `func` keyword in front. It also takes _no_ paramaters ever, so no parenthesis.

```swift
class Vehicle {
  let doors: Int
  init(doors: Int) {
    self.doors = doors
  }

  // No parenthesis
  deinit {
    print("The vehicle had \(doors) doors")
  }
}

// We put our class instance in this if statement to declare scope,
// and so we know it will be destroyed at the end of the if block.
if true {
    var BMW = Vehicle(doors: 2)

    // Last remaining reference to this Vehicle Instance
    print(BMW.doors)

    // The following will be printed
    // 2
    // The vehicle had 2 doord
}
```

The deinitializer exists since classes have complex copying reference stuff going on. Where structs don't have this, because they don't need it. Each struct is unique, so nothing unique needs to happen when it's no longer in use. Swift keeps track of the amount of times a class was copied or a reference points to it using automatic reference counting (or ARC). When the final count is 0, Swift will run the deinitializer function.

The `mutating` keyword isn't needed with classes.

### Challenge (Checkpoint 7)

> Your challenge is this: make a class hierarchy for animals, starting with Animal at the top, then Dog and Cat as subclasses, then Corgi and Poodle as subclasses of Dog, and Persian and Lion as subclasses of Cat.
>
> But there’s more:
>
> -   The Animal class should have a legs integer property that tracks how many legs the animal has.
> -   The Dog class should have a speak() method that prints a generic dog barking string, but each of the subclasses should print something slightly different.
> -   The Cat class should have a matching speak() method, again with each subclass printing something different
> -   The Cat class should have an isTame Boolean property, provided using an initializer.

```swift
class Animal {
    let legs: Int
    init(legs: Int) {
        self.legs = legs
    }
}

class Dog: Animal {
    func speak () {
        print("Dog barks loudly...")
    }
}

class Cat: Animal {

    let isTame: Bool

    init(isTame: Bool, legs: Int) {
        self.isTame = isTame
        super.init(legs: legs)
    }

    func speak () {
        print("Cats go meow...")
    }
}

class Corgi: Dog {
    override func speak() {
        print("Corgies bark high pitched")
    }
}

class Poodle: Dog {
    override func speak() {
        print("Poodles bark weirdly")
    }
}

class Persian: Cat {
    override func speak() {
        print("persian kitties go mmmeeeeoooww")
    }
}

class Lion: Cat {
    override func speak() {
        print("lions go ROOOAAARRRR")
    }
}

let myPetLion = Lion(isTame: false, legs: 4)
let myPetCorgi = Corgi(legs: 4)

myPetLion.speak()
myPetCorgi.speak()

```
