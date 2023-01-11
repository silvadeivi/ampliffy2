const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { NONAME } = require('dns');

module.exports = {
    entry: {
        main: { import: './src/main.ts', filename: './main.js' },
        style: {
            import: './src/assets/style.css'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./assets/[name].css" // change this RELATIVE to your output.path!
        })
    ],
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    optimization: {
        minimize: false
    },
};