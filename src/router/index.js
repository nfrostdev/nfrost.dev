import {createRouter, createWebHistory} from 'vue-router'
import Portfolio from '../views/Portfolio.vue'

const routes = [
    {
        path: '/',
        name: 'Portfolio',
        component: Portfolio
    },
    {
        path: '/:uid',
        name: 'Project',
        component: () => import('../views/Project.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
