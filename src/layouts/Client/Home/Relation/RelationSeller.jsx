import React from 'react'

export default function RelationSeller() {
    return (
        <div className="col-md-4 col-12">
            <div className="relation__title">
                <h4>Best Sellers</h4>
            </div>
            <div className="relation__list">
                <div className="relation__item">
                    <figure>
                        <a href=""><img src="./assets/img/relation/01.jpg" alt="*" /></a>
                    </figure>
                    <div className="relation__text">
                        <h3><a href="#">GoPro Hero4 Silver</a></h3>
                        <div className="relation__price"><span>$287.99</span></div>
                    </div>
                </div>
                <div className="relation__item">
                    <figure>
                        <a href=""><img src="./assets/img/relation/02.jpg" alt="*" /></a>
                    </figure>
                    <div className="relation__text">
                        <h3><a href="#">GoPro Hero4 Silver</a></h3>
                        <div className="relation__price"><span>$287.99</span></div>
                    </div>
                </div>
                <div className="relation__item">
                    <figure>
                        <a href=""><img src="./assets/img/relation/03.jpg" alt="*" /></a>
                    </figure>
                    <div className="relation__text">
                        <h3><a href="#">GoPro Hero4 Silver</a></h3>
                        <div className="relation__price"><span>$287.99</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
