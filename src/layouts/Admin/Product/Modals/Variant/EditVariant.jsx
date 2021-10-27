import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import * as trans from '../../modules/Actions';

export default function EditVariant() {
    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();
    useEffect(() => {
        if (location.state?.product_id) {
            dispatch(trans.modalEditVariantAct(
                {
                    product_id: location.state.product_id,
                    id: params.id, isBool: true
                }
            ));
        } else {

        }
    }, []);
    return (
        <>

        </>
    )
}
