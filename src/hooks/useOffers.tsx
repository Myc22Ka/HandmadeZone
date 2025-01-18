import { useState, useEffect } from 'react';
import { Offer } from '@/interfaces/OfferInterface';
import { post } from '@/lib/axiosHelper';

const useOffers = <T,>(url: string, data: T) => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url || !data) return;

        setLoading(true);
        post(url, data)
            .then(response => {
                setOffers(response.data);
            })
            .catch(() => setError('Failed to load offers'))
            .finally(() => setLoading(false));
    }, [url, data]);

    return { offers, loading, error };
};

export default useOffers;
