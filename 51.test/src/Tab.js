class Tab {
    constructor(options) {
        let { id, button, panel } = options;
        let tab = this.tab = document.getElementById(id);
        let buttons = this.buttons = Array.from(tab.querySelectorAll('.' + button));
        let panels = this.panels = Array.from(tab.querySelectorAll('.' + panel));
        this.select(0);
        this.bindEvent();
    }
    select(current) {
        this.buttons.forEach((item, index) => {
            if (current == index) {
                item.style.backgroundColor = 'red';
                this.panels[index].style.display = 'block';
            } else {
                item.style.backgroundColor = '';
                this.panels[index].style.display = 'none';
            }
        });
    }
    bindEvent() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener('click', () => {
                this.select(i);
            });
        }
    }
}
module.exports = Tab;