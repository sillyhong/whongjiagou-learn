let read = require('./read');
let write = require('./write');
(async function () {
    let tagUrl = 'https://juejin.im/subscribe/all';
    //读取掘金的标签列表
    let tags = await read.tags(tagUrl);
    //把标签写到数据库中
    await write.tags(tags);
    let allAricles = {};
    //标签有很多，不同的标签下面的文章可能会重复
    for (tag of tags) {
        let articles = await read.articleList(tag.href);
        articles.forEach(article => allAricles[article.id] = article);
    }
    // {id:article}
    await write.articles(Object.values(allAricles));
    process.exit();
})()