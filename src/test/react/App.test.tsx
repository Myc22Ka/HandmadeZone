import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { describe, expect, test } from 'vitest';
import { routes, routerConfig } from '@/routes';
import { createMemoryRouter } from 'react-router-dom';

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
