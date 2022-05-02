class Menu {
    constructor(socket, flag = false) {
        this.socket = socket;
        this.flag = flag;
        this.divId = 'menu';
        this.socket.on('SHOW_ROOM_ID', this.showRoomId);
        this.socket.on('SHOW_ROOM', this.showRoom);
        this.render();
    }

    render() {
        if (this.flag) {
            this.elements();
            this.addEventListeners();
        }

    }

    elements() {
        this.createRoomBtn = document.getElementById('createRoomBtn');
        this.enterBtn = document.getElementById('enterBtn');
        this.roomIdContainer = document.getElementById('roomIdContainer');
        this.switchToMobBtn = document.getElementById('switchToMobBtn');
    }

    addEventListeners = () => {
        this.createRoomBtn.addEventListener('click', () => {
            this.createRoom();
        });
        this.enterBtn.addEventListener('click', () => {
            let joinTag = this.roomIdContainer.getAttribute('value');
            if (joinTag) {
                console.log(joinTag);
                this.socket.emit('JOIN_ROOM', { joinTag });
            }
        });
        this.switchToMobBtn.addEventListener('click', () => {
            new Markup('auth');
            new Auth(this.socket, true);
            this.flag = false;
        });
    }

    showRoomId = (data) => {
        this.roomIdContainer.innerHTML = ``;
        if (data) {
            const { id, joinTag } = data;

            this.roomIdContainer.classList.add('divRoom');
            this.roomIdContainer.innerHTML = `<b>ROOM ID: ${id}</b>`;
            this.roomIdContainer.setAttribute('value', joinTag);

        }
    }

    createRoom = () => {
        this.socket.emit('CREATE_ROOM');
    }

    showRoom = (data) => {
        const { joinTag, roomId } = data;
        new Markup('game');
        new Game(this.socket, true, joinTag, roomId);
        this.flag = false;
        //this.game.joinTag = joinTag;
        //this.game.roomId = roomId;
    }


}