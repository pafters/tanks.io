
const BaseModule = require('../BaseModule');
class GameManager extends BaseModule {

    constructor(options) {
        super(options);

        this.rooms = [];

        this.io.on('connection', socket => {
            //console.log(this.rooms);

            socket.on(this.SOCKET_MESSAGES.CREATE_ROOM,
                () => this._createRoom(socket));

            socket.on(this.SOCKET_MESSAGES.JOIN_ROOM,
                data => this._joinRoom(data, socket));

            socket.on(this.SOCKET_MESSAGES.LEAVE_ROOM,
                data => this._leaveRoom(data, socket));


            socket.on(this.SOCKET_MESSAGES.ANALISE_GAME_MOMENT_DATA, data => this._analiseGameMomentData(data, socket));

        });

        this.mediator.set(this.TRIGGERS.GET_FLAG, data => this._getFlag(data));

    }


    _analiseGameMomentData(data, socket) {
        const { speed, mainAngle, joinTag } = data;
        const info = this.mediator.get(this.TRIGGERS.GET_USER_BY_SOCKET_ID, socket.id);
        const { user } = info;
        user.speed = speed;
        user.angle = mainAngle;
        user.x += (user.speed / 100) * 3 * (4 * Math.cos(Math.PI / 180 * user.angle) / 6);
        user.y -= (user.speed / 100) * 3 * (4 * Math.sin(Math.PI / 180 * user.angle) / 6);
        let x = user.x;
        let y = user.y;
        this.io.to(joinTag).emit(this.SOCKET_MESSAGES.SHOW_POINT, { x, y })
    }


    _createRoom = async (socket) => { //метод создания комнаты
        let flag = true; //используется под цикл подбора id комнаты
        while (flag) { //он будет срабатывать до тех пор, пока не подберется свободный id
            let roomId = Math.floor(Math.random(0) * 100000); //генерируем радномный айдишник
            let index = this.rooms.findIndex(el => el.id == roomId); //ищем комнату с таким id
            //console.log(index);
            if (index == - 1) { //если не находим
                let room = { //создаем комнату
                    id: roomId, //подобранный ей id
                    joinTag: `room${roomId}`, //тэг, по которому можно будет к ней присоединиться
                    //Note: по хорошему еще нужно указать айдишники пользаков 
                }
                this.rooms.push(room); //отправляем созданную комнату в список ко всем остальным комнатам
                this._sendRoomInfo(room, socket); //отправляем на клиент id и jointag комнаты
                flag = false; //выходим из цикла

            }
        }

    }

    _sendRoomInfo = (data, socket) => { //метод, который отправляет список доступных комнат на клиенты 
        socket.emit(this.SOCKET_MESSAGES.SHOW_ROOM_ID, data);
    }

    _leaveRoom = (joinTag = null, socket) => { //метод выхода из комнаты
        socket.leave(joinTag); //покидаем комнату через внутренний метод сокета
        //const userData = this.mediator.get(this.TRIGGERS.GET_USER_BY_SOCKET_ID, socket.id); //получаем данные о пользаке через его socket id
        //let roomIndex = this.rooms.findIndex(el => el.joinTag == joinTag); //ищем комнату (в массиве всех комнат), где он находится
        //let userName = userData.user.name; //фиксируем его ник
        this.mediator.call(this.EVENTS.LOGOUT);
        //let userIndex = this.rooms[roomIndex].users.indexOf(userName); //ищем пользака в комнате с таким ником Note: Опять таки, это следует делать по id (пока еще не приступал к этому)
        //if (userIndex > -1) { //если находим его в комнате
        //    this.rooms[roomIndex].users.splice(userIndex, 1); //удаляем его из этого массива
        //}
        //console.log(this.rooms[roomIndex].users);
        //this.io.emit(this.SOCKET_MESSAGES.SHOW_ROOMS_LIST, this.rooms); //отправляем на клиенты актуальную инфу о комнатах (число пользаков в комнате обновилось)
        //this.io.to(joinTag).emit(this.SOCKET_MESSAGES.SHOW_USERS_IN_ROOM, this.rooms[roomIndex].users); //обновляем список пользаков в комнате у тех, кто там находится

    }

    _joinRoom = (data, socket) => { //метод присоединения к комнате
        const { joinTag, name } = data;
        let index = this.rooms.findIndex(el => el.joinTag == joinTag);
        if (index != -1) {

            console.log(socket.rooms);
            const roomId = this.rooms[index].id;
            if (name) {
                //создаем запись о пользаке в бд с проверкой на имя
                this.mediator.call(this.EVENTS.CREATE_USER, { name, roomId, joinTag });
                //отправляем room_id, joinTag и name на клиент //
                //отправляем его на экран
            } else {
                socket.join(joinTag);
                this.io.to(joinTag).emit(this.SOCKET_MESSAGES.SHOW_ROOM, { roomId, joinTag });
            }
            //присоединяем сокет пользака к комнате по ее тэгу присоединения
            //Отправляем на клиенты пользаков, которые находятся в этой комнате, обновленный список пользаков, находящихся в ней
        }

    }

}

module.exports = GameManager;