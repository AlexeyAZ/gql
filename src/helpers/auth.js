import Cookies from 'js-cookie'

const tokenName = 'authSess'
const userIdName = 'appUserId'
const tokenHeadName = 'Bearer'

const getTokenBody = token => token.replace(`${tokenHeadName} `, '')
// const getAuthToken = () => Cookies.get(tokenName)
// const getUserId = () => {console.log(Cookies.get(userIdName)); return Cookies.get(userIdName)}
// const setAuthCookie = token => {console.log(token); return Cookies.set(tokenName, getTokenBody(token))}
// const setUserIdCookie = id => {console.log(id); return Cookies.set(userIdName, id)}
// const userIsAuth = () => Boolean(getAuthToken())
// const logout = () => {Cookies.remove(tokenName); Cookies.remove(userIdName)}

const getAuthToken = () => localStorage.getItem(tokenName)
const getUserId = () => {
  console.log(localStorage.getItem(userIdName))
  return localStorage.getItem(userIdName)
}
const setAuthCookie = token => {
  console.log(token)
  return localStorage.setItem(tokenName, getTokenBody(token))
}
const setUserIdCookie = id => {
  console.log(id)
  return localStorage.setItem(userIdName, id)
}
const userIsAuth = () => Boolean(getAuthToken())
const logout = () => {
  localStorage.removeItem(tokenName)
  localStorage.removeItem(userIdName)
}

export default {
  tokenName,
  userIdName,
  tokenHeadName,
  getTokenBody,
  getAuthToken,
  getUserId,
  setAuthCookie,
  setUserIdCookie,
  userIsAuth,
  logout,
}
