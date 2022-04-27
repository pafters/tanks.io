class Authorization {
    constructor(socket) {
        this.login = document.getElementById('login');
        this.userName = document.getElementById('userName');
        this.signInBtn = document.getElementById('signInBtn');
        this.addEventListeners();
        this.socket = socket;
        this.socket.on('GET_USER_ID_BY_SOCKET_ID', data => this.getUserIdBySocketId(data));
    }

    addEventListeners() {
        this.signInBtn.addEventListener('click', async () => {

            const login = this.login.value;
            const userName = this.userName.value;

            if (login && userName) {
                this.socket.emit('sendUserData', { userName, login });
                this.socket.emit('SEND_USER_ID_BY_SOCKET_ID');

        
                //new Messenger(this.socket, '213');
            } //else this.output.innerHTML = 'Ошибка в получении данных';
        });
    }

    getUserIdBySocketId(data) {
        new Messenger(this.socket, data);
    }

}