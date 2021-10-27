import { Space, Spin } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './modules/Actions';

export default function CardDashboard() {
    const loading = useSelector(state => state.DashBoardReducer.loading);
    const count = useSelector(state => state.DashBoardReducer.count);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!(count.order > 0 || count.visitor > 0 || count.user > 0)) {
            dispatch(actions.countAction());
        }
    }, []);
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <div className="content__card col-12 col-sm-6 col-lg-3">
                <div className="content__item d-flex align-items-center">
                    <div className="content__text">
                        <p>Total Revenue</p>
                        <h5>${count.revenue}</h5>
                    </div>
                    <div className="content__icon">
                        <i className="fa fa-shopping-cart" />
                    </div>
                </div>
            </div>
            <div className="content__card col-12 col-sm-6 col-lg-3">
                <div className="content__item d-flex align-items-center">
                    <div className="content__text">
                        <p>Total Sales</p>
                        <h5>{count.order}</h5>
                    </div>
                    <div className="content__icon">
                        <i className="fa fa-shopping-cart" />
                    </div>
                </div>
            </div>
            <div className="content__card col-12 col-sm-6 col-lg-3">
                <div className="content__item d-flex align-items-center">
                    <div className="content__text">
                        <p>Total User</p>
                        <h5>{count.user}</h5>
                    </div>
                    <div className="content__icon">
                        <i className="fa fa-users"></i>
                    </div>
                </div>
            </div>
            <div className="content__card col-12 col-sm-6 col-lg-3">
                <div className="content__item d-flex align-items-center">
                    <div className="content__text">
                        <p>Total Visitor</p>
                        <h5>{count.visitor}</h5>
                    </div>
                    <div className="content__icon">
                        <i className="fa fa-eye"></i>
                    </div>
                </div>
            </div>
        </>
    )
}
