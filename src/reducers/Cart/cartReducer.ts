import { CartActionTypes, CartState } from '@/types';
import { CartAction } from './cartActions';

const initialState: CartState = {
    items: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    let newState: CartState;

    switch (action.type) {
        case CartActionTypes.SET_CART:
            newState = {
                ...state,
                items: action.payload,
            };
            break;
        case CartActionTypes.CLEAR_CART:
            newState = {
                ...state,
                ...initialState,
            };
            localStorage.removeItem('cart');
            return newState;
        case CartActionTypes.REMOVE_ITEM:
            newState = {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
            break;
        case CartActionTypes.ADD_ITEM:
            newState = {
                ...state,
                items: [...state.items, { id: action.payload }],
            };
            break;
        default:
            return state;
    }

    localStorage.setItem('cart', JSON.stringify(newState.items));
    return newState;
};

export const loadInitialState = (): CartState => {
    const savedCart = localStorage.getItem('cart');
    return {
        items: savedCart ? JSON.parse(savedCart) : initialState.items,
    };
};

export default cartReducer;
