let path = require('path');
let str = '/a/b/c/a.jpg';
console.log(path.basename(str, '.jpg'));
console.log(path.extname(str, '.jpg'));
