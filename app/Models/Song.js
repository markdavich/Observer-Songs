import { ALBUM_ART_SIZE, API, MVC, ApiParams } from "../Constants/constants.js";

/**
 * 
 * @param {Song} song 
 */
function _getSandTemplate(song) {
    let result = `
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-2 align-middle">
                    <img ${song.getImageSize()} src="${song.albumArt}" class="card-img align-middle" alt="...">
                </div>
                <div class="col-10">
                    <div class="card-body">
                        <h5 class="card-title">${song.title}<br>By <b>${song.artist}</b></h5>
                        <p class="card-text text-wrap">${song.album} price: ${song.price}</p>
                        <hr>
                        <audio style="float: left;" ${song.getPlayerEvent()} controls src="${song.preview}"></audio>
                        <button style="float: right;" ${song.getRemoveEvent()} class="btn btn-outline-success">Remove</button>
                    </div>
                    
                </div>
            </div>
        </div>

    `
    return result
}

/**
 *
 * @param {Song} song
 */
function _getITunesTemplate(song) {
    let result = `
        <div class="card mb-3">
            <img ${song.getImageSize()} class="card-img-top mt-3" src="${song.albumArt}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${song.title}<br>By <b>${song.artist}</b></h5>
                <p class="card-text text-wrap">${song.album} price: ${song.price}</p>
                <audio ${song.getPlayerEvent()} controls src="${song.preview}"></audio>
            </div>
            <button ${song.getAddEvent()} class="btn btn-outline-success m-3">Add to Playlist</button>
        </div>
    `
    return result
}

export default class Song {
    /**
     * 
     * @param {object} data 
     * @param {ApiParams} apiParams 
     */
    constructor(data, apiParams) {
        // Api Parameters
        this.api = apiParams.Api
        this.albumArtSize = apiParams.albumnArtSize

        // A place to keep track of SandBox art work size
        this.sandArtSize = data.albumArt || data.artworkUrl100


        if (this.api == API.ITUNES.NAME) {
            switch (apiParams.albumnArtSize) {
                case ALBUM_ART_SIZE._30x30:
                    this.albumArt = data.artworkUrl30
                    break
                case ALBUM_ART_SIZE._60x60:
                    this.albumArt = data.artworkUrl60
                    break
                case ALBUM_ART_SIZE._100x100:
                    this.albumArt = data.artworkUrl100
                    break
                case ALBUM_ART_SIZE._200x200:
                    this.albumArt = data.artworkUrl100.replace(/100x100/g, "200x200")
                    break
                case ALBUM_ART_SIZE._300x300:
                    this.albumArt = data.artworkUrl100.replace(/100x100/g, "300x300")
                    break
            }
        } else {
            this.albumArt = this.sandArtSize
        }

        this.trackId = data.trackId
        
        //This            SandBox         iTunes
        //==============================================
        this.artist  = data.artist  || data.artistName
        this.album   = data.album   || data.collectionName
        this.title   = data.title   || data.trackName
        this.preview = data.preview || data.previewUrl
        this.price   = data.price   || data.trackPrice
        this.user    = data.user    || apiParams.userName
    }

    // SandBox API ____________________________________
    // artist: { type: String, required: true },
    // album: { type: String, required: true },
    // title: { type: String, required: true },
    // preview: { type: String, required: true },
    // price: { type: String, required: true },
    // albumArt: { type: String, required: true },
    // user: { type: String, required: true }

    getImageSize() {
        return this.api = API.ITUNES.NAME ?
            ALBUM_ART_SIZE.getStyle(this.albumArtSize) :
            'style="width=100px !important; height=100px !important;"'
    }

    getPlayerEvent() {
        let route = MVC.CONTROLLER.ROUTE
        let func = MVC.CONTROLLER.FUNCTIONS.setCurrentPlayer
        return `onplay="${route}${func}(event)"`
    }

    getAddEvent() {
        let route = MVC.CONTROLLER.ROUTE
        let func = MVC.CONTROLLER.FUNCTIONS.addToPlayList
        return `onclick="${route}${func}(event, '${this.trackId}')"`
    }

    getRemoveEvent() {
        let route = MVC.CONTROLLER.ROUTE
        let func = MVC.CONTROLLER.FUNCTIONS.removeFromPlayList
        return `onclick="${route}${func}(event, '${this.trackId}')"`
    }

    get Template() {
        return this.api == API.ITUNES.NAME ?
            _getITunesTemplate(this) :
            _getSandTemplate(this)
    }

    get Data() {
        return {
            albumArt: this.sandArtSize,
            artist: this.artist,
            album: this.album,
            title: this.title,
            preview: this.preview,
            price: this.price,
            user: this.user
        }
    }


}