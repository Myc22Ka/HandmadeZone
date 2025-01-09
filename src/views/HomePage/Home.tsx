import DefaultLayout from '@/layouts/DefaultLayout';
import Section from '@/layouts/Section';
import { HomeCarousel } from '@/views/HomePage/HomeCarousel';
import React from 'react';
import CategoryList from './CategoryList';
const images = ['/src/assets/imgs/texture-1909992_1280.jpg', '/src/assets/imgs/deer-3275594_1280.jpg'];

const Home: React.FC = () => {
    return (
        <DefaultLayout>
            <Section>
                <HomeCarousel images={images} />
            </Section>
            <Section heading="Categories">
                <CategoryList />
            </Section>
        </DefaultLayout>
    );
};

export default Home;
