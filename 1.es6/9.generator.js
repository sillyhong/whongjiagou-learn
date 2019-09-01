/**
 * 生成器(Generator)与迭代器(Iterator)
 * 它是理解koa的基础，另外也是现代异步解决方案async await的基础
 */
/**
 * read生成器 用来生成迭代器的
 */
function read(books){
   let index = 0;
   return {
      next(){
        //只要能取到就为false,取不到值才为true
        let done = index==books.length;
        let value = done?undefined:books[index++];
        return {
          value,
          done
        }
      }
   }
}
//迭代器可以不停的调用next方法得到一个结果{value,done}
//当done为true的时候就表示取完了
let it = read(['js','node','mysql']);
//it有一个方法叫next,每次调用next都会返回一个结果 {value,done}
let result ;
do{
  result = it.next();
  console.log(result);
}while(!result.done);
