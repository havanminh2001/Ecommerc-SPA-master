import React, { useState, memo, useEffect } from 'react'
import {
    Form,
    Input,
    Button,
    Modal
} from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../modules/Action';
const { TextArea } = Input;

function ModalCreate() {
    let [visiable, setVisiable] = useState(false);
    let disabled = useSelector(state => state.CategoriesReducer.disabled);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let styled = {
        marginBottom: "12px",
    }
    const handleSubmit = (values) => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        dispatch(trans.createCategoriesAction(formData, form));
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
                width={500}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <Form.Item
                        name="categories_name"
                        label="Categories"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Categories name is empty!"
                            },
                            {
                                max: 254,
                                message: "Maximum 254 character!"
                            }
                        ]}>
                        <Input placeholder="Example apple" />
                    </Form.Item>
                    <Form.Item
                        name="categories_desc"
                        label="Description"
                        style={styled}
                        rules={[
                            {
                                max: 3000,
                                message: "Maximum 3000 character!"
                            }
                        ]}>
                        <TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default memo(ModalCreate);