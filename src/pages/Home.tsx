import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to="/user/42">Go to User 42 Page</Link>
        </div>
    );
};

export default Home;
