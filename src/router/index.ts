/*
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-09-21 00:41:55
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/router/index.ts
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useLoadingStore } from "@/stores"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        alias: '/home',
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: {
            title: "首页",
        },
    },
    {
        path: "/tech",
        name: "Tech",
        component: () => import("@/views/Tech.vue"),
        meta: {
            title: "技术",
        },
    },
    {
        path: "/life",
        name: "Life",
        component: () => import("@/views/Life.vue"),
        meta: {
            title: "生活",
        },
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/views/About.vue"),
        meta: {
            title: "关于我",
        },
    },
    {
        path: "/article",
        name: "Article",
        component: () => import("@/views/Article.vue"),
        meta: {
            title: "文章",
        },
    },
    {
        path: "/article/create",
        name: "CreateArticle",
        component: () => import("@/views/Article.vue"),
        meta: {
            title: "新增文章",
        },
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
})


router.beforeEach((to, from, next) => { useLoadingStore().setSpinning(true); next() })
router.afterEach(() => useLoadingStore().setSpinning(false))

export default router
