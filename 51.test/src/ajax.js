function ajax(url, success) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            let data = JSON.parse(xhr.responseText);
            success && success(data);
        }
    }
    xhr.send(null);
}
module.exports = ajax;