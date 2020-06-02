const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
module.exports = function (eleventyConfig) {
    // A useful way to reference the context we are runing eleventy in
    let env = process.env.NODE_ENV

    // add support for syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight)

    // pass some assets right through
    eleventyConfig.addPassthroughCopy('./src/site/images')

    return {
        dir: {
            input: 'src/site',
            output: 'dist',
            data: `_data/${env}`,
        },
        // templateFormats: ['liquid', 'md', '11ty.js'],
        // htmlTemplateEngine: 'njk',
        // markdownTemplateEngine: 'njk',
        passthroughFileCopy: true,
    }
}
