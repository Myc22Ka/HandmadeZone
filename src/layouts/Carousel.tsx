import * as React from 'react';

import { CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';

interface CarouselDApiDemoProps {
    images: string[]; // Zestaw obrazów jako właściwość
}

export const CarouselDApiDemo: React.FC<CarouselDApiDemoProps> = ({ images }) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [carouselWidth] = React.useState(900);

    React.useEffect(() => {
        if (!api) return;

        api.on('select', () => {
            // Możesz obsłużyć zdarzenie wyboru slajdu tutaj
        });
    }, [api]);

    return (
        <div className="mx-auto" style={{ maxWidth: `${carouselWidth}px`, width: '100%' }}>
            <div className="relative">
                <Carousel setApi={setApi} className="w-full" style={{ height: '300px' }}>
                    <CarouselContent>
                        {images.map((src, index) => (
                            <CarouselItem key={index}>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <img
                                        src={src}
                                        alt={`Slide ${index + 1}`}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </CardContent>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute inset-x-0 -bottom-6 flex justify-between">
                        <CarouselPrevious>
                            <button className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700">←</button>
                        </CarouselPrevious>
                        <CarouselNext>
                            <button className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700">→</button>
                        </CarouselNext>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};
