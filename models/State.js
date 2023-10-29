export class State {
    id = null;
    uri = null;
    scrollY = null;

    constructor(uri) {
        this.id = this.uri = uri;
    }
}