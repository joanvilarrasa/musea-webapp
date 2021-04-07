import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthStore from '../store-cold/auth/index'


// Routes
import Home from '../views/Home.vue'
import Usuaris from '../views/Usuaris.vue'
import Obres from '../views/Obres.vue'
Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
  if (AuthStore.isAuthenticated()) {
    next()
    return
  }
  AuthStore.clearAuthData();
  next('/login');
  return
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    //beforeEnter: ifAuthenticated,
  },
  {
    path: '/usuaris',
    name: 'Usuaris',
    component: Usuaris,
    //beforeEnter: ifAuthenticated,
  },
  {
    path: '/obres',
    name: 'Obres',
    component: Obres,
    //beforeEnter: ifAuthenticated,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: ifAuthenticated,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
