import * as constants from './Constants';

const initialState = {
    loading: false,
    product: {
        data: [],
        currentPage: 1,
        lastPage: 0,
        total: 0
    },
    temp: {
        data: [],
        currentPage: 1,
        lastPage: 0,
        total: 0
    },
    categories: [],
    discount: {},
    filter: {
        range: 100,
        checkValue: {
            isCheck: false,
            value: ''
        }
    }
}

const ProductClientReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.loading:
            return { ...state, loading: payload }
        case constants.fetchSuccess: {
            return {
                ...state,
                product: payload.product,
                temp: payload.product,
                categories: payload.categories,
                discount: payload.discount,
                loading: false
            };
        }
        case constants.rangePrice: {
            if (payload < 101) {
                return {
                    ...state,
                    product: state.temp,
                    filter: { ...state.filter, range: 100 }
                }
            } else {
                let arr = [...state.temp.data].filter(item => {
                    const product = item?.product_skus[0];
                    if (parseInt(payload) >= product.sku_unit_price) {
                        return item;
                    }
                });
                return {
                    ...state,
                    product: { ...state.product, data: arr },
                    filter: { ...state.filter, range: parseInt(payload) }
                };
            }
        }
        case constants.checkboxPrice: {
            let arr = [];
            if (payload === state.filter.checkValue.value && state.filter.checkValue.isCheck) {
                return {
                    ...state,
                    product: state.temp,
                    filter: { ...state.filter, checkValue: { isCheck: false, value: '' } }
                }
            }
            switch (payload) {
                case 'type-1': {
                    arr = [...state.temp.data].filter(item => {
                        const product = item.product_skus[0];
                        if (product.sku_unit_price > 0 && product.sku_unit_price < 101) {
                            return item;
                        }
                    });
                    break;
                }
                case 'type-2': {
                    arr = [...state.temp.data].filter(item => {
                        const product = item.product_skus[0];
                        if (product.sku_unit_price > 100 && product.sku_unit_price < 501) {
                            return item;
                        }
                    });
                    break;
                }
                case 'type-3': {
                    arr = [...state.temp.data].filter(item => {
                        const product = item.product_skus[0];
                        if (product.sku_unit_price > 500 && product.sku_unit_price < 1001) {
                            return item;
                        }
                    });
                    break;
                }
                case 'type-4': {
                    arr = [...state.temp.data].filter(item => {
                        const product = item.product_skus[0];
                        if (product.sku_unit_price > 1000 && product.sku_unit_price < 2001) {
                            return item;
                        }
                    });
                    break;
                }
                default:
                    break;
            }
            return {
                ...state,
                product: { ...state.product, data: arr },
                filter: { ...state.filter, checkValue: { isCheck: true, value: payload } }
            }
        }
        case constants.selectFilter: {
            let tmp = [];
            switch (payload) {
                case 'low-high': {
                    tmp = [...state.product.data].sort((a, b) => {
                        return a.product_skus[0].sku_unit_price - b.product_skus[0].sku_unit_price
                    });
                    break;
                }
                case 'high-low': {
                    tmp = [...state.product.data].sort((a, b) => {
                        return b.product_skus[0].sku_unit_price - a.product_skus[0].sku_unit_price
                    });
                    break;
                }
                case 'A-Z': {
                    tmp = [...state.product.data].sort((a, b) => {
                        return a.product_variant_name - b.product_variant_name
                    });
                    break;
                }
                case 'Z-A': {
                    tmp = [...state.product.data].sort((a, b) => {
                        return b.product_variant_name - a.product_variant_name
                    });
                    break;
                }
                default:
                    tmp = [...state.temp.data];
            }
            return { ...state, product: { ...state.product, data: tmp } };
        }
        case constants.pagination: {
            const { data, total, currentPage, lastPage } = payload.product;
            const temp = [...state.temp.data].concat(data);
            return {
                ...state,
                product: { data: temp, total, currentPage, lastPage },
                temp: { data: temp, total, currentPage, lastPage },
                categories: payload.categories,
                discount: payload.discount,
                loading: false,
                filter: { ...state.filter, checkValue: { isCheck: false, value: '' } }
            };
        }
        default:
            return state
    }
}

export default ProductClientReducer;
