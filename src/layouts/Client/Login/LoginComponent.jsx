import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import BreadCrumb from '../Breadcrumb/BreadCrumb'
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Space, Spin } from 'antd';
import { apiLogin } from '../../../services/clientApi';
import { handleExpired } from '../../../utils/expired';
import { ACCESS_TOKEN, INFO } from '../../../settings/configUrl';
import { authUserAction } from '../../../redux/Actions/Admin/authActions';

const schema = yup.object().shape({
    username: yup.string().max(100).required(),
    password: yup.string().min(6).max(254).required()
});

export default function LoginComponent(props) {
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        const token = location.search.split('?token=')[1];
        if (token?.length > 200) {
            apiLogin.getInfo(token).then(res => {
                if (res.data.status_code === 200) {
                    let timestamp = new Date(res.data.timestamp.time);
                    let miliseconds = timestamp.getTime();
                    handleExpired(res.data.timestamp.expired, miliseconds, token);
                    localStorage.setItem(INFO, JSON.stringify(res.data.user));
                    dispatch(authUserAction(true));
                    if (history.location.state) {
                        history.push(history.location.state);
                    } else {
                        history.push('/');
                    }
                }
            }).catch(e => {

            })
        }
    }, [location.search]);
    const onSubmitHandler = async (data) => {
        setLoading(true);
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
            var object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            var json = JSON.stringify(object);
        }
        const res = await apiLogin.loginDemo(json);
        console.log(res.data);

        if (res.data.status_code === 200) {
            //let timestamp = new Date(res.data.timestamp.time);
            //let miliseconds = timestamp.getTime();
            //handleExpired(res.data.timestamp.expired, miliseconds, res.data.token);
            console.log(res.data);
            localStorage.setItem(INFO, JSON.stringify(res.data));
            localStorage.setItem(ACCESS_TOKEN, JSON.stringify(res.data.token));

            console.log(localStorage.getItem(INFO));
            dispatch(authUserAction(true));
            if (history.location.state) {
                history.push(history.location.state);
            } else {
                history.push('/');
            }
        } else {
            setMessageError(res.data.message);
            setLoading(false);
        }
    };
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <BreadCrumb />
            <section className="login">
                <div className="container">
                    <div className="login__content">
                        <div className="login__title">
                            <h2>Login Now</h2>
                            <p>You can login using your social media account or email address.</p>
                        </div>
                        <div className="login__social row">
                            <div className="col-md-4 login__item">
                                <a href="https://1234-demo.000webhostapp.com/api/redirect/facebook" className="login__facebook">
                                    <i className="lni lni-facebook-filled" />
                                    Facebook login
                                </a>
                            </div>
                            <div className="col-md-4 login__item">
                                <NavLink to="/" className="login__twitter">
                                    <i className="lni lni-twitter-original" />
                                    Twitter login
                                </NavLink>
                            </div>
                            <div className="col-md-4 login__item">
                                <NavLink to="/" className="login__google">
                                    <i className="lni lni-google" />
                                    Google login
                                </NavLink>
                            </div>
                        </div>
                        <div className="login__option">
                            <span>Or</span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="login__form">
                            <div className="login__group">
                                <label htmlFor="username" className="col-form-label">User Name</label>
                                <input type="text" {...register("username")} name="username" className="form-control" />
                                {errors.username &&
                                    <span className="login__error">{errors.username.message}</span>
                                }
                            </div>
                            <div className="login__group">
                                <label htmlFor="password" className="col-form-label">Password</label>
                                <input type="password" {...register("password")} name="password" className="form-control" />
                                {errors.password &&
                                    <span className="login__error">{errors.password.message}</span>
                                }
                                {
                                    messageError && <span className="login__error">{messageError}</span>
                                }
                            </div>
                            <div className="login__remember">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue />
                                    <label className="form-check-label">
                                        Remember me
                                    </label>
                                </div>
                                <a href="">Forgot password?</a>
                            </div>
                            <div className="login__btn">
                                <button>Login</button>
                            </div>
                            <div className="login__outer">
                                <p>Don't have an account? <NavLink to="/register">Register here </NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
