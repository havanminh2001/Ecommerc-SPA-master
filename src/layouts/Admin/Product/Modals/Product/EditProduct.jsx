import React, { useRef, useCallback, useEffect, useState } from 'react'
import * as service from '../../../../../services/admin/product';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProduct from './components/FormProduct';
import FormOption from './components/FormOption';
import EditorComponent from './components/EditorComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import * as actions from '../../modules/Actions';
import { Space, Spin } from 'antd';
import { ToastContainer } from 'react-toastify';

export default function EditProduct(props) {
    const data = useSelector(state => state.ProductReducer.relationship);
    const loading = useSelector(state => state.ProductReducer.loading);
    const { product, option } = useSelector(state => state.ProductReducer.dataEdit);
    const { register: registerUpdate, handleSubmit: updateForm, formState: { errors: errorsUpdate }, setError, setValue } = useForm({
        resolver: yupResolver(service.schemaUpdate),
    });
    const [err, setErr] = useState({
        image: "",
        desc: ""
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const editorRef = useRef();
    const description = useRef('');
    const handleEditor = useCallback((values, description) => {
        service.handleEditor(values, description);
    }, []);
    useEffect(() => {
        if (!(data.categories.length > 0)) {
            if (!option?.id) {
                dispatch(actions.fetchEditProductAction(parseInt(params.id)));
            }
            dispatch(actions.fetchRelationshipAction());
        }
    }, []);
    return (
        <>
            <ToastContainer />
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <form onSubmit={updateForm((values) => { service.updateProduct(params.id, values, setError, description, [err, setErr], dispatch, history) })} className="form__admin">
                <div className="row">
                    <div className="col-12 text-end mb-2" style={{ padding: "0 20px" }}>
                        <NavLink to="/admin/product" style={{ padding: "5px 12px", borderRadius: "50%", border: "none", background: "#42526E", float: "left" }}>
                            <i className="fa fa-arrow-circle-left"
                                style={{ color: "#fff" }}></i>
                        </NavLink>
                        <button className="btn btn-primary">Create</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 form__left row">
                        <div className="form__title">
                            <h4>Product</h4>
                        </div>
                        <FormProduct register={registerUpdate} errors={errorsUpdate} data={data} product={product} setValue={setValue} />
                        <div className="form__title">
                            <h4>Option</h4>
                        </div>
                        <FormOption register={registerUpdate} errors={errorsUpdate} option={option} setValue={setValue} />
                        <div className="form__title">
                            <h4>Description</h4>
                        </div>
                        <EditorComponent editorRef={editorRef} description={description} handleEditor={handleEditor} product={product} setValue={setValue} />
                    </div>
                </div>
            </form>
        </>
    )
}
