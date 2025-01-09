import React, { useEffect, useReducer } from 'react';
import { createContext, useContext, useState } from 'react';
import { User } from '@/interfaces/UserInterface';
import { toast } from 'sonner';
import { ServerResponseCode, verify } from '@/lib/axiosHelper';
import cartReducer, { initialState } from '@/reducers/Cart/cartReducer';
import { CartItem } from '@/types';
import { addItemToCart, clearCart, removeItemFromCart, setCart } from '@/reducers/Cart/cartActions';

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

    cartActions: {
        set: (cart: CartItem[]) => void;
        clear: () => void;
        add: (offerId: number) => void;
        remove: (offerId: number) => void;
    };
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
    const [loading, setLoading] = useState<boolean>(true);
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    const set = (cart: CartItem[]) => dispatch(setCart(cart));

    const clear = () => dispatch(clearCart());

    const add = (offerId: number) => dispatch(addItemToCart(offerId));

    const remove = (offerId: number) => dispatch(removeItemFromCart(offerId));

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

                    const updatedUser: User = {
                        ...response.data,
                        shoppingCart: cart.cart, // get it from local storage
                    };

                    setUser(updatedUser);
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
        <AuthProviderContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                logout,
                isAuthenticated,
                loading,
                cartActions: {
                    set,
                    clear,
                    add,
                    remove,
                },
            }}
        >
            {!loading && children}
        </AuthProviderContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthProviderContext);

    if (context === undefined) throw new Error('useAuth must be used within a AuthProvider');

    return context;
};
