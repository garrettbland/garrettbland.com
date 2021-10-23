---
active: true
title: Eleventy Image Plugins
id: eleventy-image-plugins
---
I use [11ty](https://www.11ty.dev/) a lot for my personal and client projects. After building a handful of sites, I realized I wanted a way to force myself to add thing's that I miss from time to time, like an \`alt\` tag on an image. I know there are linting rules I could setup, but with \`.liquid\` files, I had a tough time figuring it out.

I decided I would build an 11ty plugin that would scan my code while in development, and yell at me if I had forgotten the \`alt\` tag on an image.

I built a plugin for myself that uses the \`jsdom\` package and scans the HTML output from the build. It looks for any \`img\` elements, and then checks the attributes for the \`alt\` tag. If any of the values are empty or undefined, then an error will be thrown. The code ended up being pretty simple.

```javascript
const { JSDOM } = require('jsdom')

module.exports = (eleventyConfig) => {
    eleventyConfig.addTransform('img-alt-tag-check', (content, outputPath) => {
        if (outputPath.endsWith('.html')) {
            const dom = new JSDOM(content)
            const document = dom.window.document

            const [...images] = document.getElementsByTagName('img')

            images.forEach((image) => {
                const alt_tag_value = image.getAttribute('alt')
                if (!alt_tag_value) {
                    throw Error(`Missing \`alt\` tag from: ${[...outputPath.split('/')][1]}`)
                }
            })

            return document.documentElement.outerHTML
        } else {
            return content
        }
    })
}
```

I also then used the same principals, to build another plugin that would add native lazy loading to images. I put these together as two separate projects and published to NPM for others to download and use. Below are links to the packages.

* [https://www.npmjs.com/package/@garrettbland/img-alt-tag-check](<* https://www.npmjs.com/package/@garrettbland/img-alt-tag-check>)
* [https://www.npmjs.com/package/@garrettbland/lazy-load-images](<* https://www.npmjs.com/package/@garrettbland/lazy-load-images>)