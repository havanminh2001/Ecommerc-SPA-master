import { callApi, callApiDemo } from '../utils/callApi';
import { ACCESS_TOKEN } from '../settings/configUrl';

const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
}

export const apiHome = {
    fetchCategories() {
        return callApi('api/categories');
    },
    fetchProducts() {
        return callApi(`api/product`);
    },
    scrollProducts(page) {
        return callApi(`api/product?page=${page}`);
    },
    fetchProductDiscount() {
        return callApi(`api/product/promotion`);
    }
}

export const apiCart = {
    fetchCart(id) {
        return callApi(`api/cart/list?query=${id}`, 'get');
    },
    createCart(data) {
        return callApi(`api/cart/create`, 'post', data);
    },
    updateCart(id, data) {
        return callApi(`api/cart/update/${id}`, 'post', data);
    },
    deleteCart(id) {
        return callApi(`api/cart/delete/${id}`, 'get');
    }
}

export const apiRegister = {
    register(data) {
        return callApi(`api/register/create`, 'post', data);
    }
}

export const apiRegisterDemo = {
    register(data) {
        return callApiDemo(`api/auth/signup`, data);
    }
}



export const apiLogin = {
    login(data) {
        return callApi(`api/login`, 'post', data);
    },
    logout() {
        return callApiDemo(`api/logout?token=${getToken()}`);
    },

    refreshToken() {
        return callApi(`api/token/refresh?token=${getToken()}`);
    },
    loginWithFacebook() {
        return callApi(`api/redirect/facebook`);
    },
    redirectFacebook() {
        return callApi(`api/redirect/facebook`);
    },
    getInfo(token) {
        return callApi(`api/info?token=${token}`);
    },
    loginDemo(data) {
        return callApiDemo(`api/auth/signin`, 'post', data);
    }
}

export const apiProductDetail = {
    getProduct(slug) {
        return callApi(`api/detail/${slug}`);
    },
    getProductPagination(slug, page) {
        return callApi(`api/detail/${slug}?page=${page}`);
    },
    createReview(data) {
        return callApi(`api/detail/review/create`, 'post', data);
    }
}

export const apiProduct = {
    fetch(slug) {
        return callApi(`api/product/${slug}`);
    },
    fetchPagination(slug, page) {
        return callApi(`api/product/${slug}?page=${page}`);
    },
    fetchProductWithCategories(id) {
        return callApi(`api/categories/${id}`);
    },
    paginationProductWithCategories(id, page) {
        return callApi(`api/categories/${id}?page=${page}`);
    }
}

export const apiPurchase = {
    updateInfo(id, form) {
        return callApi(`api/info/update/${id}?token=${getToken()}`, 'post', form);
    },
    changePassword(id, form) {
        return callApi(`api/password/update/${id}?token=${getToken()}`, 'post', form);
    },
    getAllPurchase(id) {
        return callApi(`api/user/${id}/purchase/all?token=${getToken()}`, 'get');
    },
    getPurchaseForStatus(id, status) {
        return callApi(`api/user/${id}/purchase?type=${status}&token=${getToken()}`, 'get');
    },
    paginationAll(id, page) {
        return callApi(`api/user/${id}/purchase/all?page=${page}&token=${getToken()}`, 'get');
    },
    paginationPurchaseStatus(id, status, page) {
        return callApi(`api/user/${id}/purchase?page=${page}&type=${status}&token=${getToken()}`, 'get');
    },
    deletePurchase(id, form) {
        return callApi(`api/purchase/update/${id}?token=${getToken()}`, 'post', form);
    },
    fetchPurchaseTrash(id) {
        return callApi(`api/user/${id}/purchase/trash?token=${getToken()}`, 'get');
    }
}