import React from 'react';
import './scss/App.scss';
import { routerConfig, routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const router = createBrowserRouter(routes, routerConfig);

const App: React.FC = () => <RouterProvider router={router} future={{ v7_startTransition: true }} />;

export default App;
