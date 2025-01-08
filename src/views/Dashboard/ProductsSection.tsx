import React, { useState } from 'react';
import { Product } from '@/interfaces/ProductInterface';
import data from '@/assets/data.json';
import { Button } from '@/components/ui/button';
import DefaultLayout from '@/layouts/DefaultLayout';

function ProductSection() {
    const [products, setProducts] = useState<Product[]>(data);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
        name: '',
        category: '',
        author: '',
        image: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            category: value,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
        setNewProduct({ id: 0, name: '', category: '', author: '', image: '' });
        setShowForm(false);
    };
    return (
        <DefaultLayout>
            <div className="min-h-screen  p-6">
                {/*Nagłówek i przycisk dodania */}
                <h1 className="text-4xl font-bold text-center text-wh mb-8">Your Products</h1>
                {/*Przycisk dodania nowego produktu oraz formularz*/}
                <Button onClick={() => setShowForm(!showForm)} variant="default" className="my-2">
                    {showForm ? 'Cancel' : 'Add New Product'}
                </Button>
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded shadow-md mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-semibold mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-semibold mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={newProduct.category}
                                onChange={handleCategoryChange}
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Pottery">Pottery</option>
                                <option value="Textile">Textile</option>
                                <option value="Woodworking">Woodworking</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="author" className="block text-sm font-semibold mb-2">
                                Author
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={newProduct.author}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-semibold mb-2">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={newProduct.image}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                            Add Product
                        </button>
                    </form>
                )}

                {/*Wyświetlanie produktów*/}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item: Product) => (
                        <div
                            key={item.id}
                            className="bg-gray-400 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-80"
                        >
                            {' '}
                            {/*Zdjęcie produktu*/}
                            <div className="relative flex-shrink-0 overflow-hidden h-48 group-hover:h-64 transition-all duration-300">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            {/*Sekcja tekstu*/}
                            <div className="p-4 flex-grow group-hover:flex-grow-0 group-hover:h-1/4 transition-all duration-300">
                                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-sm group-hover:text-gray-600 transition-all duration-300">
                                    {item.name}
                                </h2>
                                <p className="text-white group-hover:text-xs group-hover:text-gray-500 transition-all duration-300">
                                    <strong>Category:</strong> {item.category}
                                </p>
                                <p className="text-white group-hover:text-xs group-hover:text-gray-500 transition-all duration-300">
                                    <strong>Author:</strong> {item.author}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}

export default ProductSection;
