import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



// 引入全局样式
import '@/style/index.less'

// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


// 引入excel导出
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)




// 引入自定义指令
import '@/directives/index.js'






Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
