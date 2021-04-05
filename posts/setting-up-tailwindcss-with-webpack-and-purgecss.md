---
title: Setting up Tailwind CSS with Webpack and Purge CSS
published: June 21, 2020
---

A few years ago when I found out about this css utility called [Tailwind CSS](https://tailwindcss.com/), I was absolutely blown away with how much time it saved me and how quickly it made me wire up websites with CSS. It made designing fun again.

Whenever I get started with a new javascript project, Tailwind is my absolute go to now. With their built in purge and tree shake to remove unused classes, combined with Post CSS, its a beast. I often found myself annoyed trying to get it worked into my build pipeline, so here is my process.

If you are wanting to see the final code, [click here to view github repo.](https://github.com/garrettbland/tailwindcss-webpack-setup)

\*I'm writing this article for Tailwind version `1.4.6` on a macbook

### Step 1. Fire up a new project

I'm covering my steps from the complete beginning. If you already have a project, move ahead. Create a new site folder, get into it, and then init. If you are new to webpack, click here to read [my simple webpack setup](https://garrettbland.com/blog/my-simple-webpack-setup/).

```bash
mkdir tailwindcss-webpack-site && cd tailwindcss-webpack-site
```

```bash
npm init -y
```

### Step 2. Install Dependencies

Now lets install webpack, tailwindcss, and postcss loader so we can process our tailwind css file with [Post CSS](https://postcss.org/). We also add style-loader so we can inject the css into the DOM.

```bash
npm install webpack webpack-cli tailwindcss style-loader postcss-loader
```

### Step 3. Create Starting Points

With any webpack application, we need a starting point. Lets create our starting javascript file as well as our starting HTML file

```bash
touch app.js index.html webpack.config.js
```

### Step 4. Setup webpack config

You will notice that we have our `postcss-loader` in the rules for css files, and ignoring `node_modules` directory. We also have our complied output going to `main.js`. Copy this config into your new `webpack.config.js`

```js
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'postcss-loader'],
            },
        ],
    },
}
```

### Step 5. Setup Tailwind css

Following Tailwinds documentation, we can use their `@tailwind` directive to include tailwind in our main css file. Lets create a new style sheet for our application in our `src` folder with `app.js`

```bash
touch style.css
```

Now that we have our new applications main stylesheet, lets add in the tailwind directives. Copy this into your new `style.css` file

```css
@tailwind base;

@tailwind components;

@tailwind utilities;
```

### Step 6. Create tailwind config file

This is an optional step according to the tailwind documentation. The tailwind config is not required, but I highly advise it and its part of this setup. Tailwind has a nice built in command to generate this for us. The command below will create a config file for us called `tailwind.config.js`

```bash
npx tailwindcss init
```

### Step 7. Setup Post CSS config

Now that we have Post CSS installed, we can create a config file and give it some extra instructions and what plugins we want to use with it. Create a new config file

```bash
touch postcss.config.js
```

Now lets require our `tailwindcss` plugin so Post CSS knows how to handle Tailwind CSS. Add the following to `postcss.config.js`

```js
module.exports = {
    plugins: [require('tailwindcss')],
}
```

### Step 8. Include our stylesheet

We now need to make sure our new style.css file gets imported into our project so webpack can run the postcss-loader against any css files. Add this import into your `app.js`. The style-loader we installed earlier will take care of injecting the built tailwind styles into the DOM of the page.

```js
import './style.css'
```

### Step 9. Setup HTML

Everything should be wired up to this point. Now all that is left is to setup our main HTML page and test tailwind out. Add this content into `index.html`

```html
<html>
    <head>
        <title>Your baller site</title>
    </head>
    <body class="bg-gray-800 flex items-center justify-center">
        <div class="bg-white rounded-lg p-4 shadow mt-24">
            <h1 class="font-bold text-gray-900">Your new tailwind css site<h1>
            <p class="text-gray-700">Create something cool!</p>
        </div>
        <!-- reference our main.js file webpack built -->
        <script src="dist/main.js"></script>
    </body>
</html>
```

### Step 10. Add in build script

Open up `package.json`, and add in a new build script with the following below.

```js
"build:dev": "webpack --mode development"
```

### Step 11. Give it a test drive!

Now we have our main HTML file referencing our file webpack will build, lets fire off a build to compile and test out our new site.

```bash
npm run build:dev
```

If everything went to plan, you should be able to open up `index.html` in your favorite browser and see something like this.

![/images/tailwindcss-webpack-purgecss/demo-site-preview.png](/images/tailwindcss-webpack-purgecss/demo-site-preview.png)

### Step 12: Purging unused css and reducing file size.

When you ran your build command, you may have noticed the file sizes and thought that they looked a little hefty. Thats because on its own, tailwind is a pretty beefy utility. Using Tailwind's built in Purge, we can have it parse our files and remove any styling that isn't used, resulting in a much smaller file size.

![/images/tailwindcss-webpack-purgecss/large-file-size.png](/images/tailwindcss-webpack-purgecss/large-file-size.png)

You can see here that its **1.51 Megabyte**, which is pretty big.

Earlier we generated a `tailwind.config.js` file. Lets open that up, and add in the following to the purge array. This can template files like `liquid`, `ejs`, `jsx`, or even just javascript files such as `.js`, `.vue`, `.svelte`, ect. Basically anything that references the style names.

In our case, lets just add all `html` files within our project to the purge array.

```js
module.exports = {
    purge: ['./**/*.html'],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
}
```

By default, Tailwind won't run purge any css files unless the `NODE_ENV` is set to `production`. Lets add in this environment variable into a new build script. Add the following to our `package.json`

```js
"build:prod": "export NODE_ENV=production && webpack --mode production"
```

Now lets run our build command for production and see the difference in file size.

```bash
npm run build:prod
```

Woot! 🎉Now we are down to **16.7KB**, very big difference and will allow us to deliver our site faster to users.

![/images/tailwindcss-webpack-purgecss/reduced-file-size.png](/images/tailwindcss-webpack-purgecss/reduced-file-size.png)

### Thats it!

You have successfully setup tailwind with webpack and purgecss!
