import React from 'react'
import { Input } from 'antd';
import { useDispatch } from 'react-redux'
import * as trans from './modules/Actions';
import { ToastContainer } from 'react-toastify';
import ModalCreate from './Modals/ModalCreate';
import TableComponent from './Components/TableComponent';

export default function InventoryManagement() {
    const dispatch = useDispatch();
    const handleSeachInput = (e) => {
        const { value } = e.target;
        dispatch(trans.seachInventoryAction(15, value));
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
                <ModalCreate />
                <TableComponent />
            </div>
        </>
    )
}

// export default checkLoginAdmin(InventoryManagement);