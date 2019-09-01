// indexOf(子串,pos)
let str = '12**34**56';
console.log(str.indexOf('**', 6));
//'12**34**56'
Buffer.prototype.split = function (sep) {
    let pos = 0;//记录当前是从哪个索引开始查找分隔符
    let len = sep.length;//分隔符的字节长度 2
    let index = -1;//查找到的分隔子串所在的索引
    let parts = [];
    while (-1 != (index = this.indexOf(sep, pos))) {
        parts.push(this.slice(pos, index));
        pos = index + len;
    }
    parts.push(this.slice(pos))
    return parts;
}
let buf = Buffer.from('12**34**56');
console.log(buf)
console.log(buf.split('**'));//["12","34","56"]
