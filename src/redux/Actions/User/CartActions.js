import { apiCart } from '../../../services/clientApi';
import { alertErrors, alertSuccess, STATUS_SUCCESS } from '../../../settings/config';
import { TOTAL_CART } from '../../../settings/configUrl';
import * as constants from '../../Contants/User/CartConstants';

export const loadingCartAct = payload => ({
    type: constants.cartLoading,
    payload
});

export const fetchSuccessAct = payload => ({
    type: constants.fetchCartSuccess,
    payload
});

export const fetchFailAct = payload => ({
    type: constants.fetchCartFail,
    payload
});

export const createCartAct = payload => ({
    type: constants.createCart,
    payload
});

export const updateCartAct = payload => ({
    type: constants.updateCart,
    payload
});


export const deleteCartAct = payload => ({
    type: constants.deleteCart,
    payload
});

export const fetchCartAction = (ip) => async (dispatch) => {
    try {
        const res = await apiCart.fetchCart(ip);
        if (res.data.status_code == STATUS_SUCCESS) {
            dispatch(fetchSuccessAct(res.data.data));
        }
    } catch (e) {
        dispatch(fetchFailAct(false));
    }
}

export const createCartAction = (data) => async (dispatch) => {
    dispatch(loadingCartAct(true));
    setTimeout(() => {
        alertSuccess('Add product success');
        dispatch(loadingCartAct(false));
    }, 300);
    try {
        const res = await apiCart.createCart(data);
        dispatch(createCartAct(res.data.data));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingCartAct(false));
        }
    }
}

export const updateCartAction = (id, data) => async (dispatch) => {
    dispatch(loadingCartAct(true));
    try {
        const res = await apiCart.updateCart(id, data);
        if (res.data.status_code == STATUS_SUCCESS) {
            dispatch(updateCartAct(res.data.data));
            alertSuccess('Update cart item success');
        } else {
            dispatch(loadingCartAct(false));
            alertErrors(res.data.message);
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingCartAct(false));
        }
    }
}

export const deleteCartAction = (id) => async (dispatch) => {
    try {
        const uid = id;
        dispatch(loadingCartAct(true));
        setTimeout(() => {
            dispatch(deleteCartAct(id));
            alertSuccess('Delete cart item success');
        }, 200);
        await apiCart.deleteCart(uid);
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingCartAct(false));
        }
    }
}