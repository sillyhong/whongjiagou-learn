let cluster = require('cluster');
let path = require('path');
if (cluster.isMaster) {
    cluster.setupMaster({
        exec: path.join(__dirname, 'task.js')
    });
    let cpus = require('os').cpus();
    console.log(cpus);

    for (let i = 0; i < cpus.length; i++) {
        cluster.fork();
    }
}