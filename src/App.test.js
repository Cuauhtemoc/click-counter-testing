import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';
import { wrap } from 'module';

Enzyme.configure({adapter: new EnzymeAdapter() });

const setup = (props={}, state=null) => {
    const wrapper =  shallow(<App {...props}/>)
    if (state) wrapper.setState(state);
    return wrapper;
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'increment-button')
    expect(appComponent.length).toBe(1);
})

test('renders counter display', () =>{
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'counter-display')
    expect(appComponent.length).toBe(1);
})

test('counter starts at 0', () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);
})

test('clicking button increments counter display', () => {
    const counter = 7;
    const wrapper = setup(null, {counter});
    const appComponent = findByTestAttr(wrapper, 'increment-button');
    appComponent.simulate('click')
    wrapper.update();

    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1)


})