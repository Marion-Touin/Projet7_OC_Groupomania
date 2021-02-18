import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use (BootstrapVue) // Installer éventuellement le plugin de composants d'icônes BootstrapVue 
Vue.use (IconsPlugin)

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY à hh:mm')
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
