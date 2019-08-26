import ItunesController from "./Controllers/ItunesController.js";


class App {
    constructor() {
        this.controllers = {
            itunesController: new ItunesController()
        }
    }
}

window['app'] = new App()