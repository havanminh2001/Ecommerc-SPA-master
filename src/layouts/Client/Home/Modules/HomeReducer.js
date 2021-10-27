import * as constants from './Constants';
const initialState = {
    categories: [],
    slugsProduct: [],
    discount: [],
    product: {
        data: [],
        total: 0,
        nextPage: 0
    },
    special: {
        product: [],
        productDiscount: {}
    },
    loading: false
}

const HomeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.loading: {
            return { ...state, loading: payload };
        }
        case constants.fetchCategories: {
            return {
                ...state,
                categories: payload.categories,
                slugsProduct: payload.slugsProduct,
                discount: payload.discount,
                loading: false
            }
        }
        case constants.fetchFail: {
            return { ...state, loading: payload };
        }
        case constants.fetchProduct: {
            return {
                ...state,
                product: { data: payload.data, total: payload.total, nextPage: ++payload.currentPage }
            };
        }
        case constants.loadMoreProduct: {
            const data = [...state.product.data].concat(payload.data);
            return { ...state, product: { ...state.product, data, nextPage: ++payload.currentPage }, loading: false };
        }
        case constants.fetchProductDiscount: {
            return {
                ...state,
                special: { product: payload.product, productDiscount: payload.productDiscount[0] }
            };
        }
        default:
            return state
    }
}

export default HomeReducer