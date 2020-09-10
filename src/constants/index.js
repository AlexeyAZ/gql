const SERVER_URL_NAME = 'serverUrl'
const SERVER_URL_LOCAL = 'http://localhost:5000'
const SERVER_URL_REMOTE = 'https://gql-app.herokuapp.com'

const ROUTE_ALL_NOTES = 'all-notes'

const NOTE_STORAGE = 'noteStorage'
const NOTE_STORAGE_DEFAULT_SCHEME = {
  changed: [],
  removed: [],
  added: [],
  local_note_id: 0,
}

export {
  SERVER_URL_NAME,
  SERVER_URL_LOCAL,
  SERVER_URL_REMOTE,
  ROUTE_ALL_NOTES,
  NOTE_STORAGE,
  NOTE_STORAGE_DEFAULT_SCHEME,
}
