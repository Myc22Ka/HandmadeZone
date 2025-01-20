import DefaultLayout from '@/layouts/DefaultLayout';
import Section from '@/layouts/Section';
import { HomeCarousel } from '@/views/HomePage/HomeCarousel';
import React from 'react';
import CategoryList from './CategoryList';
import useOffers from '@/hooks/useOffers';

const Home: React.FC = () => {
    const { offers } = useOffers('/api/offers/search', { status: 'ACTIVE' });

    // Wyodrębnij dane potrzebne do karuzeli (tytuł i obraz)
    const carouselData = offers.map(offer => ({
        image: offer.product.imageUrl, // Adres URL zdjęcia
        title: offer.title, // Tytuł oferty
    }));

    return (
        <DefaultLayout>
            <Section>
                <HomeCarousel offers={carouselData} /> {/* Przekazanie danych do karuzeli */}
            </Section>
            <Section heading="Categories">
                <CategoryList />
            </Section>
        </DefaultLayout>
    );
};

export default Home;
