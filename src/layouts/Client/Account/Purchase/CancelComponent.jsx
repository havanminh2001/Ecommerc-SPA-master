import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Spin } from 'antd';
import { ACCESS_TOKEN, INFO } from '../../../../settings/configUrl';
import * as action from '../Modules/Actions';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as service from '../../../../services/purchase';

export default function CancelComponent() {
    const [current, setCurrent] = useState(false);
    const loading = useSelector(state => state.PurchaseReducer.loading);
    const data = useSelector(state => state.PurchaseReducer.cancelled.data);
    const currentPage = useSelector(state => state.PurchaseReducer.cancelled.currentPage);
    const lastPage = useSelector(state => state.PurchaseReducer.cancelled.lastPage);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(INFO));
    const token = localStorage.getItem(ACCESS_TOKEN);
    const query = history.location.search.split("?type=");
    useEffect(() => {
        if (query[1] > 0 && query[1] === "4" && data.length < 1 && !current && token) {
            setCurrent(true);
            dispatch(action.fetchPurchaseForStatusAction(user.id, query[1]));
        }
    }, [query]);
    const scrollPurchase = () => {
        if (currentPage < lastPage) {
            dispatch(action.paginationPurchaseStatusAction(user.id, query[1], currentPage + 1));
        }
    }
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <InfiniteScroll
                dataLength={data.length}
                next={scrollPurchase}
                hasMore={true}
            >
                {data.length > 0 ? service.renderPurchase(data) :
                    <div className="purchase__empty">
                        <figure>
                            <img src={process.env.PUBLIC_URL + "/img/order.png"} alt="*" />
                        </figure>
                        <h4 className="purchase__empty--title">No orders yet</h4>
                    </div>
                }
            </InfiniteScroll>
        </>
    )
}
