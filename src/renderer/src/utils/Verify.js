const regs = {
  email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  password: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*_]{8,}$/
}

const checkPassword = (value) => {
  return regs.password.test(value)
}

const checkEmail = (value) => {
  return regs.email.test(value)
}

export default {
  checkPassword,
  checkEmail
}
