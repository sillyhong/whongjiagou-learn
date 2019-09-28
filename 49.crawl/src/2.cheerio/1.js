const cheerio = require('cheerio');
const html = '<h2 class="title">Hello world</h2>';
let $ = cheerio.load(html);
let title = $('h2.title');
// console.log('title', title)
console.log($.html())
// console.log('title', Object.prototype.toString([123]))
title.addClass('welcome');
title.text('ok');
console.log(title.text());
console.log(title.html());
