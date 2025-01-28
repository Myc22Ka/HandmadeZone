import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import InputWithLabel from '@/components/utilities/Inputs/InputWithLabel/InputWithLabel';
import SelectFrom from '@/components/utilities/SelectFrom';
import useCategories from '@/hooks/useCategories';
import { useAuth } from '@/contexts/AuthProvider';
import { post } from '@/lib/axiosHelper';
import { Label } from '@/components/ui/label';

const AddOfferForm = () => {
    const { categories } = useCategories('/api/categories', null);
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        user: { id: user?.id },
        type: '',
        description: '',
        product: {
            name: '',
            category: {
                id: '',
            },
            dimensions: {
                height: 0,
                width: 0,
                depth: 0,
                unit: '',
            },
            weight: {
                amount: 0,
                unit: '',
            },
            rating: 1,
            imageUrl: '',
        },
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'productName') {
            setFormData(prev => ({
                ...prev,
                product: {
                    ...prev.product,
                    name: value,
                },
            }));
        } else if (name === 'productImageUrl') {
            setFormData(prev => ({
                ...prev,
                product: {
                    ...prev.product,
                    imageUrl: value, // Aktualizujemy tylko `imageUrl` w obiekcie `product`
                },
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(`/api/offers/add/${user?.id}`, formData).then(response => {
            console.log(response);
        });

        console.log('Form Data:', formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto mb-2 space-y-2 border border-gray-300 p-4 rounded-md"
        >
            <InputWithLabel type="text" name="title" value={formData.title} onChange={handleChange} required />
            <div className="grid w-full items-center gap-1.5 py-2">
                <Label htmlFor="description" className="text-left">
                    Description
                </Label>
                <Textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    autoComplete="off"
                    required
                />
            </div>
            <InputWithLabel name="price" type="number" value={formData.price} onChange={handleChange} required />
            <InputWithLabel
                name="productName"
                type="text"
                value={formData.product.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
            />
            <InputWithLabel
                name="productImageUrl"
                type="text"
                value={formData.product.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                required
            />

            {/* Type Select */}
            <SelectFrom
                name="type"
                items={[
                    { label: 'Auction', value: 'AUCTION' },
                    { label: 'Quick Purchase', value: 'QUICK_PURCHASE' },
                ]}
                placeholder="Select Type"
                onChange={value => setFormData({ ...formData, type: value })}
            />

            {/* Category Select */}
            <SelectFrom
                name="categoryId"
                items={categories.map(category => ({
                    label: category.name,
                    value: String(category.id),
                }))}
                placeholder="Select Category"
                onChange={value =>
                    setFormData(prev => ({
                        ...prev,
                        product: { ...prev.product, category: { id: value } },
                    }))
                }
            />

            <InputWithLabel name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />

            <Button variant="default" className="w-full">
                Add Offer
            </Button>
        </form>
    );
};

export default AddOfferForm;
