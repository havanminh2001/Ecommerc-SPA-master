import { STORAGE } from "../settings/configUrl";
import { returnStatus } from "../utils/helper";

export const renderPurchase = (order) => {
    return order?.map(item => {
        return (
            <div className="purchase__order" key={item.id}>
                <div className="purchase__status">
                    <p>Code:{item.id}</p>
                    <p>{returnStatus(item.order_status)}</p>
                </div>
                <div className="purchase__list">
                    {
                        item.order_details?.map(ord => {
                            const sku = ord.product_skus;
                            return (
                                <div className="purchase__item" key={ord.id}>
                                    <div className="purchase__image">
                                        <a href="*"><img src={`${STORAGE}/products/${sku.sku_image}`} alt="*" /></a>
                                    </div>
                                    <div className="purchase__product">
                                        <h4 className="product__name">
                                            <a href="*">{ord.product_name}</a>
                                        </h4>
                                        <h5 className="product__sku">Color: {sku.color}</h5>
                                        <p className="product__qty">x{ord.qty}</p>
                                    </div>
                                    <div className="purchase__price">
                                        <p>${ord.qty * ord.product_price}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="purchase__total">
                    <p>Transport fee:
                        <span className="purchase__price--total">
                            ${item.transport_price}
                        </span>
                    </p>
                    <p>Total amount: <span className="purchase__price--total">
                        ${item.order_details.reduce((total, ord) => {
                            return total += ord.product_price * ord.qty;
                        }, 0) + item.transport_price}
                    </span></p>
                </div>
                {
                    item.order_status == 1 ?
                        <div className="purchase__action">
                            <button className="product__btn">Cancel</button>
                        </div> : ''
                }
            </div>
        )
    });
}