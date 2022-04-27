class Menu {
    constructor() {
        this.divId = 'menu';
        this.createRoomBtn = document.getElementById('createRoomBtn');
        this.enterBtn = document.getElementById('enterBtn');
        this.outputId = document.getElementById('outputId');
        this.addEventListeners();
    }

    addEventListeners = () => {
        this.createRoomBtn.addEventListener('click', () => {
            console.log('оно живое');
        });
        this.enterBtn.addEventListener('click', () => {
            console.log(this.outputId.getAttribute('value'));
        });
    }
}