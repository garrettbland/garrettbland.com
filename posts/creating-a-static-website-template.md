---
title: Creating a static website template
published: July 29, 2020
---

# Creating a static website template

Github Repo - [https://github.com/garrettbland/eleventykit](https://github.com/garrettbland/eleventykit)

### A static website template?

At work and personally, I create many websites, and find that I often repeat the same structure and layout for each site. I wanted to create a github repo as a template and would quickly let my team and I get the structure setup and get right into coding.

### Common similarities between each website

There are a handful of things we always use with each site. Sometimes we just use a CDN and don't bother setting stuff up like webpack or postCSS, because of time constraints or just me being lazy. Some of the same technologies we use between each site.

-   Netlify (hosting)
-   Eleventy (Static site generator)
-   TailwindCSS
-   AplineJS

Some other technologies I would like to include with each site build out of the box.

-   Webpack
-   PostCSS
-   Icons

### Setting up a fresh project

First step is give our new project a name, and I'm going with with `eleventykit`.

```bash
mkdir eleventykit && cd eleventykit && npm init -y
```

Next up, we will setup some of our commonly used npm packages we use between each project.

```bash
npm install @11ty/eleventy tailwindcss alpinejs
```

Eleventy is a wonderful static site generator, tailwindcss is the most useful thing on this planet for styling, and alpinejs is an extremely useful javascript tool. It allows state management, and is perfect for us as we never need that much javascript. Usually needed for a image slider or mobile menu.

### Setting up scaffolding

Now I'm going to setup my base folder structure for our sites. We will create a top level `src` directory, for all of our code & assets to live in. Our basic structure will look like this.

```text
eleventykit
|
+--src
	|
	+--_data
	+--_includes
	+--css
	+--images
	+--js
	+--pages
		|
		+--index.liquid
+--package.json
+--node_modules
+--readme.md
+--.gitignore
```

Once created, I will now update our `.gitignore` so it ignores a few things.

```text
# node
node_modules/

# MacOS
.DS_Store

# build directory
dist
```

Now we will go into our `package.json` and add two new scripts for development and building for production.

```json
// ...
"dev": "npx @11ty/eleventy --serve",
"build": "npx @11ty/eleventy"
//..
```

Lastly, before we test our new site, we will create an eleventy config file in our base directory to tell eleventy how we want our site built. We will create a new file called `.eleventy.js`. The config file lets us define how we want to handle assets, add in extra plugins, and define our input and outputs.

```javascript
module.exports = function (eleventyConfig) {
    // pass image assets right through
    eleventyConfig.addPassthroughCopy('src/images')

    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src/pages',
            includes: '_includes',
            output: 'dist',
        },
    }
}
```

Time to test! I'll run `npm run dev`, and it should give us an output of where our files are being served from. By default it will launch on `localhost:8080`, and there it is. Isn't it beautiful!

![/images/eleventykit/raw_eleventykit.png](/images/eleventykit/raw_eleventykit.png)

### Adding in TailwindCSS

Now, lets setup our styling for the site. We will follow the official documentation on the tailwind site. We will create a new file called `tailwind.css`, and include the tailwind directives.

```css
/* eleventykit/src/css/tailwind.css

@tailwind base;
@tailwind components;
@tailwind utilities;

/** Custom styles go below **/
```

Next will we create a tailwind config file. This will will create an empty `tailwind.config.js` so we can customize tailwind if needed and setup PurgeCSS easily later on.

```bash
npx tailwindcss init
```

Now, we will add in our bundler, and we will use webpack for this. We will need a few new packages to use webpack, as well as a few style loaders and post css. I also like to have my css as separate files from my javascript. Lets install the new needed packages first.

```bash
npm install webpack webpack-cli style-loader postcss-loader mini-css-extract-plugin autoprefixer
```

Next, lets create `webpack.config.js` file so wen can tell webpack how we want it to parse and bundle files.

```javascript
// webpack.config.js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: __dirname + '/src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin()],
}
```

Lets also go ahead and create an initial `main.js` file in `eleventykit/src/js/scripts/` so we can define an entry for our javascript and any import our `tailwind.css` file for PostCSS to do its thing during the webpack bundle.

```javascript
// eleventykit/src/js/main.js

import '../css/tailwind.css'
console.log('Webpack is working 🎉')
```

Finally, now we can setup our postCSS config file. Create a new file called `postcss.config.js` in our base directory. The tailwind documentation recommends using the tailwind plugin as well as autoprefixer to add certain browser prefixes to make our site more cross browser friendly.

```javascript
// postcss.config.js
module.exports = {
    plugins: [require('tailwindcss'), require('autoprefixer')],
}
```

I lied, one last step before we test. We need to actually add webpack into our build chain. Lets revisit `package.json`, and add in a few new scripts to take care of building this automatically. However, since we want webpack to watch the files while we also have eleventy watching our site files, we need them both to run in parallel.

```bash
npm install npm-run-all cross-env rimraf
```

We will also add in a handful of new scripts, and take advantage of NPM's wildcard like way of running multiple scripts in a single command.

```json
"scripts": {
	"clean": "rimraf dist",
    "serve:eleventy": "npx @11ty/eleventy --serve",
    "serve:webpack": "cross-env NODE_ENV=development webpack --mode development --watch",
    "dev": "npm-run-all clean --parallel serve:*",
    "build:eleventy": "npx @11ty/eleventy",
    "build:webpack": "cross-env NODE_ENV=production webpack --mode production",
    "build": "npm-run-all clean build:*"
  },
```

Perfect! Now lets go into our `index.liquid` file and add in some additional html and reference our new build `javascript` and `css` files. I'll reference the javascript at the end of the page so its avoids slowing down browser load and paint times, and I will also add in some tailwind classes to verify its working.

```html
<!-- eleventy/src/pages/index.liquid -->
<html>
    <head>
        <title>EleventyKit</title>
        <!-- CSS file built by webpack -->
        <link href="/assets/main.css" rel="stylesheet" />
    </head>
    <body>
        <div>
            <h1 class="text-4xl font-black">Eleventy Kit</h1>
            <p class="text-lg text-gray-700 underline">An eleventy starter kit</p>
        </div>
        <!-- JS file built by webpack-->
        <script src="/assets/main.js"></script>
    </body>
</html>
```

Running `npm run dev` gives us our new beautiful site!

![/images/eleventykit/styled_eleventykit.png](/images/eleventykit/styled_eleventykit.png)

If you noticed the main.css file size, it was a hefty 1.8 megabytes, which is way to large for our simple site. Thankfully, tailwindcss ships with PurgeCSS built in. Which means we can remove unused CSS from our stylesheet automatically with the `tailwind.config.js` file. Notice - When `NODE_ENV` is set to `production` (which we add in our `package.json`), it will remove unused styles by comparing our code to the full tailwind stylesheet. During development it will stay the same size. Lets add our file patterns to the purge array we want to check during build. In our case, we use `.liquid` template files, so we will add that for now.

```javascript
// tailwind.config.js
module.exports = {
    purge: ['./src/**/*.liquid'],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
}
```

Running `npm run build`, gives us a tiny 14.5 Kilobytes, so we know purgecss is working!

### Adding in AlpineJS

Now that we have webpack and our bundling already setup, to add in alpinejs to our build chain is very simple. All we need to do is import alpinejs into our `main.js` file.

```javascript
// eleventykit/src/js/main.js
import '../css/tailwind.css'
import 'alpinejs'
```

To test, lets go back into our `index.liquid` file, and sprinkle in some alpine directives to verify its all working as expected. We will just copy/paste their example from the documentation. Running `npm run dev`, we can verify that alpine is working by testing the dropdown.

```html
<div x-data="{ open: false }">
    <button @click="open = true">Open Dropdown</button>

    <ul x-show="open" @click.away="open = false">
        Dropdown Body
    </ul>
</div>
```

### Whats next?

I think we have everything checked off our list, except for icons. Lets install feather icons.

```bash
npm install feather-icons
```

With feather installed, I'll follow the documentation to reference feather in our javascript, and then call the `replace()` method. I'll update our `main.js` to include feather as well as add in some comments.

```javascript
// eleventykit/src/js/main.js

/**
 * Import our Tailwind CSS file with directives and any
 * custom css rules
 */
import '../css/tailwind.css'

/**
 * Import Alpine JS
 */
import 'alpinejs'

/**
 * Import feather icons, then run feather.replace()
 * to replace any '<i data-feather="circle"></i>' elements
 * with the actual SVG
 */
import feather from 'feather-icons/dist/feather.js'
feather.replace()
```

Now lets add in an icon element to our html to test to make sure its working correctly. Reload the page and we should see our new shiny icon!

```html
<!-- eleventykit/src/pages/index.liquid -->
<i data-feather="camera"></i>
```

![/images/eleventykit/icon_eleventykit.png](/images/eleventykit/icon_eleventykit.png)

### Final Thoughts

I think thats all we will add for now! Eventually I might add in some more tools at our disposal, like netlify dev, or setting up scaffolding for serverless functions. For now though, we will turn this into a template repository by going into our github repo > settings > and checking "Template repository" under the repo name. Now we can quickly hit 'Use this template' to create a new repo with our new Eleventy Kit!

![/images/eleventykit/template.png](/images/eleventykit/template.png)
