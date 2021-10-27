import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormVariant from '../Product/components/FormVariant';
import FormSku from '../Product/components/FormSku';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Space, Spin } from 'antd';
import { ToastContainer } from 'react-toastify';
import * as product from '../../../../../services/admin/product';
import * as service from '../../../../../services/admin/variant';


export default function CreateVariant() {
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
        mode: 'onChange',
        resolver: yupResolver(service.schemaCreate),
    });
    const loading = useSelector(state => state.ProductReducer.loading);
    const [image, setImage] = useState({
        fileList: []
    });
    const [err, setErr] = useState({
        image: ""
    });
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
            <ToastContainer />
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <form onSubmit={handleSubmit((values) => { service.createVariant(params.id, values, reset, setError, [image, setImage], [err, setErr], dispatch) })} className="form__admin" style={{ padding: "20px 80px" }}>
                <div className="row">
                    <div className="col-12 text-end mb-2">
                        <a href="*" onClick={(e) => { e.preventDefault(); history.goBack() }} style={{ padding: "5px 12px", borderRadius: "50%", border: "none", background: "#42526E", float: "left" }}>
                            <i className="fa fa-arrow-circle-left"
                                style={{ color: "#fff" }}></i>
                        </a>
                        <button className="btn btn-primary">Create</button>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="form__title">
                                <h4>Product Variant</h4>
                            </div>
                            <FormVariant register={register} errors={errors} />
                            <div className="form__title">
                                <h4>Slug</h4>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="ram" className="form-label"><span style={product.styled}>*</span>&nbsp;Slug Url</label>
                                <input type="text" className="form-control" {...register('slug_url')} placeholder="iphone-12-64gb" />
                                {errors.slug_url && <p style={product.errors}>{errors.slug_url.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form__title">
                            <h4>Sku</h4>
                        </div>
                        <FormSku register={register} errors={errors} errorsImage={err.image} state={[image, setImage]} errorsImg={[err, setErr]} />
                    </div>
                </div>
            </form>
        </>
    )
}
