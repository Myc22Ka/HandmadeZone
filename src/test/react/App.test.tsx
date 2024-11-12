import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '../../App';
import { MemoryRouter, Route, Routes } from 'react-router';
import { screen } from '@testing-library/react';

type TestCase = {
    path: string;
    expectedText: RegExp;
};

const testCases: TestCase[] = [
    { path: '/', expectedText: /home/i },
    { path: '/user/1', expectedText: /id: 1/i },
    { path: '/user/2', expectedText: /id: 2/i },
];

describe('App Routing', () => {
    testCases.forEach(({ path, expectedText }) => {
        test(`navigates to ${path} and finds expected text`, async () => {
            render(
                <React.Fragment>
                    <MemoryRouter initialEntries={[path]}>
                        <Routes>
                            <Route path="/*" element={<App />} />
                        </Routes>
                    </MemoryRouter>
                </React.Fragment>
            );

            expect(screen.getByText(expectedText)).toBeInTheDocument();
        });
    });
});
