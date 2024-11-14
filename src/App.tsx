import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/App.scss';
import Home from './pages/Home';
import User from './pages/User';
import UserList from './components/UserList';

const App: React.FC = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user/:id" element={<User />} />
        <Route path="users" element={<UserList />} />
    </Routes>
);

export default App;
