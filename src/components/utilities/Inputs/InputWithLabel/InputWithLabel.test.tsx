import React from 'react';
import { render, screen } from '@testing-library/react';
import InputWithLabel, { error, LabelTypes } from './InputWithLabel';
import { describe, expect, it } from 'vitest';
import '@/utils';

const length = 100;

const generateName = () => {
    return String().toRandomString(Math.floor(Math.random() * length));
};

describe('InputWithLabel Component', () => {
    it('should include all valid LabelTypes', () => {
        LabelTypes.forEach(type => {
            const name = generateName();
            render(<InputWithLabel name={name} type={type} />);

            // Verify the label
            const label = screen.getByText(name.toTitleCase());
            expect(label).toBeInTheDocument();

            // Verify the input
            const input = screen.getByPlaceholderText(name.toTitleCase());
            expect(input).toBeInTheDocument();
            expect(input).toHaveAttribute('type', type);
            expect(input).toHaveAttribute('id', name);
        });
    });

    it('should not render for empty name', () => {
        expect(() => {
            render(<InputWithLabel name="" type="text" />);
        }).toThrowError(error);
    });
});
