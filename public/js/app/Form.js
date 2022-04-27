class Form {
    constructor(divId) {
        this.insertTemplate(divId);
    }

    createDiv(divId) {
        document.getElementById('divMarkup').innerHTML = `<div id = ${divId}></div>`;
    }

    insertTemplate(divId) {
        this.createDiv(divId);
        switch (divId) {
            case 'menu':
                new Markup(divId);
                new Menu();
                break;
        }
    }
}