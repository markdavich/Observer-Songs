import ItunesController from "./Controllers/ItunesController.js";

class App {
    constructor() {
        this.controllers = {
            itunesController: new ItunesController()
        }
    }
}

window['app'] = new App()

function windowResize() {
    let navBar = document.getElementById('nav-bar')

    document.body.style.paddingTop = `${navBar.clientHeight + 20}px`
    document.getElementById('songs').style.marginTop = `${navBar.clientHeight - 60}px`
}

window.onresize = windowResize;

windowResize()