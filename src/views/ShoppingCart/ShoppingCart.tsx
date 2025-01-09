import { useAuth } from '@/contexts/AuthProvider';
import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';

const ShoppingCart: React.FC = () => {
    const { user } = useAuth();

    console.log(user);

    return (
        <DefaultLayout>
            <div>ShoppingCart</div>
        </DefaultLayout>
    );
};

export default ShoppingCart;
