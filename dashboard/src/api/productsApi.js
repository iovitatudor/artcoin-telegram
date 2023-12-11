import {DefaultApiInstance} from '@/api';

export const ProductsApi = {
    getAll() {
        const url = `/api/products`;
        return DefaultApiInstance.get(url);
    },

    getById(id) {
        const url = `/api/products/${id}`;
        return DefaultApiInstance.get(url);
    },

    create(data) {
        const url = `/api/products`;
        return DefaultApiInstance.post(url, data);
    },

    update(id, data) {
        const url = `/api/products/${id}`;
        return DefaultApiInstance.patch(url, data);
    },

    delete(id) {
        const url = `/api/products/${id}`;
        return DefaultApiInstance.delete(url);
    }
};