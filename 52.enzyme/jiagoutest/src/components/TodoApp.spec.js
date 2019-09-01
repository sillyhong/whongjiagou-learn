import React, { Component } from 'react';
//shallow表示浅渲染组件，只渲染当前组件，而不渲染子组件
import Enzyme, { mount } from 'enzyme';
import TodoApp from './TodoApp';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import store from '../store';
Enzyme.configure({ adapter: new Adapter() });
describe('TodoApp', function () {
    it('测试标题是不是珠峰待办事项', function () {
        let wrapper = mount(<Provider store={store}>
            <TodoApp />
        </Provider>);
        let h3 = wrapper.find('h3');
        expect(h3.text()).toMatch(/珠峰待办事项/);
    });
    // it('测试删除待办事项', function () {
    //     let wrapper = mount(<Provider store={store}>
    //         <TodoApp />
    //     </Provider>);
    //     let lis = wrapper.find('li');
    //     expect(lis.length).toBe(2);
    //     let buttons = wrapper.find('button');
    //     buttons.at(0).simulate('click');
    //     let remindLis = wrapper.find('li');
    //     expect(remindLis.length).toBe(1);
    // });
    it('测试切换待办事项', function () {
        let wrapper = mount(<Provider store={store}>
            <TodoApp />
        </Provider>);
        let spans = wrapper.find('span');
        let span = spans.at(0);
        expect(span.hasClass('todo')).toBe(true);
        span.simulate('click');
        // setTimeout(() => {
        //     expect(span.hasClass('todo')).toBe(false);
        // }, 100);
    });
    it('增加待办事项', function () {
        let wrapper = mount(<Provider store={store}>
            <TodoApp />
        </Provider>);
        let addBtn = wrapper.find('#addBtn');
        let lis = wrapper.find('li');
        expect(lis.length).toBe(2);
        addBtn.simulate('click');
        setTimeout(() => {
            let lis = wrapper.find('li');
            expect(lis.length).toBe(3);
        }, 100);
    });
});
//集成测试 端到端测试 持续集成