import React from 'react';
import Home from './views/HomePage/Home';
import ErrorPage from './views/ErrorPage/ErrorPage';
import { RouteObject } from 'react-router';
import Login from './components/auth/Login';
import SingUp from './components/auth/SignUp';
import ProtectedRoute from './views/ProtectedRoute/ProtectedRoute';
import Offers from './views/OffersPage/Offers';
import ProductSection from './views/Dashboard/ProductsSection';
import UserPanel from './views/Dashboard/ProfileSection';
import OptionSection from './views/Dashboard/OptionSection';
import HistorySection from './views/Dashboard/HistorySection';
import OfferDetails from './views/OffersPage/OfferDetails';
import ShoppingCart from './views/ShoppingCart/ShoppingCart';
import AuctionSection from './views/Dashboard/AuctionSection';

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
        path: 'offers/details/:id',
        element: <OfferDetails />,
    },
    {
        path: 'offers/category/:category',
        element: <Offers />,
    },
    {
        path: 'offers',
        element: <Offers />,
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
            { path: 'dashboard/youroffers', element: <ProductSection /> },
            { path: 'dashboard/auction', element: <AuctionSection /> },
            { path: 'dashboard/profile', element: <UserPanel /> },
            { path: 'dashboard/settings', element: <OptionSection /> },
            { path: 'dashboard/history', element: <HistorySection /> },
            { path: 'cart', element: <ShoppingCart /> },
            // Add more protected routes here
        ],
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
];
