import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import * as actions from './Modules/Actions';
import * as cartAct from '../../../redux/Actions/User/CartActions';
import moment from 'moment';
import { INFO, ACCESS_TOKEN } from '../../../settings/configUrl';
import { alertErrors } from '../../../settings/config';
import * as service from '../../../services/product';

function ProductSku(props) {
    const categories = useSelector(state => state.ProductDetailReducer.categories);
    const product = useSelector(state => state.ProductDetailReducer.product);
    const discount = useSelector(state => state.ProductDetailReducer.discount);
    const variant = useSelector(state => state.ProductDetailReducer.variants);
    const product_sku = useSelector(state => state.ProductDetailReducer.product_sku);
    const image = useSelector(state => state.ProductDetailReducer.image);
    const cart = useSelector(state => state.CartReducer.cart);
    const history = useHistory();
    const dispatch = useDispatch();

    const changeImage = (sku) => {
        dispatch(actions.changeImageAct(sku));
    }

    const addToCart = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem(INFO));
        const token = localStorage.getItem(ACCESS_TOKEN);
        // const inventory = image.inventory_managements[0];
        if (token && user) {
            const data = {
                sku_id: image.id,
                name: product.product_variant_name,
                unit_price: image.sku_unit_price,
                promotion_price: image.sku_promotion_price ? image.sku_promotion_price : 0,
                color: image.color,
                slug: variant.filter(variant => variant.id === product.id)[0].slug_url,
                discount: discount?.discount_value ? discount?.discount_value : 0,
                image: image.sku_image,
                qty: 1,
                user_id: user.id
            }
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            if (image.sku_qty > 0) {
                const temp = cart.filter(cart => parseInt(cart.sku_id) === image.id)[0];
                if (temp) {
                    const qty = parseInt(temp.qty);
                    if (qty >= 3) {
                        alertErrors('Sorry, Product is out of stock!');
                    } else {
                        dispatch(cartAct.createCartAction(formData));
                    }
                } else {
                    dispatch(cartAct.createCartAction(formData));
                }
            } else {
                alertErrors('Sorry, Product is out of stock!');
            }
        } else {
            history.push('/login', history.location.pathname);
        }
    }
    return (
        <>
            <div className="col-lg-6">
                <div className="product__top--info">
                    <div className="product__title">
                        <h3>{product?.product_variant_name}</h3>
                    </div>
                    <div className="product__category">
                        <h4>
                            <i className="lni lni-tag" />
                            Categories: <NavLink to={`/categories?q=${categories.id}`}>{categories?.categories_name}</NavLink>
                        </h4>
                    </div>
                    <div className="product__price">
                        <span className="product__price--promotion">${product_sku.length > 0 ? image.sku_promotion_price ? image.sku_promotion_price : image.sku_unit_price : 0}</span>
                        <span className="product__price--unit">{product_sku.length > 0 && image.sku_promotion_price ? `$ ${image.sku_unit_price}` : ''}</span>
                    </div>
                    <div className="product__rom">
                        {
                            variant.length > 0 ? service.renderRom(props, variant, product) : ''
                        }
                    </div>
                    <div className="product__color">
                        {
                            product_sku.length > 0 ? service.renderColor(dispatch, product_sku, image) : ''
                        }
                    </div>
                    <div className="product__discount">
                        {
                            discount?.id ?
                                <div className="product__discount--content">
                                    <h4>{discount.discount_name} {discount.discount_value}$</h4>
                                    <p>Prices and promotions are expected to apply until &nbsp;
                                        {moment(discount.discount_end).format('DD-MM-YYYY H:m')}
                                    </p>
                                </div> : ''
                        }
                    </div>
                    <form onSubmit={addToCart} className="product__action">
                        {/* <div className="product__action--quantity">
                            <input type="number" className="form-control" defaultValue={1} min={1} max={2} />
                        </div> */}
                        <div className="product__action--item">
                            <button className="product__btn--add">Add To Cart</button>
                        </div>
                        <div className="product__action--item">
                            <button className="product__btn--compare">
                                <i className="lni lni-reload" />
                                Compare
                            </button>
                        </div>
                        <div className="product__action--item">
                            <button className="product__btn--wishlist">
                                <i className="lni lni-heart" />
                                To Wishlist
                            </button>
                        </div>
                    </form>
                </div>
                <div className="product__top--banner">
                    <img src={process.env.PUBLIC_URL + '/assets/img/promotion.jpg'} alt="" />
                </div>
            </div>
        </>
    )
}

export default memo(ProductSku);