import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Params extends Record<string, string> {
    id: string;
}

const Users: React.FC = () => {
    const { id } = useParams<Params>();

    return (
        <div>
            <h1>User Page</h1>
            <p>ID: {id}</p>
            <div>
                <Link to="/">Go Back</Link>
            </div>
            <div>
                <Link to="/users">Check user 1</Link>
            </div>
        </div>
    );
};

export default Users;
