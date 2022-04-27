class Markup {
    constructor(divId) {
        this.showMarkup(divId);
    }

    showMarkup = (divId) => {
        switch (divId) {
            case 'menu':
                const divMenu = document.getElementById(`${divId}`);
                divMenu.innerHTML = `
                <button id = "createRoomBtn">Создать комнату</button>
                <div id = "outputId" value ="qwerty">qwerty</div>
                <button id = "enterBtn">Войти</button>
                `;
            break;

        }
    }
}