import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from '../App'; // Import your actual component

test('renders MyComponent', () => {
    render(<MyComponent />);
});