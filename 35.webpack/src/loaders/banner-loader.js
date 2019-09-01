const path = require('path');
const fs = require('fs');
module.exports = function (source) {
    let callback = this.async();
    let banner = path.resolve(__dirname,'banner.js');
    this.addDependency(banner);
    fs.readFile(banner, 'utf8', (err, banner) => {
        if (err) return callback(err);
        callback(null, banner + '\n\n' + source);
    });
}