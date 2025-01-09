// Dimensions type
export interface Dimensions {
    height: number;
    width: number;
    depth: number;
    unit: string;
}

// Weight type
export interface Weight {
    amount: number;
    unit: string;
}

export enum CartActionTypes {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
    CLEAR_CART = 'CLEAR_CART',
    SET_CART = 'SET_CART',
}

export interface CartItem {
    id: number;
}

export interface CartState {
    items: CartItem[];
}

export enum OfferType {
    AUCTION = 'AUCTION',
    QUICK_PURCHASE = 'QUICK_PURCHASE',
}

export enum OfferStatus {
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    PENDING = 'PENDING',
}
