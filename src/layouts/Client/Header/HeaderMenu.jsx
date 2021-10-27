import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderCategory from './HeaderCategory';
import MenuMobile from './MenuMobile';

export default function HeaderMenu() {
    const [menu, setMenu] = useState(false);
    useEffect(() => {
        window.addEventListener('resize', (e) => {
            if (e.target.innerWidth > 992) {
                setMenu(false);
            }
        })
        return () => {
            window.removeEventListener('resize', e => {

            });
        }
    }, []);
    return (
        <div className="header__bot d-flex align-items-center">
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-lg-8 col-6 header__categories d-flex">
                        <HeaderCategory />
                        <div className="header__bot--menu">
                            <ul className="header__bot--submenu">
                                <li className="header__bot--item">
                                    <a href="*" className="header__bot--link active">Home</a>
                                </li>
                                <li className="header__bot--item">
                                    <a href="*" className="header__bot--link dropdown">Products</a>
                                    <ul className="header__bot--parentMenu">
                                        <li>
                                            <a href="*">About Us</a>
                                        </li>
                                        <li>
                                            <a href="*">Login</a>
                                        </li>
                                        <li>
                                            <a href="*">Register</a>
                                        </li>
                                        <li>
                                            <a href="*">404 Error</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="header__bot--item">
                                    <a href="*" className="header__bot--link dropdown">Shops</a>
                                    <ul className="header__bot--parentMenu">
                                        <li>
                                            <a href="*">Shop Grid</a>
                                        </li>
                                        <li>
                                            <a href="*">Shop List</a>
                                        </li>
                                        <li>
                                            <a href="*">Shop Single</a>
                                        </li>
                                        <li>
                                            <NavLink to="/cart">Cart</NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li className="header__bot--item">
                                    <a href="*" className="header__bot--link">Blogs</a>
                                </li>
                                <li className="header__bot--item">
                                    <a href="*" className="header__bot--link">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div className="menu__mobile--btn d-lg-none">
                            <button onClick={() => setMenu(!menu)} style={{ display: menu ? 'none' : 'block' }}>
                                <i className="lni lni-menu" />
                            </button>
                            <button onClick={() => setMenu(!menu)} style={{ display: menu ? 'block' : 'none' }}>
                                <i className="lni lni-close" />
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-4 col-6  h-100">
                        <div className="header__social">
                            <h5>Follow Us:</h5>
                            <ul>
                                <li>
                                    <a href="*">
                                        <i className="lni lni-facebook-filled" />
                                    </a>
                                </li>
                                <li>
                                    <a href="*">
                                        <i className="lni lni-twitter-original" />
                                    </a>
                                </li>
                                <li>
                                    <a href="*">
                                        <i className="lni lni-instagram" />
                                    </a>
                                </li>
                                <li>
                                    <a href="*">
                                        <i className="lni lni-skype" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <MenuMobile menu={menu} />
            </div>
        </div>
    )
}
