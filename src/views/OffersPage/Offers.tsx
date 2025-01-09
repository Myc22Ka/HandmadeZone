import Loader from '@/components/utilities/Loader';
import useOffers from '@/hooks/useOffers';
import { Offer } from '@/interfaces/OfferInterface';
import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Offers: React.FC = () => {
    const { category } = useParams<{ category?: string }>();

    const { offers, error, loading } = useOffers('/api/offers/search', category ? { category } : {});

    if (loading)
        return (
            <DefaultLayout>
                <Loader />
            </DefaultLayout>
        );

    if (error) return <div>Error: {error}</div>;

    console.log(offers);

    return (
        <DefaultLayout>
            <div>
                <h1>{category ? `Offers in ${category}` : 'All Offers'}</h1>
                <ul>
                    {offers.map((offer: Offer) => (
                        <li key={offer.id}>
                            <Link to={`/offers/details/${offer.id}`}>
                                {offer.title} - ${offer.price}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </DefaultLayout>
    );
};

export default Offers;
