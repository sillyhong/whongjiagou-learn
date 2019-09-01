const cheerio = require('cheerio');
const html = '<h2 class="title">Hello world</h2>';
let $ = cheerio.load(html);
let title = $('h2.title');
title.addClass('welcome');
title.text('ok');
console.log(title.html());
