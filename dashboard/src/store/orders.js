import {OrdersApi} from "@/api/ordersApi";

export default {
    namespaced: true,
    state: {
        orders: [],
        alert: {
            message: null,
            status: null,
        }
    },
    getters: {
        getOrders: (state) => state.orders,
        getAlert: (state) => state.alert,
    },
    mutations: {
        setOrders(state, orders) {
            state.orders = orders;
        },
        setAlert(state, alert) {
            state.alert = alert;
        }
    },
    actions: {
        async addOrder({commit}, data) {
            try {
                await OrdersApi.create(data);
                const response = await OrdersApi.getAll();
                commit('setOrders', response.data);
                commit('setAlert', {message: 'Order has been successfully added!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchOrderById({commit}, id) {
            try {
                return await OrdersApi.getById(id);
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchOrders({commit}) {
            try {
                const response = await OrdersApi.getAll();
                return commit('setOrders', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async editOrder({commit}, data) {
            try {
                await OrdersApi.update(data.id, data.formData);
                const response = await OrdersApi.getAll();
                commit('setOrders', response.data);
                commit('setAlert', {message: 'Order has been successfully edited!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async removeOrder({commit}, id) {
            if (confirm('Are you sure you want to delete this Order?')) {
                try {
                    await OrdersApi.delete(id);
                    const response = await OrdersApi.getAll();
                    return commit('setOrders', response.data);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
}