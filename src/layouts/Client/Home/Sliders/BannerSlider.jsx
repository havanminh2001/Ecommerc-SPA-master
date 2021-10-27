import React from 'react'
import Slider from "react-slick";

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className="btn btn-primary btn-slider next" onClick={onClick}>
            <span>
                <i className="fa fa-angle-right"></i>
            </span>
        </button>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className="btn btn-primary btn-slider prev" onClick={onClick}>
            <span>
                <i className="fa fa-angle-left"></i>
            </span>
        </button>
    );
}

export default function BannerSlider() {
    var settings = {
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    };
    return (
        <>
            <Slider {...settings}>
                <div className="banner__item">
                    <figure>
                        <img src="./assets/img/slider-bg1.jpg" alt="*" />
                    </figure>
                    <div className="slider__caption">
                        <h4>No restocking fee ($35 savings)</h4>
                        <h2>M75 Sport Watch</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut
                            labore dolore magna aliqua.</p>
                        <h3><span>Now Only</span> $320.99</h3>
                        <div className="slider__btn">
                            <button className="btn btn-primary">Shop Now</button>
                        </div>
                    </div>
                </div>
                <div className="banner__item">
                    <figure>
                        <img src="./assets/img/slider-bg2.jpg" alt="*" />
                    </figure>
                    <div className="slider__caption">
                        <h4>Big Sale Offer</h4>
                        <h2>Get the Best Deal on CCTV Camera</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut
                            labore dolore magna aliqua.</p>
                        <h3><span>Combo Only</span> $590.00</h3>
                        <div className="slider__btn">
                            <button className="btn btn-primary">Shop Now</button>
                        </div>
                    </div>
                </div>
            </Slider>
        </>
    )
}
