import { message } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { alertErrors } from '../../../settings/config';
import { callApi } from '../../../utils/callApi';
import * as actions from '../Home/Modules/Actions';

export default function HeaderSeach() {
    let categories = useSelector(state => state.HomeReducer.categories);
    const history = useHistory();
    const dispatch = useDispatch();
    const renderCategories = () => {
        return categories?.map(item => {
            return (
                <option value={item.id} key={item.id}>{item.categories_name}</option>
            )
        });
    }
    const submitSeach = (e) => {
        e.preventDefault();
        const categories = e.target[0].value;
        const keyword = e.target[1].value;
        if (categories || keyword) {
            if (categories && !keyword) {
                history.push(`/categories?q=${categories}`);
            } else if (categories && keyword) {
                dispatch(actions.loadingAct(true));
                callApi(`api/seach?keyword=${keyword}&categories=${categories}`).then(res => {
                    if (res.data.status_code == 200) {
                        dispatch(actions.loadingAct(false));
                        history.push(`/product/${res.data.data.slug_url}`);
                    } else {
                        dispatch(actions.loadingAct(false));
                        alertErrors(res.data.message);
                    }
                }).catch(e => {
                    if (e.response) {
                        dispatch(actions.loadingAct(false));
                        alertErrors(e.data.message)
                    }
                });
            } else {
                dispatch(actions.loadingAct(true));
                callApi(`api/seach?keyword=${keyword}`).then(res => {
                    if (res.data.status_code == 200) {
                        dispatch(actions.loadingAct(false));
                        history.push(`/product/${res.data.data.slug_url}`);
                    } else {
                        dispatch(actions.loadingAct(false));
                        alertErrors(res.data.message);
                    }
                }).catch(e => {
                    if (e.response) {
                        dispatch(actions.loadingAct(false));
                        alertErrors(e.data.message)
                    }
                });
            }
        } else {
            alertErrors('Enter keyword or select categories for seach');
        }
    }
    return (
        <div className="col-lg-5 col-md-6  header__middle--center">
            <form onSubmit={submitSeach} action="*" style={{ width: "100%" }}>
                <div className="header__middle--select">
                    <select className="form-select">
                        <option value="">All</option>
                        {categories ? renderCategories() : ''}
                    </select>
                </div>
                <div className="header__middle--input">
                    <input type="text" className="form-control" placeholder="Seach" />
                </div>
                <div className="header__middle--btn">
                    <button type="submit" className="btn btn-primary">
                        <i className="lni lni-search-alt" />
                    </button>
                </div>
            </form>
        </div>
    )
}
