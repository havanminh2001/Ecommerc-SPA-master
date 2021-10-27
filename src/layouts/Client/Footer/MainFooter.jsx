import { BackTop } from 'antd'
import React from 'react'

export default function MainFooter() {
    return (
        <footer>
            <div className="container">
                <div className="footer__top row">
                    <div className="col-lg-3 col-12 footer__top--logo">
                        <a href=""><img src={process.env.PUBLIC_URL + "/assets/img/white-logo.svg"} alt="*" /></a>
                    </div>
                    <div className="col-lg-9 col-12 footer__form">
                        <div className="footer__title">
                            <h4>Subscribe to our Newsletter</h4>
                            <p>Get all the latest information, Sales and Offers.</p>
                        </div>
                        <div className="footer__subcribe">
                            <form action="">
                                <input type="email" className="form-control" placeholder="Email address here..." />
                                <button className="btn btn-primary">Subcribe</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="footer__middle row">
                    <div className="col-xl-3 col-md-6 col-12">
                        <div className="footer__middle--content contact">
                            <h3>Get In Touch With Us</h3>
                            <p className="footer__contact--phone">Phone: +1 (900) 33 169 7720</p>
                            <ul>
                                <li><span>Monday-Friday: </span> 9.00 am - 8.00 pm</li>
                                <li><span>Saturday: </span> 10.00 am - 6.00 pm</li>
                            </ul>
                            <p className="footer__contact--email">
                                <a href="">hannguyen@gmail.com</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 col-12">
                        <div className="footer__middle--content app">
                            <h3>Our Mobile App</h3>
                            <ul>
                                <li>
                                    <a href="">
                                        <i className="lni lni-apple" />
                                        <span className="footer__middle--download">Download on the</span>
                                        <span className="footer__middle--store">App Store</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="lni lni-play-store" />
                                        <span className="footer__middle--download">Download on the</span>
                                        <span className="footer__middle--store">Google Play</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 col-12">
                        <div className="footer__middle--content link">
                            <h3>Information</h3>
                            <ul>
                                <li>
                                    <a href="">About Us</a>
                                </li>
                                <li>
                                    <a href="">Contact Us</a>
                                </li>
                                <li>
                                    <a href="">Downloads</a>
                                </li>
                                <li>
                                    <a href="">Sitemap</a>
                                </li>
                                <li>
                                    <a href="">FAQs Page</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 col-12">
                        <div className="footer__middle--content link">
                            <h3>Shop Departments</h3>
                            <ul>
                                <li>
                                    <a href="">Computers &amp; Accessories</a>
                                </li>
                                <li>
                                    <a href="">Smartphones &amp; Tablets</a>
                                </li>
                                <li>
                                    <a href="">TV, Video &amp; Audio</a>
                                </li>
                                <li>
                                    <a href="">Cameras, Photo &amp; Video</a>
                                </li>
                                <li>
                                    <a href="">Headphones</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer__bot row align-items-center">
                    <div className="col-lg-4 col-12 p-0">
                        <div className="footer__payment">
                            <span>We Accept:</span>
                            <img src={process.env.PUBLIC_URL + "/assets/img/credit-cards-footer.png"} alt="*" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 p-0">
                        <div className="footer__copyright">
                            <span>
                                Designed and Developed by
                                <a href=""> Han Nguyen</a>
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 p-0">
                        <div className="footer__social">
                            <ul>
                                <li>Follow Us On:</li>
                                <li>
                                    <a href=""><i className="lni lni-facebook-filled" /></a>
                                </li>
                                <li>
                                    <a href=""><i className="lni lni-twitter-original" /></a>
                                </li>
                                <li>
                                    <a href=""><i className="lni lni-instagram" /></a>
                                </li>
                                <li>
                                    <a href=""><i className="lni lni-google" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}
