import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { User } from '@/interfaces/UserInterface';
import { toast } from 'sonner';
import { ServerResponseCode, verify } from '@/lib/axiosHelper';

type AuthProviderProps = {
    children: React.ReactNode;
};

type AuthProviderState = {
    user: User | null;
    token: string | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    isAuthenticated: boolean;
    loading: boolean;
    logout: () => void;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
    const [loading, setLoading] = useState<boolean>(true);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');

        toast.info('You have successfully logged out.');
    };

    const isAuthenticated = Boolean(user);

    const autoLogin = () => {
        if (token) {
            verify('POST', '/validate-token', { token })
                .then(response => {
                    if (response.status !== ServerResponseCode.SUCCESS) toast.error('Nieprawidłowy token lub wygasł');

                    setUser(response.data);
                })
                .catch(() => logout())
                .finally(() => setLoading(false));
            return;
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!user && token) {
            autoLogin();
            return;
        }

        setLoading(false);
    }, [user, token]);

    return (
        <AuthProviderContext.Provider value={{ user, setUser, token, setToken, logout, isAuthenticated, loading }}>
            {!loading && children}
        </AuthProviderContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthProviderContext);

    if (context === undefined) throw new Error('useAuth must be used within a AuthProvider');

    return context;
};
