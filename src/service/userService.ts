interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export const postUser = async <T>(user: T): Promise<FetchState<T>> => {
    const fetchState: FetchState<T> = {
        data: null,
        loading: true,
        error: null,
    };

    try {
        const response = await fetch(
            `http://${import.meta.env.VITE_PLATFORM_URL}:${import.meta.env.VITE_BACKEND_PORT}/api/users`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            }
        );

        if (!response.ok) throw new Error('Failed to post user');

        const data = await response.json();
        fetchState.data = data;

        return fetchState;
    } catch (error: unknown) {
        if (error instanceof Error) {
            fetchState.error = 'Error posting user: ' + error.message;
        } else {
            fetchState.error = 'An unknown error occurred while posting the user.';
        }

        return fetchState;
    } finally {
        fetchState.loading = false;
    }
};
