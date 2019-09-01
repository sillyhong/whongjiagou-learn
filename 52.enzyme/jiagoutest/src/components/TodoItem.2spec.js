import React, { Component } from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import TodoItem from './TodoItem';
describe('TodoItem', function () {
    it('测试类名', function () {
        let todo = { id: 1, text: '1', completed: false };
        let wrapper = shallow(<TodoItem todo={todo} />);
        let span = wrapper.find('span');
        expect(span.text()).toMatch(new RegExp(todo.text));
        expect(span.hasClass('todo')).toBe(true);
        expect(span.hasClass('todo-completed')).toBe(false);
        span.simulate('click');//模拟有人点击了一下此组件
        // expect(span.hasClass('todo')).toBe(false);
        // expect(span.hasClass('todo-completed')).toBe(true);
    });
});