var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    output: {
        path: "./build",
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.(js|jsx|es6)$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.json$/i, loader: "json-loader"},
            { test: /\.sol/, loader: 'truffle-solidity' }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './app/index.html', to: "index.html" },
            { from: './app/stylesheets/app.css', to: "app.css" },
            { from: './node_modules/bulma/css/bulma.css', to: "bulma.css" },
        ])
    ],
    devServer: {
        stats: 'errors-only',
    }
};
