let keyIndex = 0;
let utils = require('./utils');
let allPatches;//这里就是完整的补丁包
function patch(root, patches) {
    allPatches = patches;
    walk(root);
}
function walk(node) {
    let currentPatches = allPatches[keyIndex++];
    (node.childNodes || []).forEach(child => walk(child));
    if (currentPatches) {
        doPatch(node, currentPatches);
    }
}
function doPatch(node, currentPatches) {
    currentPatches.forEach(patch => {
        switch (patch.type) {
            case utils.ATTRS:
                for (let attr in patch.attrs) {
                    let value = patch.attrs[attr];
                    if (value) {
                        utils.setAttr(node, attr, value);
                    } else {
                        node.removeAttribute(attr);
                    }
                }
                break;
            case utils.TEXT:
                node.textContent = patch.content;
                break;
            case utils.REPLACE:
                let newNode = (patch.node instanceof Element) ? path.node.render() : document.createTextNode(path.node);
                node.parentNode.replaceChild(newNode, node);
                break;
            case utils.REMOVE:
                node.parentNode.removeChild(node);
                break;
        }
    });
}
module.exports = patch;