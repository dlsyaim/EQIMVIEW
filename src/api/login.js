import request from '@/utils/request'

export function fetchCaptcha(){
  return request({
    url: '/captcha',
    method: 'post'
  })
}

export function loginByUsername(data) {
  return request({
    url: '/token',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'post'
  })
}