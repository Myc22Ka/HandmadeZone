import { Card, CardHeader, CardContent } from '@/components/ui/card';
import React from 'react';

const EmptyList: React.FC = () => {
    return (
        <Card className="shadow-md p-6">
            <CardHeader>
                <div className="text-lg font-bold text-gray-700">Your cart is empty!</div>
            </CardHeader>
            <CardContent>
                <div className="text-gray-600">
                    It seems you haven&apos;t added any items to your cart yet. Start shopping now!
                </div>
            </CardContent>
        </Card>
    );
};

export default EmptyList;
