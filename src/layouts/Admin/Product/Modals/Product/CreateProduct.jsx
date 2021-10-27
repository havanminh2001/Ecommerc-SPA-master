import React, { useRef, useCallback, useEffect, useState } from 'react'
import * as service from '../../../../../services/admin/product';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProduct from './components/FormProduct';
import FormOption from './components/FormOption';
import EditorComponent from './components/EditorComponent';
import FormSku from './components/FormSku';
import FormVariant from './components/FormVariant';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../modules/Actions';
import { Space, Spin } from 'antd';
import { ToastContainer } from 'react-toastify';
import { NavLink } from 'react-router-dom';

export default function CreateProduct() {
    const { register, handleSubmit, formState: { errors }, reset, setError, setValue } = useForm({
        mode: 'onChange',
        resolver: yupResolver(service.schemaCreate),
    });
    const data = useSelector(state => state.ProductReducer.relationship);
    const loading = useSelector(state => state.ProductReducer.loading);
    const [image, setImage] = useState({
        fileList: []
    });
    const [err, setErr] = useState({
        image: "",
        desc: ""
    });
    const editorRef = useRef();
    const description = useRef('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (!(data.categories.length > 0)) {
            dispatch(actions.fetchRelationshipAction());
        }
    }, []);
    const handleEditor = useCallback((values, description) => {
        service.handleEditor(values, description);
    }, []);
    return (
        <>
            <ToastContainer />
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <form onSubmit={handleSubmit((values) => { service.createProduct(values, reset, setError, [image, setImage], description, [err, setErr], dispatch) })} className="form__admin">
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
                    <div className="col-10 form__left row">
                        <div className="form__title">
                            <h4>Product</h4>
                        </div>
                        <FormProduct register={register} errors={errors} data={data} />
                        <div className="form__title">
                            <h4>Option</h4>
                        </div>
                        <FormOption register={register} errors={errors} setValue={setValue} />
                        <div className="form__title">
                            <h4>Slug</h4>
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="ram" className="form-label"><span style={service.styled}>*</span>&nbsp;Slug Url</label>
                            <input type="text" className="form-control" {...register('slug_url')} placeholder="iphone-12-64gb" />
                            {errors.slug_url && <p style={service.errors}>{errors.slug_url.message}</p>}
                        </div>
                        <div className="form__title">
                            <h4>Description</h4>
                        </div>
                        <EditorComponent editorRef={editorRef} description={description} handleEditor={handleEditor} />
                    </div>
                    <div className="col-2 form__right">
                        <div className="row">
                            <div className="form__title">
                                <h4>Variant</h4>
                            </div>
                            <FormVariant register={register} errors={errors} />
                            <div className="form__title">
                                <h4>Sku</h4>
                            </div>
                            <FormSku register={register} errors={errors} errorsImage={err.image} state={[image, setImage]} errorsImg={[err, setErr]} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
