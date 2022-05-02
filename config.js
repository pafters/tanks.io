const CONFIG = {
    NAME: 'tanks app',
    PORT: 3000,

    DATABASE: {
        HOST: '',
        PORT: '',
        NAME: 'tanks.db',
        USER: '',
        PASS: ''
    },

    SOCKET_MESSAGES: { //сюда закидываем все методы для связи между бэком и фронтом
        CREATE_ROOM: 'CREATE_ROOM', //Сидит в GameManager.js
        JOIN_ROOM: 'JOIN_ROOM', //Сидит в GameManager.js
        LEAVE_ROOM: 'LEAVE_ROOM', //Сидит в GameManager.js
        SHOW_ROOM_ID: 'SHOW_ROOM_ID', //Сидит в Game.js
        SHOW_ROOM: 'SHOW_ROOM',
        SHOW_JOYSTICK: 'SHOW_JOYSTICK',
        ANALISE_GAME_MOMENT_DATA: 'ANALISE_GAME_MOMENT_DATA',
        SHOW_POINT: 'SHOW_POINT',
    },

    MEDIATOR: {
        TRIGGERS: { //сюда, наверное, методы для обработки каких то данных между файлами в бэке
            GET_USER_BY_SOCKET_ID: 'GET_USER_BY_SOCKET_ID', //Сидит в UserManager.js
            GET_FLAG: 'GET_FLAG',
        },
        EVENTS: { //всякие события по типу входа, выхода, ...
            CREATE_USER: 'CREATE_USER',
            LOGOUT: 'LOGOUT',
        }
    }
}
module.exports = CONFIG;