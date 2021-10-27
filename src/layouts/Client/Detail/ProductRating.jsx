import React from 'react'
import { useSelector } from 'react-redux';
import ModalReview from './ModalReview'

export default function ProductRating() {
    const reviews = useSelector(state => state.ProductDetailReducer.review.data);
    return (
        <>
            <div className="review__left col-lg-4 mb-4">
                <h4 className="review__title">{Math.round(reviews.reduce((total, review) => {
                    return total += review.review_star;
                }, 0) / reviews.length)} (Overall)</h4>
                <ul>
                    <li>
                        <span>5 stars - {reviews.reduce((total, review) => {
                            if (review.review_star == 5) {
                                return total += 1
                            }
                            return total;
                        }, 0)}
                        </span>
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star-filled" />
                    </li>
                    <li>
                        <span>4 stars - {reviews.reduce((total, review) => {
                            if (review.review_star == 4) {
                                return total += 1
                            }
                            return total;
                        }, 0)}</span>
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star" />
                    </li>
                    <li>
                        <span>3 stars - {reviews.reduce((total, review) => {
                            if (review.review_star == 3) {
                                return total += 1
                            }
                            return total;
                        }, 0)}</span>
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star" />
                        <i className="lni lni-star" />
                    </li>
                    <li>
                        <span>2 stars - {reviews.reduce((total, review) => {
                            if (review.review_star == 2) {
                                return total += 1
                            }
                            return total;
                        }, 0)}</span>
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star" />
                        <i className="lni lni-star" />
                        <i className="lni lni-star" />
                    </li>
                    <li>
                        <span>1 stars - {reviews.reduce((total, review) => {
                            if (review.review_star == 1) {
                                return total += 1
                            }
                            return total;
                        }, 0)}</span>
                        <i className="lni lni-star-filled" />
                        <i className="lni lni-star" />
                        <i className="lni lni-star" />
                        <i className="lni lni-star" />
                        <i className="lni lni-star" />
                    </li>
                </ul>
                <button type="button" className="review__btn" data-bs-toggle="modal" data-bs-target="#modalReview">
                    Leave a Review
                </button>
            </div>
            <ModalReview />
        </>
    )
}
