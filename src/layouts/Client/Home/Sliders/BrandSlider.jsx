import React from 'react'
import Slider from 'react-slick'

export default function BrandSlider() {
    const settings = {
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/01.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/02.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/03.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/04.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/05.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/06.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/03.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/04.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/05.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/06.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/01.png" alt="*" />
            </div>
            <div className="col-2 brand__item">
                <img src="./assets/img/brand/02.png" alt="*" />
            </div>
        </Slider>
    )
}
