import React, { useRef } from 'react'
import moment from 'moment';
import {
    Form,
    Input,
    Modal,
    Select,
    DatePicker
} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../modules/Actions';
const { Option } = Select;
const { RangePicker } = DatePicker;
let styled = {
    marginBottom: "12px",
}

export default function ModalEdit() {
    let dataEdit = useSelector(state => state.UserReducer?.dataEdit);
    let disabled = useSelector(state => state.UserReducer.disabled);
    let modal = useSelector(state => state.UserReducer.modal);
    let date = useRef([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleUpdate = values => {
        let formData = {};
        if (date.current.length > 0) {
            formData = { ...values, birth: date.current.split('-').reverse().join('-') };
        } else {
            formData = { ...values, birth: values.birth._i };
        }
        const formCreate = new FormData();
        for (const key in formData) {
            formCreate.append(key, values[key]);
        }
        dispatch(trans.updateUserAction(dataEdit.id, formCreate, form));
    }
    const setDataField = () => {
        if (dataEdit) {
            form.setFieldsValue({
                email: dataEdit.email,
                name: dataEdit.name,
                gender: Number.isInteger(dataEdit.gender) ? dataEdit.gender.toString() : dataEdit.gender,
                birth: dataEdit.birth ? moment(dataEdit?.birth) : '',
                phone: dataEdit.phone,
                address: dataEdit.address,
            });
        }
        return;
    }
    const changeDate = (values, toString) => {
        date.current = toString;
    }
    return (
        <>
            {dataEdit ? setDataField() : ''}
            <Modal
                title="Edit"
                centered
                visible={modal}
                onOk={form.submit}
                onCancel={() => { dispatch(trans.modalAct(false)); form.resetFields() }}
                okText={<span>Update</span>}
                width={550}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleUpdate}
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
                            <Option value="1">Nam</Option>
                            <Option value="0">Nữ</Option>
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
                        <Input placeholder="Example nguyen van chien" />
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
