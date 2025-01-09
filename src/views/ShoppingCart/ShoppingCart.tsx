import { useAuth } from '@/contexts/AuthProvider';
import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useOffers from '@/hooks/useOffers';
import EmptyList from './EmptyList';

const ShoppingCart: React.FC = () => {
    const { cart, cartActions } = useAuth();

    const { offers } = useOffers('/api/offers/search', { ids: cart.items.map(item => item.id) });

    return (
        <DefaultLayout>
            <div className="p-6">
                <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>

                {cart.items.length !== 0 ? (
                    <div className="space-y-4">
                        {cart.items.map((item, index) => {
                            const matchingOffer = offers.find(offer => offer.id === item.id);

                            return (
                                <Card key={index} className="shadow-md">
                                    <CardHeader>
                                        <div className="text-lg font-semibold">{matchingOffer?.title}</div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center">
                                            <div className="text-gray-700">{matchingOffer?.price} zł</div>
                                            <Button
                                                variant="outline"
                                                className="p-2"
                                                size="sm"
                                                onClick={() => cartActions.remove(item.id)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                        <div className="flex justify-end mt-6">
                            <Button variant="default" className="px-6 py-3 text-lg font-semibold">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                ) : (
                    <EmptyList />
                )}
            </div>
        </DefaultLayout>
    );
};

export default ShoppingCart;
