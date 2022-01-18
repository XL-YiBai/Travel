import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 实现异步组件按需引入
export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/Home')
  }, {
    path: '/city',
    name: 'City',
    component: () => import('@/pages/city/City')
  }, {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/pages/detail/Detail.vue')
  }],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
