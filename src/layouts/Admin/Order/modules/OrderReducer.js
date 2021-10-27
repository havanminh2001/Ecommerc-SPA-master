import moment from 'moment';
import * as contants from './Constants';

const initialState = {
    data: [],
    excel: [],
    pagination: {
        current: 1,
        pageSize: 15
    },
    loading: false
}

const OrderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case contants.loadingContants: {
            return { ...state, loading: true }
        }
        case contants.fetchSuccessContants: {
            const { data, total, lastPage } = payload;
            let temp = [
                ['id', 'user_id', 'order_name', 'order_email', 'order_address', 'order_phone', 'order_payment', 'payment_option', 'transport_price', 'order_status', 'created_at']
            ];
            data.forEach(ord => {
                let arr = [
                    ord.id,
                    ord.user_id,
                    ord.order_name,
                    ord.order_email,
                    ord.order_address,
                    ord.order_phone,
                    ord.order_payment,
                    ord.payment_option,
                    ord.transport_price,
                    ord.order_status,
                    moment(ord.created_at).format("DD-MM-YYYY H:m")
                ];
                temp.push(arr);
            });
            return {
                ...state,
                data,
                excel: temp,
                pagination: { ...state.pagination, total, lastPage },
                loading: false
            }
        }
        case contants.paginationContants: {
            const { data, pagination } = payload;
            const { current, pageSize, total, lastPage } = pagination;
            return { ...state, data, pagination: { ...state.pagination, current, pageSize, total, lastPage }, loading: false }
        }
        case contants.updateContants: {
            const temp = [...state.data];
            const { update, id } = payload;
            const index = temp.findIndex(ord => ord.id === id);
            temp[index] = update;
            return { ...state, data: temp, loading: false }
        }
        case contants.seachContants: {
            const { data, total, lastPage } = payload;
            const temp = { ...state };
            return { ...state, data, pagination: { ...state.pagination, total, lastPage, pageSize: 15 }, loading: false }
        }
        case contants.exportOrder: {
            let excel = [
                [
                    'id', 'user_id', 'order_name', 'order_email', 'order_address', 'order_phone', 'order_payment', 'payment_option', 'transport_price', 'order_status', 'total', 'created_at'
                ]
            ];
            payload.forEach(ord => {
                let arr = [
                    ord.id,
                    ord.user_id,
                    ord.order_name,
                    ord.order_email,
                    ord.order_address,
                    ord.order_phone,
                    ord.order_payment,
                    ord.payment_option,
                    ord.transport_price,
                    ord.order_status,
                    ord.order_details.reduce((total, item) => {
                        return total += (item.product_price * item.qty) - item.discount
                    }, 0),
                    moment(ord.created_at).format("DD-MM-YYYY H:m"),
                ];
                excel.push(arr);
            });
            return { ...state, excel, loading: false };
        }
        default:
            return state
    }
}

export default OrderReducer