import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import './login.scss';
import { apiAdmin } from '../../../services/adminApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { handleExpired } from '../../../utils/expired';
import { alertErrors, STATUS_FAIL } from '../../../settings/config';
import { authAction } from '../../../redux/Actions/Admin/authActions';

export default function LoginAdminComponent(props) {
    let [isCheck, setCheckBox] = useState(false);
    let [loading, setLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        setLoading(true);
        let formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);
        apiAdmin.fetchApiLogin(formData).then(res => {
            setLoading(false);
            if (res.data.status_code === STATUS_FAIL) {
                alertErrors(res.data.message);
            } else {
                let timestamp = new Date(res.data.timestamp.time);
                let miliseconds = timestamp.getTime();
                handleExpired(res.data.timestamp.expired, miliseconds, res.data.token);
                console.log(res.data);
                if (parseInt(res.data.user.role) === 2) {
                    dispatch(authAction(res.data.user));
                    history.push('/admin/dashboard');
                } else {
                    dispatch(authAction(res.data.user));
                    history.push('/');
                }
            }
        }).catch(e => {
            console.log(e);
        });
    }
    return (
        <div className="main">
            <ToastContainer />
            <div className="main-content">
                <div className="card">
                    <h5 className="card-header">Login</h5>
                    <div className="card-body">
                        <Form
                            name="basic"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                    {
                                        pattern: /^\S+@\S+\.\S+$/,
                                        message: 'Email wrong format!',
                                    },
                                ]}
                                style={{ marginBottom: "0px" }}
                            >
                                <Input placeholder="Enter address email" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        min: 6,
                                        message: 'Password less than 6 characters '
                                    }
                                ]}
                            >
                                <Input.Password placeholder="Enter password" />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 0,
                                    span: 24,
                                }}
                            >
                                <Button type="primary" htmlType="submit" style={{ width: "100%", padding: "5px 0" }} loading={loading}>
                                    Login
                                </Button>
                            </Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 0,
                                    span: 8,
                                }}
                            >
                                <Checkbox checked={isCheck} onChange={() => { setCheckBox(!isCheck) }} >Remember me</Checkbox>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
