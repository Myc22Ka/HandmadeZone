import React, { useState, useEffect } from 'react';
import useCategories from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';

const AddOfferForm = () => {
    const { categories, loading: loadingCategories } = useCategories('/api/categories', {});

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        type: '',
        categoryId: '',
        product: {
            name: '',
            manufacturer: '',
            material: '',
            rating: 0,
        },
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (formData.startDate) {
            const start = new Date(formData.startDate);
            const end = new Date(start);
            end.setDate(start.getDate() + 7);
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
        console.log('Offer Data:', formData);
        // Add logic to submit the form data
    };

    if (loadingCategories) return <div>Loading categories...</div>;

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto mb-2 bg-[#3F4F6E] p-6 rounded shadow-md space-y-4 text-black"
        >
            <div className="flex flex-col">
                <label htmlFor="title" className="font-medium mb-1">
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="description" className="font-medium mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2"
                ></textarea>
            </div>

            <div className="flex flex-col">
                <label htmlFor="price" className="font-medium mb-1">
                    Price
                </label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="type" className="font-medium mb-1">
                    Type
                </label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2"
                >
                    <option value="">Select Type</option>
                    <option value="AUCTION">Auction</option>
                    <option value="QUICK_PURCHASE">Quick purchase</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="categoryId" className="font-medium mb-1">
                    Category
                </label>
                <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2"
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="productName" className="font-medium mb-1">
                    Product Name
                </label>
                <input
                    id="productName"
                    name="product.name"
                    value={formData.product.name}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="productManufacturer" className="font-medium mb-1">
                    Manufacturer
                </label>
                <input
                    id="productManufacturer"
                    name="product.manufacturer"
                    value={formData.product.manufacturer}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="productMaterial" className="font-medium mb-1">
                    Material
                </label>
                <input
                    id="productMaterial"
                    name="product.material"
                    value={formData.product.material}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="startDate" className="font-medium mb-1">
                    Start Date
                </label>
                <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="endDate" className="font-medium mb-1">
                    End Date
                </label>
                <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    readOnly
                    className="border rounded px-3 py-2 bg-gray-100"
                />
            </div>

            <Button variant="default" className="w-full py-2 px-4 rounded text-black">
                Add Offer
            </Button>
        </form>
    );
};

export default AddOfferForm;
