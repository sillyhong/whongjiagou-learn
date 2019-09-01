let Tab = require('./Tab');
const fs = require('fs');
const path = require('path');
test('tab', () => {
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, 'tab.html'));
    new Tab({
        id: 'tab',
        button: "tab-button",
        panel: "tab-panel"
    });
    let tab = document.getElementById('tab');
    let buttons = tab.querySelectorAll('.tab-button');
    let panels = tab.querySelectorAll('.tab-panel');
    expect(buttons[0].style.backgroundColor).toBe('red');
    expect(panels[0].style.display).toBe('block');
    buttons[1].click();
    expect(buttons[0].style.backgroundColor).toBe('');
    expect(panels[0].style.display).toBe('none');
    expect(buttons[1].style.backgroundColor).toBe('red');
    expect(panels[1].style.display).toBe('block');
});