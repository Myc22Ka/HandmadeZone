import { useAuth } from '@/contexts/AuthProvider';
import React from 'react';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div>
            <div>Dashboard</div>
            <div>{user?.id}</div>
            <div>{user?.email}</div>
            <div>{user?.age}</div>
            <div>{user?.name}</div>
        </div>
    );
};

export default Dashboard;
