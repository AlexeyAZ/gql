import { SERVER_URL_NAME, SERVER_URL_LOCAL, SERVER_URL_REMOTE } from '../constants'

const defaultServerType = 'local'

const setServerUrl = type => {
  if (type === 'local') {
    localStorage.setItem(SERVER_URL_NAME, SERVER_URL_LOCAL)
  }
  if (type === 'remote') {
    localStorage.setItem(SERVER_URL_NAME, SERVER_URL_REMOTE)
  }
}

const getServerUrl = () => {
  // eslint-disable-next-line no-unused-expressions
  localStorage.getItem(SERVER_URL_NAME) || setServerUrl(defaultServerType)
  return localStorage.getItem(SERVER_URL_NAME)
}

const getServerType = () => {
  if (localStorage.getItem(SERVER_URL_NAME) === SERVER_URL_LOCAL) {
    return 'local'
  }
  if (localStorage.getItem(SERVER_URL_NAME) === SERVER_URL_REMOTE) {
    return 'remote'
  }
  setServerUrl(defaultServerType)
  return getServerType()
}

export default {
  setServerUrl,
  getServerUrl,
  getServerType,
}
