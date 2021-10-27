import * as contants from './Constants';
import { apiProduct } from '../../../../services/adminApi';
import { alertErrors, alertSuccess, STATUS_SUCCESS } from '../../../../settings/config';

export const loadingAct = (loading) => ({
    type: contants.loadingContants,
    payload: loading
});

export const fetchSuccessAct = (payload) => ({
    type: contants.fetchSuccessContants,
    payload
});

export const paginationAct = (payload) => ({
    type: contants.paginationContants,
    payload
});

export const createAct = (payload) => ({
    type: contants.createContants,
    payload
});

export const validateAct = (payload) => ({
    type: contants.createValidateContants,
    payload
})

export const modalAct = (payload) => ({
    type: contants.modalContants,
    payload
});

export const editAct = (payload) => ({
    type: contants.editContants,
    payload
});

export const fetchEditAct = (payload) => ({
    type: contants.fetchEditContants,
    payload
})

export const updateAct = (payload) => ({
    type: contants.updateContants,
    payload
})


export const deleteAct = (payload) => ({
    type: contants.deleteContants,
    payload
});

export const seachAct = (payload) => ({
    type: contants.seachContants,
    payload
});

export const fetchFailAct = (payload) => ({
    type: contants.fetchFailContants,
    payload
});

export const fetchValidateAct = (payload) => ({
    type: contants.createValidateContants,
    payload
});

export const modalContentAct = (payload) => ({
    type: contants.modalContentContants,
    payload
});

export const modalOptionAct = (payload) => ({
    type: contants.modalOptionContants,
    payload
});

export const createVariantAct = (payload) => ({
    type: contants.createVariantConstant,
    payload
});

export const updateVariantAct = (payload) => ({
    type: contants.updateVariantConstant,
    payload
});

export const deleteVariantAct = (payload) => ({
    type: contants.deleteVariantConstant,
    payload
});

export const modalVariantAct = (payload) => ({
    type: contants.modalVariantConstant,
    payload
});

export const modalEditVariantAct = (payload) => ({
    type: contants.editVariantConstant,
    payload
});

export const fetchRelationshipAct = payload => ({
    type: contants.fetchRelationship,
    payload
});

// fetch data
export const transAction = (pageSize) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.fetchApi(pageSize);
        const result = res.data.data;
        const payload = {
            data: result.data,
            total: result.total,
            lastPage: result.last_page
        }
        dispatch(fetchSuccessAct(payload));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(fetchFailAct(false));
        }
    }
}

// fetch relationships
export const fetchRelationshipAction = () => async (dispatch) => {
    try {
        const res = await apiProduct.fetchRelationshipApi();
        const result = res.data.data;
        const payload = {
            categories: result.categories,
            discount: result.discount
        }
        dispatch(fetchRelationshipAct(payload));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(fetchFailAct(false));
        }
    }
}


// fetch pagination
export const paginationAction = (current, pageSize) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.changePagination(current, pageSize);
        const result = res.data.data;
        const payload = {
            data: result.data,
            pagination: { current, pageSize, total: result.total, lastPage: result.last_page }
        }
        dispatch(paginationAct(payload));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(fetchFailAct(false));
        }
    }
}

// create product
export const createProductAction = (data, description, [image, setImage], reset, setError) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.create(data);
        if (res.data.status_code === STATUS_SUCCESS) {
            description.current = "";
            setImage({ ...image, fileList: [] });
            reset();
            dispatch(createAct(res.data.data));
            alertSuccess('Create success');
        } else {
            for (const [key, value] of Object.entries(res.data.message)) {
                setError(key, {
                    type: "manual",
                    message: value[0],
                });
            }
            dispatch(fetchFailAct(false));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(fetchFailAct(false));
        }
    }
}

// edit product
export const fetchEditProductAction = (id) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.edit(id);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(fetchEditAct({
                option: res.data.option,
                product: res.data.product
            }));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(fetchFailAct(false));
        }
    }
}

// update product
export const updateProductAction = (id, data, setError, history) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.update(id, data);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(updateAct({ update: res.data.data, id }));
            alertSuccess("Update success");
        } else {
            for (const [key, value] of Object.entries(res.data.message)) {
                setError(key, {
                    type: "manual",
                    message: value[0]
                });
            }
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(fetchFailAct(false));
        }
    }
}

// delete product
export const deleteProductAction = (id) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.delete(id);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(deleteAct(id));
            alertSuccess(res.data.message);
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(fetchFailAct(false));
        }
    }
}

// seach product
export const seachProductAction = (pageSize, keyword) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.seach(pageSize, keyword);
        const result = res.data.data;
        const payload = {
            data: result.data,
            total: result.total,
            lastPage: result.last_page
        }
        dispatch(seachAct(payload));
    } catch (e) {
        if (e.response) {
            alertErrors('Product not found');
            dispatch(fetchFailAct(false));
        }
    }
}

// create variant
export const createVariantAction = (id, formData, [image, setImage], reset, setError) => async (dispatch) => {
    // createVariantAct
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.createVariant(id, formData);
        console.log(res.data.status_code == STATUS_SUCCESS);
        if (res.data.status_code == STATUS_SUCCESS) {
            let result = res.data.data;
            let data = {
                id,
                variant: result.variant,
                sku: result.sku
            }
            reset();
            setImage({ ...image, fileList: [] });
            dispatch(createVariantAct(data));
            alertSuccess('Create success');
        } else {
            for (const [key, value] of Object.entries(res.data.message)) {
                setError(key, {
                    type: "manual",
                    message: value[0],
                });
            }
            dispatch(fetchFailAct(false));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(fetchFailAct(false));
        }
    }
}

// update variant
export const updateVariantProductAction = (id, data, form) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.updateVariant(id, data);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(updateVariantAct(res.data.data));
            alertSuccess('Update success');
            form.resetFields();
        } else {
            for (const [key, value] of Object.entries(res.data.message)) {
                form.setFields([
                    {
                        name: key,
                        errors: value,
                    },
                ]);
            }
            dispatch(fetchFailAct(false));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(fetchFailAct(false));
        }
    }
}

// delete variant
export const deleteVariantAction = (product_id, id) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiProduct.deleteVariant(id);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(deleteVariantAct({
                product_id,
                id
            }));
            alertSuccess(res.data.message);
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(fetchFailAct(false));
        }
    }
}