export default class InputHanlder {
    constructor() {

        this.KeysPressed = new Set();

        document.addEventListener("keydown", event => {
            this.KeysPressed.add(event.key);
        });

        document.addEventListener("keyup", event => {
            this.KeysPressed.delete(event.key);
        });
    }

    keyDown(key) {
        return this.KeysPressed.has(key);
    }
}