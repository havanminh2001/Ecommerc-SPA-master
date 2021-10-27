import { ACCESS_TOKEN, TIMESTAMP } from '../../../settings/configUrl';
import * as constants from '../../Contants/Admin/AuthConstants';

const initialState = {
    currentUser: {},
    isLogin: false
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.loginAuthConstants:
            return { ...state, currentUser: payload, isLogin: true }
        case constants.loginAuthUserConstants:
            return { ...state, isLogin: payload }
        case constants.logoutAuthConstants: {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(TIMESTAMP);
            return { ...state, currentUser: {}, isLogin: false }
        }
        default:
            return state
    }
}

export default authReducer;