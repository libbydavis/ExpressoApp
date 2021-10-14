// __tests__/ReviewMenuItem-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import QuantityInput from '../components/QuantityInput';
import handlePlus from '../components/QuantityInput';


test('renders correctly', () => {
    const quanInput = renderer.create(<QuantityInput />).toJSON();
    expect(quanInput).toMatchSnapshot();
});

describe('quantity add', () => {
    it('test add', () => {
        const quanInputAdd = renderer.create(<QuantityInput initialQuantity={5} />).toJSON();
        expect(handlePlus().toBe(6));
    })
})
