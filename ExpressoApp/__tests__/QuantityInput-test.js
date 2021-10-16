// __tests__/QuantityInput-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import QuantityInput from '../components/QuantityInput';
import handlePlus from '../components/QuantityInput';
import handleMinus from '../components/QuantityInput';
import quantity from '../components/QuantityInput';
import {shallow} from "react-native/jest/renderer";


test('renders correctly', () => {
    const quanInput = renderer.create(<QuantityInput initialQuantity={5}/>).toJSON();
    expect(quanInput).toMatchSnapshot();
});


describe('quantity add and minus', () => {
    it('test add and minus', () => {
        handlePlus()
        expect(quantity.toBe(2));
        handleMinus()
        expect(quantity.toBe(1));
    })
})


