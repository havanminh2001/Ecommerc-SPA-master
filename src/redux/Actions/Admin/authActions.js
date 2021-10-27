import * as constants from '../../Contants/Admin/AuthConstants';

export const authAction = payload => ({
    type: constants.loginAuthConstants,
    payload
});

export const authUserAction = payload => ({
    type: constants.loginAuthUserConstants,
    payload
});

export const logoutAuthAction = payload => ({
    type: constants.logoutAuthConstants,
    payload
});