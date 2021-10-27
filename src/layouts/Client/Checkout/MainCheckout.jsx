import React, { useState, useCallback, useRef, useEffect } from 'react'
import BreadCrumb from '../Breadcrumb/BreadCrumb';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TransportComponent from './TransportComponent';
import PaymentComponent from './PaymentComponent';
import CustomerComponent from './CustomerComponent';
import CouponComponent from './CouponComponent';
import { SHOP_ID, DISTRICT_ID_FROM } from '../../../settings/config';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ACCESS_TOKEN, CART_LIST, INFO } from '../../../settings/configUrl';
import * as checkout from '../../../services/checkout';
import { Space, Spin } from 'antd';
import TotalComponent from './TotalComponent';

export default function MainCheckout(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem(INFO));
    const token = localStorage.getItem(ACCESS_TOKEN);
    const cart = useSelector(state => state.CartReducer.cart);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: 'onChange',
        resolver: yupResolver(checkout.schema),
    });
    const [data, setData] = useState({
        price_ship: 0,
        required: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);
    const paymentData = useRef({
        payment: 1,
        paymentOption: "direct",
    });
    useEffect(() => {
        const query = history.location.search;
        if (query.split('&').length > 2 && query) {
            paymentWithPayPal(query);
        } else if (query.split('?').length > 1) {
            paymentWithPayPalFails();
        }
    }, [history.location.search]);
    useEffect(() => {
        if (user) {
            const name = user.name.split(" ");
            setValue('firstName', name[0]);
            setValue('lastName', name[name.length - 1]);
            setValue('email', user.email);
            setValue('phone', user.phone);
        }
    }, []);
    const getTransport = useCallback((values, select) => getPriceShipping(values, select), []);
    const getPaymentMethod = useCallback((payment, option) => getPayment(payment, option), []);
    const paymentWithPayPal = async (query) => {
        const cart = JSON.parse(localStorage.getItem(CART_LIST));
        await checkout.checkoutWithPayPal(cart, query, [loading, setLoading], dispatch, history, user);
    }
    const paymentWithPayPalFails = async () => {
        await checkout.checkoutWithPayPalFails([loading, setLoading]);
    }
    const getPriceShipping = async (values, select) => {
        const ward = values.split('-');
        const distance = {
            shop_id: SHOP_ID,
            from_district: DISTRICT_ID_FROM,
            to_district: parseInt(select.district_id)
        }
        const service = await checkout.getServiceShip(cart, distance, ward[0]);
        await checkout.getPriceShip(service, [data, setData], select, ward);
    }
    const getPayment = (payment, option) => {
        paymentData.current = {
            payment,
            paymentOption: option
        }
    }
    const handleSubmitCheckout = (values) => {
        if (data.price_ship > 0) {
            if (user && token && cart.length > 0) {
                const obj = {
                    user_id: user.id,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    address: `${values.address} ${data.address}`,
                    paymentOption: paymentData.current.paymentOption,
                    payment: paymentData.current.payment,
                    totalPrice: checkout.totalPrice(cart, data),
                    transport_price: data.price_ship
                }
                checkout.submitCheckout(obj, cart, [loading, setLoading], dispatch, history, user);
            } else {
                history.push('/login');
            }
        } else {
            setData({ ...data, required: "Ward is required" });
        }
    }
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <BreadCrumb />
            <section className="checkout">
                <div className="container">
                    <form onSubmit={handleSubmit(handleSubmitCheckout)}
                        action="*" className="checkout__form">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="checkout__left">
                                    <CustomerComponent
                                        errors={errors}
                                        register={register}
                                        fields={checkout.fields} />
                                    <TransportComponent
                                        getTransport={getTransport}
                                        errors={errors}
                                        register={register}
                                        fields={checkout.fields}
                                        required={data.required} />
                                    <PaymentComponent getPaymentMethod={getPaymentMethod} />
                                </div>
                            </div>
                            <div className="col-lg-4 checkout__right">
                                <CouponComponent />
                                <div className="checkout__total">
                                    <h4 className="checkout__total--title">
                                        Pricing Table
                                    </h4>
                                    <TotalComponent cart={cart} data={data} />
                                    <div className="checkout__total--btn">
                                        <button type="submit">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
