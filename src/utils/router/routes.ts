import { createRouter, createWebHistory } from 'vue-router';
import Products from '../../views/products/Products.vue';
import History from '../../views/history/History.vue';
import Home from '../../views/home/Home.vue';

// Definição das rotas com tipagem RouteRecordRaw
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/history',
    name: 'History',
    component: History
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;