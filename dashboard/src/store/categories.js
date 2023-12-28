import {CategoriesApi} from "@/api/categoriesApi";

export default {
    namespaced: true,
    state: {
        categories: [],
        childrenCategories: [],
        alert: {
            message: null,
            status: null,
        }
    },
    getters: {
        getCategories: (state) => state.categories,
        getChildrenCategories: (state) => state.childrenCategories,
        getAlert: (state) => state.alert,
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        setChildrenCategories(state, childrenCategories) {
            state.childrenCategories = childrenCategories;
        },
        setAlert(state, alert) {
            state.alert = alert;
        }
    },
    actions: {
        async addCategory({commit}, data) {
            try {
                await CategoriesApi.create(data);
                const response = await CategoriesApi.getAll();
                commit('setCategories', response.data);
                commit('setAlert', {message: 'CategoryPage has been successfully added!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchCategoryById({commit}, id) {
            try {
                return await CategoriesApi.getById(id);
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchCategories({commit}) {
            try {
                const response = await CategoriesApi.getAll();
                return commit('setCategories', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async fetchChildren({commit}) {
            try {
                const response = await CategoriesApi.getAllChildren();
                return commit('setChildrenCategories', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async editCategory({commit}, data) {
            try {
                await CategoriesApi.update(data.id, data.formData);
                const response = await CategoriesApi.getAll();
                commit('setCategories', response.data);
                commit('setAlert', {message: 'CategoryPage has been successfully edited!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async removeCategory({commit}, id) {
            if (confirm('Are you sure you want to delete this category?')) {
                try {
                    await CategoriesApi.delete(id);
                    const response = await CategoriesApi.getAll();
                    return commit('setCategories', response.data);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
}