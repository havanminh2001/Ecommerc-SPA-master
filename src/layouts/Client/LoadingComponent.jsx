import React from 'react';
import { useSelector } from 'react-redux';
import { Spin, Space } from 'antd';
export default function LoadingComponent() {
    const loading = useSelector(state => state.HomeReducer.loading);
    const loadingCart = useSelector(state => state.CartReducer.loading);
    const loadingRegister = useSelector(state => state.RegisterReducer.loading);
    const loadingProductDetail = useSelector(state => state.ProductDetailReducer.loading);
    const loadingProduct = useSelector(state => state.ProductClientReducer.loading);
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <div className={loadingCart ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <div className={loadingRegister ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <div className={loadingProductDetail ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <div className={loadingProduct ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
        </>
    )
}
