import React from 'react';
import { createContext, useContext, useState } from 'react';
import { User } from '@/interfaces/UserInterface';

type AuthProviderProps = {
    children: React.ReactNode;
};

type AuthProviderState = {
    user: User | null;
    token: string | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    isAuthenticated: boolean;
    logout: () => void;
};

const initUser: User = {
    id: 0,
    name: 'Bob',
    age: 22,
    email: 'testing@testing.com',
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(initUser); // initUser is only for testing purposes
    const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');
    };

    const isAuthenticated = Boolean(user) && JSON.stringify(user) !== JSON.stringify(initUser);

    return (
        <AuthProviderContext.Provider value={{ user, setUser, token, setToken, logout, isAuthenticated }}>
            {children}
        </AuthProviderContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthProviderContext);

    if (context === undefined) throw new Error('useAuth must be used within a AuthProvider');

    return context;
};
