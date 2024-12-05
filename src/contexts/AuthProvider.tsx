import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/interfaces/UserInterface';

type AuthProviderProps = {
    children: React.ReactNode;
    defaultUser?: User;
    storageKey?: string;
};

type AuthProviderState = {
    user: User;
    setUser: (user: User) => void;
};

const initUser: User = {
    id: 0,
    name: 'Bob',
    age: 22,
    email: 'testing@testing.com',
};

export const initialState: AuthProviderState = {
    user: initUser,
    setUser: () => null,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children, defaultUser = initUser }: AuthProviderProps) {
    const [user, setUser] = useState<User>(defaultUser);

    return <AuthProviderContext.Provider value={{ user, setUser }}>{children}</AuthProviderContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthProviderContext);

    if (context === undefined) throw new Error('useAuth must be used within a AuthProvider');

    return context;
};
