class User {
    constructor(name, id, roomId, tankColor, socketId) {
        this.name = name;
        this.id = id;
        this.socketId = socketId;
        this.roomId = roomId;
        this.x = 100;
        this.y = 100;
        this.tankColor = tankColor;
        this.hp = 100;
        this.speed = 0;
        this.angle = 0;
        this.angleTurret = 0;
    }
}

module.exports = User;