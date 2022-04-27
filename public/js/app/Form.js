class Form {
    constructor(divId, socket, data) {
        this.insertTemplate(divId, socket, data);
    }

    createDiv(divId) {
        document.getElementById('divMarkup').innerHTML = `<div id = ${divId}></div>`;
    }

    insertTemplate(divId, socket, data) {
        this.createDiv(divId);
        switch (divId) {
            case 'menu':
                new Markup(divId);
                new Menu(socket);
                break;
            case 'game':
                const { joinTag, userId } = data;
                new Markup(divId);
                new Game(joinTag, socket, userId);
        }
    }
}