const { query, end } = require('./db');
const debug = require('debug')('juejin:task:write');


exports.tagList = async function (tagList) {
    debug('保存文章标签列表');
    // console.log('tagList', tagList)
    try{
        for (tag of tagList) {
            let oldTags = await query(`SELECT 1 FROM tag WHERE name=? LIMIT 1 `, [tag.name]);
            // console.log('====================================');
            // console.log('oldTags', oldTags);
            // console.log('====================================');
            if (Array.isArray(oldTags) && oldTags.length > 0) {
                let oldTag = oldTags[0];
                await query(`UPDATE tag SET name=?,image=?,url=?, subscribe=?,  article=? WHERE id=?`, [tag.name, tag.image, tag.url, tag.subscribe, tag.article, oldTag.id]);
            } else {
                await query(`INSERT INTO tag(id, name, image, url, subscribe, article) VALUES(?,?,?,?,?,?)`, [tag.id, tag.name, tag.image, tag.url, tag.subscribe, tag.article]);
            }
        }
     }catch(err){
        console.log('保存文章列表tagList 失败', err)
    }
    debug('保存文章标签列表 成功！');
}
exports.articleList = async function (articleList) {
    debug('写入博文列表');
    // debugger;
    try{
        for (article of articleList) {
            console.log('写入博文列表 article',  article.tags )
            let oldArticles = await query(`SELECT 1 FROM articles WHERE id=? LIMIT 1 `, article.id);
            if (Array.isArray(oldArticles) && oldArticles.length > 0) {
                let oldArticle = oldArticles[0];
                await query(`UPDATE articles SET title=?,content=?,href=? WHERE id=?`, [article.title, article.content, article.href, oldArticle.id]);
            } else {
                await query(`INSERT INTO articles(id,title,href,content) VALUES(?,?,?,?)`, [article.id, article.title, article.href, article.content]);
            }
            //处理标签和文章的关系 删除 此文章的所有标签
            await query(`DELETE FROM article_tag WHERE article_id=? `, [article.id]);
            //通过文章的标签名字 查询一下此文章对应标签的ID数组
            const where = "('" + article.tags.join("','") + "')";
            // debug('where', where);
            const sql = `SELECT id FROM tag WHERE name IN ${where}`;
            //tagIds: [{id: 'name1', id: 'name2'}]
            let tagIds = await query(sql);
            console.log('设置博文的标签id为:', tagIds)
            debug('设置博文的标签id为:', tagIds);
            for (row of tagIds) {
                await query(`INSERT INTO article_tag(article_id,tag_id) VALUES(?,?)`, [article.id, row.id]);
            }
        }
    }catch(err){
        console.log('wirte articleList err',err)
    }
}

// exports.tagList([
//     { id: 1, name: 'name1', image: 'image1', url: 'url1', subscribe: 1, article: 1 },
//     { id: 2, name: 'name2', image: 'image2', url: 'url2', subscribe: 2, article: 2 }
// ])

// exports.articleList([
//     {id: '1', title: 'title', content: 'content1', href: '1', tags:: ['name1', 'name2'] },
//     {id: '2', title: 'title', content: 'content2', href: '1', tags:: ['name1', 'name2'] },
// ])