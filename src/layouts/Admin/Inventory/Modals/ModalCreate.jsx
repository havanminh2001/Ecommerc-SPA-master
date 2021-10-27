import React, { useState, useEffect, memo } from 'react'
import {
    Form,
    Input,
    Button,
    Modal,
    Select
} from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../modules/Actions';
const { Option } = Select;
let styled = {
    marginBottom: "12px",
}

function ModalCreate() {
    let visiable = useSelector(state => state.InventoryReducer.visiable);
    let disabled = useSelector(state => state.InventoryReducer.disabled);
    let data = useSelector(state => state.InventoryReducer?.product);
    let [sku, setSku] = useState([]);
    let [select, setSelect] = useState([]);

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(trans.getListProductAction(true));
    }, [])
    const handleSubmit = (values) => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        dispatch(trans.createInventoryAction(formData, form));
    }
    const onChangeSelect = (id) => {
        let temp = data.filter(item => item.id === id);
        setSku(temp[0].product_skus);
    }

    return (
        <>
            <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end">
                <Button type="primary" title="Create" onClick={() => { dispatch(trans.fetchProduct(true)) }} icon={<FolderAddOutlined />} size="default" />
            </div>
            <Modal
                title="Create"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => {
                    dispatch(trans.fetchProduct(false));
                    form.resetFields();
                    setSku([])
                }}
                okText={<span>Create</span>}
                width={500}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <Form.Item
                        name="variant_id"
                        label="Product"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Product is empty!"
                            }
                        ]}>
                        <Select placeholder="Please select product" onSelect={onChangeSelect}>
                            {
                                data?.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>
                                            {item.product_variant_name}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="sku_id"
                        label="Sku Color"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Sku is empty!"
                            }
                        ]}>
                        <Select placeholder="Please select sku color">
                            {
                                sku?.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>
                                            {item.color}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="unit_price"
                        label="Price unit"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Price unit is empty!"
                            },
                            {
                                max: 10,
                                message: "Maximum 10 number!"
                            }
                        ]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="promotion_price"
                        label="Price promotion"
                        style={styled}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="qty"
                        label="Quantity"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Price promotion unit is empty!"
                            },
                            {
                                max: 10,
                                message: "Maximum 10 number!"
                            }
                        ]}>
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default memo(ModalCreate);