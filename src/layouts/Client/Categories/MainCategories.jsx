import React from 'react'
import MainSidebar from '../Sidebar/MainSidebar'
import SeachProduct from './SeachProduct'
import NavsProduct from './NavsProduct';
import { NavLink } from 'react-router-dom';

export default function MainCategories() {
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
                                Categories
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
