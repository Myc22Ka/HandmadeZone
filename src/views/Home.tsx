import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <ModeToggle />
            <div>
                <Link to="/user/42">Go to User 42 Page</Link>
            </div>
            <div>
                <Link to="/login">Go to Login Page</Link>
            </div>
            <div>
                <Link to="/xd">Go to Error Page</Link>
            </div>
        </div>
    );
};

export default Home;
