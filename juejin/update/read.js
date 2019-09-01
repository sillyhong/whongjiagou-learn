/**
 * 此文件用来读取远程接口的数据
 */
const request = require('request-promise');
const cheerio = require('cheerio');
exports.tags = async function (url) {
    let options = {
        url,
        transform(body) {
            return cheerio.load(body);//转成jQuery对象 $
        }
    }
    return request(options).then($ => {
        let infos = $('.item .tag .info-box');
        let tags = [];
        infos.each((index, info) => {
            let tagInfo = $(info);
            let href = tagInfo.children().first().attr('href');
            let image = tagInfo.find('div.thumb').first().data('src');
            let title = tagInfo.find('div.title').first().text();
            let subscribe = tagInfo.find('div.subscribe').first().text();
            let article = tagInfo.find('div.article').first().text();
            tags.push({
                title,
                image,
                href: `https://juejin.im${href}`,
                subscribe: Number(subscribe.match(/^(\d+)/)[1]),
                article: Number(article.match(/^(\d+)/)[1])
            });
        });
        return tags.slice(0, 2);
    });
}

exports.articleList = async function (url) {
    let options = {
        url,
        transform(body) {
            return cheerio.load(body);//转成jQuery对象 $
        }
    }
    return request(options).then(async $ => {
        let articleTitles = $('.info-box .title-row .title');
        let articles = [];
        //在forEach里each里不能使用await方法
        for (let i = 0; i < articleTitles.length; i++) {
            let article = $(articleTitles[i]);
            let href = article.attr('href');
            let title = article.text();
            let id = href.slice(6);
            href = `https://juejin.im${href}`;
            let detail = await articleDetail(href);
            articles.push({
                id,
                href,
                title,
                content: detail.content,
                tags: detail.tags
            });
        }
        return articles;
    });
}

async function articleDetail(url) {
    let options = {
        url,
        transform(body) {
            return cheerio.load(body);//转成jQuery对象 $
        }
    }
    return request(options).then($ => {
        debugger;
        let content = $('.article-content').first().html();
        let tagTitles = $('.tag-list .item .tag-title');
        let tags = [];
        tagTitles.each((index, title) => {
            tags.push($(title).text());
        });
        return {
            content,
            tags
        }
    });

}

// let tagUrl = 'https://juejin.im/subscribe/all';
// exports.tags(tagUrl).then(tags => {
//     console.log(tags);
// });

let articleUrl = 'https://juejin.im/tag/%E5%89%8D%E7%AB%AF';
exports.articleList(articleUrl).then(articles => {
    console.log(articles);
});

// let articleDetailUrl = 'https://juejin.im/post/5b10dd36e51d4506e04cf802';
// exports.articleDetail(articleDetailUrl).then(article => {
//     console.log(article);
// });