import { CART, TOTAL_CART } from '../../../settings/configUrl';
import * as constants from '../../Contants/User/CartConstants';

const initialState = {
    cart: [],
    loading: false
}

const CartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.cartLoading: {
            return { ...state, loading: payload };
        }
        case constants.fetchCartFail: {
            return { ...state, loading: payload };
        }
        case constants.fetchCartSuccess: {
            return { ...state, cart: payload };
        }
        case constants.createCart: {
            localStorage.removeItem(TOTAL_CART);
            let cart = [...state.cart];
            let index = cart.findIndex(cart => cart.id == payload.id);
            if (index !== -1) {
                cart[index].qty = parseInt(payload.qty);
            } else {
                cart.push(payload);
            }
            localStorage.setItem(TOTAL_CART, JSON.stringify(cart.length));
            return { ...state, cart, loading: false }
        }
        case constants.updateCart: {
            localStorage.removeItem(TOTAL_CART);
            let temp = [...state.cart];
            let index = temp.findIndex(cart => cart.id == payload.id);
            temp[index] = payload;
            localStorage.setItem(TOTAL_CART, JSON.stringify(temp.length));
            return { ...state, cart: temp, loading: false }
        }
        case constants.deleteCart: {
            let temp = [...state.cart];
            const index = temp.findIndex(cart => cart.id === payload);
            temp.splice(index, 1);
            localStorage.setItem(TOTAL_CART, temp.length);
            return { ...state, cart: temp, loading: false }
        }
        default:
            return state
    }
}

export default CartReducer
