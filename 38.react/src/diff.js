let utils = require('./utils');

let keyIndex = 0;
function diff(oldTree, newTree) {
    //记录差异的空对象。key就是老节点在原来虚拟DOM树中的序号，值就是一个差异对象数组
    let patches = {};
    keyIndex = 0;
    let index = 0;
    walk(oldTree, newTree, index, patches);
    return patches;
}
//遍历
//REMOVE: 'REMOVE',//此节点被移除
//ATTRS: "ATTRS",//属性被改变
//TEXT: "TEXT",//文本内容被改变
//REPLACE: "REPLACE", //节点要被整个替换  
function walk(oldNode, newNode, index, patches) {
    let currentPatches = [];//这个数组里记录了所有的oldNode的变化
    if (!newNode) {//如果新节点没有了，则认为此节点被删除了
        currentPatches.push({ type: utils.REMOVE, index });
        //如果说老节点的新的节点都是文本节点的话
    } else if (utils.isString(oldNode) && utils.isString(newNode)) {
        //如果新的字符符值和旧的不一样
        if (oldNode != newNode) {
            ///文本改变 
            currentPatches.push({ type: utils.TEXT, content: newNode });
        }
    } else if (oldNode.tagName == newNode.tagName) {
        //比较新旧元素的属性对象
        let attrsPatch = diffAttr(oldNode.attrs, newNode.attrs);
        //如果新旧元素有差异 的属性的话
        if (Object.keys(attrsPatch).length > 0) {
            //添加到差异数组中去
            currentPatches.push({ type: utils.ATTRS, attrs: attrsPatch });
        }
        //自己比完后再比自己的儿子们
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatches);
    } else {
        currentPatches.push({ type: utils.REPLACE, node: newNode });
    }
    if (currentPatches.length > 0) {
      patches[index] = currentPatches;
    }
}
//老的节点的儿子们 新节点的儿子们 父节点的序号 完整补丁对象 当前旧节点的补丁对象
function diffChildren(oldChildren, newChildren, index, patches, currentPatches) {
    oldChildren.forEach((child, idx) => {
        walk(child, newChildren[idx], ++keyIndex, patches);
    });
}
function diffAttr(oldAttrs, newAttrs) {
    let attrsPatch = {};
    for (let attr in oldAttrs) {
        //如果说老的属性和新属性不一样。一种是值改变 ，一种是属性被删除 了
        if (oldAttrs[attr] != newAttrs[attr]) {
            attrsPatch[attr] = newAttrs[attr];
        }
    }
    for (let attr in newAttrs) {
        if (!oldAttrs.hasOwnProperty(attr)) {
            attrsPatch[attr] = newAttrs[attr];
        }
    }
    return attrsPatch;
}
module.exports = diff;