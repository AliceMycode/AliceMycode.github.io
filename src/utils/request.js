import axios from 'axios'
import Qs from 'qs'
import { Message, MessageBox } from 'element-ui'

const serve = axios.create({
  timeout: 10000
})

serve.interceptors.request.use(
  config => {
    if (config.type === 'json') {
      config.headers['Content-Type'] = 'application/json'
    } else if (config.type === 'formData') {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = Qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)


serve.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code == 200 || res.code == 0 || res.status == 200) {
      return response.data
    } else if (res.code == 401 || res.code == 202) {
      MessageBox.confirm('登录信息已失效，请重新登录', '登录失效', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        store.dispatch('Logout')
      })
    } else {

    }
  },
  error => {
    if (error.response.data.status === 500) {
      Message({ message: '请求服务器 ' + error.response.data.path + '接口500错误', type: 'error', duration: 3000, })
    } else if (error.response.status === 500) {
      Message({ message: '请求服务器异常', type: 'error', duration: 3000, })
    } else {
      Message({ message: error.response.data.message, type: 'error', duration: 3000, })
    }
    return Promise.reject(error)
  }
)

export default serve


