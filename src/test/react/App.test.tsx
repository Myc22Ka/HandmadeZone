import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { describe, expect, test } from 'vitest';
import { routes } from 'src/routes';
import { createMemoryRouter } from 'react-router-dom';
import { routerConfig } from '../../routes';

describe('App Routing', () => {
    test('Renders the Home Page by default', () => {
        const router = createMemoryRouter(routes, {
            ...routerConfig,
            initialEntries: ['/'],
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    });
});
