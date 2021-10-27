import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './Modules/Actions';

export default function ProductReview(props) {
    const reviews = useSelector(state => state.ProductDetailReducer.review.data);
    const total = useSelector(state => state.ProductDetailReducer.review.total);
    const page = useSelector(state => state.ProductDetailReducer.review.currentPage);
    const dispatch = useDispatch();
    const params = useParams();
    const renderReviews = () => {
        return reviews?.map(rev => {
            return (
                <div className="review__item" key={rev.id}>
                    <div className="review__image">
                        <img src={process.env.PUBLIC_URL + "/assets/img/user.png"} alt="*" />
                    </div>
                    <div className="review__text">
                        <h4 className="review__name">
                            {rev.review_name}
                        </h4>
                        <ul className="review__start--list">
                            {
                                Array.from({ length: 5 }).map((star, index) => {
                                    if (index < rev.review_star) {
                                        return (
                                            <li key={index}><i className="lni lni-star-filled" /></li>
                                        )
                                    } else {
                                        return (
                                            <li key={index}><i className="lni lni-star" /></li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        <div className="review__content">
                            <p>{rev.review_content}</p>
                        </div>
                    </div>
                </div>
            )
        });
    }
    const loadReview = () => {
        dispatch(actions.paginationReviewAction(params.slug, page + 1));
    }
    return (
        <>
            <div className="review__right col-lg-8">
                <div className="review__right--content">
                    <h4 className="review__title">Latest Reviews</h4>
                    <div className="review__list">
                        {reviews.length > 0 ? renderReviews() : ''}
                    </div>
                    <div className="review__load">
                        {
                            total - reviews.length > 0 ?
                                <button className="load-more" onClick={() => loadReview()}>Load more {total - reviews.length} review</button>
                                : ''
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
