class Auth {
    constructor(socket, flag = false) {
        this.mass = [];
        this.flag = flag;
        this.socket = socket;
        this.inpName;
        this.inpRoomId;
        this.enterBtn;
        this.switchToFullScrBtn;
        this.render();
        this.socket.on('SHOW_JOYSTICK', data => this.showJoystick(data, this.socket));
        //this.joystick = new Joystick();
    }

    render() {
        if (this.flag) {
            this.elements();
            this.addEventListeners();
        }

    }

    elements() {
        this.inpName = document.getElementById('inpName');
        this.inpRoomId = document.getElementById('inpRoomId');
        this.enterBtn = document.getElementById('enterBtn');
        this.switchToFullScrBtn = document.getElementById('switchToFullScrBtn');
    }

    addEventListeners() {
        this.enterBtn.addEventListener('click', () => {
            console.log('abort');
            const name = this.inpName.value;
            const joinTag = `room${this.inpRoomId.value}`;
            if (name && joinTag) {
                this.socket.emit('JOIN_ROOM', { joinTag, name });
                //получение id пользака
                //вызов класса джойстик и закидывание его в класс
            } //else this.output.innerHTML = 'Ошибка в получении данных';
        });
        this.switchToFullScrBtn.addEventListener('click', () => {
            new Markup('menu');
            new Menu(this.socket, true);
            this.flag = false;
        })
    }

    showJoystick(data) {
        const { name, joinTag } = data;
        console.log(data);
        new Markup('joystick');
        this.mass.push(new Joystick(this.socket, true, name, joinTag));
        this.flag = false;
        //this.joystick.joinTag = joinTag;
        //this.joystick.roomId = roomId;
        //this.joystick.userName = name;
    }


}