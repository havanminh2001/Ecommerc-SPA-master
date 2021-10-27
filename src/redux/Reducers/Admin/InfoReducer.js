import * as info from "../../Contants/Admin/InfoContants";

const initialState = {
    user: {
    },
    isLoading: false,
    errors: ""
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case info.apiFetchContants: {
            return { ...state, isLoading: true }
        }
        case info.apiSuccessContants: {
            return { ...state, isLoading: false, user: payload }
        }
        case info.apiFailContants: {
            return { ...state, isLoading: false, errors: payload }
        }
        default: {
            return state
        }
    }
}
