import Vuex from 'vuex';

import config from '@/store/config';
import users from "@/store/users";
import sellers from "@/store/sellers";
import organizations from "@/store/organizations";
import products from "@/store/products";

export default new Vuex.Store({
    modules: {
        config,
        users,
        sellers,
        organizations,
        products,
    },
});
