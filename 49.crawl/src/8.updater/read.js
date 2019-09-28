const request = require('request-promise');
const cheerio = require('cheerio');
const debug = require('debug')('juejin:task:read');


//获取标签列表 #
 exports.tagList  =  async function tagList(uri) {
    debug('读取文章标签列表');
    let options = {
        uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
    return request(options).then($ => {
        let tags = [];
        $('.item').each((i, item) => {
            let tag = $(item);
            let image = tag.find('div.thumb').first();
            let title = tag.find('.title').first();
            let subscribe = tag.find('.subscribe').first();
            let article = tag.find('.article').first();
            let name = title.text().trim();
            tags.push({
                image: image.data('src').trim(),
                name,
                url: `https://juejin.im/tag/${encodeURIComponent(title.text().trim())}`,
                subscribe: Number(subscribe.text().match(/(\d+)/)[1]),
                article: Number(article.text().match(/(\d+)/)[1])
            });
            debug(`读取文章标签:${name}`);
        });
        return tags;
        // return tags.slice(0, 2);
    });
}


//文章列表
exports.articleList =  async function articleList(uri) {
    debug('读取博文列表');
    let options = {
        uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
    return request(options).then(async $ => {
        let articleList = [];
        // let items = $('.item .title');
        let items = $('.info-box .title-row .title');
        // console.log('items', items.html())
        // for (let i = 0; i < items.length; i++) {
        for (let i = 0; i < 10; i++) {
            let article = $(items[i]);
            let href = article.attr('href').trim();
            console.log('href',  href)
            let title = article.text().trim();
            let id = href.match(/\/(\w+)$/) ? href.match(/\/(\w+)$/)[1] : 'unkown';
            if(id == 'unkown'){ continue}
            href = 'https://juejin.im' + href;
            let articleDetail = await readArticle(id, href);
            articleList.push({
                href,
                title,
                id,
                content: articleDetail.content,
                tags: articleDetail.tags
            });
            // debug(`读取文章列表:${title}`);
        }
        return articleList;
    });
}
// tagList('https://juejin.im/subscribe/all').then((res)=>{debug(res)})
// articleList('https://juejin.im/tag/%E5%89%8D%E7%AB%AF').then((res)=>{})

//文章详情
 async function readArticle(id, uri) {
    debug('读取博文');
    let options = {
        uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
    return request(options).then($ => {
        let article = $('.main-container');
        let title = article.find('h1').text().trim();
        let content = article.find('.article-content').html();
        let tags = article.find('.tag-list-box>div.tag-list>a.item');
        tags = tags.map((index, item) => {
            // /%E9%9D%A2%E8%AF%95' 需要解码
            let href = decodeURIComponent($(item).attr('href'));
         console.log('====================================');
         console.log('href', href);
         console.log('====================================');
            return href ? href.slice(5) : href;
        })
        tags = Array.prototype.slice.call(tags);
        debug(`读取文章详情:${title}`);
        return {
            id,
            title,
            content,
            tags
        };
    });
}