import React from 'react';
import './scss/App.scss';
import { routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes, {
    future: {
        // v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
});

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
