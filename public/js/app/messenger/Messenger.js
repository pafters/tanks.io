class Messenger {
    constructor(socket, userId) {
        this.socket = socket;
        this.userId = userId;

        this.divUsersList = document.getElementById('divUsersList');
        this.divMessages = document.getElementById('messages');

        this.divRoomsList = document.getElementById('divRoomsList');
        this.roomNameInp = document.getElementById('roomNameInp');
        this.createRoomBttn = document.getElementById('createRoomBttn');

        this.leaveRoomBtn = document.getElementById('leaveRoomBtn');

        this.socket.on('GET_USERS_LIST', this.showUsersList);
        this.socket.on('SHOW_ROOMS_LIST', this.showRoomsList);

        this.socket.on('SHOW_USERS_IN_ROOM', this.showUsersInRoom);

        this.addEventListeners();
        this.chat = new Chat(this.socket, this.userId);
        this.socket.emit('GET_ROOMS_LIST');
    }

    showRoomsList = (roomsList) => {
        this.divRoomsList.innerHTML = ``;
        if (roomsList) {
            for (let i = 0; i < roomsList.length; i++) {
                const room = document.createElement('div');
                room.classList.add('divRoom');
                room.value = `${roomsList[i].joinTag}`;
                room.innerHTML = `<b>${roomsList[i].name}</b> в сети ${roomsList[i].users.length} чел.`;
                this.divRoomsList.appendChild(room);
            }
        }
    }

    createRoom = () => {
        const roomName = this.roomNameInp.value;
        this.socket.emit('CREATE_ROOM', roomName);
        document.getElementById('roomNameInp').value = '';
    }

    showUsersList = (usersList) => {
        /*this.divUsersList.innerHTML = ``;
        if (usersList) {
            //console.log(usersList);
            for (let i = 0; i < usersList.length; i++) {/////////////////////
                const user = document.createElement('div');
                user.classList.add('divUser');
                user.innerHTML = `<b>${usersList[i].name}</b> в сети`;
                this.divUsersList.appendChild(user);
            }
        }*/ //пока не используется, и вообще нужно переписать под другой блок
    }

    showUsersInRoom = (usersList) => {
        this.divUsersList.innerHTML = `<p class = "info">Now online in the chat</p><br>`;
        if (usersList) {
            for (let i = 0; i < usersList.length; i++) {
                const user = document.createElement('div');
                user.classList.add('divUser');
                user.innerHTML = `<b>${usersList[i]}</b>`;
                this.divUsersList.appendChild(user);
            }
        }

    }

    addEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList == 'divRoom' && e.target.value) {
                this.divMessages.innerHTML = ``;
                this.divUsersList.innerHTML = ``;

                if (this.chat.joinTag != null) {
                    this.socket.emit('LEAVE_ROOM', this.chat.joinTag);
                    this.leaveRoomBtn.classList.add('hide');
                }
                //console.log(e.target.value);
                this.socket.emit('JOIN_ROOM', e.target.value);
                this.showUsersInRoom();

                this.chat.joinTag = e.target.value;
                this.chat.sendMessage();
                this.leaveRoomBtn.classList.remove('hide');
            }
        });

        this.createRoomBttn.addEventListener('click', () => this.createRoom());
        this.roomNameInp.addEventListener('keydown', (e) => {
            if (e.code == 'Enter') this.createRoom();
        });
    }
}