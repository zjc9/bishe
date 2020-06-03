import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const nowuser = 'username'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getUsername() {
  return Cookies.get(nowuser)
}

export function setUsername(username) {
  return Cookies.set('username', username)
}

export function removeUsername() {
  return Cookies.remove(nowuser)
}
