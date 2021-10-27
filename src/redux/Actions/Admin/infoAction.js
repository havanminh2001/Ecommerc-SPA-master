import * as info from "../../Contants/Admin/InfoContants";
import { apiAdmin } from '../../../services/adminApi';
import { alertErrors, STATUS_AUTH } from "../../../settings/config";

export const fetchInfoSuccessAct = (user) => ({
    type: info.apiSuccessContants,
    payload: user
});

export const fetchInfoFailAct = (err) => ({
    type: info.apiFailContants,
    payload: err
});

export const responseApi = (history) => async (dispatch) => {
    try {
        const res = await apiAdmin.fetchInfo();
        if (res.data.status_code === 200) {
            dispatch(fetchInfoSuccessAct(res.data.user));
        } else if (res.data.status_code === 401) {
            history.push('/');
        }
    } catch (e) {
        console.log(e);
    }
}