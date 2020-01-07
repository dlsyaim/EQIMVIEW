import axios from 'axios'
import store from '@/store'
import QS from 'qs'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { sha256 } from 'js-sha256'
import { isJSONString} from "./index"
import { encrypt, decrypt } from './aes'
//import router from '../router'
// import router from '../router'

const service = axios.create({
  timeout: 500000,
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

/**
 * 通用情况下，会采用application/x-www-form-urlencoded;charset=UTF-8 作为请求头;
 * 如果后台controller中，参数有RequestBody注解，则前端参数必须先JSON.stringify();
 * 后台禁止参数是简单JAVA对象的情况下带@RequestBody注解
 */
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    const obj = config.data;
    if (obj) {
      //@RequestBody
      if (typeof (obj) == 'string') {
        var jsonString = isJSONString(obj);
        if (!jsonString) {   
          return Promise.reject("参数不是JSON格式，无法解析")
        }
        config.headers['Content-Type'] = 'application/json; charset=UTF-8'
        if (store.getters.hash === true && !!store.state.security.aes) {
          config.headers['request-hash'] = sha256.sha256(obj)
          config.data = encrypt(obj)
        }
      }else {
        if (store.getters.hash === true && !!store.state.security.aes) {
          config.headers['Content-Type'] = 'application/json; charset=UTF-8'
          const str = JSON.stringify(obj);
          config.data = encrypt(str)
          config.headers['request-hash'] = sha256.sha256(str)
        } else {
          config.data = QS.stringify(obj, { arrayFormat: 'repeat' });
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' 
        }
      }  
    }
    return config
  },
  error => { Promise.reject(error) }
)

service.interceptors.response.use(
  response => {
    const responseHash = response.headers["response-hash"];
    let res = response.data
    if (responseHash&&store.getters.hash === true && store.state.security.aes) {
      const obj = decrypt(res);
      if (responseHash === sha256.sha256(obj)) {
        res = JSON.parse(obj)
        response.data = res ;
      } else return Promise.reject("得到的结果与期望的不一致")
    }
    const authorization = response.headers['authorization'];
    if(authorization)
      store.dispatch("RefreshToken",authorization)
    if (res.success !== true) {
      Message({
        message: res.message || "请求失败、请联系管理员", type: 'error', duration: 5 * 1000
      })
      if (res.code == '2018020801'&&response.config.url.substring(response.config.baseURL.length)!="/logout") {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {          
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 需要重新实例化vue-router对象 避免bug
          })         
        })
      }else if(res.code == '2018020801'&&response.config.url.substring(response.config.baseURL.length)=="/logout"){
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 需要重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject(res)
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    if(error.config.url == "/logout"){
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 需要重新实例化vue-router对象 避免bug
      })
    }else   Message({
      message: error.message||error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error || "请求失败、请联系管理员")
  }
)

export default service