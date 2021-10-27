import React, { useState, useRef } from 'react'
import {
    Form,
    Input,
    Button,
    Modal,
    Select,
    DatePicker
} from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../modules/Action';
const { Option } = Select;
const { RangePicker } = DatePicker;
let styled = {
    marginBottom: "12px",
}

export default function ModalComponent(props) {
    let [visiable, setVisiable] = useState(false);
    let disabled = useSelector(state => state.DiscountReducer.disabled);
    let date = useRef([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleCreate = (values) => {
        let formData = new FormData();
        formData.append('discount_name', values.discount_name);
        formData.append('discount_type', values.discount_type);
        formData.append('discount_value', values.discount_value);
        formData.append('discount_start', date.current[0]);
        formData.append('discount_end', date.current[1]);
        dispatch(trans.createDiscountAction(formData, form, date));
    }
    const changeDate = (values, toString) => {
        date.current = toString;
    }
    return (
        <>
            <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end">
                <Button type="primary"
                    onClick={() => {
                        setVisiable(true);
                    }}
                    icon={<FolderAddOutlined />} size="default"
                />
            </div>
            <Modal
                title="Create"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => {
                    setVisiable(false);
                    form.resetFields();
                }}
                okText={<span>Create</span>}
                width={400}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleCreate}
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
                            },
                            {
                                max: 10,
                                message: "Discount values 10 number!"
                            }
                        ]}>
                        <Input type="number" placeholder="Please enter value" />
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
