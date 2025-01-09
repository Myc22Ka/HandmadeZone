import Loader from '@/components/utilities/Loader';
import { useAuth } from '@/contexts/AuthProvider';
import useOffers from '@/hooks/useOffers';
import DefaultLayout from '@/layouts/DefaultLayout';
import { OfferType } from '@/types';
import React from 'react';
import { useParams } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

const OfferDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { cartActions } = useAuth();

    const { offers, loading } = useOffers('/api/offers/search', { ids: id });

    if (loading)
        return (
            <DefaultLayout>
                <Loader />
            </DefaultLayout>
        );

    const offer = offers[0];

    console.log(offer);

    return (
        <DefaultLayout>
            <div>
                <h1>Offer Details</h1>
                <div>Offer ID: {offer?.id}</div>

                {offer.type === OfferType.QUICK_PURCHASE && <AddToCartButton offer={offer} add={cartActions.add} />}
            </div>
        </DefaultLayout>
    );
};

export default OfferDetails;
