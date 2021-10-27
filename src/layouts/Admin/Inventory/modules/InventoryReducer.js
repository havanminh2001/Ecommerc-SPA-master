import * as contants from './Constants';
import moment from 'moment';

const initialState = {
    data: [],
    excel: [],
    pagination: {
        current: 1,
        pageSize: 15
    },
    loading: false,
    disabled: false,
    visiable: false,
    modal: false
}

const InventoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case contants.loadingContants: {
            return { ...state, loading: true }
        }
        case contants.fetchSuccessContants: {
            const { data, total, lastPage } = payload;
            return { ...state, data, pagination: { ...state.pagination, total, lastPage }, loading: false }
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
        case contants.modalContants: {
            return { ...state, modal: payload }
        }
        case contants.editContants: {
            let temp = [...state.data];
            const index = temp.findIndex(cate => cate.id === payload);
            return { ...state, dataEdit: temp[index], modal: true }
        }
        case contants.updateContants: {
            const { update, id } = payload;
            const index = state.data.findIndex(cate => cate.id === id);
            state.data[index] = update;
            return { ...state, data: [...state.data], dataEdit: {}, loading: false, modal: false }
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
            let temp = [];
            if (!data[0]?.product_variants) {
                data.forEach(item => {
                    const product_variants = {
                        id: item.variant_id,
                        product_variant_name: item.product_variant_name,
                        product_variant_rom: item.product_variant_rom
                    }
                    const product_skus = {
                        id: item.sku_id,
                        product_variant_id: item.product_variant_id,
                        sku_unit_price: item.sku_unit_price,
                        sku_promotion_price: item.sku_promotion_price,
                        sku_qty: item.sku_qty,
                        color: item.color
                    }
                    temp.push({
                        id: item.id,
                        product_id: item.id,
                        variant_id: item.variant_id,
                        sku_id: item.sku_id,
                        unit_price: item.unit_price,
                        promotion_price: item.promotion_price,
                        qty: item.qty,
                        status: item.status,
                        created_at: item.created_at,
                        updated_at: item.updated_at,
                        product_variants,
                        product_skus
                    });
                });
                return { ...state, data: temp, pagination: { ...state.pagination, total, lastPage, pageSize: 15 }, loading: false }
            }
            return { ...state, data, pagination: { ...state.pagination, total, lastPage, pageSize: 15 }, loading: false }
        }
        case contants.updateStatusContants: {
            let temp = [...state.data];
            const index = temp.findIndex((item) => item.id === payload.id);
            temp[index].status = payload.update;
            return { ...state, data: temp, loading: false }
        }
        case contants.fetchProductContants: {
            if (payload?.isBool) {
                return { ...state, product: payload.result }
            }
            return { ...state, visiable: payload }
        }
        case contants.exportExcel: {
            let excel = [
                [
                    'id', 'variant_id', 'sku_id', 'product_name', 'color', 'unit_price', 'promotion_price', 'qty', 'created_at'
                ]
            ];
            payload.forEach(item => {
                const arr = [];
                arr.push(item.id);
                arr.push(item.sku_id);
                arr.push(item.variant_id);
                arr.push(item.product_variants.product_variant_name);
                arr.push(item.product_skus.color);
                arr.push(item.unit_price);
                arr.push(item.promotion_price);
                arr.push(item.qty);
                arr.push(moment(item.created_at).format("DD-MM-YYYY"));
                excel.push(arr);
            });
            return { ...state, excel, loading: false };
        }
        default:
            return state
    }
}

export default InventoryReducer