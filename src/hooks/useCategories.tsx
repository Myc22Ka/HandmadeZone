import { useState, useEffect } from 'react';
import { Category } from '@/interfaces/CategoryInterface';
import { get } from '@/lib/axiosHelper';

const useCategories = (url: string, data: unknown) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        get(url, data)
            .then(response => {
                setCategories(Array.isArray(response.data) && response.data.length > 0 ? response.data : []);
            })
            .catch(() => setError('Failed to load categories'))
            .finally(() => setLoading(false));
        return;
    }, []);

    return { categories, loading, error };
};

export default useCategories;
