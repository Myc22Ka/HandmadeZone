import React from 'react';
import { Link } from 'react-router-dom';
import useUsers from '@/hooks/api/useUsers';
import { User } from '@/interfaces/UserInterface';

const UserList: React.FC = () => {
    const { data, loading, error } = useUsers<User[]>();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Users</h1>
            {data?.map(user => {
                return (
                    <div key={user.id}>
                        <div>{user.id}</div>
                        <div>{user.name}</div>
                        <div>{user.age}</div>
                        <div>{user.email}</div>
                    </div>
                );
            })}
            <div>
                <Link to="/">Go Back</Link>
            </div>
        </div>
    );
};

export default UserList;
