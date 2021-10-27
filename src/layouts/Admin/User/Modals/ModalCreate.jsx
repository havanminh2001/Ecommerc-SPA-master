import React, { useState, useRef, useEffect } from 'react'
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
import * as trans from '../modules/Actions';
import moment from 'moment';
const { TextArea } = Input;
const { Option } = Select;

export default function ModalComponent() {
    let [visiable, setVisiable] = useState(false);
    let disabled = useSelector(state => state.CategoriesReducer.disabled);
    let date = useRef('');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let styled = {
        marginBottom: "8px",
    }
    const handleSubmit = (values) => {
        let formData = {};
        if (date.current) {
            delete values.birth
            formData = { ...values, birth: date.current.split('-').reverse().join('-') }
        } else {
            delete values.birth;
            formData = { ...values };
        }
        console.log(formData);
        const formCreate = new FormData();
        for (const key in formData) {
            formCreate.append(key, values[key]);
        }
        dispatch(trans.createUserAction(formCreate, form));
    }
    const changeDate = (values, toString) => {
        date.current = toString;
    }
    return (
        <>
            <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end">
                <Button type="primary" onClick={() => setVisiable(true)} icon={<FolderAddOutlined />} size="default" />
            </div>
            <Modal
                title="Create"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => { setVisiable(false); form.resetFields() }}
                okText={<span>Create</span>}
                width={550}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <Form.Item
                        name="email"
                        label="Email"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Email is empty!"
                            },
                            {
                                max: 100,
                                message: "Maximum 254 character!"
                            },
                            {
                                pattern: /^\S+@\S+\.\S+$/,
                                message: 'Email wrong format!',
                            }
                        ]}>
                        <Input placeholder="Example taikhoan1@gmail.com" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: 'Password is empty!',
                            },
                            {
                                max: 254,
                                message: "Maximum 254 character!"
                            },
                            {
                                min: 6,
                                message: 'Password less than 6 characters!'
                            }
                        ]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Name is empty!"
                            },
                            {
                                max: 100,
                                message: "Maximum 100 character!"
                            }
                        ]}>
                        <Input placeholder="Example nguyen van chien" />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        style={styled}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Please select gender"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="1">Male</Option>
                            <Option value="0">Female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="birth"
                        style={styled}
                        label="Birth"
                    >
                        <DatePicker onChange={changeDate} format="DD-MM-YYYY" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Number phone"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Phone is empty!"
                            },
                            {
                                max: 10,
                                message: "Maximum 10 number!"
                            },
                            {
                                pattern: /(0)[0-9]/,
                                message: "Phone start 0 and maximum 10!"
                            }
                        ]}>
                        <Input placeholder="Example 0382484477" />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Address is empty!"
                            },
                            {
                                max: 254,
                                message: "Maximum 254 character!"
                            }
                        ]}>
                        <Input placeholder="Example 129 duong 154" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
