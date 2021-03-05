import Vue from 'vue'
import ElementUI from 'element-ui'
import { UTable, UTableColumn } from 'umy-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Alert from './components/iview/ialert/alert.js'

Vue.use(ElementUI)
Vue.use(UTable)
Vue.use(UTableColumn)

Vue.config.productionTip = false
Vue.prototype.$Alert = Alert

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
