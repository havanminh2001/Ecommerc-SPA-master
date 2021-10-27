import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function CategoryComponent() {
    const categories = useSelector(state => state.HomeReducer.categories);
    const count = useSelector(state => state.ProductClientReducer.categories);
    const history = useHistory();
    const redirectCategories = (e, id) => {
        e.preventDefault();
        history.push(`/categories?q=${id}`);
    }
    const renderCategories = () => {
        return categories?.map((cate, index) => {
            const countCategories = count.filter(item => item.id == cate.id)[0];
            return (
                <li key={cate.id}>
                    <a href="" onClick={(e) => redirectCategories(e, cate.id)}>
                        {cate.categories_name} ({countCategories?.products_count ? countCategories?.products_count : 0})
                    </a>
                </li>
            )
        })
    }
    return (
        <>
            <div className="product__widget">
                <h3>All Categories</h3>
                <ul className="product__widget--list">
                    {categories.length > 0 ? renderCategories() : ''}
                </ul>
            </div>
        </>
    )
}
