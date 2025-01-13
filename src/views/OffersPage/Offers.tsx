import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useOffers from '@/hooks/useOffers';
import useCategories from '@/hooks/useCategories';
import DefaultLayout from '@/layouts/DefaultLayout';

const Offers: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const { categories } = useCategories('/api/categories', null);

    const { offers, error, loading } = useOffers(
        '/api/offers/search',
        selectedCategory ? { category: selectedCategory } : {}
    );

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    if (loading)
        return (
            <DefaultLayout>
                <div className="flex justify-center items-center h-full">
                    <Skeleton className="w-16 h-16 rounded-full" />
                </div>
            </DefaultLayout>
        );

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <DefaultLayout>
            <div className="p-4">
                {/* Dropdown for category selection */}
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Category:
                    </label>
                    <Select onValueChange={handleCategoryChange} defaultValue={undefined}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map(category => (
                                <SelectItem key={category.id} value={category.name}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <ul className="space-y-2">
                    {offers
                        .filter(
                            offer =>
                                !selectedCategory ||
                                offer.product.category.name.toLowerCase() === selectedCategory.toLowerCase()
                        )
                        .map(offer => (
                            <Link key={offer.id} to={`/offers/details/${offer.id}`} className="block">
                                <Card className="hover:shadow-lg transition-shadow w-full flex">
                                    <div className="w-1/4 h-full relative">
                                        <img
                                            src={offer.product.imageUrl}
                                            alt={offer.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-3/4 flex  justify-between p-4 space-bee">
                                        <CardContent>
                                            <CardTitle className="text-lg font-bold truncate">{offer.title}</CardTitle>
                                            <CardDescription>
                                                <p>
                                                    <strong>Price:</strong> ${offer.price.toFixed(2)}
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
                        ))}
                </ul>
            </div>
        </DefaultLayout>
    );
};

export default Offers;
