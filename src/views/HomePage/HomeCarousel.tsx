import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Offer {
    image: string;
    title: string;
}

interface HomeCarouselProps {
    offers: Offer[];
}

export const HomeCarousel: React.FC<HomeCarouselProps> = ({ offers }) => {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true })); // Autoplay co 3 sekundy

    return (
        <Carousel
            plugins={[plugin.current]}
            className="relative w-full overflow-hidden"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="flex">
                {offers.map((offer, index) => (
                    <CarouselItem key={index} className="flex-shrink-0 w-full h-[400px] relative">
                        {/* Obraz */}
                        <img src={offer.image} alt={offer.title} className="object-cover w-full h-full" />
                        {/* Nazwa oferty */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                            <h3 className="text-lg font-bold">{offer.title}</h3>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                Prev
            </CarouselPrevious>
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                Next
            </CarouselNext>
        </Carousel>
    );
};
