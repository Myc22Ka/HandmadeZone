import React from 'react';
import Home from './views/Home';
import User from './views/User';
import UserList from './components/UserList';
import ErrorPage from './views/ErrorPage/ErrorPage';
import { RouteObject } from 'react-router';

export const routerConfig = {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
};

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'user/:id',
        element: <User />,
    },
    {
        path: 'users',
        element: <UserList />,
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
];
