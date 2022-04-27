const BaseModule = require('../BaseModule');

class UserManager extends BaseModule {
    constructor(options) {
        super(options);

        this.users = [];

        this.io.on('connection', socket => {
            socket.on(this.SOCKET_MESSAGES.SEND_USER_DATA, data => {
                this._sendUserData(data, socket);
                console.log(this.users);
            });
            //тут прописано, что делать в тот момент когда кто-то дисконектнулся
            socket.on('disconnect', () => {
                console.log(this.users);
                this._logout(socket);
            });
            socket.on(this.SOCKET_MESSAGES.SEND_USER_ID_BY_SOCKET_ID, () => this._sendUserIdBySocketId(socket));
        });

        this.mediator.set(this.TRIGGERS.GET_USER_BY_SOCKET_ID, data => this._getUserBySocketId(data));
    }


    _getUserBySocketId(socket_id) { //получаем данные о пользаке по его socket id (используется исключительно на бэке)
        let index = this.users.findIndex(el => el.socket_id == socket_id); //находим пользака с таким socket id в массиве
        let data = {}; //создаем объект для сбора данных
        data.user = this.users[index]; //закидываем в объект этого пользака
        data.userIndex = index; //и его индекс (вроде больше не требуется)
        return data; //возвращаем объект с данными о пользаке
    }

    _sendUserIdBySocketId = (socket) => { //метод который отправляет на клиент id пользака по сокету
        let index = this.users.findIndex(el => el.socket_id == socket.id); //ищем пользака по его socket id в массиве
        if (index > -1) //если находим
            socket.emit(this.SOCKET_MESSAGES.GET_USER_ID_BY_SOCKET_ID, this.users[index].id); //отправляем на клиент (не работает :С)
    }

    //список пользаков, которые онлайн
    _sendUserData(data = {}, socket) { //сейчас используется при авторизация вместо метода 'login'
        let flag = true; //используется под цикл подбора id пользаку
        const { userName, login } = data; //из полученных данных вылавливаем ник и логин
        while (flag) { //он будет срабатывать до тех пор, пока не подберется свободный id
            let id = Math.floor(Math.random(0) * 100000); //генерируем радномный айдишник
            let index = this.users.findIndex(el => el.id == id); //ищем пользака с таким id
            if (index == -1) { //если его нет
                this.users.push({ id: id, name: userName, log: login, socket_id: socket.id }); //добавляем пользователя в список пользователей + его id
                //Note: добавить еще токен
                //this.io.emit(this.SOCKET_MESSAGES.GET_USERS_LIST, { id, userName }); //отправляем на клиенты ник пользака и его id ()
                flag = false; //завершаем цикл
            }
        }
    }

    _logout(socket) {
        let index = this.users.findIndex(el => el.socket_id === socket.id); //получаем индекс пользака в массиве
        if (index > -1) { //если пользак нашелся
            this.users.splice(index, 1); //удаляем его из массива
        }
        //this.io.emit(this.SOCKET_MESSAGES.GET_USERS_LIST, this.users); //отправляем актуальную инфу о списке пользаков, которые онлайн на все клиенты
        //Note: сейчас на клиенте эта информация никак не используется, оставлено под написания списка всех активных пользователей
    }

}

module.exports = UserManager;