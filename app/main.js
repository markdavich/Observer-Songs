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
}

window.onresize = windowResize;

windowResize()