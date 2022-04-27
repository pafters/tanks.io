class Chat { //Это короче диалоговое окно будет
    constructor(socket, userId) {
        this.message = document.getElementById('messageInp');
        this.sendBtn = document.getElementById('sendBttn');
        this.divMessages = document.getElementById('messages');
        this.leaveRoomBtn = document.getElementById('leaveRoomBtn');
        this.divUsersList = document.getElementById('divUsersList');

        this.socket = socket;
        this.joinTag = null;
        this.userId = userId;

        this.addEventListeners();
        this.socket.on('newChatMessage', this.newChatMessageHandler);
    }

    sendMessage = () => {
        const message = this.message.value;
        console.log(this.joinTag);
        if (message) {
            let joinTag = this.joinTag;
            this.socket.emit('sendMessage', { message, joinTag });
            document.getElementById('messageInp').value = '';
        }
    }

    addEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.message.addEventListener('keydown', (e) => {
            if (e.code == 'Enter') this.sendMessage();
        });

        this.leaveRoomBtn.addEventListener('click', () => {
            this.socket.emit('LEAVE_ROOM', this.joinTag);
            this.joinTag = null;
            this.leaveRoomBtn.classList.add('hide');
            this.divMessages.innerHTML = ``;
            this.divUsersList.innerHTML = ``;
        })


    }


    newChatMessageHandler = (data) => {
        console.log(this.userId);
        const { message, senderName, id } = data;
        var newMessage;
        console.log(id);
        //const newMessage = document.createElement('div');
        if (this.userId == id) {
            newMessage = `<p class = "senderName">${senderName} (Вы) </p><br><div class = "senderMessage">${message}</div><br>`;
        } else {
            newMessage = `<p class = "senderName">${senderName} </p><br><div class = "senderMessage">${message}</div><br>`;
        }

        this.divMessages.innerHTML += newMessage;
    }
    //document.createElement('br').appendChild(this.messages);
}