import useOffers from '@/hooks/useOffers';
import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';

const Offers: React.FC = () => {
    const { offers, error, loading } = useOffers('/api/offers/search', {});

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    console.log(offers);

    return (
        <DefaultLayout>
            <div>Hi</div>
        </DefaultLayout>
    );
};

export default Offers;
