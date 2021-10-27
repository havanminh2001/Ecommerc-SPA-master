import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SpecialSale from './SpecialSale'
import SpecialBanner from './SpecialBanner';
import * as trans from '../Modules/Actions';
import { NavLink } from 'react-router-dom';
import { STORAGE } from '../../../../settings/configUrl';
import LazyLoad from 'react-lazyload';

const ProductComponent = ({ product, discount }) => {
    return product?.map(item => {
        const gift = discount.filter(gift => gift.id == item.product_id)[0];
        const sku = item.product_skus[0];
        const slug = item.slugs[0];
        return (
            <div className="col-md-4 col-12" key={item.id}>
                <div className="special__item">
                    <div className="special__image">
                        <LazyLoad
                            once={true}
                            placeholder={<img src={`${STORAGE}/products/${sku.sku_image}`} alt="*" />}
                        >
                            <img src={`${STORAGE}/products/${sku.sku_image}`} alt="*" />
                        </LazyLoad>
                        <div className="special__btn">
                            <NavLink to={`/detail/${slug.slug_url}`}>
                                <i className="lni lni-cart" />
                                Add to Cart
                            </NavLink>
                        </div>
                    </div>
                    <div className="special__info">
                        <p className="special__category">Smartphone</p>
                        <h4 className="special__name">
                            <NavLink to={`/detail/${slug.slug_url}`}>
                                {item.product_variant_name}
                            </NavLink>
                        </h4>
                        <ul className="special__review">
                            <li><i className="lni lni-star-filled" /></li>
                            <li><i className="lni lni-star-filled" /></li>
                            <li><i className="lni lni-star-filled" /></li>
                            <li><i className="lni lni-star-filled" /></li>
                            <li><span>4.0 Review(s)</span></li>
                        </ul>
                        <div className="special__price">
                            <span className="special__price--unit">
                                ${sku.sku_promotion_price}
                            </span>
                            <span className="special__price--promotion">
                                ${sku.sku_unit_price}
                            </span>
                        </div>
                        <div className="special__discount">
                            {gift?.discount_value && <span>Gift ${gift.discount_value}</span>}
                        </div>
                    </div>
                </div>
            </div>
        )
    })
}

export default function MainSpecial() {
    const { product, productDiscount } = useSelector(state => state.HomeReducer.special);
    const discount = useSelector(state => state.HomeReducer.discount);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!(Array.isArray(product) && product.length > 0)) {
            dispatch(trans.fetchProductDiscountAction());
        }
    }, []);
    return (
        <section className="special">
            <div className="container">
                <div className="special__title">
                    <h2>Special Offer</h2>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form.</p>
                </div>
                <div className="special__content">
                    <div className="row">
                        <div className="col-lg-8 col-12 special__left">
                            <div className="special__list">
                                {product.length > 0 ?
                                    <LazyLoad className="row">
                                        <ProductComponent product={product} discount={discount} />
                                    </LazyLoad>
                                    : ''}
                            </div>
                            <SpecialBanner />
                        </div>
                        <div className="col-lg-4 col-12 special__right">
                            <SpecialSale productDiscount={productDiscount} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
