import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'



import VueMaterial from 'vue-material'
import "./assets/css/style.scss";
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default-dark.css' // This line here
import './assets/css/material-theme.css'
import 'primevue/resources/themes/md-dark-indigo/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'


Vue.use(VueMaterial)
Vue.config.productionTip = false

new Vue({
  router, 
  render: h => h(App)
}).$mount('#app')
