import React, { useState } from 'react';
import useOffers from '@/hooks/useOffers';
import DefaultLayout from '@/layouts/DefaultLayout';
import OfferCard from './OfferCard';
import Loader from '@/components/utilities/Loader';
import { OfferSearchRequest } from '@/interfaces/OfferInterface';
import { useParams } from 'react-router';
import OfferHeader from './OfferHeader';
import { useAuth } from '@/contexts/AuthProvider';
import { OfferStatus } from '@/types';

const Offers: React.FC = () => {
    const categoryName = useParams<{ category: string }>();
    const { user } = useAuth();

    const [filter, setFilter] = useState<OfferSearchRequest>({
        categoryName: categoryName.category ?? 'all',
    });

    const { offers, loading } = useOffers('/api/offers/search', filter);

    return (
        <DefaultLayout>
            <div className="p-4">
                <OfferHeader defaultFilter={filter} setFilter={setFilter} />

                {loading ? (
                    <Loader />
                ) : (
                    <ul className="space-y-2">
                        {offers
                            .filter(offer => offer.userId !== user?.id && offer.status === OfferStatus.ACTIVE)
                            .map(offer => (
                                <OfferCard offer={offer} key={offer.id} />
                            ))}
                    </ul>
                )}
            </div>
        </DefaultLayout>
    );
};

export default Offers;
