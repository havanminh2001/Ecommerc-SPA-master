import React, { useState, useRef } from 'react'
import {
    Form,
    Input,
    Button,
    Modal,
    Upload
} from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import * as trans from '../modules/Actions';

let styled = {
    marginBottom: "12px",
}

export default function ModalCreate() {
    let [visiable, setVisiable] = useState(false);
    let disabled = useSelector(state => state.CategoriesReducer.disabled);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [fileList, setFileList] = useState([
    ]);
    let [errors, setErrors] = useState({
        image: ''
    });
    let file = useRef({});
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    const handleSubmit = (values) => {
        if (!values.sku_promotion_price) {
            values.sku_promotion_price = 0;
        }
        if (fileList.length > 0 && file.current) {
            const data = { ...values, image: file.current }
            let formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            dispatch(trans.createSkuAction(id, formData, form, [fileList, setFileList], file));
        }
    }
    return (
        <>
            <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end">
                <Button type="primary" title="create" onClick={() => setVisiable(true)} icon={<FolderAddOutlined />} size="default" />
            </div>
            <Modal
                title="Create"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => {
                    setVisiable(false);
                    form.resetFields();
                    setFileList([]);

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
                        name="sku_unit_price"
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
                        <Input type="number" placeholder="Example 10.000.000" />
                    </Form.Item>
                    <Form.Item
                        name="sku_promotion_price"
                        label="Price promotion"
                        style={styled}
                        rules={[
                            {
                                max: 10,
                                message: "Maximum 10 number!"
                            }
                        ]}>
                        <Input type="number" placeholder="Example 10.000.000" />
                    </Form.Item>
                    <Form.Item
                        name="color"
                        label="Color"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Color is empty!"
                            },
                            {
                                max: 50,
                                message: "Maximum 50 character!"
                            }
                        ]}>
                        <Input placeholder="Example graphite " />
                    </Form.Item>
                    <label htmlFor="" style={styled}><span style={{ color: "red" }}>*</span>&nbsp;Image</label>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        maxCount={1}
                        beforeUpload={image => {
                            file.current = image;
                        }}
                    >
                        {'Upload File'}
                    </Upload>
                    <span style={{ color: "red", display: "block", marginBottom: "12px" }}>{errors ? errors.image : ''}</span>
                </Form>
            </Modal>
        </>
    )
}
