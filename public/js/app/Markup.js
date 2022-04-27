class Markup {
    constructor(divId) {
        this.showMarkup(divId);
    }

    showMarkup = (divId) => {
        const divMenu = document.getElementById(`${divId}`);
        switch (divId) {
            case 'menu':
                divMenu.innerHTML = `
                <button id = "createRoomBtn">Создать комнату</button>
                <div id = "roomIdContainer"></div>
                <button id = "enterBtn">Войти</button>
                `;
                break;
            case 'game':
                divMenu.innerHTML = `
                <div id = "game">Игра</div>
                `;
                break;
        }
    }
}