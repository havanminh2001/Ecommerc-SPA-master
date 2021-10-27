import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ACCESS_TOKEN, INFO, STORAGE, TOTAL_CART } from '../../../settings/configUrl';
import * as action from '../../../redux/Actions/User/CartActions';
import LazyLoad from 'react-lazyload';

const Cart = ({ cart }) => {
    const dispatch = useDispatch();
    const removeCartItem = (e, id) => {
        e.preventDefault();
        dispatch(action.deleteCartAction(id));
    }
    return cart?.map(cart => {
        return (
            <li key={cart.id}>
                <div className="header__cart--image">
                    <NavLink to={cart.slug}>
                        <LazyLoad
                            placeholder={<img src={`${STORAGE}/products/${cart.image}`} alt="*" />}>
                            <img src={`${STORAGE}/products/${cart.image}`} alt="*" />
                        </LazyLoad>
                    </NavLink>
                </div>
                <div className="header__cart--content">
                    <h4>
                        <NavLink to={`/detail/${cart.slug}`}>{cart.name}</NavLink>
                    </h4>
                    <p>
                        <span className="header__cart--quantity">{cart.qty}x</span>
                        <span className="header__cart--amount">
                            ${cart.promotion_price > 0 ? cart.promotion_price : cart.unit_price}
                        </span>

                    </p>
                    <div className="header__cart--color">
                        <span>Color:{cart.color}</span>
                    </div>
                    {
                        cart.discount > 0 ?
                            <div className="header__cart--gift">
                                <span>Voucher {cart.discount}$</span>
                            </div>
                            : ''
                    }
                </div>
                <div className="header__cart--action">
                    <a href="*" title="Remove" onClick={(e) => {
                        removeCartItem(e, cart.id)
                    }}>
                        <i className="lni lni-close" />
                    </a>
                </div>
            </li>
        )
    })
}


export default function CartComponent(props) {
    const user = JSON.parse(localStorage.getItem(INFO));
    const token = localStorage.getItem(ACCESS_TOKEN);
    const cart = useSelector(state => state.CartReducer.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user && token) {
            if (Array.isArray(cart) && !cart.length > 0) {
                dispatch(action.fetchCartAction(user.id));
            }
        }
    }, []);
    const calculatorCart = () => {
        return cart?.reduce((total, cart) => {
            if (cart.promotion_price > 0) {
                return total += parseFloat(cart.qty * cart.promotion_price) - parseFloat(cart.discount * cart.qty);
            } else {
                return total += parseFloat(cart.qty * cart.unit_price) - parseFloat(cart.discount * cart.qty);
            }
        }, 0);
    }
    return (
        <div className="col-lg-4 col-md-2 col-6 header__middle--right d-flex">
            <div className="header__middle--hotline d-lg-flex justify-content-end">
                <i className="lni lni-phone" />
                <h3>Hotline:<br />
                    <span>(+100) 123 456 7890</span>
                </h3>
            </div>
            <div className="header__middle--cart d-flex justify-content-end">
                <div className="header__middle--item">
                    <a href="*" onClick={(e) => { e.preventDefault() }} className="header__middle--navlink">
                        <i className="lni lni-heart" />
                        <span className="header__middle--total">0</span>
                    </a>
                </div>
                <div className="header__middle--item">
                    <a href="*" onClick={(e) => { e.preventDefault() }} className="header__middle--navlink">
                        <i className="lni lni-cart" />
                        <span className="header__middle--total">{cart.length > 0 ? cart.length : localStorage.getItem(TOTAL_CART) ? localStorage.getItem(TOTAL_CART) : 0}</span>
                    </a>
                    <div className="header__middle--shopping">
                        <div className="header__cart--header">
                            <span>{cart.length > 0 ? cart.length : 0} Items</span>
                            <a href="*">View Cart</a>
                        </div>
                        <div className="header__cart--list">
                            <ul>
                                {cart.length > 0 ?
                                    <LazyLoad>
                                        <Cart cart={cart} />
                                    </LazyLoad> :
                                    <h5 className="text-center empty">Cart empty</h5>}
                            </ul>
                        </div>
                        <div className="header__cart--footer">
                            <div className="header__cart--total">
                                <span>Total</span>
                                <span className="header__cart--totalAmount">
                                    ${cart.length > 0 ? calculatorCart() : 0}
                                </span>
                            </div>
                            <div className="header__cart--btn">
                                {
                                    user && token ?
                                        <NavLink to="/cart" className="btn btn-primary">Checkout</NavLink> :
                                        <NavLink to="/login" className="btn btn-primary">Checkout</NavLink>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
