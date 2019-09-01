let count = 10;
let $timer = setInterval(() => {
    process.stdout.write(new Date().toString() + '\r\n');
    if (--count == 0) {
        clearInterval($timer);
    }
}, 500);