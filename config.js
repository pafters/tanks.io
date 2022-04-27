const CONFIG = {
    NAME: 'test Is-21 App',
    PORT: 3000,

    SOCKET_MESSAGES: { //сюда закидываем все методы для связи между бэком и фронтом
        SEND_USER_DATA: 'sendUserData', //Сидит в UserManager.js
        GET_USERS_LIST: 'GET_USERS_LIST', //Сидит в UserManager.js
        SEND_MESSAGE: 'sendMessage', //Сидит в ChatManager.js
        NEW_CHAT_MESSAGE: 'newChatMessage', //Сидит в Chat.js
        CREATE_ROOM: 'CREATE_ROOM', //Сидит в ChatManager.js
        JOIN_ROOM: 'JOIN_ROOM', //Сидит в ChatManager.js
        LEAVE_ROOM: 'LEAVE_ROOM', //Сидит в ChatManager.js
        GET_ROOMS_LIST: 'GET_ROOMS_LIST', //Сидит в ChatManager.js
        SHOW_USERS_IN_ROOM: 'SHOW_USERS_IN_ROOM', //Сидит в Messanger.js
        SEND_ROOMS_LIST: 'SEND_ROOMS_LIST', //Сидит в ChatManager.js
        SHOW_ROOMS_LIST: 'SHOW_ROOMS_LIST',//Сидит в Messanger.js
        GET_USER_ID_BY_SOCKET_ID: 'GET_USER_ID_BY_SOCKET_ID',//Сидит в Authorization.js
        SEND_USER_ID_BY_SOCKET_ID: 'SEND_USER_ID_BY_SOCKET_ID'//Сидит в UserManager.js
    },

    MEDIATOR: {
        TRIGGERS: { //сюда, наверное, методы для обработки каких то данных между файлами в бэке
            GET_USER_BY_SOCKET_ID: 'GET_USER_BY_SOCKET_ID', //Сидит в UserManager.js
        },
        EVENTS: { //???
            TEST1: 'TEST1',
            TEST2: 'TEST2',
        }
    }
}
module.exports = CONFIG;