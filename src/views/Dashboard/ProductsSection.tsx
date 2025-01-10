import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DefaultLayout from '@/layouts/DefaultLayout';
import useOffers from '@/hooks/useOffers';
import { useAuth } from '@/contexts/AuthProvider';
import AddOfferForm from './AddOfferForm';
const ProductSection: React.FC = () => {
    const { user } = useAuth();
    const { offers } = useOffers('/api/offers/search', { userId: user?.id });
    const [showForm, setShowForm] = useState(false);

    return (
        <DefaultLayout>
            <div className="min-h-screen  p-6">
                {/*Nagłówek i przycisk dodania */}
                <h1 className="text-4xl font-bold text-center text-wh mb-8">Your Products</h1>
                {/*Przycisk dodania nowego produktu oraz formularz*/}
                <Button onClick={() => setShowForm(!showForm)} variant="default" className="my-2">
                    {showForm ? 'Cancel' : 'Add New Product'}
                </Button>
                {showForm && <AddOfferForm />}

                {/*Wyświetlanie produktów*/}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {offers.map(offer => (
                        <div
                            key={offer.id}
                            className="bg-[#3F4F6E] shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-80"
                        >
                            {/* Zdjęcie produktu */}
                            <div className="relative flex-shrink-0 overflow-hidden h-48 group-hover:h-48 transition-all duration-300">
                                <img
                                    src={offer.product.imageUrl}
                                    alt={offer.product.name}
                                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            {/* Szczegóły produktu */}
                            <div className="p-2 flex-grow group-hover:flex-grow-0 group-hover:h-1/4 transition-all duration-300 group-hover:mt-2">
                                <h2 className="text-mg font-semibold text-black group-hover:text-sm group-hover:text-gray-600 transition-all duration-300">
                                    {offer.title}
                                </h2>
                                <p className="text-white group-hover:text-xs group-hover:text-gray-300 transition-all duration-300">
                                    <strong>Price:</strong> ${offer.price.toFixed(2)}
                                </p>
                                <p className="text-white group-hover:text-xs group-hover:text-gray-300 transition-all duration-300">
                                    <strong>Category:</strong> {offer.product.category.name}
                                </p>
                                <p className="text-white group-hover:text-xs group-hover:text-gray-300 transition-all duration-300">
                                    <strong>Type:</strong> {offer.type === 'AUCTION' ? 'Auction' : 'Quick purchase'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ProductSection;
