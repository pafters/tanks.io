const BaseModule = require('../BaseModule');
const User = require('./User');
class UserManager extends BaseModule {
    constructor(options) {
        super(options);

        this.users = [];

        this.io.on('connection', socket => {
            // socket.on(this.SOCKET_MESSAGES.SEND_USER_DATA, data => {
            //     //this._sendUserData(data, socket);
            //     //console.log(this.users);
            // });
            //тут прописано, что делать в тот момент когда кто-то дисконектнулся
            socket.on('disconnect', () => {
                //console.log(this.users);
                this._logout(socket);
            });

            this.mediator.subscribe(this.EVENTS.CREATE_USER, data => this._createUser(data, socket));
            this.mediator.subscribe(this.EVENTS.LOGOUT, data => this._logout(socket, data = {}));
        });

        this.mediator.set(this.TRIGGERS.GET_USER_BY_SOCKET_ID, data => this._getUserBySocketId(data));

    }

    async _createUser(data, socket) {
        const { roomId, name } = data;
        let userName = await this.db.findUserByName(name);
        //console.log(userName);
        if (userName) {
            console.log('уведомление, что ник занят');
        } else {
            this.db.createUser(name);
            let info = await this.db.getUserIdByName(name);
            if (info.id) {
                let tankColor = Math.round(Math.random() * 3); //индексы цветов
                const user = new User(name, info.id, roomId, tankColor, socket.id);
                this.users.push(user);
                console.log(user);
                socket.emit(this.SOCKET_MESSAGES.SHOW_JOYSTICK, data);
                //console.log(this.users);
            }
        }
    }


    _getUserBySocketId(socket_id) { //получаем данные о пользаке по его socket id (используется исключительно на бэке)
        let index = this.users.findIndex(el => el.socketId == socket_id); //находим пользака с таким socket id в массиве
        let data = {}; //создаем объект для сбора данных
        data.user = this.users[index]; //закидываем в объект этого пользака
        data.userIndex = index; //и его индекс (вроде больше не требуется)
        return data; //возвращаем объект с данными о пользаке
    }

    _logout(socket, data) {
        let index = this.users.findIndex(el => el.socketId === socket.id); //получаем индекс пользака в массиве
        //console.log(index);
        if (index > -1) { //если пользак нашелся
            this.db.removeUserByName(this.users[index].name);
            this.users.splice(index, 1); //удаляем его из массива
            //console.log(this.users);
        }
        //this.io.emit(this.SOCKET_MESSAGES.GET_USERS_LIST, this.users); //отправляем актуальную инфу о списке пользаков, которые онлайн на все клиенты
        //Note: сейчас на клиенте эта информация никак не используется, оставлено под написания списка всех активных пользователей
    }

}

module.exports = UserManager;