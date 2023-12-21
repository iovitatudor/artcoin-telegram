import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue"

import Signin from "../views/Signin.vue";
import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";
import Users from "@/views/Users/Users.vue";
import UserEdit from "@/views/Users/UserEdit.vue";
import Sellers from "@/views/Sellers/Sellers.vue";
import SellersEdit from "@/views/Sellers/SellersEdit.vue";
import Categories from "@/views/Categories/Categories.vue";
import CategoriesEdit from "@/views/Categories/CategoriesEdit.vue";
import Products from "@/views/Products/Products.vue";
import ProductEdit from "@/views/Products/ProductEdit.vue";

const routes = [
    {
        path: "/",
        name: "Signin",
        component: Signin,
        beforeEnter: GuestGuard,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/users",
        name: "Users",
        component: Users,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/users/edit/:id",
        name: "Edit User",
        component: UserEdit,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/sellers",
        name: "Specialists",
        component: Sellers,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/sellers/edit/:id",
        name: "Edit Specialist",
        component: SellersEdit,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/categories",
        name: "Categories",
        component: Categories,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/categories/edit/:id",
        name: "Edit Category",
        component: CategoriesEdit,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/products-services",
        name: "Products/Services",
        component: Products,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/products-services/edit/:id",
        name: "Edit Products/Services",
        component: ProductEdit,
        beforeEnter: AuthGuard,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
});

export default router;
