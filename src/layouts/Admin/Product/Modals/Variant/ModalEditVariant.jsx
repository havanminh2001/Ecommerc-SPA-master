import React, { useEffect } from 'react'
import { Form, Modal, Button, Popconfirm, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../../modules/Actions';
let styled = {
    marginBottom: "12px",
}


export default function ModalEditVariant(props) {
    let visiable = useSelector(state => state.ProductReducer.modalEditVariant);
    let disabled = useSelector(state => state.ProductReducer.disabled);
    let dataEdit = useSelector(state => state.ProductReducer?.dataVariantEdit);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    useEffect(() => {
        if (dataEdit) {
            form.setFieldsValue({
                product_variant_name: dataEdit[0].product_variant_name,
                product_variant_rom: dataEdit[0].product_variant_rom,
                product_variant_ram: dataEdit[0].product_variant_ram,
            });
        }
    }, [dataEdit])
    const handleDelete = () => {
        dispatch(trans.deleteVariantAction(dataEdit[0].product_id, dataEdit[0].id));
    }
    const handleSubmit = (values) => {
        dispatch(trans.updateVariantProductAction(dataEdit[0].id, values, form));
    }
    return (
        <>
            <Modal
                title="Edit Variant"
                centered
                visible={visiable}
                width={500}
                okButtonProps={{ disabled: disabled }}
                onCancel={() => {
                    dispatch(trans.modalEditVariantAct(false));
                }}
                footer={[
                    <Button type="primary" danger onClick={() => { dispatch(trans.modalEditVariantAct(false)); }} key={1}>
                        Cancel
                    </Button>,
                    <Button title="Update" onClick={form.submit} key={2} ><EditOutlined /></Button>,
                    <Popconfirm
                        placement="bottomRight"
                        title="You want to delete?"
                        onConfirm={() => { handleDelete() }}
                        okText="Yes"
                        cancelText="No"
                        key={4}
                    >
                        <Button title="Delete Variant" key={3} ><DeleteOutlined /></Button>
                    </Popconfirm>
                ]}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <Form.Item
                        name="product_variant_name"
                        label="Variant name"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Slug is empty!"
                            },
                            {
                                max: 254,
                                message: "Maximum 254 character!"
                            }
                        ]}
                    >
                        <Input placeholder="Example Iphone 8 plus 64gb" />
                    </Form.Item>
                    <Form.Item
                        name="product_variant_rom"
                        label="Rom"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Rom is empty!"
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Example 128GB" />
                    </Form.Item>
                    <Form.Item
                        name="product_variant_ram"
                        label="Ram"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Ram is empty!"
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Example 8GB" />
                    </Form.Item>
                    <Form.Item
                        name="slug_url"
                        label="Slug"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Slug is empty!"
                            },
                            {
                                pattern: "(?![enp])[a-z]",
                                message: "Slug must be a-z"
                            }
                        ]}
                    >
                        <Input type="text" placeholder="Example iphone-12-pro-max" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
