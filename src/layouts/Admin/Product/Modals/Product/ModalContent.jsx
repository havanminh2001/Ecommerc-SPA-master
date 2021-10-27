import React, { memo } from 'react'
import { Markup } from 'interweave';
import {
    Modal
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as trans from '../../modules/Actions';

export default function ModalContent() {
    let data = useSelector(state => state.ProductReducer.dataEdit);
    let modalContent = useSelector(state => state.ProductReducer.modalContent);
    const dispatch = useDispatch();
    return (
        <>
            <Modal
                title="Content"
                centered
                visible={modalContent}
                onCancel={() => { dispatch(trans.modalAct(false)) }}
                width={775}
            >
                <Markup content={data?.product_desc} />
            </Modal>
        </>
    )
}