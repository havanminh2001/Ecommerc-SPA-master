import * as contants from './Constants';
import { apiPost } from '../../../../services/adminApi';
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

export const modalAct = (payload) => ({
    type: contants.modalContants,
    payload
});

export const modalContentAct = (payload) => ({
    type: contants.modalContentContants,
    payload
});

export const editAct = (payload) => ({
    type: contants.editContants,
    payload
});

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
})

export const fetchFailAct = (payload) => ({
    type: contants.fetchFailContants,
    payload
});

export const contentEditorAct = (payload) => ({
    type: contants.contentEditor,
    payload
});

export const clearEditorAct = (payload) => ({
    type: contants.clearEditor,
    payload
});


// fetch data
export const transAction = (pageSize) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiPost.fetchApi(pageSize);
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
            dispatch(loadingAct(false));
        }
    }
}

// fetch pagination
export const paginationAction = (current, pageSize) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiPost.changePagination(current, pageSize);
        const result = res.data.data;
        const payload = {
            data: result.data,
            pagination: { current, pageSize, total: result.total, lastPage: result.last_page }
        }
        dispatch(paginationAct(payload));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

// create
export const createPostAction = (data, form, [image, setImage], [errors, setErrors], dataCreate) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiPost.create(data);
        if (res.data.status_code === STATUS_SUCCESS) {
            alertSuccess('Create success');
            dispatch(createAct(res.data.data));
            form.resetFields();
            setImage({ ...image, fileList: [] });
            setErrors({ content: '', image: '' });
            dataCreate.current = {
                content: '',
                image: {}
            }
        } else {
            const message = {};
            for (const [key, value] of Object.entries(res.data.message)) {
                form.setFields([
                    {
                        name: key,
                        errors: value,
                    },
                ]);
                message[key] = value[0];
            }
            dispatch(fetchFailAct({ disable: false, errors: message }));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

// update
export const updatePostAction = (id, data, form, content, [fileList, setFileList]) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiPost.update(id, data);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(updateAct({ update: res.data.data, id }));
            content.current = '';
            setFileList({});
            alertSuccess('Update success');
        } else {
            const message = {};
            for (const [key, value] of Object.entries(res.data.message)) {
                form.setFields([
                    {
                        name: key,
                        errors: value,
                    },
                ]);
                message[key] = value[0];
            }
            dispatch(fetchFailAct({ disable: false, errors: message }));
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

// delete
export const deletePostAction = (id) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiPost.delete(id);
        if (res.data.status_code === STATUS_SUCCESS) {
            dispatch(deleteAct(id));
            alertSuccess(res.data.message);
        }
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

export const seachPostAction = (pageSize, keyword) => async (dispatch) => {
    try {
        dispatch(loadingAct(true));
        const res = await apiPost.seach(pageSize, keyword);
        const result = res.data.data;
        const payload = {
            data: result.data,
            total: result.total,
            lastPage: result.last_page
        }
        dispatch(seachAct(payload));
    } catch (e) {
        if (e.response) {
            alertErrors('Sorry, Server errors please try again!');
            dispatch(loadingAct(false));
        }
    }
}

export const clearEditorActon = (
    payload,
    [visiable, setVisiable],
    [image, setImage],
    [errors, setErrors]
) => async (dispatch) => {
    setVisiable(false);
    setImage({ ...image, fileList: [] });
    setErrors({ content: '', image: '' });
    dispatch(clearEditorAct(payload));
}