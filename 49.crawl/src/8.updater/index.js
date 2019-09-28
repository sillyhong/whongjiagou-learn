let read = require('./read');
let write = require('./write');
const debug = require('debug')('juejin:task:index');

(async function () {
    let tagUrl = 'https://juejin.im/subscribe/all';
    //读取掘金的标签列表
    let tags = await read.tagList(tagUrl);
    debug('tags', tags.length)

    //把标签写到数据库中
    await write.tagList(tags);
    let allAricles = {};
    //标签有很多，不同的标签下面的文章可能会重复
    for (tag of tags) {
        debug('tag', tag)
        let articles = await read. articleList(tag.url);
        // debug(articles)
        articles.forEach(article => allAricles[article.id] = article);
    }
    // debug('最后写入的文章')
    // {id:article}
    await write.articleList(Object.values(allAricles));
    process.exit();
})()