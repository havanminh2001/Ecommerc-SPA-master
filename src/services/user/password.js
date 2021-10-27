import * as yup from 'yup';
import { alertErrors, alertSuccess } from '../../settings/config';
import { apiPurchase } from '../clientApi';

export const styled = {
    color: "#f73232",
    fontSize: "13px",
    display: "block",
    width: "100%",
}

export const schema = yup.object().shape({
    current_password: yup.string().required('Current password is required').min(6, 'Minimum 6 character').max(254, 'Maximum 254 character'),
    new_password: yup.string().required('New password is required').min(6, 'Minimum 6 character').max(254, 'Maximum 254 character'),
    same_password: yup.string().oneOf([yup.ref('new_password'), null], 'Confirm password must match')
});

export const submitChangePassword = async (user, values, setLoading, reset, setError) => {
    try {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        setLoading(true);
        const res = await apiPurchase.changePassword(user.id, formData);
        console.log(res.data);
        if (res.data.status_code == 200) {
            setLoading(false);
            reset();
            alertSuccess("Change password success");
        } else {
            setLoading(false);
            if (res.data.message) {
                setError("current_password", {
                    type: "manual",
                    message: res.data.message
                });
            } else {
                console.log(Object.entries(res.data.data));
                for (const [key, value] of Object.entries(res.data.data)) {
                    setError(key, {
                        type: "manual",
                        message: value[0]
                    });
                }
            }
        }
    } catch (e) {
        if (e.response) {
            setLoading(false);
            alertErrors('Sorry, Please try again!');
        }
    }
}