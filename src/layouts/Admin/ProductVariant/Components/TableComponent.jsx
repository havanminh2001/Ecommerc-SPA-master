import React, { useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { Table, Button, Input, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency } from '../../../../utils/getImage';
import * as trans from '../modules/Actions';
import { STORAGE } from '../../../../settings/configUrl';
import ModalEdit from '../Modals/ModalEdit';
import { getColumnSearchProps } from '../../../../services/table';


export default function TableComponent(props) {
    let variant = useSelector(state => state.ProductVariantReducer.data);
    let pagination = useSelector(state => state.ProductVariantReducer.pagination);
    let loading = useSelector(state => state.ProductVariantReducer.loading);
    const dispatch = useDispatch();
    const history = useHistory();
    let searchInput = useRef(null);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    const { id } = useParams();
    useEffect(() => {
        dispatch(trans.transAction(id, pagination.pageSize));
    }, [id]);
    const handleEdit = (id) => {
        dispatch(trans.editAct(id));
    }
    const handleDetele = (id) => {
        dispatch(trans.deleteSkuAction(id));
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
            title: 'Product_id',
            dataIndex: 'product_id',
            key: 'product_id',
            ...getColumnSearchProps('product_id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Variant_id',
            dataIndex: 'product_variant_id',
            key: 'product_variant_id',
            ...getColumnSearchProps('product_variant_id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Unit price',
            dataIndex: 'sku_unit_price',
            key: 'sku_unit_price',
            ...getColumnSearchProps('sku_unit_price', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.sku_unit_price - b.sku_unit_price,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{formatCurrency(data.sku_unit_price)}</span>
                )
            }
        },
        {
            title: 'Promotion price',
            dataIndex: 'sku_promotion_price',
            key: 'sku_promotion_price',
            ...getColumnSearchProps('sku_promotion_price', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.sku_promotion_price - b.categories_name,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{formatCurrency(data.sku_promotion_price)}</span>
                )
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'sku_qty',
            key: 'sku_qty',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Image',
            dataIndex: 'sku_image',
            key: 'sku_image',
            render: (text, data) => {
                return <img src={`${STORAGE}/products/${data.sku_image}`} height={45} width={45} onClick={() => onReviewImage(`${STORAGE}/products/${data.sku_image}`)} style={{ cursor: "pointer" }} alt="*" />
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Button title="Edit" onClick={() => { handleEdit(text.id) }}><i className="fa fa-edit"></i></Button>
                        <Popconfirm
                            placement="bottomRight"
                            title="You want to delete?"
                            onConfirm={() => { handleDetele(text.id) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button title="Delete"><i className="fa fa-trash"></i></Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];
    return (
        <>
            {variant.length > 0 ? <ModalEdit /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={variant}
                    pagination={pagination}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}
