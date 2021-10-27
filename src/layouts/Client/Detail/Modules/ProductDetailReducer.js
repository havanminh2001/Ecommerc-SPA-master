import * as constants from './Constants';

const initialState = {
    loading: false,
    categories: {},
    product: {},
    option: {},
    product_sku: [],
    review: {
        data: [],
        pagination: {
        }
    },
    inventory: {},
    discount: {},
    variants: [],
    slug: [],
    image: {

    },
    isData: false
}

const ProductDetailReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.loading:
            return { ...state, loading: payload }
        case constants.fetchSuccess: {
            const { categories, product, option, product_sku, review, inventory, discount, variants, slug } = payload;
            return { ...state, categories, product, option, product_sku, review, inventory, discount, variants, slug, image: product_sku[0], loading: false, isData: true };
        }
        case constants.fetchFail:
            return { ...state, loading: payload }
        case constants.changeImage: {
            return { ...state, image: payload };
        }
        case constants.createReview: {
            const temp = [...state.review.data];
            temp.push(payload);
            return { ...state, review: { ...state.review, data: temp }, loading: false };
        }
        case constants.paginationReview: {
            const temp = [...state.review.data].concat(payload.data);
            return {
                ...state,
                review: { ...state.review, data: temp, currentPage: payload.currentPage },
                loading: false
            };
        }
        default:
            return state
    }
}

export default ProductDetailReducer;
