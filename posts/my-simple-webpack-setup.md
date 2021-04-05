---
title: My Simple Webpack Setup
published: June 5, 2020
---

When I started really getting into javascript and adding more functionality to my sites, something I really struggled with, was webpack. Below I have outlined my simple webpack setup, and hopefully this can help you.

[https://github.com/garrettbland/simple-webpack-setup](Github Repo)

### What is webpack?

Webpack gives us control over how we want to handle different files. Most commonly, javascript. We can import many different npm libraries, and webpack will build and minify into a single javascript file during build. This helps us reduce external requests and lets our code be nice and tidy. I also prefer webpack to separate my css styling into a separate file as well.

### Lets run through a simple project

I struggled like crazy when I got started with webpack, even for simple setups. I'm going to walk through everything from the beginning. I'm writing this tutorial on a mac, so the commands will be slightly different for windows. I'm using node v12.14.0 && npm v6.13.4.

### Step 1

Create a new directory for our project and jump into it.

```bash
mkdir webpack-test-project && cd webpack-test-project
```

### Step 2

Initialize a new `package.json`, and answer yes to everything just to get going quickly or add `-y` to the command and answer yes to everything. (leave it off if you prefer to manually fill it out)

```bash
npm init -y
```

### Step 3

Install webpack and the webpack-cli. We use the cli to tell webpack to fire off different scripts and builds.

```bash
npm install webpack webpack-cli
```

### Step 4

Create a new file called `webpack.config.js` in our new directory. This is the configuration file where we can customize webpack to our liking.

```bash
touch webpack.config.js
```

### Quick check ✅

At this point we should have one folder, and three files in our new directory.

-   node_modules
-   package.json
-   package-lock.json
-   webpack.config.json

### Step 5

Lets create a new starting point for our application. Create a file called `app.js`

```bash
touch app.js
```

### Step 6

Open `app.js` and add the following or something similar. This will be used so we can see that our webpack build is bundling our javascript.

```javascript
window.alert('Webpack is working!')
```

### Step 7

Open up `webpack.config.js`, and add this very simple config below. There are a few different things going on here. We tell webpack the entry file is `app.js`. Once webpack if finished building, we tell it to create a file called `main.js` and add it to the `build` directory. Then we can reference `build/main.js` in our html.

```javascript
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'app.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js',
    },
}
```

### Step 8

Update our `package.json` file and add in our new webpack build command under scripts. The `—mode` flag is used here for demonstration purposes.

```json
"build": "webpack --mode development"
```

### Step 9

Lets give it a whirl! Run your new build npm script. You will see various details that webpack generates like bundle size and time it took.

```bash
npm run build
```

### Step 10

Lets add to a simple html file and watch your hard work come to life. Create a `index.html` file in the `build` directory

```bash
touch build/index.html
```

### Step 11

Add in the following html to the new `index.html` file

```html
<html>
    <head>
        <title>Test webpack</title>
    </head>
    <body>
        <p>Test webpack demo</p>
        <!-- reference our new main.js file webpack built -->
        <script src="main.js"></script>
    </body>
</html>
```

### Final Step

Open up `index.html` in your favorite web browser. Right away you will notice that an alert fires, and thats an easy way for us to know that webpack is working! 🎉 I hope this was easy to follow along with and has helped you better understand webpack and how it works on a basic level.
