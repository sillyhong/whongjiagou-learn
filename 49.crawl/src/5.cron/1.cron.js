const CronJob = require('cron').CronJob;
//定义一个任务，1参数是任务的执行时机 2参数是任务定义
// * * * * * *  秒 分钟 小时 日期 月 星期
// * 代表任意值
// ,代表枚举值
// - 代表范围 20-30
// / 代表每隔多少一次
const job = new CronJob('*/10 * * * * *', function () {
    console.log(new Date().toLocaleTimeString());
});
job.start();