import Vue from 'vue'
import App from './App.vue'
import router from './router'
import plugins from './plugins'

//插件统一写在/plugins目录下面
plugins({app:App,router})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
