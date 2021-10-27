import React from 'react'
import { useSelector } from 'react-redux';
export default function ProductInfo(props) {
    let option = useSelector(state => state.ProductDetailReducer.option);
    const categories = useSelector(state => state.ProductDetailReducer.categories);
    return (
        <>
            <div className="product__middle">
                <div className="row">
                    <div className="product__middle--left col-lg-6">
                        <div className="product__middle--detail">
                            <h4>Details</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
                        </div>
                        <div className="product__middle--feature">
                            <h4>Features</h4>
                            <ul>
                                <li>Screen Resolution {option?.screen_resolution}</li>
                                <li>Screen {option?.screen}</li>
                                <li>Camera Front {option?.camera_fr}</li>
                                <li>Camera Rear {option?.camera_be}</li>
                                <li>Use App for Dedicated Camera Operation</li>
                            </ul>
                        </div>
                    </div>
                    <div className="product__middle--right col-lg-6">
                        <div className="product__specification">
                            <h4>Specifications</h4>
                            <ul>
                                <li>Operating System: <span>{option?.operating_system}</span></li>
                                <li>Pin:<span> {option?.pin}</span></li>
                                <li>GPU: <span>{option?.gpu}</span></li>
                                <li>CPU: <span>{option?.cpu}</span></li>
                                <li>Manufacturer: <span>{categories.categories_name}, {categories.categories_desc}</span></li>
                            </ul>
                        </div>
                        <div className="product__shipping">
                            <h4>Shipping Option</h4>
                            <ul>
                                <li>Courier: <span>2 - 4 days, $22.50</span></li>
                                <li>Local Shipping: <span>up to one week, $10.00</span></li>
                                <li>UPS Ground Shipping: <span>4 - 6 days, $18.00</span></li>
                                <li>Unishop Global Export: <span>3 - 4 days, $25.00</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
