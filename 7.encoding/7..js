/*
// 0x07FF 如何转成10进制
console.log(0x07FF);
console.log(parseInt("0x07FF",16));
//7FF
console.log(15+15*16+7*16**2);*/

setTimeout(function () {
    console.log(3)
}, 2000);
setTimeout(function () {
    console.log(1);
    setTimeout(function () {
        console.log(2);
    }, 1000);
}, 1000);
//1  3 2
