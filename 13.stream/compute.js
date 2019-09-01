function computeNewHighWaterMark(n) {
    //函数名称上看作用好像是判断如果整数n不是2的次方数，就找到他的下一个次方数？，避免用很小的数量增加hwm
    https://zhidao.baidu.com/question/291266003.html
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
    return n;
}
console.log((31).toString(2));
//11111
console.log(computeNewHighWaterMark(64));
console.log(1024*1024*8);