import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'
// eslint-disable-next-line
import {userKey} from '@/global'

Vue.use(VueRouter)

// eslint-disable-next-line no-unused-vars
const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: {requiresAdmin: true}
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
},{
    name:'articleById',
    path: '/articles/:id',
    component: ArticleById
},{
    name: 'Auth',
    path: '/auth',
    component: Auth 
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    // eslint-disable-next-line
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)){
        const user = JSON.parse(json)
        user && user.admin ? next() :next({path: '/'})
    } else {
        next()
    }
})

export default router