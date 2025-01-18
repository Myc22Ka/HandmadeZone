import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useCategories from '@/hooks/useCategories';
import { OfferSearchRequest } from '@/interfaces/OfferInterface';
import React from 'react';
import { useNavigate } from 'react-router';

interface OfferCategoryFilterProps {
    setSelectedCategory: (data: OfferSearchRequest) => void;
    defaultValue: string;
}

const OfferCategoryFilter: React.FC<OfferCategoryFilterProps> = ({ setSelectedCategory, defaultValue }) => {
    const { categories } = useCategories('/api/categories', null);
    const navigate = useNavigate();

    const handleCategoryChange = (value: string) => {
        setSelectedCategory({
            categoryName: value,
        });
        navigate(`/offers/category/${value.toLowerCase()}`);
    };

    return (
        <div className="mb-4">
            <Select onValueChange={handleCategoryChange} defaultValue={defaultValue}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                        <SelectItem key={category.id} value={category.name.toLowerCase()}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default OfferCategoryFilter;
