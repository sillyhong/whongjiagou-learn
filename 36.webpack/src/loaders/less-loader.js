let less = require('less');
module.exports = function (source) {
    less.render(source, (err, result) => {
        console.log(result.css);
        this.callback(err, result.css);
    });
}