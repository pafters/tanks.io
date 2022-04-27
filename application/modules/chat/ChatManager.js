const { message } = require('statuses');
const BaseModule = require('../BaseModule');

class ChatManager extends BaseModule {
    constructor(options) {
        super(options);

        this.rooms = [];


        this.io.on('connection', socket => {
            console.log(this.rooms);
            socket.on(this.SOCKET_MESSAGES.SEND_MESSAGE,
                data => this._sendMessage(data, socket));

            socket.on(this.SOCKET_MESSAGES.CREATE_ROOM,
                data => this._createRoom(data));

            socket.on(this.SOCKET_MESSAGES.JOIN_ROOM,
                data => this._joinRoom(data, socket));

            socket.on(this.SOCKET_MESSAGES.LEAVE_ROOM,
                data => this._leaveRoom(data, socket));

            socket.on(this.SOCKET_MESSAGES.GET_ROOMS_LIST, data => this._getRoomsList(data, socket))
            //this._sendRoomsList();
            //socket.on(this.SOCKET_MESSAGES.SEND_ROOMS_LIST,
            //    data => this._sendRoomsList(data)); //не понимаю почему не работает
        });

    }

    _getRoomsList(data = this.rooms, socket) { //метод который отправляет на клиент список допступных комнат
        socket.emit(this.SOCKET_MESSAGES.SHOW_ROOMS_LIST, data);
    }

    _createRoom = (name = '') => { //метод создания комнаты
        let flag = true; //используется под цикл подбора id комнаты
        while (flag) { //он будет срабатывать до тех пор, пока не подберется свободный id
            let roomId = Math.floor(Math.random(0) * 100000); //генерируем радномный айдишник
            let index = this.rooms.findIndex(el => el.roomId == roomId); //ищем комнату с таким id
            if (index == - 1) { //если не находим
                let room = { //создаем комнату
                    name: name, //название указанное при создании
                    roomId: roomId, //подобранный ей id
                    joinTag: `room${roomId}`, //тэг, по которому можно будет к ней присоединиться
                    users: [] //список пользаков (указаны ники)
                    //Note: по хорошему еще нужно указать айдишники пользаков 
                }
                this.rooms.push(room); //отправляем созданную комнату в список ко всем остальным комнатам
                flag = false; //выходим из цикла
            }
        }
        this._sendRoomsList(this.rooms); //отправляем на клиенты список актуальных комнат

    }

    _sendRoomsList = (data) => { //метод, который отправляет список доступных комнат на клиенты 
        this.io.emit(this.SOCKET_MESSAGES.SHOW_ROOMS_LIST, data);
    }

    _leaveRoom = (joinTag = null, socket) => { //метод выхода из комнаты
        socket.leave(joinTag); //покидаем комнату через внутренний метод сокета
        const userData = this.mediator.get(this.TRIGGERS.GET_USER_BY_SOCKET_ID, socket.id); //получаем данные о пользаке через его socket id
        let roomIndex = this.rooms.findIndex(el => el.joinTag == joinTag); //ищем комнату (в массиве всех комнат), где он находится
        let userName = userData.user.name; //фиксируем его ник
        let userIndex = this.rooms[roomIndex].users.indexOf(userName); //ищем пользака в комнате с таким ником Note: Опять таки, это следует делать по id (пока еще не приступал к этому)
        if (userIndex > -1) { //если находим его в комнате
            this.rooms[roomIndex].users.splice(userIndex, 1); //удаляем его из этого массива
        }
        console.log(this.rooms[roomIndex].users);
        this.io.emit(this.SOCKET_MESSAGES.SHOW_ROOMS_LIST, this.rooms); //отправляем на клиенты актуальную инфу о комнатах (число пользаков в комнате обновилось)
        this.io.to(joinTag).emit(this.SOCKET_MESSAGES.SHOW_USERS_IN_ROOM, this.rooms[roomIndex].users); //обновляем список пользаков в комнате у тех, кто там находится
    }

    _joinRoom = (joinTag, socket) => { //метод присоединения к комнате
        socket.join(joinTag); //присоединяем сокет пользака к комнате по ее тэгу присоединения
        let roomIndex = this.rooms.findIndex(el => el.joinTag == joinTag); //получаем индекс этой комнаты в массиве комнат
        const userData = this.mediator.get(this.TRIGGERS.GET_USER_BY_SOCKET_ID, socket.id); //получаем инфу о пользаке по его socket id
        this.rooms[roomIndex].users.push(userData.user.name); //закидываем в массив пользаков этой комнаты нашего пользака

        this._sendRoomsList(this.rooms); //обновляем инфу о комнатах на клиенте
        this.io.to(joinTag).emit(this.SOCKET_MESSAGES.SHOW_USERS_IN_ROOM, this.rooms[roomIndex].users)  //Отправляем на клиенты пользаков, которые находятся в этой комнате, обновленный список пользаков, находящихся в ней
    }


    _sendMessage(data = {}, socket) { //метод отправки сообщения на клиенты пользаков, находящихся в активной беседы
        const { message, joinTag } = data; //забираем с прилетевших данных сообщение и тэг комнаты, в которой это сообщение отправилось

        const userData = this.mediator.get(this.TRIGGERS.GET_USER_BY_SOCKET_ID, socket.id); //получаем инфу о пользаке, который отправил сообщение
        const { user } = userData; //забираем из этой инфы самого пользака (там еще есть индекс его расположения в массиве (скоро уберется))
        if (user) { //если прилетела не пустая инфа о пользаке
            let senderName = user.name; //берем ник пользака
            let id = user.id; //берем айдишник пользака
            this.io.to(joinTag).emit(this.SOCKET_MESSAGES.NEW_CHAT_MESSAGE, { message, senderName, id }); //в комнату, откуда
            //отправили это сообщение, отправляем его и инфу об отправителе на все остальные клиенты, подключенные к этой комнате
        }
    }

}

module.exports = ChatManager;