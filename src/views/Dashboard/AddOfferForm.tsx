import React, { useState, useEffect } from 'react';
import useCategories from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const WEEK_DURATION = 7;

const AddOfferForm = () => {
    const { categories, loading: loadingCategories } = useCategories('/api/categories', {});

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        type: '',
        categoryId: '',
        product: {
            name: '',
            manufacturer: '',
            material: '',
            rating: '',
        },
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (formData.startDate) {
            const start = new Date(formData.startDate);
            const end = new Date(start);
            end.setDate(start.getDate() + WEEK_DURATION);
            setFormData(prev => ({ ...prev, endDate: end.toISOString().split('T')[0] }));
        }
    }, [formData.startDate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('product.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                product: {
                    ...prev.product,
                    [field]: value,
                },
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const parsedData = {
            ...formData,
            price: parseFloat(formData.price),
            product: {
                ...formData.product,
                rating: parseFloat(formData.product.rating),
            },
        };
        console.log('Offer Data:', parsedData);
        // Add logic to submit the form data
    };

    if (loadingCategories) return <div>Loading categories...</div>;

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto mb-2 space-y-2 border border-gray-300 p-4 rounded-md"
        >
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="text" value={formData.price} onChange={handleChange} required />
            </div>

            <div>
                <Label htmlFor="type">Type</Label>
                <Select onValueChange={value => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="AUCTION">Auction</SelectItem>
                        <SelectItem value="QUICK_PURCHASE">Quick purchase</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="categoryId">Category</Label>
                <Select onValueChange={value => setFormData({ ...formData, categoryId: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(category => (
                            <SelectItem key={category.id} value={String(category.id)}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                    id="productName"
                    name="product.name"
                    value={formData.product.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="productManufacturer">Manufacturer</Label>
                <Input
                    id="productManufacturer"
                    name="product.manufacturer"
                    value={formData.product.manufacturer}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="productMaterial">Material</Label>
                <Input
                    id="productMaterial"
                    name="product.material"
                    value={formData.product.material}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" value={formData.endDate} readOnly />
            </div>

            <Button variant="default" className="w-full">
                Add Offer
            </Button>
        </form>
    );
};

export default AddOfferForm;
