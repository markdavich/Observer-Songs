import ItunesService from "../Services/ItunesService.js";

//Private
let _itunesService = new ItunesService()

function _draw() {
    let elem = document.getElementById('songs')
    let songs = _itunesService.Songs
    let template = '<ul>'
    songs.forEach(s => {
        template += s.Template
    })
    elem.innerHTML = template + '</ul>'
}

//Public
export default class ItunesController {
    constructor() {
        //NOTE Register all subscribers
        _itunesService.addSubscriber("songs", _draw)

        //NOTE Retrieve data
        _itunesService.getMusicByQuery('ccr')
    }

    search(e) {
        e.preventDefault();
        _itunesService.getMusicByQuery(e.target.query.value)
    }
}