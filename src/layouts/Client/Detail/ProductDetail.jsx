import React, { useCallback, useEffect } from 'react'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'
import ProductRating from './ProductRating'
import ProductReview from './ProductReview'
import ProductSku from './ProductSku'
import * as actions from './Modules/Actions';

export default function ProductDetail(props) {
    let product = useSelector(state => state.ProductDetailReducer.product);
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(actions.fetchProductAction(params.slug));
    }, [params]);
    const redirect = useCallback((slug) => {
        redirectSlug(slug);
    }, []);
    const redirectSlug = (slug) => {
        history.push(slug);
    }
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
                                Product Detail
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="product__detail">
                <div className="container">
                    <div className="product__top">
                        <div className="product__top--content row">
                            <ProductImage />
                            <ProductSku redirect={redirect} />
                        </div>
                    </div>
                    <ProductInfo />
                    <div className="product__bot">
                        <div className="row">
                            <ProductRating />
                            <ProductReview />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
