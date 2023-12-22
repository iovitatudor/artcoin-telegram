import Vuex from 'vuex';

import config from '@/store/config';
import users from "@/store/users";
import sellers from "@/store/sellers";
import categories from "@/store/categories";
import products from "@/store/products";
import orders from "@/store/orders";

export default new Vuex.Store({
    modules: {
        config,
        users,
        sellers,
        categories,
        products,
        orders,
    },
});
