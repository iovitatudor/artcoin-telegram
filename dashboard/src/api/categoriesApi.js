import {DefaultApiInstance} from '@/api';

export const CategoriesApi = {
    getAll() {
        const url = `/api/categories`;
        return DefaultApiInstance.get(url);
    },

    getAllChildren() {
        const url = `/api/categories/children`;
        return DefaultApiInstance.get(url);
    },

    getById(id) {
        const url = `/api/categories/${id}`;
        return DefaultApiInstance.get(url);
    },

    create(data) {
        const url = `/api/categories`;
        return DefaultApiInstance.post(url, data);
    },

    update(id, data) {
        const url = `/api/categories/${id}`;
        return DefaultApiInstance.patch(url, data);
    },

    delete(id) {
        const url = `/api/categories/${id}`;
        return DefaultApiInstance.delete(url);
    }
};