import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useOffers from '@/hooks/useOffers';
import { Link } from 'react-router-dom';
import { encodeId } from '@/lib/utils';
import Timer from '../OffersPage/Timer';
import { OfferType } from '@/types';

export const HomeCarousel: React.FC = () => {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true })); // Autoplay co 3 sekundy
    const { offers } = useOffers('/api/offers/search', { status: 'ACTIVE' });

    return (
        <Carousel
            plugins={[plugin.current]}
            className="relative w-full overflow-hidden"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="flex">
                {offers.map((offer, index) => (
                    <CarouselItem
                        key={index}
                        className="flex-shrink-0 w-full h-[400px] relative rounded-lg overflow-hidden shadow-lg"
                    >
                        <Link
                            to={`/offers/details/${encodeId(offer.id.toString())}`}
                            className="relative block w-full h-full"
                        >
                            {/* Obraz */}
                            <img
                                src={offer.product.imageUrl}
                                alt={offer.product.name}
                                className="object-cover w-full h-full"
                            />

                            {/* Nazwa oferty na środku */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white p-10 text-center">
                                <h3 className="text-2xl font-semibold">{offer.title}</h3>
                            </div>

                            {/* Cena na dole */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 flex flex-row justify-between">
                                <h4 className="text-xl font-semibold">Price: {offer.price.toFixed(2)} zł</h4>
                                {offer.type === OfferType.AUCTION && <Timer offer={offer} />}
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 rounded-full p-2 shadow-md">Prev</CarouselPrevious>
            <CarouselNext className="absolute right-4 top-1/2 rounded-full p-2 shadow-md">Next</CarouselNext>
        </Carousel>
    );
};
