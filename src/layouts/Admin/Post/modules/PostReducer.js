import * as contants from './Constants';

const initialState = {
    data: [],
    pagination: {
        current: 1,
        pageSize: 15
    },
    loading: false,
    disabled: false,
    modal: false,
    modalContent: false,
    clearEditor: false,
    dataEdit: {
    },
    messageErrors: {}
}

const PostReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case contants.loadingContants: {
            return { ...state, loading: true }
        }
        case contants.fetchSuccessContants: {
            const { data, total, lastPage } = payload;
            return { ...state, data, pagination: { ...state.pagination, total, lastPage }, loading: false }
        }
        case contants.fetchFailContants: {
            return { ...state, disabled: payload.disabled, loading: false };
        }
        case contants.paginationContants: {
            const { data, pagination } = payload;
            const { current, pageSize, total, lastPage } = pagination;
            return { ...state, data, pagination: { ...state.pagination, current, pageSize, total, lastPage }, loading: false }
        }
        case contants.createContants: {
            let temp = [...state.data];
            let { current, lastPage, pageSize, total } = state.pagination;
            if (current === lastPage && pageSize === temp.length) {
                let data = [];
                data.push(payload);
                return { ...state, data, temp, loading: false, pagination: { ...state.pagination, total: ++total, current: ++current, lastPage: ++lastPage }, clearEditor: false, messageErrors: {} };
            }
            temp.push(payload);
            return { ...state, data: temp, loading: false, clearEditor: false, messageErrors: {} };
        }
        case contants.modalContants: {
            return { ...state, modal: payload, modalContent: payload }
        }
        case contants.editContants: {
            let temp = [...state.data];
            const index = temp.findIndex(post => post.id === payload);
            return { ...state, dataEdit: temp[index], modal: true }
        }
        case contants.updateContants: {
            const { update, id } = payload;
            const index = state.data.findIndex(post => post.id === id);
            state.data[index] = update;
            return { ...state, data: [...state.data], dataEdit: {}, loading: false, modal: false, messageErrors: {} }
        }
        case contants.deleteContants: {
            let dataTemp = [...state.data];
            if (dataTemp.length === 1) {
                return {
                    ...state, data: [], temp: [], loading: false,
                    pagination: {
                        current: 1,
                        pageSize: 15
                    },
                    messageErrors: {}
                }
            }
            const index = dataTemp.findIndex((item) => item.id === payload);
            dataTemp.splice(index, 1);
            let { current, lastPage, total } = state.pagination;
            if (current === lastPage && !dataTemp.length > 0) {
                let data = [...state.temp];
                return { ...state, data, temp: [], loading: false, pagination: { ...state.pagination, total: --total, current: --current, lastPage: --lastPage }, messageErrors: {} };
            }
            return { ...state, data: dataTemp, loading: false, messageErrors: {} };
        }
        case contants.seachContants: {
            const { data, total, lastPage } = payload;
            const temp = { ...state };
            return { ...state, data, pagination: { ...state.pagination, pageSize: 15, total, lastPage }, loading: false, messageErrors: {} }
        }
        case contants.clearEditor: {
            return { ...state, clearEditor: payload }
        }
        case contants.modalContentContants: {
            let temp = [...state.data];
            const index = temp.findIndex(post => post.id === payload);
            return { ...state, dataEdit: temp[index], modalContent: true }
        }
        default:
            return state
    }
}

export default PostReducer;