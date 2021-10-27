import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { STORAGE } from '../../../settings/configUrl';
import * as actions from './Modules/Actions';

export default function ProductImage() {
    const product_sku = useSelector(state => state.ProductDetailReducer.product_sku);
    const image = useSelector(state => state.ProductDetailReducer.image);
    const dispatch = useDispatch();
    const handleChangeImage = (sku) => {
        dispatch(actions.changeImageAct(sku));
    }
    const renderListImage = () => {
        return product_sku?.map((sku, index) => {
            return (
                <div className="gallery_image--item" key={sku.id} onClick={() => { handleChangeImage(sku) }}>
                    <img src={`${STORAGE}/products/${sku.sku_image}`} className={image?.id == sku.id ? 'img-active' : ''} alt="*" />
                    <div className="gallery_image--title">
                        <span>{sku.sku_color}</span>
                    </div>
                </div>
            )
        })
    }
    return (
        <>
            <div className="col-lg-6">
                <div className="product__image">
                    <div className="product__gallery">
                        <div className="product__gallery--image">
                            <img src={product_sku.length > 0 ?
                                `${STORAGE}/products/${image.sku_image}` :
                                process.env.PUBLIC_URL + "/assets/img/product-4.jpg"
                            } alt="*" />
                        </div>
                        <div className="gallery_image--list">
                            {product_sku.length > 0 ? renderListImage() : ''}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
