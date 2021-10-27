import * as constants from '../../Contants/User/RegisterConstants';

const initialState = {
    errors: {},
    loading: false
}

const RegisterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.loading: {
            return { ...state, loading: payload };
        }
        case constants.register: {
            return { ...state, loading: false, errors: {} };
        }
        case constants.registerFail: {
            return { ...state, errors: payload, loading: false };
        }
        default:
            return state
    }
}

export default RegisterReducer;
