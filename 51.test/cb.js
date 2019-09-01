
function c() {
    console.log(3);
}
function exec(cb) {
    console.log(1);
    cb();
}
exec(c);
console.log(2);