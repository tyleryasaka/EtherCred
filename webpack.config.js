var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './app/javascripts/app.jsx',
    output: {
        path: "./build",
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.(js|jsx|es6)$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.sol/, loader: 'truffle-solidity' }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './app/index.html', to: "index.html" }
        ])
    ],
    devServer: {
        stats: 'errors-only',
    }
};
