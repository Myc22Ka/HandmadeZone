import { useState, useEffect } from 'react';
import { Offer } from '@/interfaces/OfferInterface';
import { get } from '@/lib/axiosHelper';

const useOffers = (url: string, data: unknown) => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        get(url, data)
            .then(response => {
                setOffers(response.data);
            })
            .catch(() => setError('Failed to load offers'))
            .finally(() => setLoading(false));
        return;
    }, []);

    return { offers, loading, error };
};

export default useOffers;
