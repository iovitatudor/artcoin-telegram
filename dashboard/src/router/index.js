import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue"

import Signin from "../views/Signin.vue";
import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";
import Users from "@/views/Users/Users.vue";
import Sellers from "@/views/Sellers/Sellers.vue";
import UserEdit from "@/views/Users/UserEdit.vue";
import SellersEdit from "@/views/Sellers/SellersEdit.vue";
import Organizations from "@/views/Organizations/Organizations.vue";
import Products from "@/views/Products/Products.vue";
import ProductEdit from "@/views/Products/ProductEdit.vue";
import OrganizationsEdit from "@/views/Organizations/OrganizationsEdit.vue";

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
        path: "/dashboard/organizations",
        name: "Organizations",
        component: Organizations,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/organizations/edit/:id",
        name: "Edit Organizations",
        component: OrganizationsEdit,
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
