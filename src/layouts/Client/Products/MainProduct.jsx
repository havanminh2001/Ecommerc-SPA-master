import React from 'react'
import { NavLink } from 'react-router-dom';
import MainSidebar from '../Sidebar/MainSidebar';
import NavsProduct from './NavsProduct';
import SeachProduct from './SeachProduct';

export default function MainProduct() {
    return (
        <>
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb__content">
                        <ul className="breadcrumb__list">
                            <li className="breadcrumb__item">
                                <NavLink className="breadcrumb__navlink" to="/">
                                    <i className="lni lni-home" />
                                    Home
                                </NavLink>
                            </li>
                            <li className="breadcrumb__item">
                                Product
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="product__grid">
                <div className="container">
                    <div className="row">
                        <MainSidebar />
                        <div className="col-lg-9">
                            <SeachProduct />
                            <NavsProduct />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
