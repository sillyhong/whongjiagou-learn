let i = 0;
process.stdout.write('xxx');
let timer = setInterval(function () {
    process.stdout.write(new Date().toUTCString());
    if (i++ >= 10) {
        clearInterval(timer);
    }
}, 1000);