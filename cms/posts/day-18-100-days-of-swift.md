---
active: true
title: Day 18 - 100 Days of Swift
published: 2024-01-15
category: swift
id: day-18-100-days-of-swift
---

Day `18/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/18](https://www.hackingwithswift.com/100/swiftui/18)

---

Today is wrap up day where I review what I've learned and there's a short test to go along with it.

-   SwiftUI allows no more than 10 child views inside each parent. If you want to add more you should place your views inside groups.
-   All SwiftUI views must inherit from the `View` protocol.
-   SwiftUI views must contain at least one computed property, which is the `body` property

The modifiers still sort of confuse me about how they work. Each visual thing is a struct, and we use closures all over the place. However I'm not totally sure yet how the `.whatever` methods can be used all over. I'm sure it's some swift pattern I'll learn later. For example...

This bit is inside of the `Navigation`. `.navigationTitle` and `.toolbar` can be added, just like `Form` could. As I'm typing this, I dug through the docs and found that it conforms to the `View` protocol, and that is chuck full of all of the modifier things. So we could try to use `.navigationTitle` modifier on the `NavigationStack` struct itself, but nothing happens...since it's "outside" of the navigation stack? Kind of starting to make more sense.

```swift
NavigationStack {
  Text("Im here")
  .navigationTitle("We Split")
  .toolbar {
      if amountIsFocused {
          Button("Done") {
              amountIsFocused = false
          }
      }
  }
}
```

The next part of todays challenge, is to add these.

1. Add a header to the third section, saying “Amount per person”
2. Add another section showing the total amount for the check – i.e., the original amount plus tip value, without dividing by the number of people.
3. Change the tip percentage picker to show a new screen rather than using a segmented control, and give it a wider range of options – everything from 0% to 100%. Tip: use the range 0..<101 for your range rather than a fixed array.

Final code with changes below

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

    var totalCheckAmount: Double {
        let tipSelection = Double(tipPercentage)
        let tipValue = checkAmount / 100 * tipSelection
        let grandTotal = checkAmount + tipValue
        return grandTotal
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
                        ForEach(0..<101, id: \.self){
                            Text($0, format: .percent)
                        }
                    }
                    .pickerStyle(.navigationLink)
                }

                Section("Total amount of check") {
                    Text(totalCheckAmount, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
                }


                Section("Total per person") {
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
