const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    origins: ['http://localhost:3000'],
});

const { NAME, PORT, SOCKET_MESSAGES, MEDIATOR, DATABASE } = require('./config');
const DB = require('./application/modules/db/DB');
const Mediator = require('./application/modules/Mediator');
const UserManager = require('./application/modules/users/UserManager');
const GameManager = require('./application/modules/games/GameManager');

const db = new DB(DATABASE);
const mediator = new Mediator(MEDIATOR);
const users = new UserManager({ io, SOCKET_MESSAGES, mediator, db });
new GameManager({ io, SOCKET_MESSAGES, mediator, db });

app.use(express.static('public'));

server.listen(PORT, () => console.log('все ок, работаем', NAME));

function deinitModules() {
    db.destructor();
    setTimeout(() => process.exit(), 500);
}

process.on('SIGINT', deinitModules);