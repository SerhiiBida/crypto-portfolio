import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/customer/HomeView.vue")
        },
        {
            path: "/user/login",
            name: "login",
            component: () => import("@/views/customer/user/LoginView.vue"),
            meta: {
                requiredAuth: true
            }
        },
        {
            path: "/user/register",
            name: "register",
            component: () => import("@/views/customer/user/RegisterView.vue"),
            meta: {
                requiredAuth: true
            }
        },
    ]
});

export default router;
