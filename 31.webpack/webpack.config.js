const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const  ModuleConcatenationPlugin  = require('webpack/lib/optimize/ModuleConcatenationPlugin');
module.exports = {
    entry: './src/lazy.js',
    //chunkFileName chunkash
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}