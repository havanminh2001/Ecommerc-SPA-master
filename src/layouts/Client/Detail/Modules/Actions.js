import * as constants from './Constants';
import { apiProductDetail } from '../../../../services/clientApi';
import { alertErrors, alertSuccess, STATUS_SUCCESS } from '../../../../settings/config';

export const loadingAct = payload => ({
    type: constants.loading,
    payload
});

export const fetchProductAct = payload => ({
    type: constants.fetchSuccess,
    payload
});

export const fetchProductFailAct = payload => ({
    type: constants.fetchFail,
    payload
});

export const changeImageAct = payload => ({
    type: constants.changeImage,
    payload
});

export const createReviewAct = payload => ({
    type: constants.createReview,
    payload
});

export const paginationReviewAct = payload => ({
    type: constants.paginationReview,
    payload
});

export const fetchProductAction = (slug) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProductDetail.getProduct(slug);
        let result = res.data.data;
        if (res.data.status_code === 200) {
            const data = {
                categories: result.categories,
                product: result.product,
                option: result.option,
                product_sku: result.product_sku,
                review: {
                    data: result.review.data,
                    total: result.review.total,
                    currentPage: result.review.current_page
                },
                discount: result.discount,
                variants: result.variants,
            }
            dispatch(fetchProductAct(data));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

export const createReviewAction = (form, reset) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProductDetail.createReview(form);
        if (res.data.status_code == STATUS_SUCCESS) {
            dispatch(createReviewAct(res.data.data));
            alertSuccess('Create new comment successfully');
            if (!localStorage.getItem('USER_INFO')) {
                reset();
            }
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

export const paginationReviewAction = (slug, page) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProductDetail.getProductPagination(slug, page);
        if (res.data.status_code == STATUS_SUCCESS) {
            const result = res.data.data;
            dispatch(paginationReviewAct({
                data: result.review.data,
                currentPage: result.review.current_page
            }));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}