//封装了一个方法，此方法接收了三个参数
//1参数请求的URL地址 2参数是UL容器的ID 3参数是成功的回调
let ajax = require('./ajax');
function getUsers(url, id, callback) {
    ajax(url, (res) => {
        if (res.code == 0) {
            let users = res.users;
            let html = users.map(user => `<li>${user.name}</li>`).join('');
            document.getElementById(id).innerHTML = html;
            callback();
        }
    });
}
module.exports = getUsers;