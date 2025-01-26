import { useAuth } from '@/contexts/AuthProvider';
import DefaultLayout from '@/layouts/DefaultLayout';
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useOffers from '@/hooks/useOffers';
import EmptyList from './EmptyList';
import { CgTrashEmpty } from '@react-icons/all-files/cg/CgTrashEmpty';
import { OfferSearchRequest } from '@/interfaces/OfferInterface';
import { put } from '@/lib/axiosHelper';
import { toast } from 'sonner';

const ShoppingCart: React.FC = () => {
    const { cart, cartActions, user } = useAuth();

    const cartIds: OfferSearchRequest = useMemo(
        () => ({
            offerIds: cart.items.map(item => item.id),
        }),
        [cart]
    );

    const { offers } = useOffers('/api/offers/search', cartIds);

    const handleBuyCart = () => {
        put('/api/offers/buy-cart', { buyerId: user?.id, offersIds: cartIds.offerIds })
            .then(response => {
                toast.info(response.data.message);

                cartActions.clear();
            })
            .catch(e => {
                toast.error(e.response.data.message);
            });
    };

    return (
        <DefaultLayout>
            <div className="p-6 h-full flex flex-col">
                <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>

                {cart.items.length !== 0 ? (
                    <div className="space-y-6 flex flex-col justify-between h-full">
                        {/* List of Items */}
                        <div className="flex flex-col gap-4">
                            {cart.items.map((item, index) => {
                                const matchingOffer = offers.find(offer => offer.id === item.id);
                                const itemPrice = matchingOffer?.price || 0;

                                return (
                                    <Card key={index} className="shadow-md">
                                        <CardHeader>
                                            <div className="text-lg font-semibold">{matchingOffer?.title}</div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-gray-700">Price: {itemPrice} zł</span>
                                                </div>
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
                        </div>

                        {/* Total Cost and Actions */}
                        <div className="mt-6">
                            {/* Total Cost */}
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total:</span>
                                <span>
                                    {cart.items
                                        .reduce((total, item) => {
                                            const matchingOffer = offers.find(offer => offer.id === item.id);
                                            const itemPrice = matchingOffer?.price || 0;
                                            return total + itemPrice;
                                        }, 0)
                                        .toFixed(2)}{' '}
                                    zł
                                </span>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end mt-4 gap-4">
                                <Button
                                    variant="destructive"
                                    className="px-6 py-3 text-lg font-semibold flex items-center gap-2"
                                    onClick={() => cartActions.clear()}
                                >
                                    <CgTrashEmpty stroke="white" /> Clear Cart
                                </Button>
                                <Button
                                    variant="default"
                                    className="px-6 py-3 text-lg font-semibold"
                                    onClick={handleBuyCart}
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
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
