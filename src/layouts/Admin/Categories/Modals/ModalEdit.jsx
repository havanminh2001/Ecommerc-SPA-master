import React, { memo, } from 'react'
import {
    Form,
    Input,
    Button,
    Modal
} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../modules/Action';
const { TextArea } = Input;
function ModalEdit(props) {
    let visiable = useSelector(state => state.CategoriesReducer.modal);
    let disabled = useSelector(state => state.CategoriesReducer.loading);
    let data = useSelector(state => state.CategoriesReducer.dataEdit);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let styled = {
        marginBottom: "12px",
    }
    const renderData = () => {
        if (data) {
            form.setFieldsValue({
                categories_name: data.categories_name,
                categories_desc: data.categories_desc
            });
            return;
        }
    }
    const handleSubmit = (values) => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        dispatch(trans.updateCategoriesAction(data.id, formData, form));
    }
    return (
        <>
            {renderData()}
            <Modal
                title="Edit"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => { dispatch(trans.modalAct(false)) }}
                okText={<span>Update</span>}
                width={500}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
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

export default memo(ModalEdit);