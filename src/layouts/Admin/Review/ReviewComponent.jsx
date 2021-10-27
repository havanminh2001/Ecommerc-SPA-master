import { Input } from 'antd';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import TableComponent from './Components/TableComponent';
import * as trans from './modules/Actions';

export default function ReviewComponent() {
    const dispatch = useDispatch();
    const handleSeachInput = (e) => {
        const { value } = e.target;
        dispatch(trans.seachAction(15, value));
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
                <TableComponent />
            </div>
        </>
    )
}
