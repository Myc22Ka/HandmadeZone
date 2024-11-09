import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/App.scss';
import Home from './pages/Home';
import User from './pages/User';

const App: React.FC = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user/:id" element={<User />} />
    </Routes>
);

export default App;
