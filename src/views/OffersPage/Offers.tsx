import React, { useState } from 'react';
import useOffers from '@/hooks/useOffers';
import DefaultLayout from '@/layouts/DefaultLayout';
import OfferCard from './OfferCard';
import Loader from '@/components/utilities/Loader';
import { OfferSearchRequest } from '@/interfaces/OfferInterface';
import OfferCategoryFilter from './OfferCategoryFilter';
import { useParams } from 'react-router';

const Offers: React.FC = () => {
    const categoryName = useParams<{ category: string }>();

    const [selectedCategory, setSelectedCategory] = useState<OfferSearchRequest>({
        categoryName: categoryName.category ?? 'all',
    });

    const { offers, error, loading } = useOffers('/api/offers/search', selectedCategory);

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <DefaultLayout>
            <div className="p-4">
                <OfferCategoryFilter
                    setSelectedCategory={setSelectedCategory}
                    defaultValue={categoryName.category ?? 'all'}
                />

                {loading ? (
                    <Loader />
                ) : (
                    <ul className="space-y-2">
                        {offers.map(offer => (
                            <OfferCard offer={offer} key={offer.id} />
                        ))}
                    </ul>
                )}
            </div>
        </DefaultLayout>
    );
};

export default Offers;
