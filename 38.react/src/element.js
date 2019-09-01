let utils = require('./utils');
/**
 * 1.标签类型 h1 div
 * 2.属性 className id 
 * 3.子元素 可能是一个数组
 */
class Element {
    //标签名 属性对象 子元素数组
    constructor(tagName, attrs, children) {
        this.tagName = tagName;
        this.attrs = attrs;
        this.children = children || [];
    }
    //把一个虚拟的DOM节点渲染成一个真实的DOM节点
    render() {
        //创建一个真实的DOM节点
        let element = document.createElement(this.tagName);
        //给此真实的DOM元素节点增加属性
        for (let attr in this.attrs) {
            utils.setAttr(element, attr, this.attrs[attr]);
        }
        //先序深度遍历
        this.children.forEach(child => {
            //如果子节点是一个元素的话，就调用它的render方法创建子节点的真实DOM，如果是一个字符串的话，创建一个文件节点就可以了
            let childElement = (child instanceof Element) ? child.render() : document.createTextNode(child);
            element.appendChild(childElement);
        });
        return element;
    }
}
function createElement(tagName, attrs, children) {
    return new Element(tagName, attrs, children);
}
module.exports = { createElement };