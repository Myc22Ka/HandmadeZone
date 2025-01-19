import Loader from '@/components/utilities/Loader';
import useOffers from '@/hooks/useOffers';
import DefaultLayout from '@/layouts/DefaultLayout';
import { OfferType } from '@/types';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import QuickPurchaseButton from './QuickPurchaseButton';
import { OfferSearchRequest } from '@/interfaces/OfferInterface';
import { Input } from '@/components/ui/input';

const OfferDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [bidPrice, setBidPrice] = useState<string>('');
    const offerIds = useMemo(() => ({ offerIds: [Number(id)] }), [id]);

    const { offers, loading } = useOffers<OfferSearchRequest>(`/api/offers/search`, offerIds);

    if (loading || offers.length === 0)
        return (
            <DefaultLayout>
                <Loader />
            </DefaultLayout>
        );

    const offer = offers[0];

    const handleBid = () => {
        console.log('Proposed bid:', bidPrice);
        // Logika składania oferty (np. wysyłanie danych na serwer)
    };

    return (
        <DefaultLayout>
            <div className="w-full h-screen flex items-center justify-center text-white">
                {/* Karta szczegółów */}
                <Card className="w-full max-w-5xl h-4/5 shadow-lg rounded-md p-8 flex flex-col md:grid md:grid-cols-2 gap-6">
                    {/* Obrazek produktu */}
                    <div className="overflow-hidden rounded-md flex-shrink-0">
                        <img
                            src={offer?.product.imageUrl || '/placeholder.png'}
                            alt={offer?.product.name || 'Product Image'}
                            className="w-full h-full scale-90 object-cover transform transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Szczegóły i przyciski */}
                    <CardContent className="flex flex-col justify-between space-y-3">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold  mb-4">
                                {offer?.title || 'Offer Details'}
                            </CardTitle>

                            <CardDescription className="text-lg ">
                                <strong>Category:</strong> {offer?.product.category.name}
                            </CardDescription>
                            <CardDescription className="text-lg ">
                                <strong>Manufacturer:</strong> {offer?.product.manufacturer}
                            </CardDescription>
                            <CardDescription className="text-lg ">
                                <strong>Material:</strong> {offer?.product.material}
                            </CardDescription>
                            <CardDescription className="text-lg ">
                                <strong>Rating:</strong> {offer?.product.rating}/5
                            </CardDescription>
                            <CardDescription className="text-3xl font-extrabold ">
                                <strong>Price:</strong> {offer?.price} zł
                            </CardDescription>
                        </CardHeader>

                        {/* Sekcja przycisków */}
                        <div className="flex flex-wrap gap-4">
                            {offer.type === OfferType.AUCTION ? (
                                <>
                                    {/* Pole na wpisanie ceny */}
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="Enter your bid"
                                            value={bidPrice}
                                            onChange={e => setBidPrice(e.target.value)}
                                            className="w-full"
                                        />
                                        <Button
                                            variant="default"
                                            onClick={handleBid}
                                            disabled={!bidPrice || parseFloat(bidPrice) <= 0}
                                        >
                                            Bid
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <QuickPurchaseButton offer={offer} />
                                    <AddToCartButton offer={offer} />
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DefaultLayout>
    );
};

export default OfferDetails;
