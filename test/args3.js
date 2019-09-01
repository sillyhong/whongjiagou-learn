let argv = require('yargs')
    .option('n', {
        alias: 'name',
        demand: true,
        default: 'zfpx',
        describe: '请输入名称',
        type: 'string',
        boolean: false
    }).usage('Usage: hello [options]')
    .example('hello -n zfpx', 'say hello to zfpx')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2018').argv;
console.log(argv);
