import {FormDataApiInstance, DefaultApiInstance} from '@/api';

export const UsersApi = {
    getAll() {
        const url = `/api/users`;
        return DefaultApiInstance.get(url);
    },

    getById(id) {
        const url = `/api/users/${id}`;
        return DefaultApiInstance.get(url);
    },

    create(data) {
        const url = `/api/users`;
        return FormDataApiInstance.post(url, data);
    },

    addPublicKey(data) {
        const url = `/api/users/public-key`;
        return DefaultApiInstance.post(url, data);
    },

    update(id, data) {
        console.log(id, data);
        const url = `/api/users/${id}`;
        return FormDataApiInstance.patch(url, data);
    },

    delete(id) {
        const url = `/api/users/${id}`;
        return DefaultApiInstance.delete(url);
    }
};