process.on('message', function (msg) {
    console.log(msg);
    process.send('test3:' + msg);
});