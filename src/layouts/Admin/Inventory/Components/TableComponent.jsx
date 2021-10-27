import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Space, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Actions';
import { formatCurrency } from '../../../../utils/getImage';
import ModalEdit from '../Modals/ModalEdit';
import { CSVLink } from 'react-csv';
import { renderMonth } from '../../../../utils/helper';
import { alertErrors } from '../../../../settings/config';
// import ModalEdit from '../Modals/ModalEdit';
import { getColumnSearchProps } from '../../../../services/table';
const { Option } = Select;

export default function TableComponent() {
    let inventory = useSelector(state => state.InventoryReducer.data);
    let pagination = useSelector(state => state.InventoryReducer.pagination);
    let loading = useSelector(state => state.InventoryReducer.loading);
    const excel = useSelector(state => state.InventoryReducer?.excel);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let month = useRef();
    let date = new Date();
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(inventory) && !inventory.length > 0) {
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
    const handleChangeStatus = (status, id) => {
        dispatch(trans.updateStatusAction(id, { status }));
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
            title: 'Product name',
            dataIndex: 'variant_id',
            key: 'variant_id',
            ...getColumnSearchProps('variant_id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.variant_id - b.variant_id,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{data.product_variants?.product_variant_name}</span>
                )
            }
        },
        {
            title: 'Color',
            dataIndex: 'sku_id',
            key: 'sku_id',
            ...getColumnSearchProps('sku_id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.sku_id - b.sku_id,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{data.product_skus?.color}</span>
                )
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
            ...getColumnSearchProps('qty', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.qty - b.qty,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Quantity Sku',
            render: (t, data) => {
                return (
                    <span>{data.product_skus.sku_qty}</span>
                )
            },
            sorter: (a, b) => a.product_skus.sku_qty - b.product_skus.sku_qty,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Price unit',
            dataIndex: 'unit_price',
            key: 'unit_price',
            ...getColumnSearchProps('unit_price', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.unit_price - b.unit_price,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{formatCurrency(data.unit_price)}</span>
                )
            }
        },
        {
            title: 'Price promotion',
            dataIndex: 'promotion_price',
            key: 'promotion_price',
            ...getColumnSearchProps('promotion_price', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.promotion_price - b.promotion_price,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{formatCurrency(data.promotion_price)}</span>
                )
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ...getColumnSearchProps('status', searchInput, [seach, setSeach]),
            render: (text, data) => {
                return (
                    <Select value={data.status} onChange={(e) => { handleChangeStatus(e, data.id) }}>
                        <Option value={0}>Pending</Option>
                        <Option value={1}>Success</Option>
                        <Option value={2}>Update</Option>
                    </Select>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Button title="Edit" onClick={() => { handleEdit(text.id) }}><i className="fa fa-edit"></i></Button>
                    </Space>
                )
            }
        }
    ];
    const handleChangeMonth = (e) => {
        if (e.target.value) {
            month.current = e.target.value
            dispatch(trans.exportExcelAction(e.target.value));
        }
    }
    return (
        <>
            {inventory.length > 0 ? <ModalEdit /> : ''}
            <div className="col-12">
                <select className="select-month" onChange={handleChangeMonth}>
                    <option value="">Select month</option>
                    {renderMonth()}
                </select>
                <CSVLink
                    data={excel}
                    filename={`revenue-${month.current}-${date.getFullYear()}.csv`}
                    onClick={e => {
                        if (month.current) {
                            return true;
                        } else {
                            alertErrors("Please select month you can export");
                            return false;
                        }
                    }}
                    className="download-btn"
                    title="Export Excel">
                    <i className="lni lni-download"></i>
                </CSVLink>
                < Table
                    columns={columns}
                    dataSource={inventory}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
            <div className="col-2 d-flex justify-content-end align-items-center">

            </div>
        </>
    )
}
