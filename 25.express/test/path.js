let path = '/user/:uid/:name';
/**
let reg = /\/user\/([^\/]+)\/([^\/]+)/;
let url = '/user/1/zfpx';
let result = reg.exec(url);
console.log(result);
 */
//let pathToRegexp = require('path-to-regexp');
let keys = [];
///^\/user\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i
function pathToRegexp(path, keys) {
    return path.replace(/:([^\/]+)/g, function () {
        keys.push({
            name: arguments[1],
            optional: false,
            offset: arguments[2]
        });
        return '(?:([^\/]+?))';
    });
}
let result = pathToRegexp(path, keys);
console.log(result);
console.log(keys);

