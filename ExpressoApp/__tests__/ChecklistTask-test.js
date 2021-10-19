// __tests__/ChecklistTask-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import ChecklistTask from '../components/ChecklistTask';


test('renders correctly', () => {
    const checklistTask = renderer.create(<ChecklistTask text={"apple"}/>).toJSON();
    expect(checklistTask).toMatchSnapshot();
});
