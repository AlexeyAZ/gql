import localforage from 'localforage'

const noteStorage = localforage.createInstance({ name: 'Note storage' })
noteStorage.config({
  driver: localforage.LOCALSTORAGE,
})

export default noteStorage
