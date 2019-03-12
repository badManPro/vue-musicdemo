import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
    loading: require('common/image/logo.png')
})

new Vue({
  el: '#app',
  render: h => h(App),
    router
}).$mount('#app')
