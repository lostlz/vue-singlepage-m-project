import Vue from 'vue'
import App from './App.vue'
import router from './router'
import plugins from './plugins'


plugins({app:App,router})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
