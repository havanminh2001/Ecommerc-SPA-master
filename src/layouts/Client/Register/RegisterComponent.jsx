import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/BreadCrumb';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import * as actions from '../../../redux/Actions/User/RegisterActions';


const schema = yup.object().shape({
    name: yup.string().max(100).required(),
    email: yup.string().max(100).email().required(),
    password: yup.string().min(6).max(254).required(),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'confirm password must match'),
    address: yup.string().max(254).required(),
    phone: yup.string().required().max(10).matches(new RegExp(/(0)[0-9]{9}/), 'number phone start 0 and maximum 10 number'),
});

export default function RegisterComponent(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const errorsRegister = useSelector(state => state.RegisterReducer.errors);
    const onSubmitHandler = (data) => {
        let formData = new FormData();
        console.log(data);
        // for (const key in data) {
        //     formData.append(key, data[key]);
        // }
        formData.append('username', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('name', data.name);
        var object = {};

        formData.forEach(function (value, key) {
            object[key] = value;
        });
        var json = JSON.stringify(object);
        dispatch(actions.registerAction(json, reset));
        console.log(json);
    };
    return (
        <>
            <Breadcrumb />
            <section className="register">
                <div className="container">
                    <div className="register__content">
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="register__form">
                            <div className="register__title">
                                <h2>No Account? Register</h2>
                                <p>Registration takes less than a minute but gives you full control over your orders.</p>
                            </div>
                            <div className="register__group">
                                <label htmlFor="name"><span>*</span>Fullname</label>
                                <input type="text" {...register("name")} name="name" className="form-control" />
                                {errors.name &&
                                    <span className="register__error">{errors.name.message}</span>
                                }
                                {
                                    errorsRegister?.name && <span className="register__error">{errorsRegister?.name}</span>
                                }
                            </div>
                            <div className="register__group">
                                <label htmlFor="email"><span>*</span>Email</label>
                                <input type="email" {...register("email")} name="email" className="form-control" />
                                {errors.email &&
                                    <span className="register__error">{errors.email.message}</span>
                                }
                                {
                                    errorsRegister?.email && <span className="register__error">{errorsRegister?.email}</span>
                                }
                            </div>
                            <div className="register__group">
                                <label htmlFor="password"><span>*</span>Password</label>
                                <input type="password" {...register("password")} name="password" className="form-control" />
                                {errors.password &&
                                    <span className="register__error">{errors.password.message}</span>
                                }
                                {
                                    errorsRegister?.password && <span className="register__error">{errorsRegister?.password}</span>
                                }
                            </div>
                            <div className="register__group">
                                <label htmlFor="confirm-password"><span />
                                    <span>*</span>Confirm Password
                                </label>
                                <input type="password" {...register("confirm_password")} name="confirm_password" className="form-control" />
                                {errors.confirm_password &&
                                    <span className="register__error">{errors.confirm_password.message}</span>
                                }
                                {
                                    errorsRegister?.confirm_password && <span className="register__error">{errorsRegister?.confirm_password}</span>
                                }
                            </div>
                            <div className="register__group">
                                <label htmlFor="address"><span>*</span>Address</label>
                                <input type="text" {...register("address")} name="address" className="form-control" />
                                {errors.address &&
                                    <span className="register__error">{errors.address.message}</span>
                                }
                                {
                                    errorsRegister?.address && <span className="register__error">{errorsRegister?.address}</span>
                                }
                            </div>
                            <div className="register__group">
                                <label htmlFor="phone"><span>*</span>Number Phone</label>
                                <input type="text" {...register("phone")} name="phone" className="form-control" />
                                {errors.phone &&
                                    <span className="register__error">{errors.phone.message}</span>
                                }
                                {
                                    errorsRegister?.phone && <span className="register__error">{errorsRegister?.phone}</span>
                                }
                            </div>
                            {/* <div className="register__group">
                                <label htmlFor="birth">Birth</label>
                                <input type="date" name="birth" className="form-control" />
                            </div> */}
                            {/* <div className="register__group">
                                <label htmlFor="gender">Gender</label>
                                <select name="gender" className="form-select">
                                    <option value>Select Gender</option>
                                    <option value={1}>Male</option>
                                    <option value={0}>Female</option>
                                </select>
                            </div> */}
                            <div className="register__btn">
                                <button>Register</button>
                            </div>
                            <div className="register__outer">
                                <p>Already have an account? <NavLink to="/login">Login Now</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
