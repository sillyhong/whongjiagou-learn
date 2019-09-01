let yargs = require('yargs');
let Server = require('../src/app.js');
let argv = yargs.option('d', {
    alias: 'root',
    demand: 'false',
    type: 'string',
    default: process.cwd(),
    description: '静态文件根目录'
}).option('o', {
    alias: 'host',
    demand: 'false',
    default: 'localhost',
    type: 'string',
    description: '请配置监听的主机'
}).option('p', {
    alias: 'port',
    demand: 'false',
    type: 'number',
    default: 8080,
    description: '请配置端口号'
})
    .usage('zf-server2 [options]')
    .example(
    'zf-server2 -d / -p 9090 -o localhost', '在本机的9090端口上监听客户端的请求'
    ).help('h').argv;

// argv = {d,root,o,host,p,port}
let server = new Server(argv);
server.start();

//zf-server2
//命令行中的命令指向了npm目录bat文件，而 bat文件又指向了当前目录 的www文件