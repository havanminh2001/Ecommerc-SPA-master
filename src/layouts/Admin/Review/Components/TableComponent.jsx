import React, { useEffect, useState, useRef, memo } from 'react'
import { Table, Button, Space, Popconfirm, Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Actions';
import { getColumnSearchProps } from '../../../../services/table';

function TableComponent() {
    let review = useSelector(state => state.ReviewReducer.data);
    let pagination = useSelector(state => state.ReviewReducer.pagination);
    let loading = useSelector(state => state.ReviewReducer.loading);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(review) && !review.length > 0) {
            dispatch(trans.transAction(pagination.pageSize));
        } else {
            trans.loadingAct(false);
        }
    }, []);
    const onChange = (pagination) => {
        const { current, pageSize } = pagination;
        dispatch(trans.paginationAction(current, pageSize));
    }
    const handleUpdate = (id, status) => {
        dispatch(trans.updateAction(id, { review_status: status }));
    }
    const handleDetele = (id) => {
        dispatch(trans.deleteAction(id));
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
            title: 'Id_user',
            dataIndex: 'user_id',
            key: 'user_id',
            ...getColumnSearchProps('user_id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.user_id - b.user_id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'variant_id',
            dataIndex: 'product_variant_id',
            key: 'product_variant_id',
            ...getColumnSearchProps('product_variant_id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.product_variant_id - b.product_variant_id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Name',
            dataIndex: 'review_name',
            key: 'review_name',
            ...getColumnSearchProps('review_name', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.review_name.length - b.review_name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Email',
            dataIndex: 'review_email',
            key: 'review_email',
            ...getColumnSearchProps('review_email', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.review_email.length - b.review_email.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Phone',
            dataIndex: 'review_phone',
            key: 'review_phone',
            ...getColumnSearchProps('review_phone', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.review_phone.length - b.review_phone.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Star',
            dataIndex: 'review_star',
            key: 'review_star',
            ...getColumnSearchProps('review_star', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.review_star - b.review_star,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Content',
            dataIndex: 'review_content',
            key: 'review_content'
        },
        {
            title: 'Status',
            key: 'review_status',
            render: (text, data) => {
                return (
                    parseInt(data.review_status) === 1 ?
                        <Switch
                            checkedChildren="Block"
                            unCheckedChildren="Open"
                            defaultChecked={true}
                            onClick={() => handleUpdate(data.id, 2)} />
                        :
                        <Switch
                            checkedChildren="Block"
                            unCheckedChildren="Open"
                            defaultChecked={false}
                            onClick={() => handleUpdate(data.id, 1)} />
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Popconfirm
                            placement="bottomRight"
                            title="You want to delete?"
                            onConfirm={() => { handleDetele(text.id) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button title="delete"><i className="fa fa-trash"></i></Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];
    return (
        <>
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={review}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}

export default memo(TableComponent);
