// import Mock from 'mockjs'
// import transactionAPI from './transaction'
// // import loginAPI from './login'
// // import security from './security'

// Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
// Mock.XHR.prototype.send = function() {
//   if (this.custom.xhr) {
//     this.custom.xhr.withCredentials = this.withCredentials || false
//   }
//   this.proxy_send(...arguments)
// }

// 登录相关
// Mock.mock(/\/token/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/user\/info\.*/, 'post', loginAPI.getUserInfo)
// Mock.mock(/\/app\/security/, 'get', security.fetchSecurityKey)
// Mock.mock(/\/captcha/, 'post', loginAPI.fetchCaptcha)
// Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)