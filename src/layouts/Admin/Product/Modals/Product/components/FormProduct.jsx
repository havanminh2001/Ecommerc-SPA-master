import React, { useEffect, useState } from 'react'
import * as service from '../../../../../../services/admin/product';

export default function FormProduct(props) {
    const { register, errors, product, setValue, data } = props;
    const { categories, discount } = data;
    useEffect(() => {
        if (product?.id) {
            setValue("product_name", product?.product_name);
            setValue("categories_id", product?.categories_id);
        }
    }, [data]);
    return (
        <>
            <div className="col-4 mb-3">
                <label htmlFor="categories" className="form-label"><span style={service.styled}>*</span>&nbsp;Categories</label>
                <select
                    className="form-select"
                    {...register('categories_id')}>
                    <option value="">Select Categories</option>
                    {
                        categories?.map(cate => {
                            return (
                                <option
                                    value={cate.id}
                                    key={cate.id}>
                                    {cate.categories_name}
                                </option>
                            )
                        })
                    }
                </select>
                {errors.categories_id && <p style={service.errors}>{errors.categories_id.message}</p>}
            </div>
            <div className="col-8 mb-3">
                <label htmlFor="discount" className="form-label"><span style={service.styled}>*</span>&nbsp;Promotion</label>
                <select className="form-select" {...register('discount_id')} name="discount_id" defaultValue={product?.discount_id ? product.discount_id : ""}>
                    <option value="">Select promotion</option>
                    {
                        discount?.map(item => {
                            return (
                                <option value={1} key={item.id}>{item.discount_name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="col-12 mb-3">
                <label htmlFor="product-name" className="form-label"><span style={service.styled}>*</span>&nbsp;Product name</label>
                <input type="text" {...register('product_name')} className="form-control" name="product_name" placeholder="Example iphone 12" />
                {errors.product_name && <p style={service.errors}>{errors.product_name.message}</p>}
            </div>
        </>
    )
}