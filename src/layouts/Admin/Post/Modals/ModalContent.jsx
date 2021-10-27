import React, { memo } from 'react';
import { Markup } from 'interweave';
import {
    Modal
} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../modules/Action';

function ModalContent() {
    let data = useSelector(state => state.PostReducer.dataEdit);
    const dispatch = useDispatch();
    let modalContent = useSelector(state => state.PostReducer.modalContent);
    return (
        <>
            <Modal
                title="Content"
                centered
                visible={modalContent}
                onCancel={() => { dispatch(trans.modalAct(false)) }}
                width={775}
            >
                <Markup content={data?.content} />
            </Modal>
        </>
    )
}

export default memo(ModalContent)
