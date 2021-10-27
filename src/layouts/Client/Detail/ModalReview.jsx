import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import * as actions from './Modules/Actions';

const schema = yup.object().shape({
    review_name: yup.string().max(100, 'Maximum 100 character').required('Name is a required field'),
    review_email: yup.string().max(100, 'Maximum 100 character').email('Must be a valid email').required('Email is a required field'),
    review_phone: yup.string().required('Number phone is a required field').matches(new RegExp(/(0)[0-9]{9}/), 'Star 0 and maximum 10 number'),
    review_content: yup.string().max(254, 'Maximum 254 character').required('Content is a required field')
});

export default function ModalReview(props) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const product = useSelector(state => state.ProductDetailReducer.product);
    const dispatch = useDispatch();
    const form = useRef();
    const closeModal = useRef();
    const isUser = JSON.parse(localStorage.getItem('USER_INFO'));
    useEffect(() => {
        if (isUser) {
            setValue('review_name', isUser.name);
            setValue('review_email', isUser.email);
            setValue('review_phone', isUser.phone);
        }
    }, []);
    const onSubmitReview = (data) => {
        let formData = new FormData();
        for (const key in data) {
            if (isUser) {
                formData.append('user_id', isUser.id);
            }
            formData.append(key, data[key]);
        }
        formData.append('product_variant_id', product.id);
        dispatch(actions.createReviewAction(formData, reset, closeModal));
        closeModal.current.click();
    }
    return (
        <>
            <div className="modal fade" id="modalReview" tabIndex={-1} aria-labelledby="modalReviewLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form action="*" onSubmit={handleSubmit(onSubmitReview)} ref={form}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Leave a Review</h5>
                                <button type="button" ref={closeModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="review__form mb-3">
                                            <label htmlFor="name" className="col-form-label">
                                                <span>*</span>Your Name</label>
                                            <input type="text" {...register("review_name")} name="review_name" className="form-control" />
                                            {errors.review_name &&
                                                <span className="review__error">
                                                    {errors.review_name.message}
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="review__form mb-3">
                                            <label htmlFor="name" className="col-form-label">
                                                <span>*</span>Your Email</label>
                                            <input type="email" {...register("review_email")} name="review_email" className="form-control" />
                                            {errors.review_email &&
                                                <span className="review__error">
                                                    {errors.review_email.message}
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="review__form mb-3">
                                            <label htmlFor="phone" className="col-form-label">
                                                <span>*</span>Your Phone</label>
                                            <input type="text" {...register("review_phone")} name="review_phone" className="form-control" />
                                            {errors.review_phone &&
                                                <span className="review__error">
                                                    {errors.review_phone.message}
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="review__form mb-3">
                                            <label htmlFor="name" className="col-form-label">Rating</label>
                                            <select {...register("review_star")} name="review_star" className="form-select">
                                                <option value={5}>5 Stars</option>
                                                <option value={4}>4 Stars</option>
                                                <option value={3}>3 Stars</option>
                                                <option value={2}>2 Stars</option>
                                                <option value={1}>1 Stars</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label style={{ fontSize: "14px" }} htmlFor="name" className="col-form-label">
                                            <span style={{ color: "#f73232" }}>*</span>Review</label>
                                        <textarea {...register("review_content")} name="review_content" cols={30} rows={8} className="form-control" defaultValue={""} />
                                        {errors.review_content &&
                                            <span className="review__error">
                                                {errors.review_content.message}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Submit Review</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
