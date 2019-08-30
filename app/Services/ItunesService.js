import Song from "../Models/Song.js";
import { STATE, API, ApiParams } from "../Constants/constants.js";
import Users from "../Models/Users.js";

//Private
let _sandBoxApi = axios.create({
    //NOTE Axios stores the response in data: axiosData = response.data
    baseURL: API.SAND.baseURL
})

let _state = {
    /** This is an array of POJO songs */
    songs: [],
    /** This a User class object*/
    users: new Users(),
    /** This is a 'string' holding the current user */
    currentUser: '',
    /** This is an array of POJO songs */
    playlist: []
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
    songs: [],
    users: [],
    currentUser: [],
    playlist: []
}

function _setState(propName, data) {
    //NOTE add the data to the state
    _state[propName] = data
    //NOTE run every subscriber function that is watching that data
    _subscribers[propName].forEach(fn => fn());
}

//Public
export default class ItunesService {
    removeFromPlayList(trackId, _apiParams) {
        throw new Error("Method not implemented.");
    }
    addToPlayList(trackId, _apiParams) {
        let songData = _state.songs.find(song => song.trackId == trackId)
        let newPlayList = [songData, ..._state.playlist]
        _setState(STATE.PROPS.PLAYLIST, newPlayList)
    }
    /**
     * 
     * @param {ApiParams} apiParams 
     */
    loadItunesSearch(apiParams) {
        // throw new Error("Method not implemented.");
        $.getJSON(API.ITUNES.getEndPoint(apiParams.searchTerms))
            .then(response => {
                let results = response.results.map(rawData => new Song(rawData, apiParams))
                _setState(STATE.PROPS.SONGS, results)
            })
            .catch(err => console.log(err))
    }
    get Songs() {
        return _state.songs
    }

    getPlayList(apiParams) {
        return _state.playlist.map(song => new Song(song, apiParams))
    }

    /** This is a 'string' holding the current user name */
    get CurrentUser() {
        return _state.currentUser
    }

    /** This is a single User class object */
    get Users() {
        return _state.users.copy()
    }

    //NOTE adds the subscriber function to the array based on the property it is watching
    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }

    getMusicByQuery(query) {
        var url = 'https://itunes.apple.com/search?callback=?&term=' + query;
        // @ts-ignore
        $.getJSON(url)
            .then(res => {
                let results = res.results.map(rawData => new Song(rawData))
                _setState('songs', results)
            })
            .catch(err => console.log(err))
    }

    /** 
     * This calls the SandBox Api and draws the users combobox
     * @see NOTE: This recreates the Users class object
     * */
    getUsers() {
        // What's this??? Oh it's vapor-ware, it's vapor-ware
        _setState(STATE.PROPS.USERS, Users.Create([], false))
        return

        _sandBoxApi.get()
            .then(response => {            // axios.axios.sandBox
                let axiosData = response.data
                let sandBoxSongs = axiosData.data // Hopefully this is an array of songs [{song}, {song}...]

                _setState(STATE.PROPS.USERS, Users.Create(sandBoxSongs, true))
            })
            .catch(error => {
                debugger
                _setState(STATE.PROPS.USERS, Users.Create([], false))
            })
    }

    addUser(newUserName) {
        if (_state.users.addUser(newUserName)) {
            _setState(STATE.PROPS.USERS, _state.users)
        }

        _setState(STATE.PROPS.CURRENT_USER, newUserName)
    }

    setCurrentUser(currentUserName) {
        _setState(STATE.PROPS.CURRENT_USER, currentUserName)
    }
}
