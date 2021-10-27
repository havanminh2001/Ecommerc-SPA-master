import { alertErrors, alertSuccess } from "../../settings/config";
import { INFO } from "../../settings/configUrl";
import { apiPurchase } from "../clientApi";
import * as yup from 'yup';


export const schema = yup.object().shape({
    name: yup.string().max(100, 'Maximum 100 character').required('Name is required'),
    address: yup.string().max(254, 'Maximum 254 character').required('Address is required'),
    phone: yup.string().required('Phone is required').matches(new RegExp(/(0)[0-9]{9}/), 'Number phone start 0 and maximum 10 number'),
});

export const hideCharacter = (start, char1, char2) => {
    let temp = "";
    for (let i = 0; i < char1.length; i++) {
        if (i > start) {
            temp += "*";
        } else {
            temp += char1[i];
        }
    }
    return `${temp}@${char2}`;
}

export const styled = {
    color: "#f73232",
    fontSize: "13px",
    display: "block",
    width: "100%",
    transform: "translateX(23%)",
    marginTop: "5px"
}


export const onSubmitHandler = async (user, values, dateTime, gender, setLoading, setError) => {
    const data = {
        ...values,
        birth: dateTime.current ? dateTime.current : user.birth,
        gender: gender.current ? gender.current : user.gender
    };
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    setLoading(true);
    try {
        const res = await apiPurchase.updateInfo(user.id, formData);
        if (res.data.status_code === 200) {
            const temp = { ...res.data.data };
            delete temp.role;
            localStorage.setItem(INFO, JSON.stringify(temp));
            setLoading(false);
            alertSuccess("Update profile success");
        } else {
            for (const [key, value] of Object.entries(res.data.data)) {
                setError(key, {
                    type: "manual",
                    message: value[0]
                });
            }
        }
    } catch (e) {
        if (e.response) {
            alertErrors("Sorry, please try again!");
        }
    }
}