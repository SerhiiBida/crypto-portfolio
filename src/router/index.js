import {createRouter, createWebHistory} from "vue-router";

import {useUserStore} from "@/stores/auth.js";
import {pinia} from "@/main.js";
import AuthFirebase from "@/servises/auth.js";
import {usePortfoliosStore} from "@/stores/portfolios.js";


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
            component: () => import("@/views/customer/auth/LoginView.vue"),
        },
        {
            path: "/user/register",
            name: "register",
            component: () => import("@/views/customer/auth/RegisterView.vue"),
        },
        {
            path: "/user/portfolios-management",
            name: "portfolios-management",
            component: () => import("@/views/customer/portfolio/PortfoliosManagementView.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/user/portfolio/:id",
            name: "portfolio",
            component: () => import("@/views/customer/portfolio/PortfolioView.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import("@/views/customer/errors/NotFoundView.vue"),
        },
    ]
});

router.beforeEach(async (to, from) => {
    const userStore = useUserStore(pinia);
    const portfolioStore = usePortfoliosStore(pinia);

    // Задержка для первой проверки авторизации
    if (!userStore.getFirstCheckPassed) {
        const auth = new AuthFirebase();

        await auth.waitAuthorizationData(100);
    }

    // Не авторизован
    if (to.meta?.requiresAuth && !userStore.isLoggedIn) {
        return {
            name: "not-found"
        };
    }

    // Авторизован
    if ((to.name === "registration" || to.name === "login") && userStore.isLoggedIn) {
        return {
            name: "portfolios-management"
        }
    }

    // Если не админ
    if (to.meta?.isAdminPage && !userStore.isAdmin) {
        return {
            name: "not-found"
        };
    }

    // Принадлежит ли этот портфель пользователю
    if (to.name === "portfolio" && !portfolioStore.includesId(to.params.id)) {
        return {
            name: "not-found"
        };
    }
});

export default router;
