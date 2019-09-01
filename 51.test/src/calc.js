function add(a, b) {
    return a + b;
}
function divide(a, b) {
    if (b == 0) {
        throw new Error('除数不能为零');
        return
    }
    return a / b;
}
exports.add = add;
exports.divide = divide;