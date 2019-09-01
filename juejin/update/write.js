const { query } = require('../db');
//此方法用于把标签数组保存到MYSQL数据库中
exports.tags = async function (tags) {
    for (tag of tags) {
        let oldTags = await query(`SELECT * FROM tags WHERE name = ?`, [tag.title]);
        if (Array.isArray(oldTags) && oldTags.length > 0) {
            await query(`UPDATE tags SET image=?,subscribe=?,article=?,href=? WHERE id=?`
                , [tag.image, tag.subscribe, tag.article, tag.href, oldTags[0].id]);
        } else {
            await query(`INSERT INTO tags(name,image,subscribe,article,href) VALUES(?,?,?,?,?)`,
                [tag.title, tag.image, tag.subscribe, tag.article, tag.href]);
        }
    }
}

exports.articles = async function (articles) {
    for (article of articles) {
        let oldArticles = await query(`SELECT * FROM articles WHERE id=?`, [article.id]);
        if (oldArticles.length > 0) {
            await query(`UPDATE articles SET title=?,content=?,href=? WHERE id=?`,
                [article.title, article.content, article.href, article.id]);
        } else {
            await query(`INSERT INTO articles(id,title,content,href) values(?,?,?,?)`,
                [article.id, article.title, article.content, article.href]);
        }
        //处理文章标签关系,很删除 此文章所有的标签
        await query(`DELETE FROM article_tag WHERE article_id=?`, [article.id]);
        //查询一下此文章对应标签的ID数组
        //article.tags=  ['title1', 'title2']
        //'title1','title2'
        let tagWhere = "'" + article.tags.join("','") + "'";
        let tagIds = await query(`SELECT id FROM tags WHERE name IN (${tagWhere})`);
        // [{id:1},{id:2}]
        for (tagId of tagIds) {
            debugger;
            await query(`INSERT INTO article_tag(article_id,tag_id) VALUES(?,?)`,
                [article.id, tagId.id]);
        }
    }
}
// exports.tags([
//     { title: 'title1', image: 'image11', subscribe: 11, article: 11 },
//     { title: 'title2', image: 'image21', subscribe: 22, article: 22 }
// ]);

// exports.articles([
//     {
//         id: 'id1', title: 'title11', content: 'content11', href: 'href11',
//         tags: ['title1']
//     },
//     {
//         id: 'id2', title: 'title22', content: 'content22', href: 'href22',
//         tags: ['title2']
//     }
// ]);