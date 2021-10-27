import { apiHome } from '../../../../services/clientApi';
import { alertErrors } from '../../../../settings/config';
import * as constants from './Constants';

export const loadingAct = (payload) => ({
    type: constants.loading,
    payload
});

export const fetchCategoriesAct = (payload) => ({
    type: constants.fetchCategories,
    payload
});

export const fetchFailAct = (payload) => ({
    type: constants.fetchFail,
    payload
});

export const fetchProductAct = (payload) => ({
    type: constants.fetchProduct,
    payload
});

export const loadMoreProductAct = (payload) => ({
    type: constants.loadMoreProduct,
    payload
});

export const fetchProductDiscountAct = (payload) => ({
    type: constants.fetchProductDiscount,
    payload
})


export const fetchCategoriesAction = () => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiHome.fetchCategories();
        const result = res.data.data;
        const data = {
            categories: result.categories,
            slugsProduct: result.slugs,
            discount: result.discounts
        }
        dispatch(fetchCategoriesAct(data));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

export const fetchProductAction = () => async (dispatch) => {
    try {
        const res = await apiHome.fetchProducts();
        const result = res.data.data;
        const data = {
            data: result.data,
            total: result.total,
            currentPage: result.current_page
        }
        dispatch(fetchProductAct(data));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

export const loadMoreProductAction = (page) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiHome.scrollProducts(page);
        const result = res.data.data;
        if (result.current_page <= result.last_page) {
            const data = {
                data: result.data,
                currentPage: result.current_page
            }
            dispatch(loadMoreProductAct(data));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}


export const fetchProductDiscountAction = () => async (dispatch) => {
    try {
        const res = await apiHome.fetchProductDiscount();
        const result = res.data.data;
        const data = {
            product: result.product,
            productDiscount: result.productDiscount
        }
        dispatch(fetchProductDiscountAct(data));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}