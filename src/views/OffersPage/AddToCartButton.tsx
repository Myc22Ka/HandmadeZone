import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Offer } from '@/interfaces/OfferInterface';
import { useNavigate } from 'react-router-dom';

interface AddToCartButtonProps {
    offer: Offer;
    add: (id: number) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ offer, add }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        add(offer.id);
        setOpen(true);
    };

    const handleGoToCart = () => {
        navigate('/auth/cart');
    };

    return (
        <div>
            <Button className="p-2" onClick={handleAddToCart}>
                Add to Cart
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Item added to cart</DialogTitle>
                        <DialogDescription>Product Details</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-2">
                        <img src={offer.product.imageUrl} alt={offer.title} className="w-full max-w-sm rounded-lg" />
                        <div className="self-start">
                            <div className="text-2xl font-bold">{offer.price.toFixed(2)} zł</div>
                            <div className="text-sm text-gray-700">{offer.description}</div>
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Continue shopping
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="default" onClick={handleGoToCart}>
                                Go to Cart
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddToCartButton;
