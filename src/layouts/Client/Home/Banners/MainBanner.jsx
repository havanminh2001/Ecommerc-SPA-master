import React from 'react'
import BannerSlider from '../Sliders/BannerSlider'
import Banner from './Banner'

export default function MainBanner() {
    return (
        <section className="banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="banner__slider">
                            <BannerSlider />
                        </div>
                    </div>
                    <Banner />
                </div>
            </div>
        </section>
    )
}
