import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';
import { CarouselDApiDemo } from '@/layouts/Carousel';

const Home: React.FC = () => {
    const imagesSet1 = ['/src/assets/imgs/texture-1909992_1280.jpg', '/src/assets/imgs/deer-3275594_1280.jpg'];

    const imagesSet2 = ['/src/assets/imgs/leaves-7463742_1280.png', '/src/assets/imgs/monster-4271569_1280.png'];

    const imagesSet3 = ['/src/assets/imgs/strawberries-7249448_1280.jpg', '/src/assets/imgs/monstera-7687340_1280.jpg'];

    return (
        <DefaultLayout>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column', // Ustawienie elementów w kolumnie
                    alignItems: 'center', // Wyśrodkowanie w poziomie
                    gap: '600px', // Odstępy między karuzelami
                    padding: '400px', // Margines wewnętrzny dla lepszej estetyki
                }}
            >
                <div
                    style={{
                        marginTop: '-430px', // Odstęp tylko dla pierwszej karuzeli
                    }}
                >
                    {/* Pierwsza karuzela */}
                    <CarouselDApiDemo images={imagesSet1} />
                </div>
                {/* Druga karuzela */}
                <CarouselDApiDemo images={imagesSet2} />
                <div
                    style={{
                        marginBottom: '300px', // Odstęp tylko dla pierwszej karuzeli
                    }}
                >
                    {/* Trzecia karuzela */}
                    <CarouselDApiDemo images={imagesSet3} />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Home;
