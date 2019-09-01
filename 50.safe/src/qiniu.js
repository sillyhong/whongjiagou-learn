let { bucket = 'video', domain = "img.zhufengpeixun.cn", accessKey = 'Vfi5imW04AkxJItuFbbRy1ffH1HIoo17HbWOXw5f', secretKey = 'yru__Na4qIor4-V7U4AOJyp2KBUYEw1NWduiJ4Pb' } = this.options;
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
    scope: bucket,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);
var config = new qiniu.conf.Config();

console.log(compilation.assets);

let promises = Object.keys(compilation.assets).map(asset => upload(asset));
Promise.all(promises).then(function (data) {
    console.log('发布CDN成功!');
});

function upload(filename) {
    return new Promise(function (resolve, reject) {
        var localFile = path.join(__dirname, '../build', filename);
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();
        var key = filename;
        formUploader.putFile(uploadToken, key, localFile, putExtra, function (err, body, info) {
            if (err)
                reject(err);
            else
                resolve(body)
        });
    });
}