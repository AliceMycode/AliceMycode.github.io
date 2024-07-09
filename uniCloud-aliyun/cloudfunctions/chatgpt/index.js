'use strict'
const APPID = '6395d2b1'
const APISecret = 'NTBkM2NmODljNDhhYzI4NjU2Njk2ZmQ0'
const APIKey = 'b26f9450cf90f1a76c24a8f1d5d42820'
const cryptoJS = require('crypto-js')
const base64 = require('base-64')
// 云函数入口函数
exports.main = async (event, context) => {
  let url = 'wss://spark-api.xf-yun.com/v4.0/chat'
  const host = 'spark-api.xf-yun.com'
  const apiKeyName = 'api_key'
  const date = new Date().toGMTString()
  const algorithm = 'hmac-sha256'
  const headers = 'host date request-line'
  const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v4.0/chat HTTP/1.1`
  const signatureSha = cryptoJS.HmacSHA256(signatureOrigin, APISecret)
  const signature = cryptoJS.enc.Base64.stringify(signatureSha)
  const authorizationOrigin = `${apiKeyName}="${APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
  const authorization = base64.encode(authorizationOrigin)
  url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`
  return { APPID, url } // 主要是返回地址
}
