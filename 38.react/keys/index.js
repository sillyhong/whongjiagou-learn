/**
 * 在dom diff中如何识别和处理key
 */
const REMOVE = 'REMOVE';
const INSERT = 'INSERT';
class Element {
    constructor(tagName, key, children) {
        this.tagName = tagName;
        this.key = key;
        this.children = children;
    }
    render() {
        let element = document.createElement(this.tagName);
        element.innerHTML = this.children;
        element.setAttribute('key', this.key);
        return element;
    }
}
function el(tagName, key, children) {
    return new Element(tagName, key, children);
}
let oldChildren = [
    el('li', 'A', 'A'),
    el('li', 'B', 'B'),
    el('li', 'C', 'C'),
    el('li', 'D', 'D')
]
let ul = document.createElement('ul');
oldChildren.forEach(item => ul.appendChild(item.render()));
document.body.appendChild(ul);
let newChildren = [
    el('li', 'C', 'C'),
    el('li', 'B', 'B'),
    el('li', 'D', 'D'),
    el('li', 'E', 'E'),
]
let patches = diff(oldChildren, newChildren);
console.log(patches);//[{type:REMOVE,index:0},{type:INSERT,index:3,{key:'E'}}]
patch(ul, patches);
function patch(root, patches = []) {
    patches.forEach(patch => {
        let oldNode;
        switch (patch.type) {
            case INSERT:
                let newNode = patch.node.render();
                //得到此索引对应的老节点
                oldNode = root.childNodes[patch.index];
                if (oldNode) {
                    root.insertBefore(newNode, oldNode);
                } else {
                    root.appendChild(newNode);
                }
                break;
            case REMOVE:
                oldNode = root.childNodes[patch.index];
                if (oldNode)
                    root.removeChild(oldNode);
                break;
            default:
                throw new Error('没有这种补丁类型');
        }
    });
}
function diff(oldChildren, newChildren) {
    let patches = [];
    let newKeys = newChildren.map(item => item.key);
    //第一步，把老数组在新数组中没有的元素移除掉
    let oldIndex = 0;
    while (oldIndex < oldChildren.length) {
        let oldKey = oldChildren[oldIndex].key;//A
        if (!newKeys.includes(oldKey)) {
            remove(oldIndex);
            oldChildren.splice(oldIndex, 1);
        } else {
            oldIndex++;
        }
    }

    //第二步处理新数组，把该插入的插进去
    oldIndex = 0;
    newIndex = 0;
    while (newIndex < newChildren.length) {
        let newKey = (newChildren[newIndex] || {}).key;
        let oldKey = (oldChildren[oldIndex] || {}).key;
        if (!oldKey) {
            insert(newIndex, newKey);
            newIndex++;
        } else if (oldKey != newKey) {
            insert(newIndex, newKey);
            newIndex++;
        } else {
            oldIndex++;
            newIndex++;
        }
    }
    //把老数组中多余的删除掉
    //while (oldIndex++ < oldChildren.length) {
    //    remove(newIndex);
    //}

    function insert(index, key) {
        patches.push({ type: INSERT, index, node: el('li', key, key) });
    }
    function remove(index) {
        patches.push({ type: REMOVE, index });
    }
    return patches;
}