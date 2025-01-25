import DefaultLayout from '@/layouts/DefaultLayout';
import Section from '@/layouts/Section';
import { HomeCarousel } from '@/views/HomePage/HomeCarousel';
import React from 'react';
import CategoryList from './CategoryList';

const Home: React.FC = () => {
    return (
        <DefaultLayout>
            <Section>
                <HomeCarousel />
            </Section>
            <Section heading="Categories">
                <CategoryList />
            </Section>
        </DefaultLayout>
    );
};

export default Home;
