import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

export default function MenuMobile(props) {
    let categories = useSelector(state => state.HomeReducer.categories);
    let slugs = useSelector(state => state.HomeReducer.slugsProduct);
    const [visiable, setVisiable] = useState('');
    const history = useHistory();
    const navigateProduct = (e, slug) => {
        e.preventDefault();
        history.push(`/product/${slug}`);
    }
    const openSubMenu = (e, name) => {
        e.preventDefault();
        if (e.target.classList[1] && visiable) {
            setVisiable('');
        } else {
            setVisiable(name);
        }
    }
    const renderMenu = () => {
        return categories?.map(cate => {
            if (cate.products.length > 0) {
                return (
                    <li className="mobile__item" key={cate.id}>
                        <NavLink to="/" onClick={(e) => openSubMenu(e, cate.categories_name)}
                            className={visiable === cate.categories_name ? 'mobile__navlink navlink__active' : 'mobile__navlink'}>
                            {cate.categories_name}
                            <i className="fa fa-angle-down" />
                        </NavLink>
                        <ul className={visiable === cate.categories_name ? "mobile__submenu menu-active" : "mobile__submenu"}>
                            {
                                cate.products.map(product => {
                                    const slug = slugs.filter(slg => slg.product_id == product.id);
                                    return (
                                        <li key={product.id}>
                                            <a href="" onClick={(e) => navigateProduct(e, slug[0].slug_url)}>{product.product_name}</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </li>
                );
            }
            return (
                <li className="mobile__item" key={cate.id}>
                    <NavLink to="/" className="mobile__navlink">{cate.categories_name}</NavLink>
                </li>
            )
        })
    }
    return (
        <div className={props.menu ? 'header__mobile toggle__menu' : 'header__mobile'} >
            <ul className="mobile__menu">
                {categories.length > 0 ? renderMenu() : ''}
            </ul>
        </div>
    )
}
