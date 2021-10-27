import { apiTransport, callApi, apiCheckout } from '../utils/callApi';
import { alertErrors, get_service_id, get_price_ship, DISTRICT_ID_FROM, STATUS_SUCCESS } from '../settings/config';
import { CART_LIST, ORDER, TOTAL_CART } from '../settings/configUrl';
import * as yup from 'yup';
import * as actions from '../redux/Actions/User/CartActions';
import * as purchase from '../layouts/Client/Account/Modules/Actions';

export const subTotalPrice = (cart) => {
    return cart?.reduce((total, cart) => {
        return total += (cart.promotion_price > 0 ? cart.promotion_price : cart.unit_price) * cart.qty;
    }, 0);
}
export const totalDiscount = (cart) => {
    return cart?.reduce((total, cart) => {
        return total += cart.discount ? cart.discount * cart.qty : 0;
    }, 0);
}

export const totalPrice = (cart, data = null) => {
    if (data) {
        return subTotalPrice(cart) - totalDiscount(cart) + data.price_ship;
    }
    return subTotalPrice(cart) - totalDiscount(cart);
}

export const getServiceShip = async (cart, distance, ward) => {
    try {
        const res = await apiTransport(get_service_id, 'post', distance);
        const service = res.data.data[0];
        const data = {
            service_id: service.service_id,
            insurance_value: subTotalPrice(cart) - totalDiscount(cart),
            to_ward_code: ward,
            to_district_id: distance.to_district,
            from_district_id: DISTRICT_ID_FROM,
            weight: 225,
            length: 16,
            width: 8,
            height: 1
        }
        return data;
    } catch (e) {
        alertErrors('Sorry, Server errors please try again!');
    }
}

export const getPriceShip = async (form, [data, setData], select, ward) => {
    try {
        const res = await apiTransport(get_price_ship, 'post', form);
        setData({
            ...data,
            price_ship: Math.ceil((res.data.data.total / 22771) * 3),
            required: "",
            address: `${ward[1]} ${select.district_name} ${select.province_name}`
        });
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
        }
    }
}

export const submitCheckout = async (obj, cart, [loading, setLoading], dispatch, history, user) => {
    try {
        const formData = new FormData();
        for (const key in obj) {
            formData.append(key, obj[key]);
        }
        let temp = [];
        cart.forEach(element => {
            formData.append('cart[]', element.id);
            temp.push(element.id);
        });
        localStorage.setItem(CART_LIST, JSON.stringify(temp));
        setLoading(true);
        if (obj.payment == 2) {
            const res = await callApi('api/checkout/paypal/create', 'post', formData);
            localStorage.setItem(ORDER, res.data.order_id);
            window.location.replace(res.data.redirect);
        } else {
            const res = await callApi('api/checkout/create', 'post', formData);
            if (res.data.status_code == STATUS_SUCCESS) {
                localStorage.setItem(TOTAL_CART, 0);
                localStorage.removeItem(CART_LIST);
                setLoading(false);
                dispatch(actions.fetchSuccessAct([]));
                dispatch(purchase.fetchAllPurchaseAction(user.id));
                // dispatch(purchase.fetchPurchaseForStatusAction(user.id, "1"));
                dispatch(purchase.createPurchase(res.data.data));
                history.push('/purchase', "Checkout success");
            }
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            setLoading(false);
        }
    }
}

export const checkoutWithPayPal = async (cart, query, [loading, setLoading], dispatch, history, user) => {
    try {
        const paymentId = query.split('&')[0].split('=')[1];
        const payerId = query.split('&')[2].split('=')[1];
        const order_id = localStorage.getItem(ORDER);
        const user_id = user.id;
        const obj = { paymentId, payerId, order_id, user_id };
        const formData = new FormData();
        for (const key in obj) {
            formData.append(key, obj[key]);
        }
        cart.forEach(item => {
            formData.append('cart[]', item);
        });
        setLoading(true);
        const res = await apiCheckout(`api/checkout/paypal/execute`, 'post', formData);
        if (res.data.state === "approved" && res.data.status === "VERIFIED" && res.data.status_code == 200) {
            localStorage.setItem(TOTAL_CART, 0);
            localStorage.removeItem(ORDER);
            localStorage.removeItem(CART_LIST);
            dispatch(actions.fetchSuccessAct([]));
            dispatch(purchase.fetchAllPurchaseAction(user.id));
            dispatch(purchase.createPurchase(res.data.data));
            // dispatch(purchase.fetchPurchaseForStatusAction(user.id, "2"));
            setLoading(false);
            history.push('/purchase', "Checkout success");
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            setLoading(false);
        }
    }
}

export const checkoutWithPayPalFails = async ([loading, setLoading]) => {
    const order_id = localStorage.getItem(ORDER);
    try {
        const res = await apiCheckout(`api/checkout/delete/${order_id}`);
        if (res.data.status_code == STATUS_SUCCESS) {
            localStorage.removeItem(ORDER);
            localStorage.removeItem(CART_LIST);
            alertErrors(res.data.message);
        }
    } catch (e) {
        alertErrors('Sorry, Server errors please try again!');
        setLoading(false);
    }
}

export const schema = yup.object().shape({
    firstName: yup.string().max(50, 'Maximum 50 character').required('First name is required'),
    lastName: yup.string().max(50, 'Maximum 50 character').required('Last name is required'),
    email: yup.string().max(100, 'Maximum 100 character').email('Email must be a valid email').required('Email is required'),
    address: yup.string().max(254, 'Maximum 254 character').required('Address is required'),
    phone: yup.string().required('Number phone is required').matches(new RegExp(/(0)[0-9]{9}/), 'Number phone start 0 and maximum 10 number')
});

export const fields = Object.keys(schema.fields).reduce((obj, field) => {
    return { ...obj, [field]: field };
}, {});