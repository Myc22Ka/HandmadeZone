import React from 'react';
import './scss/App.scss';
import { routerConfig, routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeProvider';
import './utils';

export const router = createBrowserRouter(routes, routerConfig);

const App: React.FC = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </ThemeProvider>
    );
};

export default App;
