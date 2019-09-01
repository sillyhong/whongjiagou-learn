const path = require('path');
module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    }
}