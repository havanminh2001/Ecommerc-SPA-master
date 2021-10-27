import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Space, Popconfirm, TreeSelect } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Actions';
import { useHistory, useLocation } from 'react-router-dom';
import ModalContent from '../Modals/Product/ModalContent';
import ModalOption from '../Modals/Product/ModalOption';
import ModalEditVariant from '../Modals/Variant/ModalEditVariant';
import { getColumnSearchProps } from '../../../../services/table';
const { TreeNode } = TreeSelect;

export default function TableComponent(props) {
    let product = useSelector(state => state.ProductReducer.data);
    let pagination = useSelector(state => state.ProductReducer.pagination);
    let loading = useSelector(state => state.ProductReducer.loading);
    const history = useHistory();
    const location = useLocation();
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    const [treeLine, setTreeLine] = useState(true);
    const [showLeafIcon, setShowLeafIcon] = useState(false);
    useEffect(() => {
        if (Array.isArray(product) && !product.length > 0) {
            dispatch(trans.transAction(pagination.pageSize));
        } else {
            window.onpopstate = (e) => {
                dispatch(trans.paginationAction(pagination.current, pagination.pageSize));
            }
        }
    }, []);
    useEffect(() => {
        if (history.action === "POP") {
            dispatch(trans.transAction(pagination.pageSize));
        }
    }, [history.action]);
    const onChange = (pagination) => {
        const { current, pageSize } = pagination;
        dispatch(trans.paginationAction(current, pageSize));
    }
    const handleDetele = (id) => {
        dispatch(trans.deleteProductAction(id));
    }
    const handleChangeVariant = (values) => {
        if (values) {
            let temp = values.split('-');
            if (temp[1] !== 'values') {
                dispatch(trans.modalEditVariantAct({ product_id: temp[2], id: temp[1], isBool: true }));
            } else {
                const location = {
                    pathname: `/admin/product/variant/${temp[3]}/sku`,
                    state: { fromProduct: true }
                }
                history.push(location);
            }
        }
    };
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
            title: 'Categories_id',
            dataIndex: 'categories_id',
            key: 'categories_id',
        },
        {
            title: 'Discount id',
            dataIndex: 'discount_id',
            key: 'discount_id',
        },
        {
            title: 'Product name',
            dataIndex: 'product_name',
            key: 'product_name',
            ...getColumnSearchProps('product_name', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.product_name.length - b.product_name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Variant Product',
            dataIndex: 'name',
            key: 'name',
            render: (text, data) => {
                return (
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Select variant product"
                        allowClear={true}
                        treeDefaultExpandAll
                        onSelect={handleChangeVariant}
                        treeLine={
                            treeLine && {
                                showLeafIcon,
                            }
                        }
                        style={{
                            width: 300,
                        }}
                        key={data.id}
                    >
                        {
                            data.product_variants?.map(item => {
                                return (
                                    <TreeNode
                                        value={`variant-${item.id}-${data.id}`}
                                        title={item.product_variant_name}
                                        key={`variant-${item.id}-${data.id}`}>
                                        {
                                            data.product_skus?.map(values => {
                                                if (values.product_variant_id == item.id) {
                                                    return (
                                                        <TreeNode
                                                            value={`variant-values-${values.id}-${item.id}`}
                                                            title={values.color}
                                                            key={`variant-values-${values.id}-${item.id}`}>
                                                        </TreeNode>
                                                    )
                                                }
                                            })
                                        }
                                    </TreeNode>
                                )
                            })
                        }
                    </TreeSelect>
                )
            }
        },
        {
            title: 'Option',
            dataIndex: 'option',
            key: 'option',
            render: (text, data) => {
                return (
                    <Button onClick={() => { dispatch(trans.modalOptionAct(data.id)) }} title="Product option"><i className="fa fa-search-plus"></i></Button>
                )
            }
        },
        {
            title: 'Description',
            dataIndex: 'product_desc',
            key: 'product_desc',
            render: (text, data) => {
                return (
                    <Button onClick={() => {
                        dispatch(trans.modalContentAct(data.id));
                    }}>Detail</Button>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (tetext, data) => {
                return (
                    <Space size="middle">
                        <Button title="Add variant" onClick={() => { history.push(`/admin/product/${data.id}/variant/create`) }}>
                            <i className="fa fa-plus"></i>
                        </Button>
                        <Button title="Edit product" onClick={() => {
                            dispatch(trans.editAct(data.id));
                            history.push(`/admin/product/edit/${data.id}`);
                        }}><i className="fa fa-edit"></i></Button>
                        <Popconfirm
                            placement="bottomRight"
                            title="You want to delete?"
                            onConfirm={() => { handleDetele(data.id) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button title="Delete product"><i className="fa fa-trash"></i></Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];
    return (
        <>
            {product.length > 0 ? <ModalContent /> : ''}
            {product.length > 0 ? <ModalOption /> : ''}
            {product.length > 0 ? <ModalEditVariant /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={product}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}
