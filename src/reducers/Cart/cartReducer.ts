import { CartActionTypes, CartItem, CartState } from '@/types';
import { CartAction } from './cartActions';

export const initialState: CartState = {
    cart: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case CartActionTypes.SET_CART:
            return {
                ...state,
                cart: action.payload,
            };
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                ...initialState,
            };
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        case CartActionTypes.ADD_ITEM:
            const newItem: CartItem = { id: action.payload };

            return {
                ...state,
                cart: [...state.cart, newItem],
            };
        default:
            return state;
    }
};

export default cartReducer;
