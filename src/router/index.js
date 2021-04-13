import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthStore from '../store-cold/auth/index.js'

// Routes
import Museums from '../views/Museums.vue'
import Home from '../views/Home.vue'
import Usuaris from '../views/Usuaris.vue'
import AddMuseum from '../views/AddMuseum.vue'
import Login from '../views/Login/Login.vue'
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

const authenticate = true;

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: authenticate ? ifAuthenticated : true,
  },
  {
    path: '/usuaris',
    name: 'Usuaris',
    component: Usuaris,
    beforeEnter: authenticate ? ifAuthenticated : true,
  },
  {
    path: '/museums',
    name: 'Museums',
    component: Museums,
    beforeEnter: authenticate ? ifAuthenticated : true,
  },
  {
    path: '/museums/add',
    name: 'AddMuseum',
    component: AddMuseum,
    beforeEnter: authenticate ? ifAuthenticated : true,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
