import React, { useState, useEffect, memo } from 'react';
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

export default function ModalEdit() {
    let modal = useSelector(state => state.InventoryReducer.modal);
    let disabled = useSelector(state => state.InventoryReducer.disabled);
    let data = useSelector(state => state.InventoryReducer?.product);
    let dataEdit = useSelector(state => state.InventoryReducer?.dataEdit);
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
        dispatch(trans.updateInventoryAction(dataEdit.id, formData, form));
    }
    const setFieldData = () => {
        if (dataEdit) {
            form.setFieldsValue({
                unit_price: dataEdit.unit_price,
                promotion_price: dataEdit.promotion_price,
                qty: dataEdit.qty
            });
        }
    }
    return (
        <>
            {sku?.length > 0 ? '' : setFieldData()}
            <Modal
                title="Edit"
                centered
                visible={modal}
                onOk={form.submit}
                onCancel={() => {
                    dispatch(trans.modalAct(false));
                }}
                okText={<span>Update</span>}
                width={500}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <Form.Item
                        name="unit_price"
                        label="Price unit"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Price unit is empty!"
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
                            }
                        ]}>
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
