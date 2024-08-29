import { ipcMain } from 'electron'
import store from './store'
const onLoginOrRegister = (callback) => {
  ipcMain.on('loginOrRegister', (e, isLogin) => {
    callback(isLogin)
  })
}

const onLoginSuccess = (callback) => {
  ipcMain.on('openChat', (e, config) => {
    store.initUserId(config.userId)
    store.setUserData('token', config.token)
    callback(config)
  })
}

export { onLoginOrRegister, onLoginSuccess }
