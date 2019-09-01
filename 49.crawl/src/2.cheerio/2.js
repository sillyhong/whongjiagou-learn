const cheerio = require('cheerio');
const html = `
<ul id="fruit">
   <li>Apple</li>
   <li class="favorite">Banana</li>
   <li class="favorite">Peach</li>
</ul>
`;
let $ = cheerio.load(html);
let fruit = $('#fruit');
let favoriteFruits = fruit.children().filter((index, item) => $(item).hasClass('favorite'));
console.log(favoriteFruits.length);
////let lis = fruit.find('li');
//console.log(lis.length);
//let fruits = [];
// lis.each((index, li) => {
//     fruits.push($(li).text());
// });

// console.log(fruits);
//console.log(lis.first().text());
//console.log(lis.last().text());
//console.log(lis.eq(-2).text());
//children 取的是直接子元素，也就是亲儿子
//find是后代元素
//console.log(fruit.children().length);
