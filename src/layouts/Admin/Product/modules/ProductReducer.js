import * as contants from './Constants';

const initialState = {
    data: [],
    pagination: {
        current: 1,
        pageSize: 15
    },
    errorsValidate: {},
    loading: false,
    disabled: false,
    modalContent: false,
    modalOption: false,
    modalVariant: false,
    modalEditVariant: false,
    relationship: {
        categories: [],
        discount: []
    },
    dataEdit: {
        product: {},
        option: {}
    }
}

const ProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case contants.loadingContants: {
            return { ...state, loading: true }
        }
        case contants.fetchSuccessContants: {
            const { data, total, lastPage, categories, discount } = payload;
            return { ...state, data, pagination: { ...state.pagination, total, lastPage }, loading: false }
        }
        case contants.fetchRelationship: {
            return { ...state, relationship: payload };
        }
        case contants.modalContants: {
            return { ...state, modalContent: payload, modalOption: payload };
        }
        case contants.fetchFailContants: {
            return { ...state, disabled: payload, loading: false };
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
                return { ...state, data, temp, loading: false, pagination: { ...state.pagination, total: ++total, current: ++current, lastPage: ++lastPage } };
            }
            temp.push(payload);
            return { ...state, data: temp, loading: false };
        }
        case contants.editContants: {
            const temp = [...state.data];
            const index = temp.findIndex(item => item.id == payload);
            let edit = {};
            if (Array.isArray(temp[index].product_options)) {
                edit = { option: temp[index].product_options[0], product: temp[index] };
            } else {
                edit = { option: temp[index].product_options, product: temp[index] };
            }
            return { ...state, dataEdit: edit };
        }
        case contants.fetchEditContants: {
            return { ...state, dataEdit: payload, loading: false }
        }
        case contants.updateContants: {
            const { update, id } = payload;
            const index = state.data.findIndex(cate => cate.id === id);
            state.data[index] = update;
            return {
                ...state,
                data: [...state.data],
                dataEdit: {
                    product: {},
                    option: {}
                },
                loading: false
            }
        }
        case contants.deleteContants: {
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
        case contants.seachContants: {
            const { data, total, lastPage } = payload;
            return { ...state, data, pagination: { ...state.pagination, total, lastPage, pageSize: 15 }, loading: false }
        }
        case contants.modalContentContants: {
            let temp = [...state.data];
            const index = temp.findIndex(post => post.id === payload);
            return { ...state, dataEdit: temp[index], modalContent: true }
        }
        case contants.modalOptionContants: {
            let temp = [...state.data];
            const index = temp.findIndex(post => post.id === payload);
            return { ...state, dataEdit: temp[index], modalOption: true }
        }
        case contants.modalVariantConstant: {
            if (payload.isBool) {
                return { ...state, product_id: payload.id, modalVariant: true }
            } else {
                return { ...state, modalVariant: false, product_id: null }
            }
        }
        case contants.createVariantConstant: {
            return { ...state, loading: false, disabled: false }
        }
        case contants.editVariantConstant: {
            if (payload.id) {
                const data = state.data.filter(item => item.id == payload.product_id);
                const dataVariantEdit = data[0].product_variants.filter(item => item.id == payload.id);
                return { ...state, modalEditVariant: payload, dataVariantEdit }
            }
            return { ...state, modalEditVariant: {} }
        }
        case contants.updateVariantConstant: {
            let temp = [...state.data];
            const index = temp.findIndex(item => item.id == payload.product_id);
            const index1 = temp[index].product_variants.findIndex(item => item.id == payload.id);
            temp[index].product_variants[index1] = payload;
            return { ...state, data: temp, loading: false, modalEditVariant: false, disabled: false };
        }
        case contants.deleteVariantConstant: {
            let temp = [...state.data];
            const index = temp.findIndex(item => item.id == payload.product_id);
            const index1 = temp[index].product_variants.findIndex(item => item.id == payload.id);
            temp[index].product_variants.splice(index1, 1);
            return { ...state, data: temp, loading: false, modalEditVariant: false, disabled: false };
        }
        default:
            return state
    }
}

export default ProductReducer;