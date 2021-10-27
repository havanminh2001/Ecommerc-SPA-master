import React, { useEffect, useRef, useState } from 'react'
import { DatePicker, Space, Spin } from 'antd';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from 'moment';
import { onSubmitHandler, styled, hideCharacter, schema } from '../../../../services/user/info';
import { INFO } from '../../../../settings/configUrl';



export default function InfoAccount() {
    const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);
    const dateTime = useRef("");
    const gender = useRef();
    const user = JSON.parse(localStorage.getItem(INFO));
    const date = user?.birth === true ? moment(user?.birth).format("DD-MM-YYYY") : moment();
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            setValue("name", user.name);
            setValue("phone", user.phone);
            setValue("address", user.address);
        }
    }, []);
    const changeDate = (date, dateString) => {
        dateTime.current = moment(date).format("YYYY-MM-DD");
    }
    const changeGender = (e) => {
        gender.current = e.target.value;
    }
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <div className="purchase__password">
                <div className="purchase__title">
                    <h4>My Profile</h4>
                    <p>Manage profile information for account security</p>
                </div>
                <div className="purchase__profile">
                    <form action="*" onSubmit={handleSubmit((values) => onSubmitHandler(user, values, dateTime, gender, setLoading, setError))} className="profile__content">
                        <div className="profile__group">
                            <div className="profile__label">
                                <span>Username</span>
                            </div>
                            <div className="profile__input">
                                <span>{hideCharacter(1, user?.email.split("@")[0], user?.email.split("@")[1])}</span>
                            </div>
                        </div>
                        <div className="profile__group">
                            <div className="profile__label">
                                <span>Customer Name</span>
                            </div>
                            <div className="profile__input">
                                <input type="text" {...register('name')} name="name" className="form-control" />
                            </div>
                            {errors.name && <span style={styled}>{errors.name.message}</span>}
                        </div>
                        <div className="profile__group">
                            <div className="profile__label">
                                <span>Number Phone</span>
                            </div>
                            <div className="profile__input">
                                <input type="text" {...register('phone')} name="phone" className="form-control" />
                            </div>
                            {errors.phone && <span style={styled}>{errors.phone.message}</span>}
                        </div>
                        <div className="profile__group">
                            <div className="profile__label">
                                <span>Address</span>
                            </div>
                            <div className="profile__input">
                                <input type="text" {...register('address')} name="address" className="form-control" />
                            </div>
                            {errors.address && <span style={styled}>{errors.address.message}</span>}
                        </div>
                        <div className="profile__group">
                            <div className="profile__label">
                                <span>Gender</span>
                            </div>
                            <div className="profile__input">
                                <div className="profile__radio">
                                    <input className="form-check-input"
                                        onChange={changeGender}
                                        type="radio" value={1}
                                        name="gender"
                                        defaultChecked={user.gender == 1 ? true : false} />
                                    <label className="form-check-label" htmlFor="gender">
                                        Male
                                    </label>
                                </div>
                                <div className="profile__radio">
                                    <input
                                        onChange={changeGender}
                                        className="form-check-input"
                                        type="radio" value={0}
                                        name="gender"
                                        defaultChecked={user.gender == 0 ? true : false} />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="profile__group">
                            <div className="profile__label">
                                <span>Birth Date</span>
                            </div>
                            <div className="profile__input">
                                <Space direction="vertical">
                                    <DatePicker size="large"
                                        defaultValue={moment(date, "DD-MM-YYYY")}
                                        onChange={changeDate}
                                        format="DD-MM-YYYY" />
                                </Space>
                            </div>
                        </div>
                        <div className="profile__group">
                            <div className="profile__label"></div>
                            <button className="profile__btn">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
