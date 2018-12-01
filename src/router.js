import Vue from 'vue'
import Router from 'vue-router'
import index from './pages/index.vue'
// import mine from './pages/mine.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/find/',
      name: 'find',
      //延迟加载路由
      component: () => import(/* webpackChunkName: "about" */ './pages/find.vue')
    },
    {
      path: '/mine/',
      name: 'mine',
      //延迟加载路由
      component: () => import(/* webpackChunkName: "about" */ './pages/mine.vue')
    }
  ]
})
