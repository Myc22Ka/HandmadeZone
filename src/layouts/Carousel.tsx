import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';

export function CarouselDApiDemo() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [carouselWidth] = React.useState(900);

    // Tablica obrazów
    const images = [
        '/src/assets/imgs/texture-1909992_1280.jpg',
        '/src/assets/imgs/deer-3275594_1280.jpg',
        '/src/assets/imgs/leaves-7463742_1280.png',
        '/src/assets/imgs/monster-4271569_1280.png',
        '/src/assets/imgs/strawberries-7249448_1280.jpg',
        '/src/assets/imgs/monstera-7687340_1280.jpg',
    ];

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="mx-auto" style={{ maxWidth: `${carouselWidth}px`, width: '100%' }}>
            <div className="relative">
                <Carousel setApi={setApi} className="w-full" style={{ height: '300px' }}>
                    <CarouselContent>
                        {images.map((src, index) => (
                            <CarouselItem key={index}>
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <img
                                            src={src}
                                            alt={`Slide ${index + 1}`}
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </CardContent>
                                </Card>
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
            <div className="py-2 text-center text-sm text-muted-foreground">
                Slide {current} of {count}
            </div>
        </div>
    );
}
