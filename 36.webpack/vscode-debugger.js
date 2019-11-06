var path = require('path');
require('child_process').exec("npm config get prefix", function (err, stdout, stderr) {
    debugger
    var nixLib = (process.platform.indexOf("win") === 0) ? "" : "lib"; // win/*nix support
    var webpackPath = path.resolve(path.join(stdout.replace("\n", ""), nixLib, 'node_modules', 'webpack-cli', 'bin', 'webpack.js'));
    console.log(webpackPath);
    require('/Users/silly/Documents/珠峰架构/zhufengjiagou-learn/36.webpack/node_modules/webpack-cli/bin/cli');
});