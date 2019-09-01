let http = require('http');
let options = {
    url: 'http://localhost',
    port: 8080,
    path: '/public/bytes.txt',
    method: 'GET',
}
let pause = false;
let fs = require('fs');
let path = require('path');
let out = fs.createWriteStream(path.join(__dirname, 'download.txt'));
process.stdin.on('data', function (data) {
    if (data.toString().startsWith('p')) {
        pause = true;
    } else if (data.toString().startsWith('r')) {
        pause = false;
        download();
    }
});
let start = 0;
function download() {
    options.headers = {
        "Range": `bytes=${start}-${start + 10}`
    }
    start += 10;
    let req = http.get(options, function (response) {
        let result = [];
        response.on('data', function (data) {
            result.push(data);
        });
        response.on('end', function () {
            let r = Buffer.concat(result);
            //process.stdout.write(r.toString());
            out.write(r);
            if (start < 100 && pause == false) {
                setTimeout(function () {
                    download();
                }, 1000);
            }

        });
    });
    req.end();
}
download();
