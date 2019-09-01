const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    resolveLoader: {
        modules: [path.resolve('node_modules'), path.resolve(__dirname, 'src', 'loaders')]
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: {
                    loader: path.resolve('./src/loaders/log-loader.js'),
                    options: { content: 'loading' }
                }
                //use: ['style-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'banner-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-layout-loader',
                    options: {
                        layout: path.join(__dirname, 'src', 'layout.html'),
                        placeholder: '{{__content__}}'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/home.html',
            filename: 'home.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/user.html',
            filename: 'user.html'
        })
    ]
}