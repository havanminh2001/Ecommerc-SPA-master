import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

export default function HeaderCategory() {
    let categories = useSelector(state => state.HomeReducer.categories);
    let slugs = useSelector(state => state.HomeReducer.slugsProduct);
    const history = useHistory();
    const navigateProduct = (e, slug) => {
        e.preventDefault();
        history.push(`/product/${slug}`);
    }
    const renderCategories = () => {
        return categories?.map(item => {
            if (item.products.length > 0) {
                return (
                    <li key={item.id}>
                        <NavLink to={`/categories?q=${item.id}`}>
                            {item.categories_name}
                            <i className="lni lni-chevron-right" />
                        </NavLink>
                        <ul className="header__categories--submenu">
                            {
                                item.products.map(product => {
                                    const slug = slugs.filter(slg => slg.product_id == product.id);
                                    return (
                                        <li key={product.id}>
                                            <a onClick={(e) => { navigateProduct(e, slug[0].slug_url) }}>{product.product_name}</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </li>
                )
            }
            return (
                <li key={item.id}><NavLink to="">{item.categories_name}</NavLink></li>
            )
        });
    }
    return (
        <div className="header__bot--btn align-items-center">
            <span>
                <i className="lni lni-menu" />
                All categories
            </span>
            <ul className="header__categories--menu">
                {categories.length > 0 ? renderCategories() : ''}
            </ul>
        </div>
    )
}
