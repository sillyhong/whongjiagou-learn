const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
module.exports = function (source) {
    const options = loaderUtils.getOptions(this);
    let schema = {
        "type": "object",
        "properties": {
            "content": {
                "type": "string"
            }
        }
    }
    validateOptions(schema, options, '参数校验!');
    console.log(this.context);
    console.log(this.resource);
    console.log(this.resourcePath);
    console.log(this.resoureQuery);
    console.log(this.loadModule);
    console.log(this.resolve);
    console.log(this.addDependency);
    console.log(this.addContextDependency);
    console.log(this.clearDependencies);
    this.cacheable && this.cacheable();
    this.emitFile('myfile.txt', '文件内容');
    let callback = this.async();

    console.log(source);
    // setTimeout(function () {
    //     callback(null, '');
    // }, 100);
    console.log('========================' + options.content + '==================================');
    this.callback(null, 'let a;');
}
//module.exports.raw = true;