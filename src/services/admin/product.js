import * as yup from 'yup';
import * as actions from '../../layouts/Admin/Product/modules/Actions';

export const styled = {
    color: "#f73232",
    fontSize: "15px",
    fontWeight: "600"
}

export const errors = {
    color: "#f73232",
    fontSize: "13px",
    fontWeight: "400",
    marginTop: "5px"
}

export const schemaCreate = yup.object().shape({
    categories_id: yup.string().required('Categories is required'),
    product_name: yup.string().max(254, 'Maximum 254 character').required('Product name is required'),
    product_desc: yup.string().max(3000, 'Maximum 3000 character'),
    screen: yup.string().max(254, 'Maximum 254 character'),
    screen_resolution: yup.string().max(254, 'Maximum 254 character'),
    operating_system: yup.string().max(100, 'Maximum 100 character'),
    cpu: yup.string().max(100, 'Maximum 100 character'),
    gpu: yup.string().max(100, 'Maximum 100 character'),
    camera_fr: yup.string().max(254, 'Maximum 254 character'),
    camera_be: yup.string().max(254, 'Maximum 254 character'),
    pin: yup.string().max(254, 'Maximum 254 character'),
    product_variant_name: yup.string().max(254, 'Maximum 254 character').required('Variant name is required'),
    product_variant_rom: yup.string().max(4, 'Maximum 4 number').required('Rom is required'),
    product_variant_ram: yup.string().max(4, 'Maximum 4 number').required('Ram is required'),
    sku_unit_price: yup.string().max(10, 'Maximum 4 number').required('Unit price is required'),
    sku_promotion_price: yup.string().max(10, 'Maximum 4 number'),
    color: yup.string().required('Color is required').max(50, 'Maximum 50 character'),
    slug_url: yup.string().required('Slug is required').max(254, 'Maximum 254 character').matches(new RegExp("(?![enp])[a-z]"), 'Slug must be character'),
});

export const schemaUpdate = yup.object().shape({
    categories_id: yup.string().required('Categories is required'),
    product_name: yup.string().max(254, 'Maximum 254 character').required('Product name is required'),
    product_desc: yup.string().max(3000, 'Maximum 3000 character'),
    screen: yup.string().max(254, 'Maximum 254 character'),
    screen_resolution: yup.string().max(254, 'Maximum 254 character'),
    operating_system: yup.string().max(100, 'Maximum 100 character'),
    cpu: yup.string().max(100, 'Maximum 100 character'),
    gpu: yup.string().max(100, 'Maximum 100 character'),
    camera_fr: yup.string().max(254, 'Maximum 254 character'),
    camera_be: yup.string().max(254, 'Maximum 254 character'),
    pin: yup.string().max(254, 'Maximum 254 character'),
});

export const handleEditor = (values, description) => {
    if (values) {
        description.current = values;
    }
}
export const onPreview = async file => {
    let src = file.url;
    if (!src) {
        src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
};
export const handleChange = ({ fileList }, [image, setImage], [err, setErr]) => {
    if (fileList.length > 0) {
        setErr({ ...err, image: "" });
        setImage({ fileList });
    } else {
        setErr({ ...err, image: "Image is required" });
        setImage({ fileList });
    }
};

export const createProduct = (values, reset, setError, [image, setImage], desc, [err, setErr], dispatch) => {
    if (image.fileList.length > 0) {
        if (desc.current.length > 2999) {
            setErr({ ...err, desc: "Description maximum 3000" });
        } else {
            const formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key]);
            }
            formData.append('product_desc', desc.current);
            formData.append('image', image.fileList[0].originFileObj);
            dispatch(actions.createProductAction(formData, desc, [image, setImage], reset, setError));
        }
    } else {
        setErr({ ...err, image: "Image is required" });
    }
}

export const updateProduct = (id, values, setError, desc, [err, setErr], dispatch, history) => {
    if (desc.current.length > 2999) {
        setErr({ ...err, desc: "Description maximum 3000" });
    } else {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        formData.append('product_desc', desc.current);
        dispatch(actions.updateProductAction(id, formData, setError, history));
    }
}