const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HelloPlugin = require('./src/plugins/HelloPlugin');
const EmitPlugin = require('./src/plugins/EmitPlugin');
const FilesPlugin = require('./src/plugins/FilesPlugin');
const InlinePlugin = require('./src/plugins/inline-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    // 配置查找loader的目录 
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src', 'loaders')
        ]
    },
    module: {
        rules: 
        [
            /* {
                test: /\.js$/,
                use: {
                    loader:path.resolve(__dirname, 'src', 'loaders', 'log-loader'),
                    options:{
                        content:'===============loading=================='
                    }
                }
            }, */
            /*   {
                  test: /\.js$/,
                  use: {
                      loader: path.resolve(__dirname, 'src', 'loaders', 'banner-loader'),
                      options: {
                          copyright: './banner.js'
                      }
                  }
              }, */
            {
                test: /\.less$/,
                use: ['style-loader', 'less-loader']
            },
            /* {
                test:/\.html$/,
                use:{
                    loader:'html-layout-loader',
                    options:{
                        layout:path.resolve(__dirname,'src/layout.html'),
                        placeholder:'{{__content__}}',
                        decorator:'layout'
                    }
                }
            }, */
        ]
    },
    plugins: [
        /* new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/home.html',
            filename: 'home.html'
        }),
        new HelloPlugin({name:'zfpx'}),
        new EmitPlugin(),
        new FilesPlugin({
            filename:'files-list.md'
        }) */
        new HtmlWebpackPlugin({
            tempalte:'./src/index.html',
            filename:'index.html'
        }),
        new InlinePlugin()
    ]
}