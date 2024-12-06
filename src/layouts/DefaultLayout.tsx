import React from 'react';
import Footer from './Footer';
import Main from './Main';
import Navbar from './Navbar';

const DefaultLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Main />
            <Footer />
        </div>
    );
};

export default DefaultLayout;
