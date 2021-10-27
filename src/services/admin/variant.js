import * as yup from 'yup';
import * as actions from '../../layouts/Admin/Product/modules/Actions';

export const schemaCreate = yup.object().shape({
    product_variant_name: yup.string().max(254, 'Maximum 254 character').required('Variant name is required'),
    product_variant_rom: yup.string().max(4, 'Maximum 4 number').required('Rom is required'),
    product_variant_ram: yup.string().max(4, 'Maximum 4 number').required('Ram is required'),
    sku_unit_price: yup.string().max(10, 'Maximum 4 number').required('Unit price is required'),
    sku_promotion_price: yup.string().max(10, 'Maximum 4 number'),
    color: yup.string().required('Color is required').max(50, 'Maximum 50 character'),
    slug_url: yup.string().required('Slug is required').max(254, 'Maximum 254 character').matches(new RegExp("(?![enp])[a-z]"), 'Slug must be character'),
});

export const schemaUpdate = yup.object().shape({
    product_variant_name: yup.string().max(254, 'Maximum 254 character').required('Variant name is required'),
    product_variant_rom: yup.string().max(4, 'Maximum 4 number').required('Rom is required'),
    product_variant_ram: yup.string().max(4, 'Maximum 4 number').required('Ram is required'),
    sku_unit_price: yup.string().max(10, 'Maximum 4 number').required('Unit price is required'),
    sku_promotion_price: yup.string().max(10, 'Maximum 4 number'),
    color: yup.string().required('Color is required').max(50, 'Maximum 50 character'),
    slug_url: yup.string().required('Slug is required').max(254, 'Maximum 254 character').matches(new RegExp("(?![enp])[a-z]"), 'Slug must be character'),
});


export const createVariant = (id, values, reset, setError, [image, setImage], [err, setErr], dispatch) => {
    if (image.fileList.length > 0) {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        formData.append('image', image.fileList[0].originFileObj);
        dispatch(actions.createVariantAction(id, formData, [image, setImage], reset, setError));
    } else {
        setErr({ ...err, image: "Image is required" });
    }
}