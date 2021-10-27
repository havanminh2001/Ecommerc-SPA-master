import axios from 'axios';
import { apiAdmin } from '../services/adminApi';
import { ACCESS_TOKEN, BASE_URL, BASE_URL_ADMIN, TIMESTAMP, DEMO_URL } from '../settings/configUrl';
import { TOKEN_GHN } from '../settings/config';
import { handleCompareTime, handleExpired } from './expired';
import { Redirect } from 'react-router-dom';

export const apiRefreshToken = (endpoint, method = "get", data = null) => {
    return axios({
        method,
        url: `${BASE_URL}/${endpoint}`,
        data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

export const apiCheckout = (endpoint, method = "get", data = null, token) => {
    return axios({
        method,
        url: `${BASE_URL}/${endpoint}`,
        data
    });
}

export const apiTransport = (endpoint, method = "get", data = null) => {
    return axios({
        method,
        url: endpoint,
        data,
        headers: {
            token: TOKEN_GHN
        }
    });
}

export const callApi = (endpoint, method = "get", data = null) => {
    return axios({
        method,
        url: `${BASE_URL}/${endpoint}`,
        data
    });
}

export const callApiDemo = (endpoint, method = "get", data) => {
    return axios({
        method,
        url: `${DEMO_URL}/${endpoint}`,
        data,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const callApiAdmin = async (endpoint, method = "get", data = null) => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        if (handleCompareTime()) {
            await apiAdmin.refreshToken().then(res => {
                let timestamp = new Date(res.data.timestamp.time);
                let miliseconds = timestamp.getTime();
                handleExpired(res.data.timestamp.expired, miliseconds, res.data.token);
            }).catch(e => {
                localStorage.removeItem(TIMESTAMP);
                localStorage.removeItem(ACCESS_TOKEN);
                <Redirect to="/admin" />
            });
        }
        return await axios({
            method,
            url: `${BASE_URL_ADMIN}/${endpoint}`,
            data,
            headers: {
                Accept: 'application/json'
            }
        });
    }
}
