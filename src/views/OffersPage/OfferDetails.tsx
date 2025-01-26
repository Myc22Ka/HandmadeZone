import Loader from '@/components/utilities/Loader';
import useOffers from '@/hooks/useOffers';
import DefaultLayout from '@/layouts/DefaultLayout';
import { OfferType } from '@/types';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import QuickPurchaseButton from './QuickPurchaseButton';
import { OfferSearchRequest } from '@/interfaces/OfferInterface';
import { Input } from '@/components/ui/input';
import { put } from '@/lib/axiosHelper';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from 'sonner';
import Timer from './Timer';
import { decodeId } from '@/lib/utils';

const OfferDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const decodedId = decodeId(id || '');
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [bidPrice, setBidPrice] = useState<string>('');
    const offerIds = useMemo(() => ({ offerIds: [Number(decodedId)] }), [decodedId]);

    const { offers, loading } = useOffers<OfferSearchRequest>(`/api/offers/search`, offerIds);

    if (loading || offers.length === 0) {
        return (
            <DefaultLayout>
                <Loader />
            </DefaultLayout>
        );
    }

    const offer = offers[0];

    const handleBid = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        put(`/api/offers/${offer.id}/bid`, {
            userId: user?.id,
            bidAmount: bidPrice,
        })
            .then(response => {
                toast.info(response.data.message);
                setBidPrice('');
            })
            .catch(e => {
                toast.error(e.response.data.message);
            });
    };

    return (
        <DefaultLayout>
            <div className="w-full min-h-screen flex items-center justify-center py-8 px-4 md:px-16">
                <Card className="w-full max-w-6xl shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-lg">
                        <img
                            src={offer?.product.imageUrl || '/placeholder.png'}
                            alt={offer?.product.name || 'Product Image'}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Offer Details */}
                    <CardContent className="flex flex-col justify-between space-y-6 p-6">
                        <CardHeader>
                            <CardTitle className="text-3xl font-extrabold text-gray-800">
                                {offer?.title || 'Offer Details'}
                            </CardTitle>
                            <div className="text-sm text-gray-500 mt-2">
                                <p>
                                    <strong>Category:</strong> {offer?.product.category.name}
                                </p>
                                <p>
                                    <strong>Manufacturer:</strong> {offer?.product.manufacturer}
                                </p>
                                <p>
                                    <strong>Material:</strong> {offer?.product.material}
                                </p>
                                <p>
                                    <strong>Rating:</strong> {offer?.product.rating}/5
                                </p>
                            </div>
                            <CardDescription className="text-2xl font-semibold mt-4">
                                <strong>Price:</strong> {offer?.price} zł
                            </CardDescription>
                            <CardDescription className="text-lg font-bold">
                                <Timer offer={offer} />
                            </CardDescription>
                        </CardHeader>

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-4">
                            {offer.type === OfferType.AUCTION ? (
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
                                        Place Bid
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <QuickPurchaseButton offer={offer} />
                                    <AddToCartButton offer={offer} />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DefaultLayout>
    );
};

export default OfferDetails;
