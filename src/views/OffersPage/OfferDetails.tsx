import { Button } from '@/components/ui/button';
import Loader from '@/components/utilities/Loader';
import useOffers from '@/hooks/useOffers';
import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';
import { useParams } from 'react-router-dom';

const OfferDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { offers, loading } = useOffers('/api/offers/search', { ids: id });

    if (loading)
        return (
            <DefaultLayout>
                <Loader />
            </DefaultLayout>
        );

    const offer = offers[0];

    function addToCart() {
        console.log('Added to the shopping cart!');
    }

    return (
        <DefaultLayout>
            <div>
                <h1>Offer Details</h1>
                <p>Offer ID: {offer?.id}</p>
                <Button className="p-2">Kup teraz</Button>
                <Button className="p-2" onClick={() => addToCart()}>
                    Add to Cart
                </Button>
            </div>
        </DefaultLayout>
    );
};

export default OfferDetails;
