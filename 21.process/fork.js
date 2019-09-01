process.stdout.write('world' + process.argv[2]);
process.on('message', function (msg) {

    process.send('子进程:' + JSON.stringify(msg));
});