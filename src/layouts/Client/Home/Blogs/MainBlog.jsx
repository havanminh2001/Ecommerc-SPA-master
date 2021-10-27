import React from 'react'

export default function MainBlog() {
    return (
        <section className="blog">
            <div className="container">
                <div className="blog__title">
                    <h2>Our Latest News</h2>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form.</p>
                </div>
                <div className="blog__content row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="blog__item">
                            <figure>
                                <a href=""><img src="./assets/img/blog-1.jpg" alt="*" /></a>
                            </figure>
                            <div className="blog__text">
                                <h3><a href="#">What information is needed for shipping?</a></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt.</p>
                                <div className="blog__btn">
                                    <a href="">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="blog__item">
                            <figure>
                                <a href=""><img src="./assets/img/blog-1.jpg" alt="*" /></a>
                            </figure>
                            <div className="blog__text">
                                <h3><a href="#">What information is needed for shipping?</a></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt.</p>
                                <div className="blog__btn">
                                    <a href="">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="blog__item">
                            <figure>
                                <a href=""><img src="./assets/img/blog-1.jpg" alt="*" /></a>
                            </figure>
                            <div className="blog__text">
                                <h3><a href="#">What information is needed for shipping?</a></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt.</p>
                                <div className="blog__btn">
                                    <a href="">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
