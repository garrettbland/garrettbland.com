const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    // context: __dirname + '/src',
    entry: __dirname + '/src/scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: 'main.js',
    },
    module: {
        rules: [
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
    plugins: [new MiniCssExtractPlugin()],
}
