import * as constants from './Constants';

const initialState = {
    data: [],
    pagination: {
        current: 1,
        pageSize: 15
    },
    loading: false,
    disabled: false,
    modal: false
}

const ReviewReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.loadingContants: {
            return { ...state, loading: true }
        }
        case constants.fetchSuccessContants: {
            const { data, total, lastPage } = payload;
            return { ...state, data, pagination: { ...state.pagination, total, lastPage }, loading: false }
        }
        case constants.fetchFailContants: {
            return { ...state, disabled: payload, loading: false };
        }
        case constants.paginationContants: {
            const { data, pagination } = payload;
            const { current, pageSize, total, lastPage } = pagination;
            return { ...state, data, pagination: { ...state.pagination, current, pageSize, total, lastPage }, loading: false }
        }
        case constants.updateContants: {
            const { status, id } = payload;
            const index = state.data.findIndex(item => item.id === id);
            state.data[index].review_status = status;
            return { ...state, data: [...state.data], loading: false, modal: false }
        }
        case constants.deleteContants: {
            let dataTemp = [...state.data];
            const index = dataTemp.findIndex((item) => item.id === payload);
            dataTemp.splice(index, 1);
            let { current, lastPage, total } = state.pagination;
            if (current === lastPage && !dataTemp.length > 0) {
                let data = [...state.temp];
                return { ...state, data, temp: [], loading: false, pagination: { ...state.pagination, total: --total, current: --current, lastPage: --lastPage } };
            }
            return { ...state, data: dataTemp, loading: false };
        }
        case constants.seachContants: {
            const { data, total, lastPage } = payload;
            const temp = { ...state };
            return { ...state, data, pagination: { ...state.pagination, total, lastPage, pageSize: 15 }, loading: false }
        }
        default:
            return state
    }
}

export default ReviewReducer;