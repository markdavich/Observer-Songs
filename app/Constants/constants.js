export const API = {
  SAND: {
    NAME: 'sand',
    END: 'songs',
    baseURL: 'http://bcw-sandbox.herokuapp.com/api/',
    getEndPoint: function (userName) {
      return `${userName}/${this.END}`
    }
  },
  ITUNES: {
    NAME: 'itunes',
    baseURL: 'https://itunes.apple.com/search?callback=?&term=',
    getEndPoint: function (searchTerms) {
      return `${this.baseURL}${searchTerms}`
    }
  }
}

export const MVC = {
  CONTROLLER: {
    ROUTE: 'app.controllers.itunesController.',
    FUNCTIONS: {
      setCurrentPlayer: 'setCurrentPlayer',
      apiParamChange: 'apiParamChange',
      addUser: 'addUser',
      loadItunesSearch: 'loadItunesSearch',
      addToPlayList: 'addToPlayList',
      removeFromPlayList: 'removeFromPlayList',
      loadSandPlayList: 'loadSandPlayList',
      changeUser: 'changeUser'
    }
  }
}

export const STATE = {
  PROPS: {
    SONGS: 'songs',
    USERS: 'users',
    PLAYLIST: 'playlist',
    CURRENT_USER: 'currentUser'
  }
}

export class ApiParams {
  constructor() {
    this.Api = ''
    this.userName = ''
    this.searchTerms = ''
    this.albumnArtSize = ALBUM_ART_SIZE._200x200
    this.newUserName = '',
    this.NAMES = {
      Api: 'Api',
      userName: 'userName',
      searchTerms: 'searchTerms',
      albumnArtSize: 'albumnArtSize',
      newUserName: 'newUserName'
    }
  }
}

export const FORM = {
  NAME: 'form',
  SEARCH: 'search',
  NEW_USER: 'new-user',
  USERS_TEMPLATE: 'users-template',
  ART_SIZE: 'art-size'
}

export const DOM = {
  SONGS_TEMPLATE: 'songs-template',
  PLAYLIST_TEMPLATE: 'playlist-template'
}

export const ALBUM_ART_SIZE = {
  _30x30: 0,
  _60x60: 1,
  _100x100: 2,
  _200x200: 3,
  _300x300: 4,
  getStyle: function (size) {
    let result = ''
    let sizes = {
      0: 30,
      1: 60,
      2: 100,
      3: 200,
      4: 300
    }

    let sz = sizes[size]

    result = `style="height: ${sz}px !important; width: ${sz}px !important; margin: auto;"`
    return result
  }
}

export const Common = {
  toInteger: function (str) {
    let parsed = parseInt(str, 10)

    return isNaN(parsed) ? 0 : parsed
  }
}