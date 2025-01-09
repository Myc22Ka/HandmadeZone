import { CartItem, CartActionTypes } from '@/types';

export interface SetCartAction {
    type: CartActionTypes.SET_CART;
    payload: CartItem[];
}

export interface AddItemAction {
    type: CartActionTypes.ADD_ITEM;
    payload: number;
}

export interface RemoveItemAction {
    type: CartActionTypes.REMOVE_ITEM;
    payload: number;
}

export interface ClearCartAction {
    type: CartActionTypes.CLEAR_CART;
}

export type CartAction = AddItemAction | RemoveItemAction | SetCartAction | ClearCartAction;

export const setCart = (cart: CartItem[]): SetCartAction => ({
    type: CartActionTypes.SET_CART,
    payload: cart,
});

export const addItemToCart = (offerId: number): AddItemAction => ({
    type: CartActionTypes.ADD_ITEM,
    payload: offerId,
});

export const removeItemFromCart = (offerId: number): RemoveItemAction => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: offerId,
});

export const clearCart = (): ClearCartAction => ({
    type: CartActionTypes.CLEAR_CART,
});
