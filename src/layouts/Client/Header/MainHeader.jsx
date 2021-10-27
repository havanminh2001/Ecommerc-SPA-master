import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HeaderContent from './HeaderContent'
import HeaderMenu from './HeaderMenu'
import HeaderTop from './HeaderTop'
import * as trans from '../Home/Modules/Actions';

export default function MainHeader() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.HomeReducer.categories);
    useEffect(() => {
        if (!(Array.isArray(data) && data.length > 0)) {
            dispatch(trans.fetchCategoriesAction());
        }
    }, []);
    return (
        <header>
            <HeaderTop />
            <HeaderContent />
            <HeaderMenu />
        </header>

    )
}
