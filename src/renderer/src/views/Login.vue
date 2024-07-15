<template>
  <div class="login-panel">
    <div class="title drag">EasyChat</div>
    <div class="login-form">
      <div class="error-msg">{{ errorMsg }}</div>
      <el-form ref="formDataRef" :model="formData" label-width="0px" @submit.prevent>
        <el-form-item>
          <el-input
            v-model.trim="formData.email"
            max-length="30"
            size="large"
            clearable
            placeholder="请输入邮箱"
          >
            <template #prefix>
              <span class="iconfont icon-email"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!isLogin">
          <el-input
            v-model.trim="formData.nickName"
            max-length="15"
            size="large"
            clearable
            placeholder="请输入昵称"
            @focus="clearVerify"
          >
            <template #prefix>
              <span class="iconfont icon-user-nick"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model.trim="formData.password"
            size="large"
            show-password
            clearable
            placeholder="请输入密码"
            @focus="clearVerify"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!isLogin">
          <el-input
            v-model.trim="formData.rePassword"
            type="password"
            size="large"
            placeholder="请再次输入密码"
            show-password
            @focus="clearVerify"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model.trim="formData.checkcode"
            size="large"
            clearable
            placeholder="请输入验证码"
            @focus="clearVerify"
          >
            <template #prefix>
              <span class="iconfont icon-checkcode"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submit">{{
            isLogin ? '登录' : '注册'
          }}</el-button>
        </el-form-item>
        <div class="bottom-link" @click="changeOpType">
          <span class="a-link">{{ isLogin ? '没有账号?' : '已有账号?' }}</span>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
const formData = ref({})
const formDataRef = ref()
const isLogin = ref(true)
const changeOpType = () => {
  window.ipcRenderer.send('loginOrRegister', !isLogin.value)
  isLogin.value = !isLogin.value
  nextTick(() => {
    formDataRef.value.resetFields()
    formData.value = {}
    clearVerify()
  })
}

// 登录注册表单校验
const submit = () => {
  clearVerify()
  if (!checkValue('checkEmail', formData.value.email, '请输入正确的邮箱')) {
    return false
  }
  if (!isLogin.value && !checkValue(null, formData.value.nickName, '请输入昵称')) {
    return false
  }
  if (
    !checkValue('checkPassword', formData.value.password, '密码只能是数字、字母、特殊字符8~18位')
  ) {
    return false
  }
  if (!isLogin.value && formData.value.password != formData.value.rePassword) {
    errorMsg.value = '两次输入的密码不一致'
    return false
  }
  if (!checkValue(null, formData.value.checkcode, '请输入验证码')) {
    return false
  }
}

const errorMsg = ref()
const checkValue = (type, value, msg) => {
  if (proxy.Utils.isEmpty(value)) {
    errorMsg.value = msg
    return false
  }
  if (type && !proxy.Verify[type](value)) {
    errorMsg.value = msg
    return false
  }
  return true
}
const clearVerify = () => {
  errorMsg.value = null
}
</script>
<style lang="scss" scoped>
.email-select {
  width: 250px;
}
.loading-panel {
  height: calc(100vh - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 300px;
  }
}
.login-panel {
  background: ■#fff;
  border-radius: 3px;
  border: 1px solid #ddd;
  .title {
    height: 30px;
    padding: 5px 0px 0px 10px;
  }
  .login-form {
    padding: 0px 15px 29px 15px;
    :deep(.el-input__wrapper) {
      box-shadow: none;
      border-radius: none;
    }
    .el-form-item {
      border-bottom: 1px solid #ddd;
    }
    .email-panel {
      align-items: center;
      width: 100%;
      display: flex;
      .input {
        flex: 1;
      }
      .icon-down {
        margin-left: 3px;
        width: 16px;
        cursor: pointer;
        border: none;
      }
    }
    .error-msg {
      line-height: 30px;
      height: 30px;
      color: #fb7373;
    }
    .check-code-panel {
      display: flex;
      .check-code {
        cursor: pointer;
        width: 120px;
        margin-left: 5px;
      }
    }
    .login-btn {
      margin-top: 20px;
      width: 100%;
      background: #07c160;
      height: 36px;
      font-size: 16px;
    }
    .bottom-link {
      text-align: right;
    }
  }
}
</style>
