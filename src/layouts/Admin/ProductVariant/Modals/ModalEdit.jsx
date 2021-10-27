import React, { useState, useRef } from 'react'
import {
    Form,
    Input,
    Modal,
    Upload
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as trans from '../modules/Actions';
import { STORAGE } from '../../../../settings/configUrl';
import { onPreview } from '../../../../services/admin/product';

let styled = {
    marginBottom: "12px",
}

export default function ModalEdit() {
    let visiable = useSelector(state => state.ProductVariantReducer.modal);
    let disabled = useSelector(state => state.ProductVariantReducer.disabled);
    let data = useSelector(state => state.ProductVariantReducer.dataEdit);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [fileList, setFileList] = useState([
    ]);
    let [errors, setErrors] = useState({
        image: ''
    });
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const handleSubmit = (values) => {
        let dataEdit = {};
        let formData = new FormData();
        if (fileList.length > 0) {
            dataEdit = { ...values, image: fileList[0].originFileObj }
        } else {
            dataEdit = { ...values }
        }
        for (const key in dataEdit) {
            formData.append(key, dataEdit[key]);
        }
        dispatch(trans.updateSkuAction(data.id, formData, form));
    }
    const setFieldData = () => {
        if (data) {
            form.setFieldsValue({
                sku_unit_price: data.sku_unit_price,
                sku_promotion_price: data.sku_promotion_price,
                color: data.color
            })
        }
    }
    return (
        <>
            {data ? setFieldData() : ''}
            <Modal
                title="Edit"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => {
                    dispatch(trans.modalAct(false));
                    setFileList([]);
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
                        fileList={fileList.length > 0 ? fileList : [{
                            url: `${STORAGE}/products/${data?.sku_image}`
                        }]}
                        onChange={onChange}
                        onPreview={onPreview}
                        maxCount={1}
                    >
                        {'Upload File'}
                    </Upload>
                    <span style={{ color: "red", display: "block", marginBottom: "12px" }}>{errors ? errors.image : ''}</span>
                </Form>
            </Modal>
        </>
    )
}
