Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value =>{callback();return value;}
    );
};

let p1 = new Promise(function (resovle, reject) {
    //setTimeout(function () {
        resovle(1);
    //}, 1000);
});
p1.finally(function () { console.log('finally'); }).then(function (data) {
    console.log('data', data);
}, function () { })