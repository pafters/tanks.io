class Game {
    constructor(joinTag, socket, userId) {
        this.joinTag = joinTag;
        this.socket = socket;
        this.userId = userId;
        console.log(joinTag, socket, userId);
    }
}