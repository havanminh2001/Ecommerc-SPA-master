import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import checkLoginAdmin from '../../../hoc/checkLoginAdmin'
import { Input } from 'antd';
import * as trans from './modules/Action';
import { ToastContainer } from 'react-toastify';
import ModalCreate from './Modals/ModalCreate';
import TableComponent from './Components/TableComponent';

export default function PostComponent() {
    const dispatch = useDispatch();
    const handleSeachInput = (e) => {
        const { value } = e.target;
        dispatch(trans.seachPostAction(15, value));
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

// export default checkLoginAdmin(PostComponent);