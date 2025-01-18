import Loader from '@/components/utilities/Loader';
import useOffers from '@/hooks/useOffers';
import DefaultLayout from '@/layouts/DefaultLayout';
import { OfferType } from '@/types';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import QuickPurchaseButton from './QuickPurchaseButton';
import { OfferSearchRequest } from '@/interfaces/OfferInterface';

const OfferDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const offerIds = useMemo(() => ({ offerIds: [Number(id)] }), [id]);

    const { offers, loading } = useOffers<OfferSearchRequest>(`/api/offers/search`, offerIds);

    if (loading || offers.length === 0)
        return (
            <DefaultLayout>
                <Loader />
            </DefaultLayout>
        );

    const offer = offers[0];

    return (
        <DefaultLayout>
            <div className="w-full h-screen flex items-center justify-center text-white">
                {/* Karta szczegółów */}
                <Card className="w-full max-w-5xl h-full shadow-lg rounded-md p-8 flex flex-col md:grid md:grid-cols-2 gap-6">
                    {/* Obrazek produktu */}
                    <div className="overflow-hidden rounded-md flex-shrink-0">
                        <img
                            src={offer?.product.imageUrl || '/placeholder.png'}
                            alt={offer?.product.name || 'Product Image'}
                            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Szczegóły i przyciski */}
                    <CardContent className="flex flex-col justify-between space-y-4">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-white mb-4">
                                {offer?.title || 'Offer Details'}
                            </CardTitle>
                            <CardDescription className="text-lg text-gray-200">
                                <strong>Price:</strong> ${offer?.price.toFixed(2)}
                            </CardDescription>
                            <CardDescription className="text-lg text-gray-200">
                                <strong>Category:</strong> {offer?.product.category.name}
                            </CardDescription>
                            <CardDescription className="text-lg text-gray-200">
                                <strong>Manufacturer:</strong> {offer?.product.manufacturer}
                            </CardDescription>
                            <CardDescription className="text-lg text-gray-200">
                                <strong>Material:</strong> {offer?.product.material}
                            </CardDescription>
                            <CardDescription className="text-lg text-gray-200">
                                <strong>Rating:</strong> {offer?.product.rating}/5
                            </CardDescription>
                        </CardHeader>

                        {/* Sekcja przycisków */}
                        <div className="flex flex-wrap gap-4">
                            {offer.type === OfferType.QUICK_PURCHASE ? (
                                <QuickPurchaseButton offer={offer} />
                            ) : (
                                <Button variant="default">Bid</Button>
                            )}

                            {offer.type === OfferType.QUICK_PURCHASE && <AddToCartButton offer={offer} />}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DefaultLayout>
    );
};

export default OfferDetails;
