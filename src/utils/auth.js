import Cookies from 'js-cookie'

const TokenKey = 'gisinfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  var in30Minutes = new Date(new Date().getTime() + 30 * 60 * 1000);
  return Cookies.set(TokenKey, token,{
    expires: in30Minutes
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}