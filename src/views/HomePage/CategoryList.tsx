import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCategories from '@/hooks/useCategories';

// Animacje Framer Motion
const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
    hover: { scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' },
};

const CategoryList: React.FC = () => {
    const { categories, loading, error } = useCategories('/api/categories', {});

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-8"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
        >
            {categories.map(category => (
                <motion.div
                    key={category.id}
                    variants={containerVariants}
                    whileHover="hover"
                    className="relative flex flex-col items-center justify-center h-52 bg-gray-100 shadow-md rounded-lg overflow-hidden dark:bg-gray-800"
                >
                    {/* Obraz kategorii */}
                    <Link
                        to={`/products/${category.name.toLowerCase()}`}
                        className="relative z-10 flex flex-col items-center justify-center h-full w-full"
                    >
                        <motion.img
                            src={category.imageUrl}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                            whileHover={{ opacity: 0.4 }}
                        />

                        {/* Treść kategorii */}
                        <span className="relative z-20 text-xl font-semibold text-gray-900 dark:text-white">
                            {category.name}
                        </span>
                    </Link>

                    {/* Overlay dla efektu */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-30"></div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default CategoryList;
