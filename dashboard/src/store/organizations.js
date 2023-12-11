import {OrganizationsApi} from "@/api/organizationsApi";

export default {
    namespaced: true,
    state: {
        organizations: [],
        alert: {
            message: null,
            status: null,
        }
    },
    getters: {
        getOrganizations: (state) => state.organizations,
        getAlert: (state) => state.alert,
    },
    mutations: {
        setOrganizations(state, organizations) {
            state.organizations = organizations;
        },
        setAlert(state, alert) {
            state.alert = alert;
        }
    },
    actions: {
        async addOrganization({commit}, data) {
            try {
                await OrganizationsApi.create(data);
                const response = await OrganizationsApi.getAll();
                commit('setOrganizations', response.data);
                commit('setAlert', {message: 'Organization has been successfully added!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchOrganizationById({commit}, id) {
            try {
                return await OrganizationsApi.getById(id);
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchOrganizations({commit}) {
            try {
                const response = await OrganizationsApi.getAll();
                return commit('setOrganizations', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async editOrganization({commit}, data) {
            try {
                await OrganizationsApi.update(data.id, data.formData);
                const response = await OrganizationsApi.getAll();
                commit('setOrganizations', response.data);
                commit('setAlert', {message: 'Organization has been successfully edited!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async removeOrganization({commit}, id) {
            if (confirm('Are you sure you want to delete this organization?')) {
                try {
                    await OrganizationsApi.delete(id);
                    const response = await OrganizationsApi.getAll();
                    return commit('setOrganizations', response.data);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
}