import React, { useState, useMemo, useCallback, useRef } from 'react'
import {
    Form,
    Input,
    Button,
    Modal,
    Upload
} from 'antd';
import { FolderAddOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import EditorComponent from '../Components/EditorComponent';
import * as trans from '../modules/Action';
import { getBase64 } from '../../../../utils/getImage';


export default function ModalCreate(props) {
    let disabled = useSelector(state => state.PostReducer.disabled);
    let [visiable, setVisiable] = useState(false);
    // let clearEditor = useSelector(state => state.PostReducer.clearEditor);
    let messageErrors = useSelector(state => state.PostReducer.messageErrors);
    let data = useRef({
        content: '',
        image: {}
    })
    let [errors, setErrors] = useState({
        content: '',
        image: ''
    });
    let [image, setImage] = useState({
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
        ]
    })
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let styled = {
        marginBottom: "12px",
    }
    const handleChangeEditor = useCallback((values) => {
        return handleEditor(values);
    }, [errors]);
    const dataEditor = useMemo(() => {
        return data;
    }, [errors]);

    const handleEditor = (values) => {
        if (values) {
            data.current.content = values;
            if (errors.content) setErrors({ ...errors, content: '' });
        } else {
            setErrors({ ...errors, content: 'Content is empty!' });
        }
    }
    const handleSubmit = (values) => {
        if (image.fileList.length > 0) {
            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', data.current.content);
            formData.append('image', data.current.image);
            dispatch(trans.createPostAction(formData, form, [image, setImage], [errors, setErrors], data));
        } else {
            setErrors({ ...errors, image: 'Image is empty!' });
        }
    }

    const handleCancel = () => setImage({ ...image, previewVisible: false });

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImage({
            ...image,
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    const handleChange = ({ fileList }) => {
        setErrors({ ...errors, image: '' });
        setImage({ fileList });
    };
    return (
        <>
            <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end">
                <Button type="primary" onClick={() => {
                    setVisiable(true);
                    dispatch(trans.clearEditorAct(true));
                }} icon={<FolderAddOutlined />} size="default" />
            </div>
            <Modal
                title="Create"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => {
                    dispatch(trans.clearEditorActon(false, [visiable, setVisiable],
                        [image, setImage],
                        [errors, setErrors]));
                    form.resetFields();
                }}
                okText={<span>Create</span>}
                width={775}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <Form.Item
                        name="title"
                        label="Title"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Title is empty!"
                            },
                            {
                                max: 254,
                                message: "Maximum 254 character!"
                            }
                        ]}>
                        <Input placeholder="Example apple" />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0px" }}>
                        <label htmlFor="" style={styled}><span style={{ color: "red" }}>*</span>&nbsp;Content</label>
                        <EditorComponent
                            handleChangeEditor={handleChangeEditor}
                            errors={errors}
                            dataEditor={data}
                        />
                    </Form.Item>
                    <label htmlFor="" style={styled}><span style={{ color: "red" }}>*</span>&nbsp;Image</label>
                    <Upload
                        listType="picture-card"
                        fileList={image.fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        maxCount={1}
                        accept="image/png, image/jpeg,image/jpg"
                        beforeUpload={file => {
                            data.current.image = file;
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                    <span style={{ color: "red", display: "block", marginBottom: "12px" }}>{errors ? errors.image : ''}</span>
                    <span style={{ color: "red", display: "block", marginBottom: "12px" }}>{messageErrors.image ? messageErrors.image : ''}</span>
                    <Modal
                        visible={image.previewVisible}
                        title={image.previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img alt="example" style={{ width: '100%' }} src={image.previewImage} height={300} width={300} />
                    </Modal>
                </Form>
            </Modal>
        </>
    )
}
