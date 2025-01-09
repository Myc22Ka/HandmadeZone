import Loader from '@/components/utilities/Loader';
import useOffers from '@/hooks/useOffers';
import { Offer } from '@/interfaces/OfferInterface';
import DefaultLayout from '@/layouts/DefaultLayout';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Offers: React.FC = () => {
    const { category } = useParams<{ category?: string }>();

    const { offers, error, loading } = useOffers('/api/offers/search', category ? { category } : {});

    if (loading)
        return (
            <DefaultLayout>
                <Loader />
            </DefaultLayout>
        );

    if (error) return <div>Error: {error}</div>;

    console.log(offers);

    return (
        <DefaultLayout>
            <div>
                <h1>{category ? `Offers in ${category}` : 'All Offers'}</h1>
                <ul className="">
                    {offers.map((offer: Offer) => (
                        <Link key={offer.id} to={`/offers/details/${offer.id}`}>
                            <a className="flex w-full bg-[#3F4F6E] border-2 border-white shadow-lg mt-2 mb-2 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group h-40">
                                {/* Zdjęcie produktu - 1/4 szerokości ekranu */}
                                <div className="w-1/4 flex-shrink-0 overflow-hidden h-48 group-hover:h-48 transition-all duration-300">
                                    <img
                                        src={offer.product.imageUrl}
                                        alt={offer.product.name}
                                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                {/* Szczegóły produktu - 3/4 szerokości ekranu */}
                                <div className="w-3/4 p-4 flex flex-col justify-center items-center">
                                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-sm group-hover:text-gray-600 transition-all duration-300">
                                        {offer.title}
                                    </h2>
                                    <p className="text-white group-hover:text-xs group-hover:text-gray-500 transition-all duration-300">
                                        <strong>Price:</strong> ${offer.price.toFixed(2)}
                                    </p>
                                    <p className="text-white group-hover:text-xs group-hover:text-gray-500 transition-all duration-300">
                                        <strong>Category:</strong> {offer.product.category.name}
                                    </p>
                                    <p className="text-white group-hover:text-xs group-hover:text-gray-500 transition-all duration-300">
                                        <strong>Seller:</strong> {offer.userFirstName} {offer.userLastName}
                                    </p>
                                </div>
                            </a>
                        </Link>
                    ))}
                </ul>
            </div>
        </DefaultLayout>
    );
};

export default Offers;
