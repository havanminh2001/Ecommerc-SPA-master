import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { INFO } from '../../../../settings/configUrl';
import { yupResolver } from "@hookform/resolvers/yup";
import { Space, Spin } from 'antd';
import { styled, schema, submitChangePassword } from '../../../../services/user/password';

export default function PasswordAccount(props) {
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem(INFO));

    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <div className="row purchase__password">
                <div className="purchase__title">
                    <h4>Change Password</h4>
                    <p>For account security, please do not share your password with others</p>
                </div>
                <div className="col-lg-3 col-12"></div>
                <div className="col-lg-6 col-12">
                    <form className="purchase__form" onSubmit={handleSubmit((values) => submitChangePassword(user, values, setLoading, reset, setError))}>
                        <div className="purchase__group">
                            <label htmlFor="current-password" name="current_password" className="form-label">
                                Current Password
                            </label>
                            <input type="password" {...register('current_password')} name="current_password" className="form-control" />
                            {errors.current_password && <span style={styled}>{errors.current_password.message}</span>}
                        </div>
                        <div className="purchase__group">
                            <label htmlFor="new-password" className="form-label">
                                New Password
                            </label>
                            <input type="password" {...register('new_password')} name="new_password" className="form-control" />
                            {errors.new_password && <span style={styled}>{errors.new_password.message}</span>}
                        </div>
                        <div className="purchase__group">
                            <label htmlFor="comfirm-password" className="form-label">
                                Confirm Password
                            </label>
                            <input type="password" {...register('same_password')} name="same_password" className="form-control" />
                            {errors.same_password && <span style={styled}>{errors.same_password.message}</span>}
                        </div>
                        <button type="submit" className="purchase__btn">Submit</button>
                    </form>
                </div>
                <div className="col-lg-3 col-12"></div>
            </div>
        </>
    )
}
