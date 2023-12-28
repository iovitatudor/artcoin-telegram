import {SellersApi} from "@/api/sellersApi";

export default {
    namespaced: true,
    state: {
        sellers: [],
        alert: {
            message: null,
            status: null,
        }
    },
    getters: {
        getSellers: (state) => state.sellers,
        getAlert: (state) => state.alert,
    },
    mutations: {
        setSellers(state, sellers) {
            state.sellers = sellers;
        },
        setAlert(state, alert) {
            state.alert = alert;
        }
    },
    actions: {
        async addSeller({commit}, data) {
            try {
                await SellersApi.create(data);
                const response = await SellersApi.getAll();
                commit('setSellers', response.data);
                commit('setAlert', {message: 'Seller has been successfully added!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchSellerById({commit}, id) {
            try {
                return await SellersApi.getById(id);
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchSellers({commit}) {
            try {
                const response = await SellersApi.getAll();
                return commit('setSellers', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async editSeller({commit}, data) {
            try {
                await SellersApi.update(data.id, data.formData);
                const response = await SellersApi.getAll();
                commit('setSellers', response.data);
                commit('setAlert', {message: 'Seller has been successfully edited!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async removeSeller({commit}, id) {
            if (confirm('Are you sure you want to delete this seller?')) {
                try {
                    await SellersApi.delete(id);
                    const response = await SellersApi.getAll();
                    return commit('setSellers', response.data);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
}