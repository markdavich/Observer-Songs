import ItunesService from "../Services/ItunesService.js";
import { STATE, ApiParams, FORM, API, ALBUM_ART_SIZE, Common, DOM } from "../Constants/constants.js";

//Private
let _currentPlayer
let _itunesService = new ItunesService()
let _apiParams = new ApiParams()

function _loadApiParamsFromTheDom(api) {
    let form = document.getElementById(FORM.NAME)
    let search = form[FORM.SEARCH].value
    let user = form[FORM.USERS_TEMPLATE].value
    let artSize = Common.toInteger( form[FORM.ART_SIZE].value)

    _apiParams.Api = api
    _apiParams.searchTerms = search
    _apiParams.userName = user
    _apiParams.albumnArtSize = artSize
}

/** This puts all the users in 'users-template' combobox in the DOM */
function _drawUsers() {
    document.getElementById(FORM.USERS_TEMPLATE).innerHTML = _itunesService.Users.Template
}

/** This clears the 'new-user' input and sets the combox to the current user */
function _drawCurrentUser() {
    let newUser = document.getElementById(FORM.NEW_USER)
    let currentUser = document.getElementById(FORM.USERS_TEMPLATE)

    // Clear out the new user input
    newUser.value = ''

    // Set the current user on the users combobox
    currentUser.value = _itunesService.CurrentUser
}

function _draw() {
    let elem = document.getElementById('songs')
    let songs = _itunesService.Songs
    let template = '<ul>'
    songs.forEach(s => {
        template += s.Template
    })
    elem.innerHTML = template + '</ul>'
}

function _drawPlayList() {
    let template = ''
    let songs = _itunesService.getPlayList(_apiParams)
    songs.forEach(song => template += song.Template)
    document.getElementById(DOM.PLAYLIST_TEMPLATE).innerHTML = template
}
function _addFakeUsers(userList) {
    for (let i = 0; i < userList.length; i++) {
        _itunesService.addUser(userList[i])
    }
}

function _setState(propertyToSet, newValue) {
    if (!_apiParams) _apiParams = new ApiParams()
    _apiParams[propertyToSet] = newValue
}


//Public
export default class ItunesController {
    constructor() {
        //NOTE Register all subscribers
        _itunesService.addSubscriber(STATE.PROPS.SONGS, _draw)
        _itunesService.addSubscriber(STATE.PROPS.CURRENT_USER, _drawCurrentUser)
        _itunesService.addSubscriber(STATE.PROPS.USERS, _drawUsers)
        _itunesService.addSubscriber(STATE.PROPS.PLAYLIST, _drawPlayList)

        //NOTE Retrieve data
        _setState(_apiParams.NAMES.searchTerms, 'tago mago')
        _setState(_apiParams.NAMES.Api, API.ITUNES.NAME)
        _itunesService.loadItunesSearch(_apiParams)
        
        //NOTE Thease functions are vaporious
        _itunesService.getUsers()
        _addFakeUsers(['mark-d', 'DMark', 'MarkD', 'Rizza'])
        _loadApiParamsFromTheDom(_apiParams.Api)
    }

    search() {
        // e.preventDefault();
        // _itunesService.getMusicByQuery(e.target.query.value)
    }

    loadItunesSearch(event) {
        event.preventDefault()
        _loadApiParamsFromTheDom(API.ITUNES.NAME)
        _itunesService.loadItunesSearch(_apiParams)
    }

    addUser() {
        /**
         * 1. Load the _apiParams object
         * 1. Get the new user from document.getElementById('new-user')
         * 2. Push the new user to the service
         * 3. Set the new user
         * 4. Draw the users
         */
    }

    apiParamChange() {
        /**
         * 1. 
         */
    }

    setCurrentPlayer(event) {
        event.preventDefault()
        if (_currentPlayer) _currentPlayer.pause()
        _currentPlayer = event.target
    }

    addToPlayList(event, trackId) {
        event.preventDefault()
        _setState(_apiParams.NAMES.Api, API.SAND.NAME)
        _itunesService.addToPlayList(trackId, _apiParams)

    }

    removeFromPlayList(event, trackId) {
        event.preventDefault()
        _itunesService.removeFromPlayList(trackId)
    }
}