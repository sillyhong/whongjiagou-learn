export function getName(){
     this.a = '123'
    return 'zfpx';
}
export function getAge(){
    return 9;
}
//代码执行的结果不会被用到 
getName()
// 代码中只会影响死变量，只写不读 
var aabbcc='aabbcc';
aabbcc='eeffgg';