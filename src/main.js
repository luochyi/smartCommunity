import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import './assets/css/global.css'
import './plugins/element.js'
import './assets/css/style.scss'
// import inputForm from '@/components/input/from.vue'
// 上 同
import searchForm from '@/components/searchForm/index.vue'
// 分页
import tablePagination from '@/components/tablePagination.vue'
//
import tableData from '@/components/table/tableData.vue'
import VueTable from '@/components/table/index.vue'
import Dialog from '@/components/dialog/Dialog.vue'
import Drawer from '@/components/Drawer/indexs'

// import contentBox from '@/components/Drawer/contentBox.vue'
import FromCard from '@/components/Drawer/card.vue'
import VueForm from '@/components/form/VueForm'
// Vue.component('contentBox', contentBox)
// FromCard
Vue.component('FromCard', FromCard)

Vue.component('Dialog', Dialog)
Vue.component('VueForm', VueForm)
Vue.component('Drawer', Drawer)
// tableData
Vue.component('tableData', tableData)
Vue.component('VueTable', VueTable)

// Vue.component('input-form', inputForm)
Vue.component('searchForm', searchForm)
Vue.component('table-pagination', tablePagination)
// table-pagination
Vue.prototype.$baseUrl =
    'http://test.akuhotel.com:8804/IntelligentCommunity/manage/'
Vue.prototype.$ImgUrl = 'http://test.akuhotel.com:8804/static/	'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
