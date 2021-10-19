// __tests__/ReviewMenuItemScreen-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import ReviewMenuItemScreen from '../screens/createmenu/ReviewMenuItemScreen';
import {shallow} from "react-native/jest/renderer";


test('renders correctly', () => {
    const reviewMenuItem = renderer.create(<ReviewMenuItemScreen route={{params : {title: 'hotdog', price: 10, description: 'tasty hotdog', optionLists: []}}}/>).toJSON();
    expect(reviewMenuItem).toMatchSnapshot();
});

test('state changes correctly', () => {
    const wrapper = shallow(<ReviewMenuItemScreen props={{navigation: '', route: {params : {title: 'hotdog', price: 10, description: 'tasty hotdog', optionLists: []}}}}></ReviewMenuItemScreen>)
    //maybe use button to navigate to reviewmenuitemscreen to simulate click?
    expect(wrapper.state).toEqual({ title: 'hotdog', price: 10, currentPrice: 10, quantity: 1, notes: '', options: ''});

});
