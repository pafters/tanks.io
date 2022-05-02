class BaseModule {
    constructor({ io, SOCKET_MESSAGES, mediator, db }) {
        this.io = io;
        this.db = db;
        this.mediator = mediator;
        this.SOCKET_MESSAGES = SOCKET_MESSAGES;
        this.TRIGGERS = mediator.getTriggerNames();
        this.EVENTS = mediator.getEventNames();
    }
}

module.exports = BaseModule;