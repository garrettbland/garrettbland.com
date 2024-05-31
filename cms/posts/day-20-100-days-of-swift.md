---
active: true
title: Day 20 - 100 Days of Swift
published: 2024-05-30
category: swift
id: day-20-100-days-of-swift
---

Day `20/100` of 100 days of swift challenge.

[https://www.hackingwithswift.com/100/swiftui/20](https://www.hackingwithswift.com/100/swiftui/20)

---

Picking back up after some time away. Decided on building an app in swift that would allow me to take a picture of my food and track in a nice simple way, possibly add notes and stuff or share.

---

Today is project 2, part 1. We will be building a guessing game.

The first thing were looking at is `VStack` which is used to style stuff vertically. It can be used within other `HStack`'s and things to create complex layouts, determine alignment, etc. Comparing to web, it's similar to a `div` that's setting the vertical stack with a flex direction of column, and then h stack is flex direction of flex direction of row.

`ZStack` is used to z index things and allows things to stack on top of each other. Similar to positioning things in a absolute way in web.

```swift
HStack {
  VStack {
    Text("Hello!")
  }
}

// spaces items horizontally
HStack(spacing: 20) {
  // aligns the text views to their leading edge
  VStack(alignment: .leading) {
    Text("wooo")
  }
}
```

By default vertical and horizontal stacks will prefer to center stuff. Using `Spacer()` will allow to take up remaining space and push other items to one side.

```swift
VStack {
  Text("This text is centered")
}

VStack {
  Spacer()
  Text("This text is on the bottom")
}
```

We can also add multiple `Spacer()`'s to divide up more space.

```swift
VStack {
  Spacer()
  Spacer()
  Spacer()
  Text("This text is on the bottom")
}
```

`ZStack` draws its contents from top to bottom, back to front. This means if you have an image then some text ZStack will draw them in that order, placing the text on top of the image.

```swift
ZStack {
  Image("")
  Text("Overlaid text")
}
```

ZStack doesn’t have the concept of spacing because the views overlap, but it does have alignment. So, if you have one large thing and one small thing inside your ZStack, you can make both views align to the top like this: ZStack(alignment: .top)

### Colors

We can add Color to a view a few different ways. Kinda feels really weird.

```swift
VStack {
  // This Color struct fills the given context
  VStack {
    Color(.blue)
    Color(red: 1, green: 0.8, blue: 0)
  }
  VStack {
    Text("What")
    Text("What")
  }
  .frame(width: 600, height: 300)
  .background(.orange) // add background modifier
}
```

If we are wanting to ignore the safe area (space behind dynamic island and the home indicator touch bar thing at the bottom), we can do that like so. This would make it red behind those areas.

```swift
ZStack {
    Color.red
    Text("Your content")
}
.ignoresSafeArea()
```

Another fun thing, the `background` modifier can accept materials and not just colors. So we can add the frosted glass effect like this. It also adapts to dark mode/light mode too, which is neat.

```swift
        ZStack {
            VStack(spacing: 0) {
                Color.red
                Color.blue
            }

            // This will add a frosted glass box around the
            // text
            Text("Your content")
                .foregroundStyle(.secondary)
                .padding(50)
                .background(.ultraThinMaterial)
        }
        .ignoresSafeArea()
```

### Gradients

We can add gradients in swift ui like so.

```swift
VStack {
   // stuff
}
.frame(width: 900, height: 300)
.background(.red.gradient) // generic gradient
```

We can also use `LinearGradient` similar to `Color`.

```swift
LinearGradient(colors: [.white, .black], startPoint: .top, endPoint: .bottom)
```

There's a lot more to gradients, but not sure how much I want to write down. There's a lot of little extra's that I know I won't remember but good to be exposed to.

### Buttons

Making a simple button is really simple. We can use a closure for inline logic.

```swift
Button("Click Me"){
  print("Button clicked...")
}
```

Can also pass in functions to the `action` argument

```swift
var body: some View {
  Button("Say Action", action: myAction)
}

func myAction () {
  print("action fired...")
}
```

Styling buttons can be done with using the `role`. These automatically color the buttons in the default system way and also for screen readers.

```swift
VStack {
    // gray background, blue text
    Button("Button 1") { }.buttonStyle(.bordered)
    // gray background, red text
    Button("Button 2", role: .destructive) { }.buttonStyle(.bordered)
    // blue backround, white text
    Button("Button 3") { }.buttonStyle(.borderedProminent)
    // red background, white text
    Button("Button 4", role: .destructive) { }.buttonStyle(.borderedProminent)

    // if we want to customize the colors used for a colored button,
    // we can use the 'tint' modifier
    // very light green background, white text
    Button("Button 4", role: .destructive) { }
      .buttonStyle(.borderedProminent).tint(.mint)
}
```

From the course

> Apple explicitly recommends against using too many prominent buttons, because when everything is prominent nothing is.

If we want to make a completely custom `Button`, we can customize using `label`.

```swift
// Red square button with white text
Button {
    print("Button was tapped")
} label: {
    Text("Tap me!")
        .padding()
        .foregroundStyle(.white)
        .background(.red)
}
```

### Images

There are three main ways of using images in swift ui.

-   Image("pencil") will load an image called “Pencil” that you have added to your project.
-   Image(decorative: "pencil") will load the same image, but won’t read it out for users who have enabled the screen reader. This is useful for images that don’t convey additional important information.
-   Image(systemName: "pencil") will load the pencil icon that is built into iOS. This uses Apple’s SF Symbols icon collection, and you can search for icons you like – download Apple’s free SF Symbols app from the web to see the full set.

By default the screen reader will read your image name if it is enabled. Did a quick google for something similar to a "alt" tag but didn't find anything except just to name the image something normal. Not sure if spaces should be used in the file name or underscores or what as best practice.

We can use an image inside a button.

```swift
Button {
    print("Edit button was tapped")
} label: {
    Image(systemName: "pencil")
}
```

If we want both text and a image, we have two options.

```swift
Button("Edit", systemImage: "pencil") {
    print("Edit button was tapped")
}

// Can also use "Label" for more customizability
Button {
    print("Edit button was tapped")
} label: {
    Label("Edit", systemImage: "pencil")
        .padding()
        .foregroundStyle(.white)
        .background(.red)
}
```

> SwiftUI is really smart: it will automatically decide whether to show the icon, the text, or both depending on how they are being used in our layout

Still so many little things to learn about swiftui. There is so much more little things that swift does for us by default than web. Getting both used to that and not sure I totally like it yet compared to web.

### Alerts

Showing a system alert is a modifier, for some reason? Doesn't make a ton of sense, but it's similar to showing the alert with state in react for the control flow. Below the modifier is attached to the `Button`, but it doesn't really matter where the modifier lives apparently.

Any button inside an alert will automatically dismiss the alert – that closure is there to let us add any extra functionality beyond just dismissing the alert.

```swift
    @State private var showAlert = false

    var body: some View {
        Button("Edit", systemImage: "pencil") {
            showAlert = true
        }.alert("test", isPresented: $showAlert){
            Button("OK"){}
        }
    }
```

We can also add more buttons, roles, and text to the alerts like so.

```swift
    @State private var showAlert = false

    var body: some View {
        // This could also be HStack, VStack, whatever - very odd?
        Button("Edit", systemImage: "pencil") {
            showAlert = true
        }.alert("test", isPresented: $showAlert){
            Button("OK") { }
            Button("Delete", role: .destructive) { }
            Button("Cancel", role: .cancel) { }
        } message: {
            Text("Please read this.")
        }
    }
```
