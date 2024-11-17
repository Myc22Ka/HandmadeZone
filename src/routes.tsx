import React from 'react';
import Home from './views/Home';
import User from './views/User';
import UserList from './components/UserList';
import ErrorPage from './views/ErrorPage/ErrorPage';

interface RouteConfig {
    path: string;
    element: React.ReactNode;
}

export const routes: RouteConfig[] = [
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
