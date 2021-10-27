import React, { useState, useMemo, useRef, useCallback } from 'react'
import {
    Form,
    Input,
    Modal,
    Upload
} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import EditorComponent from '../Components/EditorComponent';
import * as trans from '../modules/Action';
import { STORAGE } from '../../../../settings/configUrl';
let styled = {
    marginBottom: "12px",
}

export default function ModalEdit(props) {
    let visiable = useSelector(state => state.PostReducer.modal);
    let disabled = useSelector(state => state.PostReducer.loading);
    let data = useSelector(state => state.PostReducer.dataEdit);
    let messageErrors = useSelector(state => state.PostReducer.messageErrors);
    let content = useRef(data?.content);
    let [file, setFile] = useState({});
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let [errors, setErrors] = useState({
        content: '',
        image: ''
    });
    const [fileList, setFileList] = useState([
    ]);
    const renderData = () => {
        if (Object.keys(data).length > 0) {
            form.setFieldsValue({
                title: data.title
            });
            return;
        }
    }
    const handleChangeEditor = useCallback((values) => {
        return handleEditor(values);
    }, [errors]);
    const dataEditor = useMemo(() => {
        return content;
    }, [errors]);
    const handleEditor = (values) => {
        if (values) {
            content.current = values;
            if (errors.content) setErrors({ ...errors, content: '' });
        } else {
            setErrors({ ...errors, content: 'Content is empty!' });
        }
    }
    const handleSubmit = (values) => {
        let formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', content.current ? content.current : data.content);
        formData.append('image', file);
        dispatch(trans.updatePostAction(data.id, formData, form, content, [fileList, setFileList]));
    }
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
    return (
        <>
            {renderData()}
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
                width={775}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
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
                    <Form.Item>
                        <label htmlFor="" style={styled}><span style={{ color: "red" }}>*</span>&nbsp;Content</label>
                        <EditorComponent
                            content={content.current}
                            data={data}
                            errors={errors}
                            handleChangeEditor={handleChangeEditor}
                        />
                    </Form.Item>
                    <label htmlFor="" style={styled}><span style={{ color: "red" }}>*</span>&nbsp;Image</label>
                    {
                        <Upload
                            listType="picture-card"
                            fileList={fileList.length > 0 ? fileList : [{
                                url: `${STORAGE}/posts/${data?.image}`
                            }]}
                            onChange={onChange}
                            onPreview={onPreview}
                            maxCount={1}
                            beforeUpload={file => {
                                setFile(file);
                            }}
                        >
                            {'Upload File'}
                        </Upload>
                    }
                    <span style={{ color: "red", display: "block", marginBottom: "12px" }}>{errors ? errors.image : ''}</span>
                    <span style={{ color: "red", display: "block", marginBottom: "12px" }}>{errors ? messageErrors.image : ''}</span>
                </Form>
            </Modal>
        </>
    )
}
