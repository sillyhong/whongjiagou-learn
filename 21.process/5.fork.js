// fork exec execFile 它们其实都是基于spwan的改进方法
let { spawn } = require('child_process');
/**
 * fork可以直接运行一个node模块
 *  silent  可以快速 设置stdio
 */
function fork(modulepath, args, options) {
    let { silent } = options;
    let opts = Object.assign({}, options);
    if (silent) {
        opts.stdio = ['ignore', 'ignore', 'ignore'];
    } else {
        opts.stdio = [process.stdin, process.stdout, process.stderr];
    }
    spawn('node', [modulepath, ...args], opts);
}
let child = fork('fork.js', ['zfpx'], {
    cwd: __dirname,
    silent: true
});


// child.on('message', function (data) {
//     console.log(data);
// });
// child.send({ name: 'zfpx' });
