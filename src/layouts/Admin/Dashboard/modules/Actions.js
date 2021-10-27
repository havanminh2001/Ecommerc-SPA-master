import * as constants from './Constants';
import { apiDashBoard } from '../../../../services/adminApi';
import { alertErrors, alertSuccess, STATUS_SUCCESS } from '../../../../settings/config';

export const loadingAct = payload => ({
    type: constants.loading,
    payload
})

export const countAct = payload => ({
    type: constants.fetchCount,
    payload
});

export const chartAct = payload => ({
    type: constants.fetchChart,
    payload
});

export const countAction = () => async dispatch => {
    try {
        const res = await apiDashBoard.count();
        if (res.data.status_code === STATUS_SUCCESS) {
            const result = res.data.data;
            const data = {
                revenue: result.revenue[0]?.total ? result.revenue[0]?.total : 0,
                order: result.order,
                user: result.user,
                visitor: result.visitor
            }
            dispatch(countAct(data));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

export const chartAction = () => async dispatch => {
    try {
        const res = await apiDashBoard.chart();
        if (res.data.status_code === STATUS_SUCCESS) {
            const result = res.data.data;
            const data = {
                categories: result.categories,
                order: result.order,
                user: result.user
            }
            dispatch(chartAct(data));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
        }
    }
}