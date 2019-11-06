/**
 * 
 * @param source 文件的原内容
 */
const path = require('path');
const loaderUtils = require('loader-utils');
const validate = require('schema-utils');
let json = {
  "type": "object",
  "properties": {
    "content": {
      "type": "string"
    }
  }
}
//这样的话source就是一个buffer
module.exports.raw = true;
module.exports = function (source) {
  console.log('source', source)
  // console.log('this', this)
    let options = loaderUtils.getOptions(this);
    validate(json,options,"log-loader");
    console.log(options.content);
    //console.log(this);
    //isAsync = false;
    // let callback = this.async();
    // setTimeout(() => {
    //     callback(null, source);
    // }, 2000);
    // console.log('loading');
    //Final loader didn't return a Buffer or String
    return source;

}