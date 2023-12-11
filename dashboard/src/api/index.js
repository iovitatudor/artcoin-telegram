import axios from 'axios';

const defaultConfig = {
    baseURL: process.env.VUE_APP_BACK_END_URL,
    headers: {
        'Content-Type': 'application/json',
    }
};
export const DefaultApiInstance = axios.create(defaultConfig);

const formDataApiConfig = {
    baseURL: process.env.VUE_APP_BACK_END_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
};
export const FormDataApiInstance = axios.create(formDataApiConfig);