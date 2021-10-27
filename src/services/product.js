import * as actions from '../layouts/Client/Detail/Modules/Actions';

const styled = {
    pointerEvents: "none",
    opacity: 0.5
}

export const renderRom = (props, variant, product) => {
    return variant?.map((item, index) => {
        if (item.id === product.id) {
            return (
                <div className="product__rom--item rom-active" key={item.id} onClick={() => { props.redirect(item.slugs[0].slug_url) }}>
                    <span>{item.product_variant_rom}GB</span>
                </div>
            )
        } else {
            return (
                <div className="product__rom--item" key={item.id} onClick={() => { props.redirect(item.slugs[0].slug_url) }}>
                    <span>{item.product_variant_rom}GB</span>
                </div>
            )
        }
    });
}

export const renderColor = (dispatch, product_sku, image) => {
    return product_sku?.map((item, index) => {
        if (item.sku_qty > 0) {
            return (
                <div className={image.id == item.id ? "product__color--item color-active" : "product__color--item"} key={item.id}
                    onClick={() => dispatch(actions.changeImageAct(item))}>
                    <span>{item.color}</span>
                </div>
            )
        } else {
            return (
                <div className="product__color--item" key={item.id} style={styled}>
                    <span>{item.color}</span>
                </div>
            )
        }
    })
}

export const calculator = (key, data) => {
    let count = 0;
    switch (key) {
        case '0': {
            data.forEach(item => {
                const product = item.product_skus[0];
                if (product.sku_unit_price >= 50 && product.sku_unit_price < 101) {
                    ++count;
                }
            });
            return count;
        }
        case '1': {
            data.forEach(item => {
                const product = item.product_skus[0];
                if (product.sku_unit_price > 100 && product.sku_unit_price < 501) {
                    ++count;
                }
            });
            return count;
        }
        case '2': {
            data.forEach(item => {
                const product = item.product_skus[0];
                if (product.sku_unit_price > 500 && product.sku_unit_price < 1001) {
                    ++count;
                }
            })
            return count;
        }
        case '3': {
            data.forEach(item => {
                const product = item.product_skus[0];
                if (product.sku_unit_price > 1000 && product.sku_unit_price < 2001) {
                    ++count;
                }
            })
            return count;
        }
        default:
            break;
    }
}