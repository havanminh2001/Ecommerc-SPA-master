import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Space, Popconfirm, Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Actions';
import moment from 'moment';
import ModalEdit from '../Modals/ModalEdit';
import { getColumnSearchProps } from '../../../../services/table';

export default function TableComponent(props) {
    let user = useSelector(state => state.UserReducer.data);
    let pagination = useSelector(state => state.UserReducer.pagination);
    let loading = useSelector(state => state.UserReducer.loading);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(user) && !user.length > 0) {
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
        dispatch(trans.deleteUserAction(id));
    }
    const handleChangeStatus = (id, isBool) => {
        if (isBool === 2) {
            dispatch(trans.updateStatusAction(id, isBool));
        } else {
            dispatch(trans.updateStatusAction(id, isBool));
        }
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '6%',
            ...getColumnSearchProps('id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "18%",
            ...getColumnSearchProps('email', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.email.length - b.email.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: "18%",
            ...getColumnSearchProps('name', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: "8%",
            ...getColumnSearchProps('gender', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.gender.length - b.gender.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{data.gender === 1 ? 'Nam' : 'Nữ'}</span>
                )
            }
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: "10%",
            ...getColumnSearchProps('phone', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.phone.length - b.phone.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: "15%",
            ...getColumnSearchProps('address', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: "5%",
            ...getColumnSearchProps('status', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    parseInt(data.status) === 1 ?
                        <Switch
                            checkedChildren="Block"
                            unCheckedChildren="Open"
                            defaultChecked={true}
                            onClick={() => handleChangeStatus(data.id, 2)} />
                        :
                        <Switch
                            checkedChildren="Block"
                            unCheckedChildren="Open"
                            defaultChecked={false}
                            onClick={() => handleChangeStatus(data.id, 1)} />
                )
            }
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            width: "10%",
            ...getColumnSearchProps('created_at', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.created_at.length - b.created_at.length,
            sortDirections: ['descend', 'ascend'],
            render: (text) => {
                return (
                    <span> {moment(text?.created_at).format('DD-M-YYYY')}</span>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: "15%",
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
            {user.length > 0 ? <ModalEdit /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={user}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}
