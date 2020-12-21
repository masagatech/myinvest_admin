import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Master from '../views/Master.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/Login.vue'
import masterRoutes from './master'
import settingsRoutes from './settings'
import GlobalService from '@/service/gloabl-service'
import UserModel from '@/model/user'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      code: 'login'
    },
    component: Login
  },
  {
    path: '/',
    component: Master,
    meta: {
      code: ''
    },
    children: masterRoutes
  },
  {
    path: '/settings',
    component: Settings,
    meta: {
      code: ''
    },
    children: settingsRoutes
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      code: 'abt'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // CHECK IF ADMINONLY EXISTS
  debugger
  const user: UserModel = GlobalService.getUser()
  if (user.email && user.email != "") {
    next();
  } else if(to.meta.code != "login"){
    router.push({ path: '/login' })
  }else{
    next()
  }

});

export default router
