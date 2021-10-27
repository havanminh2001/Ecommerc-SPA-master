import * as constants from './Constants';
import { apiProduct } from '../../../../services/clientApi';
import { alertErrors, alertSuccess, STATUS_SUCCESS } from '../../../../settings/config';

export const loadingAct = payload => ({
    type: constants.loading,
    payload
});

export const fetchProductAct = payload => ({
    type: constants.fetchSuccess,
    payload
});

export const paginationAct = payload => ({
    type: constants.pagination,
    payload
});

export const fetchFailAct = payload => ({
    type: constants.fetchFail,
    payload
});

export const filterWithRange = payload => ({
    type: constants.rangePrice,
    payload
});

export const filterWithCheckbox = payload => ({
    type: constants.checkboxPrice,
    payload
});

export const filterWithSelect = payload => ({
    type: constants.selectFilter,
    payload
});

export const fetchProductAction = (slug) => async dispatch => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.fetch(slug);
        if (res.data.status_code == STATUS_SUCCESS) {
            const result = res.data.data;
            const data = {
                product: {
                    data: result.data.data,
                    total: result.data.total,
                    currentPage: result.data.current_page,
                    lastPage: result.data.last_page
                },
                categories: result.categories,
                discount: result.discount
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

export const fetchCategoriesProductAction = (id) => async dispatch => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.fetchProductWithCategories(id);
        if (res.data.status_code == STATUS_SUCCESS) {
            const result = res.data.data;
            const data = {
                product: {
                    data: result.data.data,
                    total: result.data.total,
                    currentPage: result.data.current_page,
                    lastPage: result.data.last_page
                },
                categories: result.categories,
                discount: result.discount
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

export const paginationCategoriesProductAction = (id, page) => async dispatch => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.paginationProductWithCategories(id, page);
        if (res.data.status_code == STATUS_SUCCESS) {
            const result = res.data.data;
            const data = {
                product: {
                    data: result.data.data,
                    total: result.data.total,
                    currentPage: result.data.current_page,
                    lastPage: result.data.last_page
                },
                categories: result.categories,
                discount: result.discount
            }
            dispatch(paginationAct(data));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}
