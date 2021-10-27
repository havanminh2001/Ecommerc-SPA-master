import { toast } from 'react-toastify';

export const STATUS_SUCCESS = 200;
export const STATUS_VALIDATE = 422;
export const STATUS_AUTH = 401;
export const STATUS_FAIL = 500;

export const TOKEN_GHN = "3ebf963e-1961-11ec-b268-d64e67bb39ee";
export const DISTRICT_ID_FROM = 3695;
export const WARD_ID_FROM = 90753;
export const SHOP_ID = 2037433;

export const url_get_province = "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
export const url_get_district = "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";
export const url_get_ward = "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward";
export const get_service_id = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services";
export const get_price_ship = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee"

export const alertErrors = (mess, time = null) => {
    return toast.error(mess, {
        position: "top-right",
        autoClose: time ? time : 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const alertSuccess = (mess, time = null) => {
    return toast.success(mess, {
        position: "top-right",
        autoClose: time ? time : 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}