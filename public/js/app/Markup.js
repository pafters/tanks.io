class Markup {
    constructor(divId) {
        this.showMarkup(divId);
    }

    createDiv(divId) {
        document.getElementById('divMarkup').innerHTML = `<div id = ${divId}></div>`;
    }

    showMarkup = (divId) => {
        this.createDiv(divId);
        const div = document.getElementById(`${divId}`);
        switch (divId) {
            case 'menu':
                div.innerHTML = `
                <button id = "createRoomBtn">Create room</button>
                <div id = "roomIdContainer"></div>
                <button id = "enterBtn">Enter</button>
                <button id = "switchToMobBtn">Mobile version</button>
                `;
                break;
            case 'game':
                div.innerHTML = `
                <button id = "leaveGame">Выйти из игры</button>
                <canvas id = "gameCanvas"></canvas>
                `;
                break;
            case 'auth':
                div.innerHTML = `
                <input id = "inpName" placeholder = "Write your nickname">
                <input id = "inpRoomId" placeholder = "Write Room ID">
                <button id = "enterBtn">Enter</button>
                <button id = "switchToFullScrBtn">Full Screen</button>
                `;
                break;
            case 'joystick':
                div.innerHTML = `
                    <p id = "hp"></p> <button id = "leaveBtn">Выйти</button>
                    <div id = "joystick">
                        <p id = "userNameContainer"></p>
                        <p style="text-align: center;">
                            X: <span id="x_coordinate"> </span>
                            Y: <span id="y_coordinate"> </span>
                            Speed: <span id="speed"> </span> %
                            Angle: <span id="angle"> </span>
                        </p>
                        <canvas id = "canvas"></canvas>
                    </div>
                `;
                break;
        }
    }
}