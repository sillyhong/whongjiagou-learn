let dom = require('./dom');
// test('remove', () => {
//     document.body.innerHTML = '<div id="container"><span id="hello">hello<span></div>';
//     let hello = document.querySelector('#hello');
//     expect(hello.nodeName.toLowerCase()).toBe('span');
//     dom.remove(hello);
//     let hello2 = document.querySelector('#hello');
//     expect(hello2).toBeNull();
// });

test('on', () => {
    document.body.innerHTML = '<button id="clickMe">click</button>';
    let clickMe = document.querySelector('#clickMe');
    dom.on(clickMe, 'click', () => {
        clickMe.innerHTML = 'clicked';
    });
    expect(clickMe.innerHTML).toBe('click');
    clickMe.click();//模拟按钮点击 
    expect(clickMe.innerHTML).toBe('clicked');
});