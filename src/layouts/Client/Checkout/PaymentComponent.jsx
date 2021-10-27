import React, { memo, useState } from 'react'

function PaymentComponent(props) {
    const [payment, setPayment] = useState('direct');
    const handleActive = (payment, option) => {
        setPayment(option);
        props.getPaymentMethod(payment, option);
    }
    return (
        <>
            <div className="checkout__payment">
                <div className="checkout__payment--title">Payment Info</div>
                <div className="checkout__payment--content">
                    <h4 className="payment__title">Select Payment Option</h4>
                    <div className={payment === 'direct' ? 'payment__item active' : 'payment__item'} onClick={() => { handleActive(1, 'direct'); }}>
                        <img src="./assets/img/payment-method.png" alt="*" />
                        <h5 className="payment__category">Direct Payment</h5>
                    </div>
                    <div className={payment === 'paypal' ? 'payment__item active' : 'payment__item'} onClick={() => { handleActive(2, 'paypal'); }}>
                        <img src="./assets/img/paypal.png" alt="*" />
                        <h5 className="payment__category">Payment with PayPal</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(PaymentComponent);