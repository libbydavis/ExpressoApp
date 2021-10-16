import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import PickupTimePicker from '../components/PickupTime';

test('renders correctly', () => {
  let orderTime = '';
  const handleOrderTime = (time) => {orderTime = time};
  const hidePickerVisibility = false;
  const openingHours = new Date().setHours(15, 0, 0);
  const closingHours = new Date().setHours(21, 0, 0);

  const tree = renderer.create(<PickupTimePicker hidePickerVisibility={hidePickerVisibility} handleOrderTime={handleOrderTime} />).toJSON();
  expect(tree).toMatchSnapshot();
});