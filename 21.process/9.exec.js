//exec同步执行一个shell命令
let { execFile } = require('child_process');
let path = require('path');
// spawn fork exec execFile
let p1 = execFile('node', ['test2.js', 'a', 'b', 'c'], { cwd: path.join(__dirname, 'test2') },
    function (err, stdout, stderr) {
        console.log(err);
        console.log(stdout);
    });
