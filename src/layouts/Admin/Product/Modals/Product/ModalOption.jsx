import React, { memo } from 'react'
import {
    Modal
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as trans from '../../modules/Actions';

export default function ModalOption(props) {
    const data = useSelector(state => state.ProductReducer?.dataEdit);
    const modalContent = useSelector(state => state.ProductReducer?.modalOption);
    const option = data?.product_options ? data?.product_options[0] : {};
    const variant = data?.product_variants ? data?.product_variants[0] : {};
    const dispatch = useDispatch();
    return (
        <>
            {
                modalContent ?
                    <Modal
                        title="Option"
                        centered
                        visible={modalContent}
                        onCancel={() => { dispatch(trans.modalAct(false)) }}
                        width={600}
                    >
                        <table className="table table-success table-striped">
                            <tbody>
                                <tr>
                                    <td>Screen</td>
                                    <td>{option.screen}</td>
                                </tr>
                                <tr>
                                    <td>Screen Resolution</td>
                                    <td>{option.screen_resolution}</td>
                                </tr>
                                <tr>
                                    <td>Operating System</td>
                                    <td>{option.operating_system}</td>
                                </tr>
                                <tr>
                                    <td>Cpu</td>
                                    <td>{option.cpu}</td>
                                </tr>
                                <tr>
                                    <td>Gpu</td>
                                    <td>{option.gpu}</td>
                                </tr>
                                <tr>
                                    <td>Ram</td>
                                    <td>{variant.product_variant_ram}</td>
                                </tr>
                                <tr>
                                    <td>Camera Front</td>
                                    <td>{option.camera_fr}</td>
                                </tr>
                                <tr>
                                    <td>Camera Rear</td>
                                    <td>{option.camera_be}</td>
                                </tr>
                                <tr>
                                    <td>Pin</td>
                                    <td>{option.pin}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal>
                    : ''
            }
        </>
    )
}
