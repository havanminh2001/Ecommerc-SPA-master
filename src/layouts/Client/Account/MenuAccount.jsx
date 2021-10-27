import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';

export default function MenuAccount(props) {
    const history = useHistory();
    return (
        <>
            <ul className="purchase__info--bot">
                <li className="purchase__navItem">
                    <NavLink to="/account/profile" className="purchase__navlink">
                        <i className="lni lni-user" />
                        My Account
                    </NavLink>
                    <ul className={history.location.pathname.split("/")[1] === 'account' ? "purchase__menu purchase__menu--active" : "purchase__menu"}>
                        <li className="nav__item">
                            <NavLink to="/account/profile" className={history.location.pathname === '/account/profile' ? "nav__link active" : "nav__link"}>My Infomation</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/account/password" className={history.location.pathname === '/account/password' ? "nav__link active" : "nav__link"}>Change Password</NavLink>
                        </li>
                    </ul>
                </li>
                <li className="purchase__navItem">
                    <NavLink to="/purchase" className={history.location.pathname === '/purchase' ? "purchase__navlink purchase__navlink--active" : "purchase__navlink"}>
                        <i className="lni lni-cart" />
                        Purchase Order
                    </NavLink>
                </li>
                <li className="purchase__navItem">
                    <NavLink to="/purchase" className={history.location.pathname === '/notification' ? "purchase__navlink purchase__navlink--active" : "purchase__navlink"}>
                        <i className="fa fa-bell" />
                        Notification
                    </NavLink>
                </li>
            </ul>
        </>
    )
}
