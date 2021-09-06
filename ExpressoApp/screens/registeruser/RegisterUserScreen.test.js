import React from 'react';
import {View} from 'react-native';
import 'jest';
import RegisterUserScreen from './RegisterUserScreen';

test('User input is incorrect and logs error', () => {
  const tree = renderer.create(<RegisterUserScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('User input is correct and attempts ' +
    'register as new user and succeeds', () => {

});

test('User input is correct and attempts ' +
    'register as an old user and fails', () => {

});
