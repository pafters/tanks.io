window.onload = function () {
    const socket = io(window.location.origin);
    new Markup('menu');
    new Menu(socket, true);
}