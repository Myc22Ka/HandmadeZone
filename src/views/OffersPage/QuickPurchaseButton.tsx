import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthProvider';
import { Offer } from '@/interfaces/OfferInterface';
import { put } from '@/lib/axiosHelper';
import React from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface QuickPurchaseButtonProps {
    offer: Offer;
}

const QuickPurchaseButton: React.FC<QuickPurchaseButtonProps> = ({ offer }) => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const buy = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        put(`/api/offers/buy?buyerId=${user?.id}&offerId=${offer.id}`)
            .then(response => {
                toast.success(response?.data?.message);

                navigate(-1);
            })
            .catch(error => {
                toast.error(`${error.response?.data?.message || 'Unknown error'}`);
            });
    };

    return (
        <Button variant="default" onClick={buy}>
            Quick Purchase
        </Button>
    );
};

export default QuickPurchaseButton;
