import React from 'react'

export default function MainShipping() {
    return (
        <section className="shipping">
            <div className="container">
                <div className="row shipping__list">
                    <div className="col-lg-3 col-sm-6 p-0">
                        <div className="shipping__item">
                            <div className="shipping__icon">
                                <i className="lni lni-delivery" />
                            </div>
                            <div className="shipping__text">
                                <h5>Free Shipping</h5>
                                <p>On order over $99</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 p-0">
                        <div className="shipping__item">
                            <div className="shipping__icon">
                                <i className="lni lni-support" />
                            </div>
                            <div className="shipping__text">
                                <h5>24/7 Support</h5>
                                <p>Live Chat Or Call</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 p-0">
                        <div className="shipping__item">
                            <div className="shipping__icon">
                                <i className="lni lni-credit-cards" />
                            </div>
                            <div className="shipping__text">
                                <h5>Online Payment</h5>
                                <p>Secure Payment Services</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 p-0">
                        <div className="shipping__item">
                            <div className="shipping__icon">
                                <i className="lni lni-reload" />
                            </div>
                            <div className="shipping__text">
                                <h5>Easy Return</h5>
                                <p>Hassle Free Shopping</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
