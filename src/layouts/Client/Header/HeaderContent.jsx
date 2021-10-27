import React from 'react'
import { NavLink } from 'react-router-dom';
import CartComponent from './CartComponent';
import HeaderSeach from './HeaderSeach';

export default function HeaderContent() {
    return (
        <div className="header__middle">
            <div className="container">
                <div className="row align-items-center header__middle--content">
                    <div className="col-lg-3 col-md-4 col-6  header__middle--left">
                        <NavLink to="/" className="navbar-brand">
                            <img src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="*" />
                        </NavLink>
                    </div>
                    <HeaderSeach />
                    <CartComponent />
                </div>
            </div>
        </div>
    )
}
