const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    origins: ['http://localhost:3000'],
});

const { NAME, PORT, SOCKET_MESSAGES, MEDIATOR } = require('./config.js');
const Mediator = require('./application/modules/Mediator');
const UserManager = require('./application/modules/users/UserManager');
const ChatManager = require('./application/modules/chat/ChatManager');

const mediator = new Mediator(MEDIATOR);
const users = new UserManager({ io, SOCKET_MESSAGES, mediator });
new ChatManager({ io, SOCKET_MESSAGES, mediator });

const Router = require('./application/router/router');
const router = new Router({ users });

io.on('connection', socket => {
    console.log('connected ', socket.id);
    socket.on('disconnect', () => console.log('disconnect', socket.id));
});

app.use('/', router);
app.use(express.static('public'));

server.listen(PORT, () => console.log('все ок, работаем', NAME));