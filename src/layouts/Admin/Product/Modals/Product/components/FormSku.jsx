import React, { useState, memo, useRef } from 'react'
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as service from '../../../../../../services/admin/product';

export default function FormSku(props) {
    const { register, errors, state, errorsImg } = props;
    const [image, setImage] = state;
    const [err, setErr] = errorsImg;
    return (
        <>
            <div className="col-12 mb-3">
                <label htmlFor="unit-price" className="form-label"><span style={service.styled}>*</span>&nbsp;Unit price</label>
                <input type="number" {...register('sku_unit_price')} className="form-control" name="sku_unit_price" placeholder="$350" />
                {errors.sku_unit_price && <p style={service.errors}>{errors.sku_unit_price.message}</p>}
            </div>
            <div className="col-12 mb-3">
                <label htmlFor="promotion-price" className="form-label">Promotion price</label>
                <input type="number" {...register('sku_promotion_price')} className="form-control" name="sku_promotion_price" placeholder="$300" />
                {errors.sku_promotion_price && <p style={service.errors}>{errors.sku_promotion_price.message}</p>}
            </div>
            <div className="col-12 mb-3">
                <label htmlFor="color" className="form-label"><span style={service.styled}>*</span>&nbsp;Color</label>
                <input type="text" {...register('color')} className="form-control" name="color" placeholder="Graphite" />
                {errors.color && <p style={service.errors}>{errors.color.message}</p>}
            </div>
            <div className="col-12 mb-3">
                <label htmlFor="ram" className="form-label"><span style={service.styled}>*</span>&nbsp;Image</label>
                <Upload
                    listType="picture-card"
                    fileList={image?.fileList}
                    onPreview={service.onPreview}
                    onChange={(e) => { service.handleChange(e, [image, setImage], [err, setErr]) }}
                    maxCount={1}
                    accept="image/png, image/jpeg,image/jpg"
                >
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Image</div>
                    </div>
                </Upload>
                {err.image && <p style={service.errors}>{err.image}</p>}
            </div>
        </>
    )
}