import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import SeparatorWithText from './SeparatorWithText';
import '@/utils';

const length = 100;
const text = String().toRandomString(Math.floor(Math.random() * length));

describe('SeparatorWithText Component', () => {
    afterEach(cleanup);

    it('renders the text inside the separator correctly', () => {
        render(<SeparatorWithText text={text} />);
        expect(screen.getByText(text.toUpperCase())).toBeInTheDocument();
    });

    it('renders the correct number of separators', () => {
        render(<SeparatorWithText text={text} />);
        const separators = screen.getAllByRole('separator');

        expect(separators).toHaveLength(2);
    });

    it('applies the className prop to the root div', () => {
        const customClass = 'custom-class';

        render(<SeparatorWithText text={text} className={customClass} />);

        const rootDiv = screen.getByText(text.toUpperCase()).closest('div');
        expect(rootDiv).toHaveClass(customClass);
    });

    it('renders the text in uppercase', () => {
        render(<SeparatorWithText text={text} />);
        expect(screen.getByText(text.toUpperCase())).toBeInTheDocument();
    });
});
