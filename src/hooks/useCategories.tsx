import { useState, useEffect } from 'react';
import { Category } from '@/interfaces/CategoryInterface';
import { request } from '@/lib/axiosHelper';
import { Method } from 'axios';

const useCategories = (method: Method, url: string, data: unknown) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        request(method, url, data)
            .then(response => {
                setCategories(response.data);
            })
            .catch(() => setError('Failed to load categories'))
            .finally(() => setLoading(false));
        return;
    }, []);

    return { categories, loading, error };
};

export default useCategories;
