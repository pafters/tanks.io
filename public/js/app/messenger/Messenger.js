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

        //this.socket.on('SHOW_ROOMS_LIST', this.showRoomId);

        this.socket.on('SHOW_USERS_IN_ROOM', this.showUsersInRoom);

        this.chat = new Chat(this.socket, this.userId);
        this.socket.emit('GET_ROOMS_LIST');
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

}