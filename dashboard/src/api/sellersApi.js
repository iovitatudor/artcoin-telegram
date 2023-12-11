import {FormDataApiInstance, DefaultApiInstance} from '@/api';

export const SellersApi = {
    getAll() {
        const url = `/api/sellers`;
        return DefaultApiInstance.get(url);
    },

    getById(id) {
        const url = `/api/sellers/${id}`;
        return DefaultApiInstance.get(url);
    },

    create(data) {
        const url = `/api/sellers`;
        return FormDataApiInstance.post(url, data);
    },

    update(id, data) {
        const url = `/api/sellers/${id}`;
        return FormDataApiInstance.patch(url, data);
    },

    delete(id) {
        const url = `/api/sellers/${id}`;
        return DefaultApiInstance.delete(url);
    }
};