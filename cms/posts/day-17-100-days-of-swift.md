---
active: true
title: Day 17 - 100 Days of Swift
published: 2024-01-14
category: swift
id: day-17-100-days-of-swift
---

Day `17/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/17](https://www.hackingwithswift.com/100/swiftui/17)

---

This is the first project "WeSplit", and today we start writing the app. We are covering four topics, which cover the use of `Form`, `@State`, `Picker`, and more.

> We’re building a check-splitting app, which means users need to be able to enter the cost of their check, how many people are sharing the cost, and how much tip they want to leave.

With `@State`, swift will watch for changes, and when it does change it will re-invoke the `body` property of our `View` to re-render the UI.

First we're setting up some properties for the user to enter and changes to get the final amount for each user.

```swift
struct ContentView: View {

    @State private var checkAmount = 0.0
    @State private var numberOfPeople = 0
    @State private var tipPercentage = 20

    let tipPercentages = [0, 10, 15, 20, 25]

    // Using "Locale" struct here, as it's provided from SwiftUI package and it gives us
    // things about linguistic, cultural, and technological conventions and standards. One of
    // these things includes what type of currency they use. This is an Optional, so we need to
    // unwrap the currency 'identifier'. If it's nil, then we default USD
    var body: some View {
        Form {
            Section {
              // TextField("Check Amount", value: $checkAmount, format: .currency(code: "USD"))
              TextField("Check Amount", value: $checkAmount, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
              .keyboardType(.decimalPad)
            }
        }
    }
}
```

### Picker

Next up is adding a `Picker`. This lets us the user pick how many people there are splitting the check.

```swift
Picker("Number of people", selection: $numberOfPeople){
    ForEach(2..<100){
        Text("\($0) people") // Not using "something in" after curly, so we can use the "$0"
    }
}
// Here we can add a modifier to change how it looks
// By default, it's a popup modal thing. This is a whole new stack/view
.pickerStyle(.navigationLink)
```

Since we are using `navigationLink` as the picker style modifier, we need to wrap our view in a `NavigationStack`. We also can give it a title of "WeSplit". Now when we want to select how many people to split the check with, it will slide them over to a new view.

```swift
NavigationStack { // <-- Important part
  Section {
    Form {
      Picker("example", selection: $numberOfPeople){
        Text()
      }
      .pickerStyle(.navigationLink)
    }
  }
  .navigationTitle("WeSplit") // <-- Modifier goes inside
}
```

### Segmented Control

Now we're going to add an additional picker to let the user choose their tip percentage. We also are going to make this the "segmented" version so it looks nicer. This segmented style looks good when there's a low set number of options.

```swift
Section("Select a tip percentage") { // <-- We can add a nice title to the section
    // Text("Please select a tip percentage") <-- Could do text for a section title, but looks weird
    Picker("Tip Percentage", selection: $tipPercentage){
        ForEach(tipPercentages, id: \.self){
            Text($0, format: .percent)
        }
    }
    .pickerStyle(.segmented)
}
```

Still not totally sure/confident on the `ForEach`. The autocomplete shows random things, and if it weren't for the code examples on the website, I wouldn't know how to do that.

Next up we can add a computed value, that calculates and final total per person in our app. Then we use `totalPerPerson` in the bottom `Text` to update the final amount per person. This updates and changes as the use interacts with the app.

```swift
var totalPerPerson: Double {
    let peopleCount = Double(numberOfPeople + 2)
    let tipSelection = Double(tipPercentage)

    let tipValue = checkAmount / 100 * tipSelection
    let grandTotal = checkAmount + tipValue
    let amountPerPerson = grandTotal / peopleCount

    return amountPerPerson
}
```

![We Split App](/images/100-days-of-swift/we-split-screenshot.png)

### Hiding the keyboard

The final thing we need to do, is to hide the keyboard. Right now the user clicks inside of the total check amount, and then can change the amount. However the keyboard just stays up and looks kinda weird. We need to dismiss it after they click away. We can solve this with `@FocusState`

We add the "focused" modifier to the amount Text field, and then on the navigation bar we conditionally add a "Done" button and set the new focused state to false.

```swift
// We add this, just like @State
@FocusState private var amountIsFocused: Bool

// Add the focused modifier
TextField().focused($amountIsFocused)

// Add toolbar modifier to NavigationStack, to conditionally show "Done" button
.toolbar {
    if amountIsFocused {
        Button("Done") {
            // User taps "Done" and focus is set to false, the keyboard dismisses
            amountIsFocused = false
        }
    }
}
```

### Completed code

```swift
//
//  ContentView.swift
//  WeSplit
//
//  Created by Garrett Bland on 1/8/24.
//

import SwiftUI

struct ContentView: View {

    @State private var checkAmount = 0.0
    @State private var numberOfPeople = 2
    @State private var tipPercentage = 20

    @FocusState private var amountIsFocused: Bool

    let tipPercentages = [0, 10, 15, 20, 25]

    // computed value
    var totalPerPerson: Double {
        let peopleCount = Double(numberOfPeople + 2)
        let tipSelection = Double(tipPercentage)

        let tipValue = checkAmount / 100 * tipSelection
        let grandTotal = checkAmount + tipValue
        let amountPerPerson = grandTotal / peopleCount

        return amountPerPerson
    }


    var body: some View {
        NavigationStack {
            Form {
                Section {
                    TextField("Check Amount", value: $checkAmount, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
                        .keyboardType(.decimalPad)
                        .focused($amountIsFocused)

                    Picker("Number of people", selection: $numberOfPeople){
                        ForEach(2..<100){
                            Text("\($0) people")
                        }
                    }
                    .pickerStyle(.automatic)
                }

                Section("Select a tip percentage") {
                    // Text("Please select a tip percentage")
                    Picker("Tip Percentage", selection: $tipPercentage){
                        ForEach(tipPercentages, id: \.self){
                            Text($0, format: .percent)
                        }
                    }
                    .pickerStyle(.segmented)
                }


                Section {
                    Text(totalPerPerson, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
                }
            }
            .navigationTitle("We Split")
            .toolbar {
                if amountIsFocused {
                    Button("Done") {
                        amountIsFocused = false
                    }
                }
            }
        }
    }
}

#Preview {
    ContentView()
}

```
