import React from 'react';
import Home from './views/Home';
import User from './views/User';
import ErrorPage from './views/ErrorPage/ErrorPage';
import { RouteObject } from 'react-router';
import Login from './components/auth/Login';
import SingUp from './components/auth/SignUp';
import Dashboard from './components/auth/Dashboard';
import ProtectedRoute from './views/ProtectedRoute/ProtectedRoute';

export const routerConfig = {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
};

type Routes = RouteObject & {
    unauthenticated?: boolean;
};

export const routes: Routes[] = [
    // Add more unprotected routes here
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'user/:id',
        element: <User />,
    },
    {
        path: 'login',
        element: <Login />,
        unauthenticated: true,
    },
    {
        path: 'signup',
        element: <SingUp />,
        unauthenticated: true,
    },
    {
        path: '/auth',
        element: <ProtectedRoute />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            // Add more protected routes here
        ],
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
];
