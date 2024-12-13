import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;