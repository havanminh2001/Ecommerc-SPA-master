import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../../settings/configUrl';
import { callApiAdmin } from '../../../utils/callApi';
import { Table } from 'antd';
import { getColumnSearchProps } from '../../../services/table';
import moment from 'moment';

export default function OrderDetailComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const query = location.search.split("?id=")[1];
    useEffect(() => {
        setLoading(true);
        callApiAdmin(`order/detail/${query}?token=${localStorage.getItem(ACCESS_TOKEN)}`)
            .then(res => {
                setLoading(false);
                setData(res.data.data);
            }).catch(e => {

            });
    }, [query]);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
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
            title: 'Order ID',
            dataIndex: 'order_id',
            key: 'order_id',
            ...getColumnSearchProps('order_id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.order_id - b.order_id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Sku ID',
            dataIndex: 'sku_id',
            key: 'sku_id',
            ...getColumnSearchProps('sku_id', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.sku_id - b.sku_id,
            sortDirections: ['descend', 'ascend']
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
            title: 'Price',
            dataIndex: 'product_price',
            key: 'product_price',
            ...getColumnSearchProps('product_price', searchInput, [seach, setSeach]),
            sorter: (a, b) => a.product_price - b.product_price,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (t, data) => {
                return (
                    <span>{moment(data.created_at).format("DD-MM-YYYY H:m")}</span>
                )
            }
        }
    ];
    return (
        <>
            <div className="list-card row">
                <div className="col-12">
                    < Table
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey="id"
                    />
                </div>
            </div>
        </>
    )
}
