function defineReactive(data) { // 修改原有set方法
    return new Proxy(data, {
        set(target, key, value) {
            if (target[key] !== value) { // 如果俩值相等 那好就不要更新了
                console.log(key, '更新数据');
                return Reflect.set(target, key, value); //采用默认方式
            }
        }
    })
}
class Zhufeng {
    constructor(options) {
        this._data = options.data;
        this.data = defineReactive(this._data); //  先将最外层进行代理
        function o(data) { // {name:{a:1}}
            for (let key in data) { // key是name
                let val = data[key];
                if (typeof val === 'object') { // {a:1}应该让这个对象也被代理
                    o(val); // 如果是对象继续拦截
                    data[key] = defineReactive(val); // 将代理的方法替换掉原有的内容
                }
            }
        }
        o(this.data); //循环里面的是不是对象，将其依次代理给
    }
}
let zf = new Zhufeng({
    el: '#app',
    data: { name: { a: 1 }, b: 2, c: 3, d: { name: 1 } }
});
zf.data.d.name = 100;