const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: __dirname + '/src/scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.(svelte)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        hotReload: true,
                    },
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin(), new VueLoaderPlugin()],
}
