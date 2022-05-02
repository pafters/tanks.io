class Joystick {

    constructor(socket, flag, userName, joinTag) {
        this.socket = socket;
        this.userName = userName;
        this.joinTag = joinTag;
        this.flag = flag;
        this.canvas;
        this.ctx;
        this.width;
        this.height;
        this.radius;
        this.x_orig;
        this.y_orig;
        this.coord = { x: 0, y: 0 };
        this.paint = false;
        this.speed = 0;
        this.angle_in_degrees = 0;
        this.x = 100;
        this.y = 100;

        this.render();
    }

    render() {
        if (this.flag) {
            this.elements();
            this.addEventListeners();
        }
    }
    elements() {
        this.leaveBtn = document.getElementById('leaveBtn');
        this.userNameContainer = document.getElementById('userNameContainer');
        this.userNameContainer.innerHTML = `${this.userName}`;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    addEventListeners() {
        this.leaveBtn.addEventListener('click', () => {
            this.socket.emit('LEAVE_ROOM', this.joinTag);
            new Markup('auth');
            new Auth(this.socket, true);
            this.flag = false;
        })
        //0

        if (this.ctx) {
            document.addEventListener('mousedown', this.startDrawing);
            document.addEventListener('mouseup', this.stopDrawing);
            document.addEventListener('mousemove', this.Draw);

            document.addEventListener('touchstart', this.startDrawing);
            document.addEventListener('touchend', this.stopDrawing);
            document.addEventListener('touchcancel', this.stopDrawing);
            document.addEventListener('touchmove', this.Draw);
            window.addEventListener('resize', this.resize);

            document.getElementById("x_coordinate").innerText = this.x;
            document.getElementById("y_coordinate").innerText = this.y;
            document.getElementById("speed").innerText = this.speed;
            document.getElementById("angle").innerText = this.angle_in_degrees;
            this.resize();
        }


    }

    send = (x, y, speed, angle) => {
        var data = { "x": x, "y": y, "speed": speed, "angle": angle };
        data = JSON.stringify(data);

    }

    resize = () => {//0 просто смерть
        this.width = window.innerWidth;
        this.radius = 200;//размер джойстика
        this.height = this.radius * 6.5;//высота места где расположен джойстик  
        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;
        this.background();
        this.joystick(this.width / 2/*стартовое положение джойстика относительно бэка по ширине PS после нажатия переходит в центр */, this.height / 3/*тоже самое только относитедьно */);
    }

    background = () => {//про бэк круг /0 ничего нет от джойстика 
        this.x_orig = this.width / 2;// центр(по ширине) бэка и отсчета координатыx 
        this.y_orig = this.height / 3;//центрбэка(по высоте) и отсчета координаты y 

        this.ctx.beginPath();//обозначает начало рисования
        this.ctx.arc(this.x_orig, this.y_orig, this.radius + 20, 0, Math.PI * 2, true);//чтобы нарисовакть круг указвыем центр относительно осей
        this.ctx.fillStyle = '#ECE5E5';//назначем цвет бэка(серый)
        this.ctx.fill();//заполням бэк выбранным цветом
    }

    joystick = (width, height) => {//0 остается только бэк фон и р
        this.ctx.beginPath();//обозначает начало рисования
        this.ctx.arc(width, height, this.radius, 0, Math.PI * 2, true);//чтобы нарисовакть круг указвыем центр относительно осей
        this.ctx.fillStyle = '#F08080';//назначем цвет внутренней части джойстика
        this.ctx.fill();
        this.ctx.strokeStyle = '#F6ABAB';//назначем цвет рамки джойстика
        this.ctx.lineWidth = 8;
        this.ctx.stroke();
    }

    getPosition = (event) => {//0 джойстик перестант двигаться
        var mouse_x = event.clientX || event.touches[0].clientX;
        var mouse_y = event.clientY || event.touches[0].clientY;
        this.coord.x = mouse_x - this.canvas.offsetLeft;
        this.coord.y = mouse_y - this.canvas.offsetTop;
    }

    is_it_in_the_circle = () => {//0 при клике на круг исчезает цвет, остается только бэк
        var current_radius = Math.sqrt(Math.pow(this.coord.x - this.x_orig, 2) + Math.pow(this.coord.y - this.y_orig, 2));
        if (this.radius >= current_radius) return true
        else return false
    }

    startDrawing = (event) => {//0 все престает работать и становится обычной 'картинокй'
        this.paint = true;
        this.getPosition(event);
        if (this.is_it_in_the_circle()) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.background();
            this.joystick(this.coord.x, this.coord.y);
            this.Draw();
        }
    }

    stopDrawing = () => {//+-0 джойстик работает по кадрово значения не передаюстя
        this.paint = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background();
        this.joystick(this.width / 2, this.height / 3);
        document.getElementById("x_coordinate").innerText = this.x;
        document.getElementById("y_coordinate").innerText = this.y;
        document.getElementById("speed").innerText = 0;
        document.getElementById("angle").innerText = this.angle_in_degrees;

    }

    Draw = (event) => {//джойстик тянется в направлении но не изменяет его

        if (this.paint) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.background();
            var x, y;
            var angle = Math.atan2((this.coord.y - this.y_orig), (this.coord.x - this.x_orig));

            if (Math.sign(angle) == -1) {
                this.angle_in_degrees = Math.round(-angle * 180 / Math.PI);
            }
            else {
                this.angle_in_degrees = Math.round(360 - angle * 180 / Math.PI);
            }


            if (this.is_it_in_the_circle()) {
                this.joystick(this.coord.x, this.coord.y);
                x = this.coord.x;
                y = this.coord.y;
            }
            else {
                x = this.radius * Math.cos(angle) + this.x_orig;
                y = this.radius * Math.sin(angle) + this.y_orig;
                this.joystick(x, y);
            }

            this.getPosition(event);

            this.speed = Math.round(100 * Math.sqrt(Math.pow(x - this.x_orig, 2) + Math.pow(y - this.y_orig, 2)) / this.radius);

            var x_relative = Math.round(x - this.x_orig);
            var y_relative = Math.round(y - this.y_orig);
            const speed = this.speed;
            const mainAngle = this.angle_in_degrees;
            let joinTag = this.joinTag;
            this.socket.emit('ANALISE_GAME_MOMENT_DATA', { joinTag, speed, mainAngle });
            //this.x += (this.speed / 100) * 3 * (4 * Math.cos(Math.PI / 180 * this.angle_in_degrees) / 6);
            //this.y -= (this.speed / 100) * 3 * (4 * Math.sin(Math.PI / 180 * this.angle_in_degrees) / 6);
            //
            //
            //
            //document.getElementById("x_coordinate").innerText = this.x;
            //document.getElementById("y_coordinate").innerText = this.y;
            //document.getElementById("speed").innerText = this.speed;
            //document.getElementById("angle").innerText = this.angle_in_degrees;

            this.send(x_relative, y_relative, this.speed, this.angle_in_degrees);
        }
    }

}