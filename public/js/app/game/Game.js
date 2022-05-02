class Game {
    constructor(socket, flag = false, joinTag, roomId) {
        this.flag = flag;
        this.joinTag = joinTag;
        this.roomId = roomId;
        this.socket = socket;
        this.render();

        this.socket.on('SHOW_POINT', this.showPoint);
    }

    render() {
        if (this.flag) {
            this.elements();
            this.addEventListenners();
        }
    }

    addEventListenners() {
        this.leaveGame.addEventListener('click', () => {
            this.socket.emit('LEAVE_ROOM', this.joinTag);
            this.joinTag = null;
            new Markup('menu');
            new Menu(this.socket, true);
            this.flag = false;
        })
    }

    elements() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.canvas.width = window.innerWidth;;
        this.ctx.canvas.height = window.innerHeight;
        this.leaveGame = document.getElementById('leaveGame');
    }

    showPoint = (data) => {
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const { x, y } = data;
        console.log(x, y)
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = '#003300';
        this.ctx.stroke();
    }
}