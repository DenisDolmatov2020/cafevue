import { createRouter, createWebHistory } from 'vue-router';
import Menu from '@/components/Menu.vue';
import Admin from '@/components/Admin.vue';

const routes = [
    {
        path: '/',
        name: 'menu',
        component: Menu,
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
