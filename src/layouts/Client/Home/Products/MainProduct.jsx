import React from 'react'
import ProductBanner from './ProductBanner'
import ProductList from './ProductList'

export default function MainProduct() {
    return (
        <section className="product">
            <div className="container">
                <div className="product__title">
                    <h2>Trending Product</h2>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form.</p>
                </div>
                <div className="product__content">
                    <ProductList />
                    <ProductBanner />
                </div>
            </div>
        </section>
    )
}
