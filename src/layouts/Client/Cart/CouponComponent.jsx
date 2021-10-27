import React from 'react'

export default function CouponComponent() {
    return (
        <>
            <div className="cart__coupon">
                <form action="*">
                    <input type="text" className="form-control" placeholder="Enter Your Coupon" />
                    <div className="coupon__btn">
                        <button>Apply Coupon</button>
                    </div>
                </form>
            </div>
        </>
    )
}
