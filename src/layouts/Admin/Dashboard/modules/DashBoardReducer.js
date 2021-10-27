import * as constants from './Constants';
import { getRandomColor, getMonthByString } from '../../../../utils/helper';

const initialState = {
    loading: false,
    count: {
        revenue: 0,
        order: 0,
        user: 0,
        visitor: 0
    },
    chart: {
        category: {
            data: [],
            label: [],
            color: []
        },
        user: {
            data: [],
            label: [],
            color: []
        },
        order: {
            data: [],
            label: [],
            color: []
        }
    }
}

const DashBoardReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.loading:
            return { ...state, loading: payload };
        case constants.fetchCount:
            return { ...state, count: payload, loading: false };
        case constants.fetchChart: {
            const { categories, user, order } = payload;
            const temp = Array.from({ length: 12 });
            const category = {
                data: categories.map(cate => {
                    return cate.products.reduce((total, pro) => {
                        return total += parseInt(pro.product_variants_count);
                    }, 0);
                }),
                label: categories.map(cate => {
                    return cate.categories_name
                }),
                color: categories.map(cate => {
                    return getRandomColor();
                })
            }
            const users = {
                data: user.map(item => {
                    return item.total;
                }),
                label: user.map(item => {
                    return getMonthByString(item.month);
                }),
                color: user.map(cate => {
                    return getRandomColor();
                })
            }
            const orders = {
                data: temp.map((item, index) => {
                    let num = 0;
                    order.forEach(ord => {
                        if (ord.month === index + 1) {
                            num = parseInt(ord.total);
                        }
                    });
                    return parseInt(num);
                }),
                label: order.map(item => {
                    return getMonthByString(item.month);
                })
            }
            return { ...state, chart: { category, user: users, order: orders }, loading: false };
        }
        default:
            return state
    }
}

export default DashBoardReducer;
