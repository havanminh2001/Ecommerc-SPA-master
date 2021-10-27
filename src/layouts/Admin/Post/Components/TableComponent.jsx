import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Space, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Action';
import ModalEdit from '../Modals/ModalEdit';
import { getColumnSearchProps } from '../../../../services/table';
import { STORAGE } from '../../../../settings/configUrl';
import ModalContent from '../Modals/ModalContent';

export default function TableComponent() {
    let post = useSelector(state => state.PostReducer.data);
    let pagination = useSelector(state => state.PostReducer.pagination);
    let loading = useSelector(state => state.PostReducer.loading);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(post) && !post.length > 0) {
            dispatch(trans.transAction(pagination.pageSize));
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
        dispatch(trans.deletePostAction(id));
    }
    const onReviewImage = (url) => {
        window.open(url);
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ...getColumnSearchProps('title', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (text, data) => {
                return (
                    <Space size="middle">
                        <Button onClick={() => { dispatch(trans.modalContentAct(data.id)) }}>Xem chi tiết</Button>
                    </Space>
                )
            }
        },
        {
            title: 'Slug',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text, data) => {
                return <img src={`${STORAGE}/posts/${data.image}`} height={45} width={45} alt="*" onClick={() => onReviewImage(`${STORAGE}/posts/${data.image}`)} style={{ cursor: "pointer" }} />
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Button onClick={() => {
                            handleEdit(text.id);
                        }}>
                            <i className="fa fa-edit"></i></Button>
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
            {post.length > 0 ? <ModalEdit /> : ''}
            {post.length > 0 ? <ModalContent /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={post}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}
