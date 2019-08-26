export default class Song {
    constructor(data) {
        this.title = data.trackName
        this.albumArt = data.artworkUrl100.replace(/100x100/g, "300x300")
        this.artist = data.artistName
        this.collection = data.collectionName
        this.price = data.trackPrice
        this.preview = data.previewUrl
    }

    get Template() {
        return `
        <div class="card">
        <img class="card-img-top " src="${this.albumArt}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text">${this.collection} price: ${this.price}</p>
            <audio controls src="${this.preview}"></audio>
        </div>
    </div>
        `
    }
}