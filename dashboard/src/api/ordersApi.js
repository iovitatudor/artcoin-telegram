import {FormDataApiInstance, DefaultApiInstance} from '@/api';

export const OrdersApi = {
    getAll() {
        const url = `/api/orders`;
        return DefaultApiInstance.get(url);
    },

    getById(id) {
        const url = `/api/orders/${id}`;
        return DefaultApiInstance.get(url);
    },

    create(data) {
        const url = `/api/orders`;
        return FormDataApiInstance.post(url, data);
    },

    update(id, data) {
        const url = `/api/orders/${id}`;
        return FormDataApiInstance.patch(url, data);
    },

    delete(id) {
        const url = `/api/orders/${id}`;
        return DefaultApiInstance.delete(url);
    }
};