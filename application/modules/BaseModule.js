class BaseModule {
    constructor({ io, SOCKET_MESSAGES, mediator }) {
        this.io = io;
        this.mediator = mediator;
        this.SOCKET_MESSAGES = SOCKET_MESSAGES;
        this.TRIGGERS = mediator.getTriggerNames();
        this.EVENTS = mediator.getEventNames();
    }
}

module.exports = BaseModule;