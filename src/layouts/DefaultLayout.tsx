import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
//import Carousel from './Carousel';

interface IDefaultLayout {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-grow">{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
