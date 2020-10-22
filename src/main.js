import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import './assets/css/global.css'
import './plugins/element.js'
import './assets/css/style.scss'
import inputForm from '@/components/input/from.vue'
import tablePagination from '@/components/tablePagination.vue'
import tableData from '@/components/table/tableData.vue'
import Dialog from '@/components/dialog/Dialog.vue'
Vue.component('Dialog', Dialog)
// tableData
Vue.component('tableData', tableData)
Vue.component('input-form', inputForm)
Vue.component('table-pagination', tablePagination)

// table-pagination
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
