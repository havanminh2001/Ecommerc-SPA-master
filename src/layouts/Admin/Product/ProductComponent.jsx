import React from 'react'
import { useHistory } from 'react-router';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux'
import * as trans from './modules/Actions';
import { ToastContainer } from 'react-toastify';
import TableComponent from './Components/TableComponent';
import { FolderAddOutlined } from '@ant-design/icons';

export default function ProductComponent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSeachInput = (e) => {
        const { value } = e.target;
        dispatch(trans.seachProductAction(15, value));
    }
    return (
        <>
            <ToastContainer />
            <div className="list-card row">
                <div className="col-12 col-sm-6 col-xl-3 mb-3">
                    <Input.Group compact>
                        <Input size="default" allowClear defaultValue="" onChange={handleSeachInput} placeholder="Seach...." />
                    </Input.Group>
                </div>
                <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end">
                    <Button type="primary" title="Create" onClick={() => { history.push('/admin/product/create') }} icon={<FolderAddOutlined />} size="default" />
                </div>
                {/* <ModalCreate /> */}
                <TableComponent />
            </div>
        </>
    )
}