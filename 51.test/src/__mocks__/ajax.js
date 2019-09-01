function ajax(url, success) {
    setTimeout(function () {
        success({
            code: 0,
            users: [
                { name: 'zfpx1' },
                { name: 'zfpx2' },
                { name: 'zfpx3' }
            ]
        });
    }, 1000);
}
module.exports = ajax;