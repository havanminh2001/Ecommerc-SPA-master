import React, { useEffect, useState, useRef, memo } from 'react'
import { Table, Button, Space, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Action';
import ModalEdit from '../Modals/ModalEdit';
import { getColumnSearchProps } from '../../../../services/table';


function TableComponent(props) {
    let categories = useSelector(state => state.CategoriesReducer.data);
    let pagination = useSelector(state => state.CategoriesReducer.pagination);
    let loading = useSelector(state => state.CategoriesReducer.loading);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(categories) && !categories.length > 0) {
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
        dispatch(trans.deleteCategoriesAction(id));
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
            title: 'Categories Name',
            dataIndex: 'categories_name',
            key: 'categories_name',
            ...getColumnSearchProps('id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.categories_name.length - b.categories_name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Description',
            dataIndex: 'categories_desc',
            key: 'categories_desc',
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
            {categories.length > 0 ? <ModalEdit /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={categories}
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