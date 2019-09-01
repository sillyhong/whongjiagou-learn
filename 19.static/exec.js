let { exec } = require('child_process');
exec('node a.js', function (err, stdout, stderr) {
    console.log(arguments);
    console.log(stdout);
});
//大家回去自己写一个bin命令 写一个自己的命令行工具。