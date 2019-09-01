process.on('message', function (msg, socket) {
    if (msg == 'socket') {
        let sum = 0;
        for (let i = 0; i < 100000; i++) {
            sum += i;
        }
        socket.write('child ' + sum);
    }
});