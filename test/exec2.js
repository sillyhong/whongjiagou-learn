let name = process.argv[2];
let { exec } = require('child_process');
let child = exec('echo hello ' + name, (err, stdout, stderr) => {
    console.log(stdout);
});