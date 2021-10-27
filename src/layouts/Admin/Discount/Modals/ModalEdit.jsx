import React, { useEffect, useRef } from 'react'
import moment from 'moment';
import {
    Form,
    Input,
    Modal,
    Select,
    DatePicker
} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../modules/Action';
const { Option } = Select;
const { RangePicker } = DatePicker;
let styled = {
    marginBottom: "12px",
}

export default function ModalEdit(props) {
    let dataEdit = useSelector(state => state.DiscountReducer?.dataEdit);
    let disabled = useSelector(state => state.DiscountReducer.disabled);
    let modal = useSelector(state => state.DiscountReducer.modal);
    let date = useRef([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    useEffect(() => {
        if (dataEdit) {
            form.setFieldsValue({
                discount_name: dataEdit.discount_name,
                discount_type: dataEdit.discount_type,
                discount_value: dataEdit.discount_value,
                date: [moment(dataEdit.discount_start), moment(dataEdit.discount_end)]
            });
        }
    }, [dataEdit]);
    const handleUpdate = values => {
        let formData = {};
        if (date.current.length > 0) {
            formData = { ...values, discount_start: date.current[0], discount_end: date.current[1] };
        } else {
            formData = { ...values, discount_start: values.date[0]._i, discount_end: values.date[1]._i };
        }
        delete formData.date;
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        dispatch(trans.updateDiscountAction(dataEdit.id, data, form));
    }
    const changeDate = (values, toString) => {
        date.current = toString;
    }
    return (
        <>
            <Modal
                title="Create"
                centered
                visible={modal}
                onOk={form.submit}
                onCancel={() => {
                    dispatch(trans.modalAct(false));
                    form.resetFields();
                }}
                okText={<span>Update</span>}
                width={400}
                okButtonProps={{ disabled: disabled }}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleUpdate}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <Form.Item
                        name="discount_name"
                        label="Discount name"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Discount name is empty!"
                            },
                            {
                                max: 254,
                                message: "Discount 254 character!"
                            }
                        ]}>
                        <Input placeholder="Example khuyến mãi iphone" />
                    </Form.Item>
                    <Form.Item
                        name="discount_type"
                        label="Discount type"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Discount type is empty!"
                            }
                        ]}>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Please select datetime"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="trade discount">Trade discount</Option>
                            <Option value="quantity discount">Quantity discount</Option>
                            <Option value="cash discount">Cash discount</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="discount_value"
                        label="Discount values"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Discount values is empty!"
                            }
                        ]}>
                        <Input type="number" max={10} placeholder="Please enter value" />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        style={styled}
                        label="Datetime"
                        rules={[
                            {
                                type: 'array',
                                required: true,
                                message: 'Please select time!',
                            },
                        ]}
                    >
                        <RangePicker
                            showTime
                            style={{ width: "100%" }}
                            onChange={changeDate}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
