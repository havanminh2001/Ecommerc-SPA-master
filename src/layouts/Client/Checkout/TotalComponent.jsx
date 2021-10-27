import React, { memo } from 'react'
import * as checkout from '../../../services/checkout';

function TotalComponent(props) {
    const { cart, data } = props;
    return (
        <>
            <div className="checkout__subtotal--price">
                <div className="checkout__subtotal--item sub-total">
                    Subotal Price: <span>${cart.length > 0 ? checkout.subTotalPrice(cart) : 0}</span>
                </div>
                <div className="checkout__subtotal--item shipping-total">
                    Price Shipping: <span>${data.price_ship}</span>
                </div>
                <div className="checkout__subtotal--item discount-total">
                    Total Promotion: <span>${cart.length > 0 ? checkout.totalDiscount(cart) : 0}</span>
                </div>
                <div className="checkout__subtotal--item total-price">
                    Total Price: <span>${cart.length > 0 ? checkout.totalPrice(cart, data) : 0}</span>
                </div>
            </div>
        </>
    )
}

export default memo(TotalComponent);
