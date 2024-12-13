import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';
import { CarouselDApiDemo } from '@/layouts/Carousel';

const Home: React.FC = () => {
    return (
        <DefaultLayout>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    height: '100vh',
                    alignItems: 'center',
                    justifyItems: 'center',
                }}
            >
                <div></div>
                <div></div>
                <div></div>

                <div></div>
                <div>
                    <CarouselDApiDemo />
                </div>
                <div></div>

                <div></div>
                <div></div>
                <div></div>
            </div>
        </DefaultLayout>
    );
};

export default Home;
