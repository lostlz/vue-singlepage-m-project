import Vue from 'vue'
import Router from 'vue-router'
import index from './pages/index.vue'
import mine from './pages/mine.vue'
import find from './pages/find.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/ctrip/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/find/',
      name: 'find',
      component: find
    },
    {
      path: '/mine/',
      name: 'mine',
      component: mine
    }
  ]
})
