import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
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
            <div className="min-h-screen p-6">
                {/* Header and Add Button */}
                <h1 className="text-4xl font-bold text-center mb-8">Your Products</h1>
                <Button onClick={() => setShowForm(!showForm)} variant="default" className="mb-4">
                    {showForm ? 'Cancel' : 'Add New Product'}
                </Button>
                {showForm && <AddOfferForm />}

                {/* Displaying products */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {offers.map(offer => (
                        <Link key={offer.id} to={`/offers/details/${offer.id}`}>
                            <Card key={offer.id} className="hover:shadow-lg transition-shadow flex flex-col h-80">
                                {/* Product Image */}
                                <div className="relative flex-shrink-0 h-1/2">
                                    <img
                                        src={offer.product.imageUrl}
                                        alt={offer.product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Details */}
                                <CardContent className="flex flex-col justify-between p-4">
                                    <CardTitle className="text-lg font-bold truncate">{offer.title}</CardTitle>
                                    <CardDescription>
                                        <p className="text-sm">
                                            <strong>Price:</strong> ${offer.price.toFixed(2)}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Category:</strong> {offer.product.category.name}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Type:</strong>{' '}
                                            {offer.type === 'AUCTION' ? 'Auction' : 'Quick purchase'}
                                        </p>
                                    </CardDescription>
                                    <CardFooter>
                                        <Button variant="link">View Details</Button>
                                    </CardFooter>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ProductSection;
