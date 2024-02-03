---
active: true
title: Day 19 - 100 Days of Swift
published: 2024-02-03
category: swift
id: day-19-100-days-of-swift
---

Day `19/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/19](https://www.hackingwithswift.com/100/swiftui/19)

---

Today is a challenge day. It's to build an app without following a tutorial.

> You need to build an app that handles unit conversions: users will select an input unit and an output unit, then enter a value, and see the output of the conversion.

### Substring

While building, I was trying to use the `prefix` method from a `String`. It was throwing all sorts of errors, saying the following.

> Instance method 'appendInterpolation(\_:formatter:)' requires that 'PrefixSequence<String>' inherit from 'NSObject'

So I looked into the `prefix` method of a `String` struct, and it turns out that the `prefix` method returns a `SubSequence`, which aliases to `Substring` off the `String` type. [Here's the documentation](https://developer.apple.com/documentation/swift/substring)

It has a bunch of stuff that I don't really understand yet, but ultimately you need to intialize a new string using the `String` initializer (inside a `View` struct anyways. It works in a playground.)

```swift
let name = "garrett"
var body: some View {
  Text("The first letter of my name is \(String(name.prefix(1)))")
}
```

Built out the converter, final code below. Took a handful of days off.

![Temp Converter Screenshot](/images/100-days-of-swift/temp-converter-screenshot.png)

```swift
//
//  ContentView.swift
//  Convert Stuff
//
//  Created by Garrett Bland on 1/16/24.
//

import SwiftUI

// Some defaults
let APP_NAME: String = "Convert Stuff"
let DEFAULT_FROM = "Celcius"
let DEFAULT_TO = "Fahrenheit"

// Our enum with possible unit cases. Also adding the "CaseIterable"
// protocol so we can loop through them and use the ".rawValue"s in
// our app
enum Units: String, CaseIterable {
    case Celcius
    case Fahrenheit
    case Kelvin
}

// A string extension that adds the ability to only show two decimal
// places. This isn't rounding or anything, it's purely just using at
// max two decimal places.
// Example
// String("123.4567").showTwoDecimals() <-- 123.45
extension String {
    func showTwoDecimals() -> String {

        var answer: String = ""

        // Check to see if there is a ".", and if there's
        // any value after
        if self.split(separator: ".").count > 1 {

            // There are decimal places. Split it into two variables,
            // and prefix the second part to only two characters from
            // the beginning (prefix)
            let firstPart = self.split(separator: ".")[0]
            let secondPart = self.split(separator: ".")[1].prefix(2)

            // Combine the unmodifier first part of the number before
            // the ".", and combine with the new second part with max
            // two characters.
            answer = String("\(firstPart).\(secondPart)")
        }

        return answer
  }
}

struct ContentView: View {

    @State private var userInput = "32"
    @State private var selectedUnitFrom = Units.Celcius
    @State private var selectedUnitTo = Units.Fahrenheit

    // this works, but adding "CaseIterable" protocol to enum is nicer
    // let units = [Units.Celcius, Units.Fahrenheit, Units.Kelvin]

    func convertDegree(_ degree: String, from fromUnit: Units, toUnit: Units ) -> String? {

        // Guard against degree. If the "degree" user input is nil,
        // aka they don't enter anything in the input or delete it all,
        // then we return nil early (and swift can use degree safely now)
        guard let degree = Double(degree) else {
            return nil
        }

        let DEGREE = Double(degree)
        var convertedDegree: Double = 0

        // Swiches within switches. There's probably better
        // ways to do this with a lot more elegance, but decided
        // to not make it really fancy at this point.
        switch fromUnit {
            case .Celcius:
                switch toUnit {
                    case .Celcius:
                        convertedDegree = DEGREE
                    case .Fahrenheit:
                        convertedDegree = (DEGREE * 9/5) + 32
                    case .Kelvin:
                        convertedDegree = DEGREE + 273.15
            }
            case .Fahrenheit:
                switch toUnit {
                    case .Celcius:
                        convertedDegree = (DEGREE - 32) * 5/9
                    case .Fahrenheit:
                        convertedDegree = DEGREE
                    case .Kelvin:
                        convertedDegree = (DEGREE - 32) * 5/9 + 273.15
            }
            case .Kelvin:
                switch toUnit {
                    case .Celcius:
                        convertedDegree = DEGREE - 273.15
                    case .Fahrenheit:
                        convertedDegree = (DEGREE - 273.15) * 9/5 + 32
                    case .Kelvin:
                        convertedDegree = DEGREE
            }
        }

        let ANSWER = String(convertedDegree).showTwoDecimals()

        return ANSWER
    }


    // Computed property that calculates value of conversion
    var calculatedUnit: String? {
        convertDegree(userInput, from: selectedUnitFrom, toUnit: selectedUnitTo)
    }

    // Computed property returns the first character of unit
    // The .prefix method returns a substring, so wrapping in a
    // "String" initializer to convert to String type
    var degreePrefix: String {
        String(selectedUnitTo.rawValue.prefix(1))
    }

    var body: some View {
        NavigationStack {
            Form {
                Section("Temperature converter") {
                    Text("Convert...")


                    // I want to disable two decimals
                    TextField("Enter a degree", text: $userInput)
                        .keyboardType(.decimalPad)

// This was me trying to figure out how to only show two decimals or something. The onChange
// stuff threw for me for a bit
//                        .onChange(of: userInput, initial: false) { oldValue, newValue in
//
//                            if oldValue.last == "." && newValue.last == "." {
//                                print("trying to enter two ..")
//                                return
//                            }
//
//                            if newValue.contains(".") {
//                                // There is one decimal already
//                                if oldValue.contains(".") {
//
//
//                                    if newValue.last == "." {
//                                        userInput = String(newValue.dropLast())
//                                    }
//                                }
//
//                            }
//                        }


                    Picker("unit", selection: $selectedUnitFrom) {
                        ForEach(Units.allCases, id: \.self){
                            Text($0.rawValue)
                        }
                    }.pickerStyle(.segmented)

                    Text("To...")

                    Picker("unit", selection: $selectedUnitTo) {
                        ForEach(Units.allCases, id: \.self){
                            Text($0.rawValue)
                        }
                    }.pickerStyle(.segmented)

                    HStack {
                        Text("Output: ").bold()

                        // Unwrap optional calculatedUnit and display
                        // with degree prefix
                        if let calculatedUnit = calculatedUnit {
                            Text("\(calculatedUnit) \(degreePrefix)")
                        }

                    }

                }
            }
            .navigationTitle(APP_NAME)
        }
    }
}

#Preview("Preview Thing") {
    ContentView()
}

```
