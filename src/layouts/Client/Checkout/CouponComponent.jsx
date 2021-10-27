import React from 'react'

export default function CouponComponent() {
    return (
        <>
            <div className="checkout__coupon">
                <h4 className="checkout__coupon--title">Appy Coupon to get discount!</h4>
                <div className="input-group">
                    <input type="text" className="form-control" />
                    <button className="btn btn-primary">Apply</button>
                </div>
            </div>
        </>
    )
}
