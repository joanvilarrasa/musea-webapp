import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthStore from '../store-cold/auth/index.js'

// Routes
import Museums from '../views/Museums.vue'
import Home from '../views/Home.vue'
import Usuaris from '../views/Usuaris.vue'
import AddMuseum from '../views/AddMuseum.vue'
import Login from '../views/Login/Login.vue'
import Expositions from '../views/Expositions.vue'
import Obres from '../views/Obres.vue'
import AddExpo from '../views/AddExposition.vue'
import AddObra from '../views/AddObra.vue'
import ObraEdit from '../views/ObraEdit.vue'
Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
  if (AuthStore.isAuthenticated()) {
    next()
    return
  }
  AuthStore.clearAuthData();
  next('/login');
  next()
  return
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/usuaris',
    name: 'Usuaris',
    component: Usuaris,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums',
    name: 'Museums',
    component: Museums,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/add',
    name: 'AddMuseum',
    component: AddMuseum,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/:id_museu',
    name: 'expositions',
    component: Expositions,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/:id_museu/:id_exposition',
    name: 'obres',
    component: Obres,
    beforeEnter: ifAuthenticated,
  },
  {
  path: '/museums/:id_museu/add',
  name: 'AddExpo',
  component: AddExpo,
  beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/:id_museu/:id_exposition/add',
    name: 'AddObra',
    component: AddObra,
    beforeEnter: ifAuthenticated,
    },
    {
      path: '/museums/:id_museu/:id_exposition/:id_obra/edit',
      name: 'ObraEdit',
      component: ObraEdit,
      beforeEnter: ifAuthenticated,
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
