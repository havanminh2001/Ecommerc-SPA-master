import React, { useEffect } from 'react'
import * as service from '../../../../../../services/admin/product';

export default function FormVariant(props) {
    const { register, errors, setValue, dataEdit } = props;
    useEffect(() => {
        if (dataEdit) {
            setValue("product_variant_name", dataEdit[0].product_variant_name);
            setValue("product_variant_rom", dataEdit[0].product_variant_rom);
            setValue("product_variant_ram", dataEdit[0].product_variant_ram);
        }
    }, [dataEdit, setValue]);
    return (
        <>
            <div className="col-12 mb-3">
                <label htmlFor="variant-name" className="form-label"><span style={service.styled}>*</span>&nbsp;Variant name</label>
                <input type="text" {...register('product_variant_name')} className="form-control" name="product_variant_name" placeholder="Iphone 12 - 128GB" />
                {errors.product_variant_name && <p style={service.errors}>{errors.product_variant_name.message}</p>}
            </div>
            <div className="col-12 mb-3">
                <label htmlFor="rom" className="form-label"><span style={service.styled}>*</span>&nbsp;Rom</label>
                <input type="number" {...register('product_variant_rom')} className="form-control" name="product_variant_rom" placeholder="128GB" />
                {errors.product_variant_rom && <p style={service.errors}>{errors.product_variant_rom.message}</p>}
            </div>
            <div className="col-12 mb-3">
                <label htmlFor="ram" className="form-label"><span style={service.styled}>*</span>&nbsp;Ram</label>
                <input type="number" {...register('product_variant_ram')} className="form-control" name="product_variant_ram" placeholder="4GB" />
                {errors.product_variant_ram && <p style={service.errors}>{errors.product_variant_ram.message}</p>}
            </div>
        </>
    )
}
