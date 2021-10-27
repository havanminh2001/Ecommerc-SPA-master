import React from 'react'

export default function ProductBanner() {
    return (
        <div className="product__banner row">
            <div className="col-md-6 col-12">
                <div className="product__banner--item">
                    <figure>
                        <img src="./assets/img/banner-1-bg.jpg" alt="*" />
                    </figure>
                    <div className="product__banner--caption">
                        <h2>Smart Watch 2.0</h2>
                        <p>Space Gray Aluminum Case with
                            Black/Volt Real Sport Band</p>
                        <div className="product__banner--btn">
                            <a href="#">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-12">
                <div className="product__banner--item">
                    <figure>
                        <img src="./assets/img/banner-2-bg.jpg" alt="*" />
                    </figure>
                    <div className="product__banner--caption">
                        <h2>Smart Headphone</h2>
                        <p>Space Gray Aluminum Case with
                            Black/Volt Real Sport Band</p>
                        <div className="product__banner--btn">
                            <a href="#">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
