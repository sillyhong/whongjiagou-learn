
let utils = {
    //元素变化有哪些种类
    REMOVE: 'REMOVE',//此节点被移除
    ATTRS: "ATTRS",//属性被改变
    TEXT: "TEXT",//文本内容被改变
    REPLACE: "REPLACE", //节点要被整个替换  
    setAttr(element, attr, value) {
        switch (attr) {
            case 'style':
                element.style.cssText = value;
                break;
            case 'value':
                let tagName = element.tagName.toLowerCase();
                if (tagName == 'input' || tagName == 'textarea') {
                    element.value = value;
                } else {
                    element.setAttribute(attr, value);
                }
                break;
            default:
                element.setAttribute(attr, value);
                break;
        }

    },
    type(obj) {
        // [object String]
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    },
    isString(str) {
        return utils.type(str) == 'String';
    }
}
module.exports = utils;