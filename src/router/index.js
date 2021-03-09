import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import register from '@/components/register'
import center from '@/components/center'
import about from '@/components/about'
import 'bootstrap'
import 'jquery'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        requireAuth: true // 判断是否需要登录 Degug阶段调为F
      },
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/center',
      name: 'center',
      meta: {
        requireAuth: true // 判断是否需要登录 Degug阶段调为F
      },
      component: center
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})
export default router
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (sessionStorage.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPat}})
    }
  } else {
    next()
  }
})
