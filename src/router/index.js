import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue';
import RegisterView from '../views/Register.vue';
import { useUserStore } from '../stores/user.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {  requireAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requireAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requireAuth: false }
    }
  ]
})


router.beforeEach((to, from, next) => {
  const store = new useUserStore();
  const token = store.token;
 
  if (to.meta.requireAuth && token == null) {
    next({ name: 'login' })
  } else {
    next()
  } 
})


router.beforeEach((to, from, next) => {
  const store = new useUserStore();
  const token = store.token;

  if (!to.meta.requireAuth && token != null) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
