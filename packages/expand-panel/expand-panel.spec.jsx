// @vitest-environment jsdom

import React from 'react';
import { ExpandPanel } from './ExpandPanel';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('expandPanel', () => {
    it('should work', () => {
        const rendered = render(<ExpandPanel />);
        expect(rendered.getByText('expand-panel')).not.toBeNull();
    });
});
