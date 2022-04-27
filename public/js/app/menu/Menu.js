class Menu {
    constructor(socket) {
        this.socket = socket;
        this.divId = 'menu';
        this.createRoomBtn = document.getElementById('createRoomBtn');
        this.enterBtn = document.getElementById('enterBtn');
        this.roomIdContainer = document.getElementById('roomIdContainer');
        this.addEventListeners();

        this.socket.on('SHOW_ROOM_ID', this.showRoomId);
        this.socket.on('SHOW_ROOM', this.showRoom);
    }

    addEventListeners = () => {
        this.createRoomBtn.addEventListener('click', () => {
            this.createRoom();
        });
        this.enterBtn.addEventListener('click', () => {
            let joinTag = this.roomIdContainer.getAttribute('value');
            if (joinTag) {
                console.log('a');
                this.socket.emit('JOIN_ROOM', { joinTag });
            }
        });
    }

    showRoomId = (data) => {
        this.roomIdContainer.innerHTML = ``;
        if (data) {
            const { roomId, joinTag } = data;

            this.roomIdContainer.classList.add('divRoom');
            this.roomIdContainer.innerHTML = `<b>ROOM ID: ${roomId}</b>`;
            this.roomIdContainer.setAttribute('value', joinTag);

        }
    }

    createRoom = () => {
        this.socket.emit('CREATE_ROOM');
    }

    showRoom = (data) => {
        console.log(data);
        new Form('game', this.socket, data);
    }


}