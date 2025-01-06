import React from 'react';
import { Product } from '@/interfaces/ProductInterface';
import data from '@/assets/data.json';

function ProductSection() {
    return (
        <div className="min-h-screen  p-6">
            <h1 className="text-4xl font-bold text-center text-wh mb-8">Handmade Items</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item: Product) => (
                    <div
                        key={item.id}
                        className="bg-gray-400 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-80"
                    >
                        <div className="relative flex-shrink-0 overflow-hidden h-48 group-hover:h-64 transition-all duration-300">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
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
    );
}

export default ProductSection;
