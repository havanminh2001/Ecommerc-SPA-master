import React from 'react'

export default function SpecialBanner() {
    return (
        <div className="special__banner">
            <figure>
                <img src="./assets/img/banner-3-bg.jpg" alt="*" />
            </figure>
            <div className="special__banner--caption">
                <h2>Samsung Notebook 9</h2>
                <p>Lorem ipsum dolor sit amet,<br />
                    eiusmod tempor incididunt ut labore.</p>
                <h5 className="special__price">$590.00</h5>
                <div className="special__banner--btn">
                    <a href="#">Shop Now</a>
                </div>
            </div>
        </div>
    )
}
