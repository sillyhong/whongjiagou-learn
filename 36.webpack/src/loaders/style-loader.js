//创建一个 style标签并插入页面 
module.exports = function (source) {
    let script = (`
      let style = document.createElement("style");
      style.innerText = ${JSON.stringify(source)};
      document.head.appendChild(style);
   `);
    return script;
}