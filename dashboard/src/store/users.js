import {UsersApi} from "@/api/usersApi";

export default {
    namespaced: true,
    state: {
        users: [],
        alert: {
            message: null,
            status: null,
        }
    },
    getters: {
        getUsers: (state) => state.users,
        getAlert: (state) => state.alert,
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setAlert(state, alert) {
            state.alert = alert;
        }
    },
    actions: {
        async addUser({commit}, data) {
            try {
                await UsersApi.create(data);
                const response = await UsersApi.getAll();
                commit('setUsers', response.data);
                commit('setAlert', {message: 'User has been successfully added!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchUserById({commit}, id) {
            try {
                return await UsersApi.getById(id);
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchUsers({commit}) {
            try {
                const response = await UsersApi.getAll();
                return commit('setUsers', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async editUser({commit}, data) {
            try {
                await UsersApi.update(data.id, data.formData);
                const response = await UsersApi.getAll();
                commit('setUsers', response.data);
                commit('setAlert', {message: 'User has been successfully edited!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async removeUser({commit}, id) {
            if (confirm('Are you sure you want to delete this user?')) {
                try {
                    await UsersApi.delete(id);
                    const response = await UsersApi.getAll();
                    return commit('setUsers', response.data);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
}