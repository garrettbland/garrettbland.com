---
active: true
title: Day 16 - 100 Days of Swift
published: 2024-01-09
category: swift
id: day-16-100-days-of-swift
---

Day `16/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/16](https://www.hackingwithswift.com/100/swiftui/16)

---

This is the first project "WeSplit", and today is the overview day.

> This project is a check-sharing app that calculates how to split a check based
> on the number of people and how much tip you want to leave

Going over the basics of Xcode and how to navigate around.

Getting into the basics of the layout. Swift UI has a lot of native looking stuff built in. This breaks up the list into really nice looking things like how the Settings app looks.

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Form {
            Text("Hello")
            Text("Hello")
            Text("Hello")
            Section {
                Text("Hello")
            }
        }
    }
}

// This is for the prevew thing onlny, won't get into final build
#Preview {
    ContentView()
}

```

Learned about `NavigationStack` and customizing whats shown in the header. First attempt, it wasn't working. Then did some googling and found out that the `navigationTitle` modifier should be added to the content of the `NavigationStack`, to the `NavigationStack` itself. The modifiers are called [ViewModifiers](https://developer.apple.com/documentation/swiftui/viewmodifier)

```swift
struct ContentView: View {
    var body: some View {
        NavigationStack {
            Form {
                Text("Hello")
                Text("Hello")
                Text("Hello")
                Section {
                    Text("Hello")
                }
            }
            .navigationTitle("WeSplit")
        }
        // On first attempt, I had this here and it wasn't working
        // .navigationTitle("WeSplit")
    }
}
```

Also touching on `@State` and how to keep track of values inside our app.

```swift
import SwiftUI

struct ContentView: View {

    // We can't delcare a property as mutable in
    // a struct, that only works with funcs
    // var tapCount = 0
    // Must use "@State"
    @State var tapCount = 0

    // Apple recommends adding the `private` keyword to signal that this state should
    // only be used here. State variables are intended for storing simple values.
    @State private var anotherTapCount = 0

    var body: some View {
        Button("Tap Count \(tapCount)"){
            tapCount += 1 // <-- This yells at us about not being marked as mutatble if not @State
        }

        // Just added this here to demonstrate multiple ways to use closures. You can
        // pass the action. Can just be ommited due to the trailing closure stuff
        Button("Another tapper", action: {
            print("I have been tapped")
        })
    }
}
```

### Two way data binding

When we want to keep the UI updated with the state, we must use `$` in front of our variable name inside the view. This tells Swift to read _and_ to write to this state variable. So in this example below, we can type into the form field and see the changes. We don't have to put the `$` infront of the `Text` field, since we are just wanting to read it and it's updated as we type.

```swift
struct ContentView: View {

    // Our normal variable
    @State private var name = ""

    var body: some View {
        Form {
            TextField("Enter stuff here", text: $name) // <-- mark with "$" to mark two way binding
            Text("something \(name)") // <-- no "$", so read only
        }
    }
}
```

### Looping

Looping in SwiftUI is similar to the View structs. SwiftUI provides a `ForEach` struct.

```swift
struct ContentView: View {

    var body: some View {
        Form {
            ForEach(1..<10){ item in
                Text("Item \(item)")
            }

            // Without traililng closure
            ForEach(1..<10, content: { item in
                    Text("More things")
            })
        }

    }
}
```

Here is a picker example, using an array of strings. The `id` parameter is a way for Swift to uniquely identify each item in the array. This is similar to React with looping and providing a `key`. Here we just use `\.self` as the identifier, which refers to the value itself since it's unique. However if we had a bunch of strings and some of them were the same, then we would have issues. Not sure what the backslash is for right now, guessing for escaping so the compiler doesn't get confused.

This creates a Picker that updates states when the user chooses a new diet and then shows.

```swift
struct ContentView: View {

    let possibleDiets = ["Slow Carb", "Keto", "Whole 30"]
    @State private var selectedDiet = "Slow Carb"

    var body: some View {
        NavigationStack {
            Form {
                Picker("Choose Diet", selection: $selectedDiet) {
                    ForEach(possibleDiets, id: \.self) { diet in
                            Text(diet)
                    }
                }
            }
            .navigationTitle("Picker Example")
        }
    }
}
```
