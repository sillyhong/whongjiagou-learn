const request = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs')
const html2md = require('./html2md.js').html2md
//1.请求一次，获取所有文章地址
//2。请求每一个文章地址，保存对应的markdown body内容
//3.使用turndown插件将html内容转换为markdown内容
//4.将转换的markdown内容输出为md文件，并命名为正确的名字

let articleName = []

const fetchArticleList =  async () => {
    var options = {
        uri: 'http://www.zhufengpeixun.cn/ahead/html/62.1.react-basic.html#t125.1%20%E5%87%BD%E6%95%B0(%E5%AE%9A%E4%B9%89%E7%9A%84)%E7%BB%84%E4%BB%B6',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    const articleArray = []
    
    const urlPre = 'http://www.zhufengpeixun.cn/ahead/html/'

    
    return await  request(options).then(($)=>{
        // console.log('$', $)
        $('.nav ul').children().each((index, item) => {
            // console.log('item', $(item).html())
            var href = $(item).children().text()
            // console.log('href',href)
            const url = index === 0 ? 'http://www.zhufengpeixun.cn/ahead/index.html': urlPre + encodeURIComponent(href)  + '.html'
            articleArray.push(url)
            articleName.push(encodeURIComponent(href))
        })
        // console.log('articleArray', articleArray)
        return  articleArray
        // const html =  $('.page-toc').html()
        // console.log('html', html)
    }).catchThrow(err=>{
        console.log('err',err )
    })
}


const fetchHtmlBody = async (uri) => {
    console.log('uri',uri)
    var options = {
        uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    return request(options).then($ => {
        // const htmlBody = $('.warpper .content').html()
        const htmlBody = $('.warpper .content')
        removeHref($, htmlBody)
        // const a = $(htmlBody).find('h2 a')
        // $(a).each((index, item)=>{
        //     $(item).remove()
        // })
        const currentHtmlBody = htmlBody.html()
        // console.log('htmlBody', htmlBody.html().substring(0, 100))
        return currentHtmlBody
    }).catch(err=>{
        console.log('err', err.statusCode)
    })
}
const removeHref = ($, htmlBody) => {
    const arr = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    arr.map(item=>{
        const a = $(htmlBody).find(`${item} a`)
        // console.log('title', title)
        a && $(a).each((index, item)=>{
            $(item).remove()
        })
    })
    
}

const test = (async () => {
   let result =  await fetchArticleList()
   console.log('result', result.length)
   console.log('articleName', articleName.length)
   //143
   result = result.slice(104)
   articleName= articleName.slice(104)
//    console.log('result',result[0])
   for(let i = 0; i < result.length; i++){
     const htmlBody =  await fetchHtmlBody(result[i])
    //  console.log('htmlBody', htmlBody)
     let markdown = html2md(htmlBody)
    //  markdown = '[Toc] \n' + markdown
    //  console.log('markdown', markdown)
     console.log(`markdown/${articleName[i]}.md`, 'i', i)
    fs.writeFileSync(`markdown/${articleName[i]}.md`, markdown,'utf-8', (err, data)=>{
        if(err){
            console.err('err', err)
        }
    })
     
   }
})()


