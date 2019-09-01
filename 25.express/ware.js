let stack = [
    function (next) {
        console.log(1);
        next()
    },
    function (next) {
        console.log(2);
    }
]
let i = 0;
function next() {
    let fn = stack[i++];
    fn(next);
}
next();

function first() {
    console.log('1 start');

    function second() {
        console.log('2 start');
        function third() {
            console.log('3 start');
            console.log('3 end');
        }
        third();
        console.log('2 end');
    }
    second();
    console.log('1 end');
}
first();