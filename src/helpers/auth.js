const tokenName = 'authSess'
const userIdName = 'appUserId'
const tokenHeadName = 'Bearer'

const getTokenBody = token => token.replace(`${tokenHeadName} `, '')
const getAuthToken = () => localStorage.getItem(tokenName)
const getUserId = () => localStorage.getItem(userIdName)
const setAuthToken = token => localStorage.setItem(tokenName, getTokenBody(token))
const setUserId = id => localStorage.setItem(userIdName, id)
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
  setAuthToken,
  setUserId,
  userIsAuth,
  logout,
}
