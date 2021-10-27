import React, { useState, useMemo, useRef, useCallback } from 'react'
import {
    Form,
    Input,
    Modal,
    Upload
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import EditorComponent from '../Components/EditorComponent';
import * as trans from '../modules/Action';
import { getBase64 } from '../../../../utils/getImage';
import { STORAGE } from '../../../../settings/configUrl';

export default function UploadComponent(props) {
    let [image, setImage] = useState({
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
        ]
    });
    let [errors, setErrors] = useState({
        content: '',
        image: ''
    });
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
            {
                props?.data ?
                    <Upload
                        listType="picture-card"
                        fileList={
                            image.fileList.length > 0 ?
                                image.fileList :
                                [
                                    {
                                        url: `${STORAGE}/posts/${props.data.image}`
                                    }
                                ]
                        }
                        onPreview={handlePreview}
                        onChange={handleChange}
                        maxCount={1}
                        accept="image/png, image/jpeg,image/jpg"
                        beforeUpload={img => {
                            props.file.current = img;
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                    :
                    <Upload
                        listType="picture-card"
                        fileList={image.fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        maxCount={1}
                        accept="image/png, image/jpeg,image/jpg"
                        beforeUpload={img => {
                            props.file.current = img;
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
            }

            <Modal
                visible={image.previewVisible}
                title={image.previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={image.previewImage} height={300} width={300} />
            </Modal>
        </>
    )
}
