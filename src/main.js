import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

import {auth} from './api/database'


auth.onAuthStateChanged(user => {
  
  if(user){
    // console.log(user)
    const detectoUsuario = {
      email: user.email,
      uid: user.uid
    }
    store.dispatch('detectarUsuario', detectoUsuario)
    store.dispatch('getDatosUsuario')
    store.dispatch('getListaPreguntas')

  }else{
    // console.log(user)
    store.dispatch('detectarUsuario', user)
  }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

})
