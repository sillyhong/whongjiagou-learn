let less = require('less');//可以查看文档 less.render
module.exports = function (source) {
    less.render(source, (err, result) => {
        console.log(result.css);
        this.callback(err, result.css);
    });
}