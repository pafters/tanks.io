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

const mediator = new Mediator(MEDIATOR);
const users = new UserManager({ io, SOCKET_MESSAGES, mediator });
new GameManager({ io, SOCKET_MESSAGES, mediator });
const db = new DB(DATABASE);

(async () => {
    let user = await db.getUserByLogin('vasya');

    console.log(user);
    db.updateUserToken(2, 'petya - durak!');
    user = await db.getUserByLogin('petya');
    console.log(user);
})();

const Router = require('./application/router/router');
const router = new Router({ users });

io.on('connection', socket => {
    console.log('connected ', socket.id);
    socket.on('disconnect', () => console.log('disconnect', socket.id));
});

app.use('/', router);
app.use(express.static('public'));

server.listen(PORT, () => console.log('все ок, работаем', NAME));

function deinitModules() {
    db.destructor();
    setTimeout(() => process.exit(), 500);
}

process.on('SIGINT', deinitModules);