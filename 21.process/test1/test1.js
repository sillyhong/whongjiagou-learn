//console.log();

for (let i = 0; i < process.argv.length; i++) {
    process.stdout.write('hello ' + process.argv[i] + '\r\n');
}
process.stdin.on('data', function (data) {
    process.stdout.write('子'+data);
});