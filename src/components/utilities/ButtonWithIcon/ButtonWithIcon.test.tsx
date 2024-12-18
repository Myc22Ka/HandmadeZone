import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonWithIcon, { IButtonWithIcon } from './ButtonWithIcon';
import { describe, expect, it, vi } from 'vitest';
import '@/utils';

vi.mock('@/components/auth/Login', () => ({
    buttons: {
        getRandom: () => ({ value: 'Test Button', Icon: () => <svg data-testid="icon" /> }),
    },
}));

import { buttons } from '@/components/auth/Login';

describe('ButtonWithIcon', () => {
    it('should render the button with the correct text and icon', () => {
        const props = buttons.getRandom({ value: 'Mock Button', Icon: () => <svg data-testid="icon" /> });

        render(<ButtonWithIcon {...props} />);

        // Verify the button text
        const button = screen.getByRole('button', { name: props.value });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(props.value);

        // Verify the icon
        const icon = screen.getByTestId('icon');
        expect(icon).toBeInTheDocument();
    });

    it('should handle dynamic icon and text values', () => {
        const TestIcon = () => <svg data-testid="test-icon" />;
        const props: IButtonWithIcon = {
            value: 'Dynamic Button',
            Icon: TestIcon,
        };

        render(<ButtonWithIcon {...props} />);

        // Verify the text and icon
        const button = screen.getByRole('button', { name: /dynamic button/i });
        expect(button).toBeInTheDocument();
        const icon = screen.getByTestId('test-icon');
        expect(icon).toBeInTheDocument();
    });
});
