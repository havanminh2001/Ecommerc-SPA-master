import { ACCESS_TOKEN } from '../settings/configUrl';
import { apiRefreshToken, callApi, callApiAdmin } from '../utils/callApi';

const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
}

export const apiAdmin = {
    fetchApiLogin(data) {
        return callApi("api/admin/login", "post", data);
    },
    fetchApiLogout() {
        return callApiAdmin(`logout?token=${getToken()}`);
        // return callApiAdmin('logout');
    },
    refreshToken() {
        return apiRefreshToken(`api/refresh/token?token=${getToken()}`);
        // return apiRefreshToken(`api/refresh/token`);
    },
    fetchInfo() {
        // return callApiAdmin(`info?token=${getToken()}`);
        return callApiAdmin('info');
    }
}

export const apiCategories = {
    fetchApiCategories(pageSize = 10) {
        return callApiAdmin(`categories/list?pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`categories/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`categories/list?page=${currentPage}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`categories/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    createCategories(form) {
        return callApiAdmin(`categories/create?token=${getToken()}`, 'post', form);
        // return callApiAdmin('categories/create', 'post', form);
    },
    editCategories(id) {
        return callApiAdmin(`categories/edit/${id}?token=${getToken()}`);
        // return callApiAdmin(`categories/edit/${id}`);
    },
    updateCategories(id, form) {
        return callApiAdmin(`categories/update/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`categories/update/${id}`, 'post', form);
    },
    deleteCategories(id) {
        return callApiAdmin(`categories/delete/${id}?token=${getToken()}`);
        // return callApiAdmin(`categories/delete/${id}`);
    },
    seachCategories(pageSize, keyword) {
        return callApiAdmin(`categories/seach?keyword=${keyword}&pageSize=${pageSize}&token=${getToken()}`);
        return callApiAdmin(`categories/seach?keyword=${keyword}&pageSize=${pageSize}`);
    }
}
export const apiPost = {
    fetchApi(pageSize = 10) {
        return callApiAdmin(`post/list?pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`post/list?pageSize=${pageSize}`);
    },
    change(currentPage, pageSize = 10) {
        return callApiAdmin(`post/list?page=${currentPage}&pageSize=${pageSize}&token${getToken()}`);
        // return callApiAdmin(`post/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    create(form) {
        return callApiAdmin(`post/create?token=${getToken()}`, 'post', form);
        // return callApiAdmin('post/create', 'post', form);
    },
    edit(id) {
        return callApiAdmin(`post/edit/${id}?token=${getToken()}`);
        // return callApiAdmin(`post/edit/${id}`);
    },
    update(id, form) {
        return callApiAdmin(`post/update/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`post/update/${id}`, 'post', form);
    },
    delete(id) {
        return callApiAdmin(`post/delete/${id}?token=${getToken()}`);
        // return callApiAdmin(`post/delete/${id}`);
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`post/seach?keyword=${keyword}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`post/seach?keyword=${keyword}&pageSize=${pageSize}`);
    }
}

export const apiReview = {
    fetchApi(pageSize = 10) {
        return callApiAdmin(`review/list?pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`review/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`review/list?page=${currentPage}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`review/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    update(id, data) {
        return callApiAdmin(`review/update/${id}?token=${getToken()}`, 'post', data);
        // return callApiAdmin(`review/update/${id}`, 'post', data);
    },
    delete(id) {
        return callApiAdmin(`review/delete/${id}?token=${getToken()}`);
        // return callApiAdmin(`review/delete/${id}`);
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`review/seach?keyword=${keyword}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`review/seach?keyword=${keyword}&pageSize=${pageSize}`);
    }
}

export const apiDiscount = {
    fetchApi(pageSize = 10) {
        return callApiAdmin(`discount/list?pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`discount/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`discount/list?page=${currentPage}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`discount/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    create(form) {
        return callApiAdmin(`discount/create?token=${getToken()}`, 'post', form);
        // return callApiAdmin('discount/create', 'post', form);
    },
    edit(id) {
        return callApiAdmin(`discount/edit/${id}?token=${getToken()}`);
        // return callApiAdmin(`discount/edit/${id}`);
    },
    update(id, form) {
        return callApiAdmin(`discount/update/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`discount/update/${id}`, 'post', form);
    },
    delete(id) {
        return callApiAdmin(`discount/delete/${id}?token=${getToken()}`);
        // return callApiAdmin(`discount/delete/${id}`);
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`discount/seach?keyword=${keyword}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`discount/seach?keyword=${keyword}&pageSize=${pageSize}`);
    }
}

export const apiUser = {
    fetchApi(pageSize = 10) {
        return callApiAdmin(`user/list?pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`user/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`user/list?page=${currentPage}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`user/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    create(form) {
        return callApiAdmin(`user/create?token=${getToken()}`, 'post', form);
        // return callApiAdmin('user/create', 'post', form);
    },
    edit(id) {
        return callApiAdmin(`user/edit/${id}?token=${getToken()}`);
        // return callApiAdmin(`user/edit/${id}`);
    },
    update(id, form) {
        return callApiAdmin(`user/update/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`user/update/${id}`, 'post', form);
    },
    delete(id) {
        return callApiAdmin(`user/delete/${id}?token=${getToken()}`);
        // return callApiAdmin(`user/delete/${id}`);
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`user/seach?keyword=${keyword}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`user/seach?keyword=${keyword}&pageSize=${pageSize}`);
    },
    updatStatus(id, status) {
        return callApiAdmin(`user/status/${id}?status=${status}&token=${getToken()}`, 'post');
        // return callApiAdmin(`user/status/${id}?status=${status}`, 'post');
    }
}

export const apiProduct = {
    fetchApi(pageSize = 10) {
        return callApiAdmin(`product/list?pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`product/list?pageSize=${pageSize}`);
    },
    fetchRelationshipApi() {
        return callApiAdmin(`product/parent?token=${getToken()}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`product/list?page=${currentPage}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`product/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    create(form) {
        return callApiAdmin(`product/create?token=${getToken()}`, 'post', form);
        // return callApiAdmin('product/create', 'post', form);
    },
    edit(id) {
        return callApiAdmin(`product/edit/${id}?token=${getToken()}`);
        // return callApiAdmin(`product/edit/${id}`);
    },
    update(id, form) {
        return callApiAdmin(`product/update/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`product/update/${id}`, 'post', form);
    },
    delete(id) {
        return callApiAdmin(`product/delete/${id}?token=${getToken()}`);
        // return callApiAdmin(`product/delete/${id}`);
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`product/seach?keyword=${keyword}&pageSize=${pageSize}&token=${getToken()}`)
        // return callApiAdmin(`product/seach?keyword=${keyword}&pageSize=${pageSize}`);
    },
    createVariant(id, form) {
        return callApiAdmin(`product/variant/create/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`product/variant/${id}`, 'post', form);
    },
    updateVariant(id, form) {
        return callApiAdmin(`product/variant/update/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`product/variant/${id}`, 'post', form);
    },
    deleteVariant(id) {
        return callApiAdmin(`product/variant/${id}?token=${getToken()}`);
        // return callApiAdmin(`product/variant/${id}`);
    },
}

export const apiProductSku = {
    fetchApi(id, pageSize = 10) {
        return callApiAdmin(`product/sku/list/${id}?pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`product/sku/list/${id}?pageSize=${pageSize}`);
    },
    changePagination(id, currentPage, pageSize = 10) {
        return callApiAdmin(`product/sku/list/${id}?page=${currentPage}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`product/sku/list/${id}?page=${currentPage}&pageSize=${pageSize}`);
    },
    create(id, form) {
        return callApiAdmin(`product/sku/create/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`product/sku/create/${id}`, 'post', form);
    },
    edit(id) {
        return callApiAdmin(`product/sku/edit/${id}?token=${getToken()}`);
        // return callApiAdmin(`product/sku/edit/${id}`);
    },
    update(id, form) {
        return callApiAdmin(`product/sku/update/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`product/sku/update/${id}`, 'post', form);
    },
    delete(id) {
        return callApiAdmin(`product/sku/delete/${id}?token=${getToken()}`);
        // return callApiAdmin(`product/sku/delete/${id}`);
    }
}

export const apiInventory = {
    fetchApi(pageSize = 10) {
        return callApiAdmin(`inventory/list?pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`inventory/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`inventory/list?page=${currentPage}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`inventory/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    create(form) {
        return callApiAdmin(`inventory/create?token=${getToken()}`, 'post', form);
        // return callApiAdmin('inventory/create', 'post', form);
    },
    edit(id) {
        return callApiAdmin(`inventory/edit/${id}?token=${getToken()}`);
        // return callApiAdmin(`inventory/edit/${id}`);
    },
    update(id, form) {
        return callApiAdmin(`inventory/update/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`inventory/update/${id}`, 'post', form);
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`inventory/seach?keyword=${keyword}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`inventory/seach?keyword=${keyword}&pageSize=${pageSize}`);
    },
    getListProduct() {
        return callApiAdmin(`inventory/product?token=${getToken()}`);
        // return callApiAdmin(`inventory/product`);
    },
    updateStatus(id, form) {
        return callApiAdmin(`inventory/status/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`inventory/status/${id}`, 'post', form);
    },
    export(month) {
        return callApiAdmin(`inventory/export?month=${month}&token=${getToken()}`);
        // return callApiAdmin(`inventory/export?month=${month}`);
    }
}

export const apiOrder = {
    fetch(pageSize = 10) {
        return callApiAdmin(`order/list?pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`order/list?pageSize=${pageSize}`);
    },
    changePagination(currentPage, pageSize = 10) {
        return callApiAdmin(`order/list?page=${currentPage}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`order/list?page=${currentPage}&pageSize=${pageSize}`);
    },
    update(id, form) {
        return callApiAdmin(`order/update/${id}?token=${getToken()}`, 'post', form);
        // return callApiAdmin(`order/update/${id}`, 'post', form);
    },
    seach(pageSize, keyword) {
        return callApiAdmin(`order/seach?keyword=${keyword}&pageSize=${pageSize}&token=${getToken()}`);
        // return callApiAdmin(`order/seach?keyword=${keyword}&pageSize=${pageSize}`);
    },
    export(month) {
        return callApiAdmin(`order/export?month=${month}&token=${getToken()}`);
        // return callApiAdmin(`order/export?month=${month}`);
    }
}

export const apiDashBoard = {
    count() {
        return callApiAdmin(`dashboard/count?token=${getToken()}`);
        // return callApiAdmin(`dashboard/count`);
    },
    chart() {
        return callApiAdmin(`dashboard/chart?token=${getToken()}`);
        // return callApiAdmin(`dashboard/chart`);
    }
}