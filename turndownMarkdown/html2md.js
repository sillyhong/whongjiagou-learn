var TurndownService = require('turndown')
var tables = require('turndown-plugin-gfm').tables
var turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    Fence: '```',
    linkStyle: 'inlined',
    codeBlockStyle: 'fenced',
})
turndownService.use(tables)
const html2md = (htmlBody) => {
    var markdown = turndownService.turndown(htmlBody)
    // console.log('markdown', markdown)
    return markdown
}

module.exports = {
    html2md
}