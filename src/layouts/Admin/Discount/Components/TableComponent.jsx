import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment';
import { Table, Button, Space, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Action';
import ModalEdit from '../Modals/ModalEdit';
import { getColumnSearchProps } from '../../../../services/table';

export default function TableComponent(props) {
    let discount = useSelector(state => state.DiscountReducer.data);
    let pagination = useSelector(state => state.DiscountReducer.pagination);
    let loading = useSelector(state => state.DiscountReducer.loading);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(discount) && !discount.length > 0) {
            dispatch(trans.transAction(pagination.pageSize));
        } else {
            trans.loadingAct(false);
        }
    }, []);
    const onChange = (pagination) => {
        const { current, pageSize } = pagination;
        dispatch(trans.paginationAction(current, pageSize));
    }
    const handleEdit = (id) => {
        dispatch(trans.editAct(id));
    }
    const handleDetele = (id) => {
        dispatch(trans.deleteDiscountAction(id));
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
            title: 'Discount name',
            dataIndex: 'discount_name',
            key: 'discount_name',
            ...getColumnSearchProps('discount_name', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.discount_name.length - b.discount_name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Discount type',
            dataIndex: 'discount_type',
            key: 'discount_type',
            ...getColumnSearchProps('discount_type', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.discount_type.length - b.discount_type.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Discount value',
            dataIndex: 'discount_value',
            key: 'discount_value',
            ...getColumnSearchProps('discount_value', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.discount_value.length - b.discount_value.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Date start',
            dataIndex: 'discount_start',
            key: 'discount_start',
            ...getColumnSearchProps('discount_start', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.discount_start.length - b.discount_start.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span> {moment(data.discount_start).format('DD-M-YYYY HH:mm:ss')}</span >
                )
            }
        },
        {
            title: 'Date end',
            dataIndex: 'discount_end',
            key: 'discount_end',
            ...getColumnSearchProps('discount_end', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.discount_end.length - b.discount_end.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span> {moment(data.discount_end).format('DD-M-YYYY HH:mm:ss')}</span >
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Button onClick={() => { handleEdit(text.id) }}><i className="fa fa-edit"></i></Button>
                        <Popconfirm
                            placement="bottomRight"
                            title="You want to delete?"
                            onConfirm={() => { handleDetele(text.id) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button><i className="fa fa-trash"></i></Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];
    return (
        <>
            {discount.length > 0 ? <ModalEdit /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={discount}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}
