import * as contants from './Constants';
import { apiOrder } from '../../../../services/adminApi';
import { alertErrors, alertSuccess, STATUS_SUCCESS } from '../../../../settings/config';

export const loadingAct = (loading) => ({
    type: contants.loadingContants,
    payload: loading
});

export const fetchSuccessAct = (payload) => ({
    type: contants.fetchSuccessContants,
    payload
});

export const paginationAct = (payload) => ({
    type: contants.paginationContants,
    payload
});

export const updateAct = (payload) => ({
    type: contants.updateContants,
    payload
})

export const seachAct = (payload) => ({
    type: contants.seachContants,
    payload
})

export const exportOrderAct = payload => ({
    type: contants.exportOrder,
    payload
});

// fetch data
export const transAction = (pageSize) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiOrder.fetch(pageSize);
        if (res.data.status_code === STATUS_SUCCESS) {
            const result = res.data.data;
            const payload = {
                data: result.data,
                total: result.total,
                lastPage: result.last_page
            }
            dispatch(fetchSuccessAct(payload));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

// fetch pagination
export const paginationAction = (current, pageSize) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiOrder.changePagination(current, pageSize);
        const result = res.data.data;
        const payload = {
            data: result.data,
            pagination: { current, pageSize, total: result.total, lastPage: result.last_page }
        }
        dispatch(paginationAct(payload));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

// update
export const updateAction = (id, data) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiOrder.update(id, data);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(updateAct({ update: res.data.data, id }));
            alertSuccess('Update success');
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

// seach
export const seachAction = (pageSize, keyword) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiOrder.seach(pageSize, keyword);
        const result = res.data.data;
        const payload = {
            data: result.data,
            total: result.total,
            lastPage: result.last_page
        }
        dispatch(seachAct(payload));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

// export data
export const exportOrderAction = (month) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiOrder.export(month);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(exportOrderAct(res.data.data));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}