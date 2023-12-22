import {ProductsApi} from "@/api/productsApi";

export default {
    namespaced: true,
    state: {
        products: [],
        alert: {
            message: null,
            status: null,
        },
    },
    getters: {
        getProducts: (state) => state.products,
        getAlert: (state) => state.alert,
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        setAlert(state, alert) {
            state.alert = alert;
        },
    },
    actions: {
        async addProduct({commit}, data) {
            try {
                await ProductsApi.create(data);
                const response = await ProductsApi.getAll();
                commit('setProducts', response.data);
                commit('setAlert', {message: 'Product has been successfully added!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchProductById({commit}, id) {
            try {
                return await ProductsApi.getById(id);
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchProducts({commit}) {
            try {
                const response = await ProductsApi.getAll();
                return commit('setProducts', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async fetchProductsByCategory({commit}, id) {
            try {
                return await ProductsApi.getAllByCategory(id);
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async editProduct({commit}, data) {
            try {
                await ProductsApi.update(data.id, data.formData);
                const response = await ProductsApi.getAll();
                commit('setProducts', response.data);
                commit('setAlert', {message: 'Product has been successfully edited!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async removeProduct({commit}, id) {
            if (confirm('Are you sure you want to delete this product?')) {
                try {
                    await ProductsApi.delete(id);
                    commit('setAlert', {message: 'Product has been successfully deleted!', status: 'success'});
                    const response = await ProductsApi.getAll();
                    return commit('setProducts', response.data);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
}