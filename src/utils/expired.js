import { apiAdmin } from "../services/adminApi";
import { ACCESS_TOKEN, INFO, TIMESTAMP } from "../settings/configUrl";

export const handleExpired = (timeout, miliseconds, token) => {
    const expired = {
        timeout,
        miliseconds
    }
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(TIMESTAMP, JSON.stringify(expired));
}

export const handleRefreshToken = async (history = null, props = null, isBool) => {
    await apiAdmin.refreshToken().then(res => {
        let timestamp = new Date(res.data.timestamp.time);
        let miliseconds = timestamp.getTime();
        handleExpired(res.data.timestamp.expired, miliseconds, res.data.token);
        if (isBool) history.push(props.match.url);
    }).catch(e => {
        history.push('/admin');
        localStorage.removeItem(TIMESTAMP);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(INFO);
    });
}

export const handleCompareTime = (date = new Date()) => {
    let expired = JSON.parse(localStorage.getItem(TIMESTAMP));
    let result = (date.getTime() - expired.miliseconds) / 1000 / 60;
    if (result > expired.timeout) return true;
    return false;
}