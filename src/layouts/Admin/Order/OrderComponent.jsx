import React, { useEffect, useState, useRef } from 'react'
import { Table, Input, Select } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import * as trans from './modules/Actions';
import * as actions from '../Dashboard/modules/Actions';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CSVLink } from 'react-csv';
import { renderMonth } from '../../../utils/helper';
import { alertErrors } from '../../../settings/config';
import { getColumnSearchProps } from '../../../services/table';
const { Option } = Select;


export default function OrderComponent(props) {
    let order = useSelector(state => state.OrderReducer.data);
    let excel = useSelector(state => state.OrderReducer.excel);
    let pagination = useSelector(state => state.OrderReducer.pagination);
    let loading = useSelector(state => state.OrderReducer.loading);
    let location = useLocation();
    let month = useRef();
    let date = new Date();
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(order) && !order.length > 0) {
            dispatch(trans.transAction(pagination.pageSize));
        } else {
            trans.loadingAct(false);
        }
    }, []);
    useEffect(() => {
        if (location.search.split("?type=")[1] === "pusher") {
            dispatch(trans.transAction(pagination.pageSize));
        }
    }, [location.search]);
    const onChange = (pagination) => {
        const { current, pageSize } = pagination;
        dispatch(trans.paginationAction(current, pageSize));
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'User',
            dataIndex: 'user_id',
            key: 'user_id',
            ...getColumnSearchProps('user_id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.user_id - b.user_id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Email',
            dataIndex: 'order_email',
            key: 'order_email',
            ...getColumnSearchProps('order_email', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.order_email.length - b.order_email.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Name',
            dataIndex: 'order_name',
            key: 'order_name',
            ...getColumnSearchProps('order_name', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.order_name.length - b.order_name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Address',
            dataIndex: 'order_address',
            key: 'order_address'
        },
        {
            title: 'Phone',
            dataIndex: 'order_phone',
            key: 'order_phone',
            ...getColumnSearchProps('order_phone', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.order_phone.length - b.order_phone.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Payment',
            dataIndex: 'payment_option',
            key: 'payment_option',
            sorter: (a, b) => a.payment_option.length - b.payment_option.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Note',
            dataIndex: 'order_note',
            key: 'order_note'
        },
        {
            title: 'Detail',
            render: (text, data) => {
                return (
                    <NavLink to={`/admin/order/detail?id=${data.id}`}>
                        Detail
                    </NavLink>
                )
            }
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            ...getColumnSearchProps('created_at', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.created_at.length - b.created_at.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{moment(data.created_at).format("DD-MM-YYYY H:m:s")}</span>
                )
            }
        },
    ];
    const handleSeachInput = (e) => {
        const { value } = e.target;
        dispatch(trans.seachAction(15, value));
    }
    const handleChangeStatus = (values, id) => {
        const formData = new FormData();
        formData.append('order_status', parseInt(values));
        dispatch(trans.updateAction(id, formData));
        dispatch(actions.countAction());
        dispatch(actions.chartAction());
    }
    const handleChangeMonth = (e) => {
        if (e.target.value) {
            month.current = e.target.value
            dispatch(trans.exportOrderAction(e.target.value));
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="list-card row">
                <div className="col-12 col-sm-6 col-xl-3 mb-3">
                    <Input.Group compact>
                        <Input size="default" onChange={handleSeachInput} allowClear placeholder="Seach...." />
                    </Input.Group>
                </div>
                <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end align-items-center">
                    <select className="select-month" onChange={handleChangeMonth}>
                        <option value="">Select month</option>
                        {renderMonth()}
                    </select>
                    <CSVLink
                        data={excel}
                        filename={`revenue-${month.current}-${date.getFullYear()}.csv`}
                        onClick={e => {
                            if (month.current) {
                            } else {
                                alertErrors("Please select month you can export");
                                return false;
                            }
                        }}
                        className="download-btn"
                        title="Export Excel">
                        <i className="lni lni-download"></i>
                    </CSVLink>
                </div>
                <div className="col-12">
                    < Table
                        columns={columns}
                        dataSource={order}
                        pagination={pagination}
                        onChange={onChange}
                        loading={loading}
                        rowKey="id"
                    />
                </div>
            </div>
        </>
    )
}
