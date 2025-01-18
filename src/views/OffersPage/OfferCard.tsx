import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Offer } from '@/interfaces/OfferInterface';
import React from 'react';
import { Link } from 'react-router-dom';

interface OfferCardProps {
    offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
    return (
        <Link to={`/offers/details/${offer.id}`} className="block">
            <Card className="hover:shadow-lg transition-shadow w-full flex">
                <div className="w-1/4 h-full relative">
                    <img src={offer.product.imageUrl} alt={offer.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-3/4 flex  justify-between p-4 space-bee">
                    <CardContent>
                        <CardTitle className="text-lg font-bold truncate">{offer.title}</CardTitle>
                        <CardDescription>
                            <p>
                                <strong>Price:</strong> {offer.price} zł
                            </p>
                            <p>
                                <strong>Category:</strong> {offer.product.category.name}
                            </p>
                            <p>
                                <strong>Seller:</strong> {offer.userFirstName} {offer.userLastName}
                            </p>
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button variant="link">View Details</Button>
                    </CardFooter>
                </div>
            </Card>
        </Link>
    );
};

export default OfferCard;
