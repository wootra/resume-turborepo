import React from 'react';
import { expect } from 'vitest';
import { prettyDOM, render } from '@testing-library/react';
import SvgDesigner from './svg-designer';

test('renders Viewport Tool', () => {
    const { getByText } = render(<SvgDesigner />);
    const linkElement = getByText(/Viewport Tool/i);
    // console.log(prettyDOM(linkElement));
    expect(linkElement).toBeTruthy();
});
