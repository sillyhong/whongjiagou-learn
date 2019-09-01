var less = require('less');
module.exports = function (source) {
    console.log(source);
    return `let style = document.createElement('style');style.innerHTML = ${JSON.stringify(source)};document.head.appendChild(style);`;
}