import React from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import BreadCrumb from '../Breadcrumb/BreadCrumb';
import { useSelector, useDispatch } from 'react-redux';
import { STORAGE } from '../../../settings/configUrl';
import * as actions from '../../../redux/Actions/User/CartActions';
import * as service from '../../../services/checkout';
import { Popconfirm } from 'antd';
import CouponComponent from './CouponComponent';
import { alertErrors } from '../../../settings/config';

export default function MainCart() {
    const cart = useSelector(state => state.CartReducer.cart);
    const dispatch = useDispatch();
    const history = useHistory();
    const redirectSku = (e, slug) => {
        e.preventDefault();
        history.push(`/detail/${slug}`);
    }
    const updateCart = (cart, isBool) => {
        const formData = new FormData();
        if (isBool) {
            formData.append('qty', 1);
            if (cart.qty >= 2) {
                alertErrors('Sorry, Product is out of stock!');
            } else {
                dispatch(actions.updateCartAction(cart.id, formData));
            }
        } else {
            if (cart.qty > 1) {
                formData.append('qty', -1);
                dispatch(actions.updateCartAction(cart.id, formData));
            }
        }
    }
    const handleChangeQuantity = async (e, cart) => {
        if (e.target.value) {
            if (parseInt(e.target.value) > 2) {
                const formData = new FormData();
                formData.append('qty', e.target.value);
                await dispatch(actions.updateCartAction(cart.id, formData));
                e.target.value = cart.qty;
            } else {
                alertErrors('Sorry, Product is out of stock!');
            }
        }
    }
    const renderCart = () => {
        return cart?.map(cart => {
            return (
                <div className="cart__item" key={cart.id}>
                    <div className="row align-items-center">
                        <div className="col-lg-1 col-md-1 product__image">
                            <a href="*">
                                <img src={`${STORAGE}/products/${cart.image}`} alt="*" />
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-3 cart__product">
                            <div className="product__text">
                                <h3 className="product__name">
                                    <a href="*" onClick={(e) => redirectSku(e, cart.slug)}>{cart.name}</a>
                                </h3>
                                <div className="product__desc">
                                    <p className="product__memory">
                                        Price: <span>${
                                            cart.promotion_price > 0 ? cart.promotion_price : cart.unit_price
                                        }
                                        </span>
                                    </p>
                                    <p className="product__color">
                                        Color: <span>{cart.color}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 cart__quantity">
                            <div className="quantity__content">
                                <button className="quantity__btn desrease"
                                    onClick={() => updateCart(cart, false)}>-</button>
                                <input type="text"
                                    className="quantity__value"
                                    defaultValue={cart.qty}
                                    onBlur={(e) => handleChangeQuantity(e, cart)}
                                    key={cart.qty} min="1" max="10" />
                                <button className="quantity__btn insrease" onClick={() => updateCart(cart, true)}>+</button>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 cart__subtotal">
                            <p>${cart.promotion_price > 0 ? cart.promotion_price * cart.qty : cart.unit_price * cart.qty}</p>
                        </div>
                        <div className="col-lg-2 col-md-2 cart__discount">
                            <p>{cart.discount > 0 ? `$${cart.discount}` : '-'}</p>
                        </div>
                        <div className="col-lg-1 col-md-2 cart__action">
                            <Popconfirm
                                placement="bottomRight"
                                title="You want to delete?"
                                onConfirm={() => { dispatch(actions.deleteCartAction(cart.id)) }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="*" title="Delete">
                                    <i className="lni lni-close" />
                                </a>
                            </Popconfirm>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <>
            <BreadCrumb />
            <section className="shopping_cart">
                <div className="container">
                    <div className="cart__content">
                        <div className="cart__head">
                            <div className="cart__title">
                                <div className="row">
                                    <div className="col-lg-1 col-md-1 col-12" />
                                    <div className="col-lg-4 col-md-3 col-12">
                                        <p>Product Name</p>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-12">
                                        <p>Quantity</p>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-12">
                                        <p>Subtotal</p>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-12">
                                        <p>Discount</p>
                                    </div>
                                    <div className="col-lg-1 col-md-2 col-12">
                                        <p>Action</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cart__list">
                                {cart.length > 0 ? renderCart() :
                                    <div className="cart__item">
                                        <p className="cart__empty">Cart Empty</p>
                                    </div>}
                            </div>
                        </div>
                        <div className="cart__bot">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 col-12">
                                    <CouponComponent />
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="total__amount">
                                        <ul>
                                            <li>Cart Subtotal <span>${cart.length > 0 ? service.subTotalPrice(cart) : 0}</span></li>
                                            <li>You Save <span>${cart.length > 0 ? service.totalDiscount(cart) : 0}</span></li>
                                            <li>You Pay <span>${cart.length > 0 ? service.totalPrice(cart) : 0}</span></li>
                                        </ul>
                                        <div className="total__amount--btn">
                                            {
                                                cart.length > 0 ? <NavLink to="/checkout" className="total__checkout">Checkout</NavLink> :
                                                    <NavLink to="/login" className="total__checkout">Checkout</NavLink>
                                            }
                                            <NavLink to="/" className="total__continue">Continue shopping</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
