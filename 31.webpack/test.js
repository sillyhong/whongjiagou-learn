let res = 0
let index
const test = () => {
    let a = 1
    index++
    res = res + a
    console.log('res', res)
    if(res > 10){
        return res
    }else{
        test.call(this) 
    }
}
console.log('test', test())

//es7语法
// import('./src/info').then(()=>{
//     console.log('hello')
// })