---
active: true
title: Day 8 - 100 Days of Swift
published: 2023-11-28
category: swift
id: day-8-100-days-of-swift
---

Day `8/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/8](https://www.hackingwithswift.com/100/swiftui/8)

---

Learning about functions, part two

We can pass in default values for paramaters in the same way as javascript, by adding the `= {value}`.

```swift
func sayHi(to name: String = "Tom Hanks") {
  print("Hi \(name)")
}

sayHi() // -> Hi Tom Hanks
sayHi(to: "Garrett") // -> Hi Garrett
```

Handling errors in swift. If a function is able to handle an error, we must include the `throws` keyword before the return type. We do not specify the type of error that will be thrown. Adding `throws` just means that it _could_ happen.

```swift
func checkPassword(_ password: String) throws -> String {}
```

If we use `throw` in our function, it will immediately terminate and pass the error to the executor to be handled.

```swift
// If we don't add the Error type here, we get the error...
// Thrown expression type 'PasswordErrors' does not conform to 'Error'
enum PasswordError: Error {
  case short, obvious
}

func checkPassword(_ password: String) throws -> String {
  if password.count < 5 {
    throw PasswordError.short
  }
  return "Success"
}
```

Now we can do some try/catch stuff similar to javascript to handle thrown errors. We wrap it in a `do/catch` and add the `try` keyword infront of the function call. If the `try` function execution does throw, it will stop and jump to the `catch` block.

```swift
// Running this will print "There was an error", because our function
// threw it
do {
    let result = try checkPassword("1234")
    print(result)
} catch {
    print("There was an error")
}
```

We can avoid the `do/try/catch` stuff by omitting it all, and use `try!`. Not sure why we would even want to do this.

```swift
let result = try! checkPassword("123") // This will crash our program
```

Using this `do/catch` blocks will catch every kind of error. However we can look for specific errors with multiple catch blocks.

```swift
do {
    let result = try checkPassword("1234")
    print(result)
} catch PasswordError.short {
    print("Password is too short")
} catch {
    print("There was a error")
}
```

Swift does give us access to a error constant and we can print/log or whatever inside of the catch block. A common error property we can use is `error.localizedDescription` which gives a human readable message about what went wrong. (Im guessing gives us a stack trace and other things). We can _only_ use this `error` constant if we aren't catching a specific error already in a catch.

```swift
do {
    let result = try checkPassword("1234")
    print(result)
} catch {
    print("There was a error: \(error.localizedDescription)")
    // this prints the following
    // There was an error: The operation couldn’t be completed. (__lldb_expr_453.PasswordErrors error 0.)
}
```

By adding `throws` to our functions, this doesn't mean the function has to throw or will, but that it _can_ throw and Swift will make us be careful with them.

Sending the error back to whatever called the function is called `error propagation` or sometimes called `bubbling up errors`.

The catch block receives a single argument, which is the Error that was thrown in your do block. In Swift, Error is a protocol that is used to represent errors.

### Challenge (Checkpoint 4)

The challenge is to write a function that accepts an integer from 1 through 10,000 and returns the integer square root of that number (aka find the square root of 9, which is 3)

-   Can't use the built in `sqrt()` function
-   If the numer is less than 1 or greater than 10,000, throw "out of bounds" error
-   Only consider integer square root (not double types)
-   If square root can't be found, throw "no root" error

I haven't subscribed to [https://www.hackingwithswift.com/](https://www.hackingwithswift.com/) yet, so I don't get the solution until I start paying, but I managed to figure it out. Had to google one thing, and that was related to the `Optional` type and unwrapping the value with `!`. Here is my solution below.

```swift
import Cocoa

// Error enum to handle numbers that are less than 1 and greater than 10,000
// and to handle the case where there is no square root
enum NumberErrors: Error {
    case outOfBounds, noRoot
}

// function to find the square root of a number between 1 and 10,000
func findSquareRoot(of number: Int) throws -> Int {

    // Check to see if number is out of bounds
    // If so, throw outOfBounds error
    if number < 1 || number > 10_000 {
        throw NumberErrors.outOfBounds
    }

    var attempts = 0 // Hold a way to track number of attemps
    var result: Int? // By including the "?", we initialize the variable with nil

    // Loop through all possible cases, multiplying until a match is found
    // When a match is found, exit loop
    for num in 1...10_000 {
        attempts += 1
        if num * num == number {
            print("\(num) * \(num) should equal \(number)...")
            result = num
            break
        }
    }

    // Since I marked result with a "?" to mark it optional, we can check to
    // see if it's equal to nil, meaning no square roots were found
    if result == nil {
        throw NumberErrors.noRoot
    }

    print("Found square root after \(attempts) attemps...")

    return result! // Add the "!" to explicity unwrap optional type as a Int
}

do {
    let myNumber = 25
    let result = try findSquareRoot(of: myNumber)
    print("Square root of \(myNumber) is \(result)")
} catch NumberErrors.outOfBounds {
    print("Cannot use number that is lower than 1 or greater than 10,000...")
} catch NumberErrors.noRoot {
    print("Square root cannot be found...")
} catch {
    print("There was an error")
}

```

### Some bonus stuff

Learning more about `Optional` and it's return type. I used it above in my challenge. We can do some things like this, to try and execute a function that throws, and if it does we just get `nil` returned to us.

```swift
print(try? checkPassword("1234")) // The function will throw, and will print "nil"
```

Really good article on throwing and handling errors in swift [here](https://www.donnywals.com/working-with-throwing-functions-in-swift/)
