var path = require('path');
debugger;
require('child_process').exec("npm config get prefix", function (err, stdout, stderr) {
    var nixLib = (process.platform.indexOf("win") === 0) ? "" : "lib"; // win/*nix support
    debugger;
    var webpackPath = path.resolve(path.join(stdout.replace("\n", ""), nixLib, 'node_modules', 'webpack-cli', 'bin', 'webpack.js'));
    console.log(webpackPath);
    require(webpackPath);
});