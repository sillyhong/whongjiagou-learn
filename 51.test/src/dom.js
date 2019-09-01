function remove(node) {
    node.parentNode.removeChild(node);
}

function on(node, type, callback) {
    node.addEventListener(type, callback);
}
exports.remove = remove;
exports.on = on;