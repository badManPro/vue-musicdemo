import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
    loading: require('common/image/logo.png')
})

new Vue({
  el: '#app',
  render: h => h(App),
    store,
    router
}).$mount('#app')
