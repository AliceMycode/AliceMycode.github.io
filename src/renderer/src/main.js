import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Utils from '@/utils/Utils'
import Verify from '@/utils/Verify'
import Request from '@/utils/Request'
import Message from './utils/Message'
import Api from './utils/Api'

import App from './App.vue'
import router from '@/router'
import '@/assets/cust-elementplus.scss'
import '@/assets/base.scss'
import '@/assets/icon/iconfont.js'
import '@/assets/icon/iconfont.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)

app.config.globalProperties.Utils = Utils
app.config.globalProperties.Verify = Verify
app.config.globalProperties.Request = Request
app.config.globalProperties.Message = Message
app.config.globalProperties.Api = Api

app.mount('#app')
