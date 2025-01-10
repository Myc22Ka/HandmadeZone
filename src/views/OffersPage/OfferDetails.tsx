import Loader from '@/components/utilities/Loader';
import { useAuth } from '@/contexts/AuthProvider';
import useOffers from '@/hooks/useOffers';
import DefaultLayout from '@/layouts/DefaultLayout';
import { OfferType } from '@/types';
import React from 'react';
import { useParams } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { Button } from '@/components/ui/button';

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

    return (
        <DefaultLayout>
            <div className="w-full h-screen flex items-center justify-center bg-[#3F4F6E] text-white">
                {/* Karta szczegółów */}
                <div className="w-full max-w-5xl h-full  shadow-lg rounded-md p-8 flex flex-col md:grid md:grid-cols-2 gap-6">
                    {/* Obrazek produktu */}
                    <div className="overflow-hidden rounded-md flex-shrink-0">
                        <img
                            src={offer?.product.imageUrl || '/placeholder.png'}
                            alt={offer?.product.name || 'Product Image'}
                            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Szczegóły i przyciski */}
                    <div className="flex flex-col justify-between space-y-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">{offer?.title || 'Offer Details'}</h1>
                            <p className="text-lg text-gray-200">
                                <strong>Price:</strong> ${offer?.price.toFixed(2)}
                            </p>
                            <p className="text-lg text-gray-200">
                                <strong>Category:</strong> {offer?.product.category.name}
                            </p>
                            <p className="text-lg text-gray-200">
                                <strong>Manufacturer:</strong> {offer?.product.manufacturer}
                            </p>
                            <p className="text-lg text-gray-200">
                                <strong>Material:</strong> {offer?.product.material}
                            </p>
                            <p className="text-lg text-gray-200">
                                <strong>Rating:</strong> {offer?.product.rating}/5
                            </p>
                        </div>

                        {/* Sekcja przycisków */}
                        <div className="flex flex-wrap gap-4">
                            {offer.type === OfferType.QUICK_PURCHASE ? (
                                <Button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                    Quck Purchase
                                </Button>
                            ) : (
                                <Button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                    Bid
                                </Button>
                            )}

                            {offer.type === OfferType.QUICK_PURCHASE && (
                                <AddToCartButton offer={offer} add={cartActions.add} />
                            )}

                            <Button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={() => cartActions.remove(offer.id)}
                            >
                                Remove Item
                            </Button>
                            <Button
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                                onClick={() => cartActions.clear()}
                            >
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default OfferDetails;
