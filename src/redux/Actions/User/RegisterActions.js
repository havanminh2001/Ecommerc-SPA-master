import { apiRegister, apiRegisterDemo } from '../../../services/clientApi';
import * as constants from '../../Contants/User/RegisterConstants';
import { alertErrors, alertSuccess, STATUS_SUCCESS } from '../../../settings/config';
export const loadingAct = payload => ({
    type: constants.loading,
    payload
});

export const registerAct = () => ({
    type: constants.register
});

export const registerFailAct = payload => ({
    type: constants.registerFail,
    payload
});

export const registerAction = (data, reset) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiRegisterDemo.register(data);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(registerAct());
            reset();
            alertSuccess('Congratulation you register account success!');
        } else {
            const message = {};
            for (const [key, value] of Object.entries(res.data.message)) {
                message[key] = value;
            }
            dispatch(registerFailAct(message));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}