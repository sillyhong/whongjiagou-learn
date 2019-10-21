const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //找到源代码的位置
    // devtool: 'source-map',
    
    // entry: './router/index.js',
    entry: './router2/index.js',
    // entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    devtool:'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // include: path.resolve('router'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "env", "stage-0", "react"
                        ]
                    }
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(eot|svg|jpg|png|woff|woff2|ttf)$/,
                use: ['style-loader', 'url-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    devServer: {
        clientLogLevel: 'silent'
    }
}