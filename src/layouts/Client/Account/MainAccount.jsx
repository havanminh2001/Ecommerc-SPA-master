import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import BreadCrumb from '../Breadcrumb/BreadCrumb';
import InfoAccount from './Info/InfoAccount';
import MenuAccount from './MenuAccount';
import PurchaseComponent from './Purchase/PurchaseComponent';
import PasswordAccount from './Info/PasswordAccount';
import { INFO } from '../../../settings/configUrl';

export default function MainAccount(props) {
    const path = useHistory().location.pathname;
    const user = JSON.parse(localStorage.getItem(INFO));
    return (
        <>
            <section className="purchase">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-2 purchase__info">
                            <div className="purchase__info--top">
                                <figure>
                                    <img src={process.env.PUBLIC_URL + "/assets/img/user.png"} alt="*" />
                                </figure>
                                <div className="purchase__info--action">
                                    <h4 className="purchase__info--name">{user.name}</h4>
                                    <div className="purchase__info--edit">
                                        <NavLink to="/account/profile">
                                            <i className="lni lni-pencil" />
                                            Edit Account
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <MenuAccount />
                        </div>
                        <div className="col-xl-10 purchase__content">
                            {
                                path === '/purchase' ? <PurchaseComponent /> : ''
                            }
                            {
                                path === '/account/profile' ? <InfoAccount /> : ''
                            }
                            {
                                path === '/account/password' ? <PasswordAccount /> : ''
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
