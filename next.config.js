module.exports = {
    target: 'serverless',
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            loader: 'frontmatter-markdown-loader',
        })
        return config
    },
}
