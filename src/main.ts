import Vue from 'vue'
import App from './App.vue'
import i18n from '@/i18n'
import uView from 'uview-ui'
import store from '@/store'
Vue.use(uView)

Vue.config.productionTip = false
Vue.prototype.$store = store

new App({
    store,
    i18n
}).$mount()
