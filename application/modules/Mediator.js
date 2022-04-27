class Mediator {
    constructor(options) {
        const { TRIGGERS, EVENTS } = options;
        this.triggers = {}; // список функций-триггеров
        this.TRIGGERS = TRIGGERS; // список названий триггеров
        this.events = {}; // список событий
        this.EVENTS = EVENTS; // список названий событий

        Object.keys(this.TRIGGERS)
            .forEach(key => this.triggers[this.TRIGGERS[key]] = () => null);
        Object.keys(this.EVENTS)
            .forEach(key => this.events[this.EVENTS[key]] = []);
    }

    /******************/
    /* about triggers */
    /******************/
    getTriggerNames() {
        return this.TRIGGERS;
    }

    set(name, func) {
        if (name && this.triggers[name] && func instanceof Function) {
            this.triggers[name] = func;
        }
    }

    get(name, data) {
        if (name && 
            this.triggers[name] && 
            this.triggers[name] instanceof Function
        ) {
            return this.triggers[name](data);
        }
        return null;
    }

    /****************/
    /* about events */
    /****************/
    getEventNames() {
        return this.EVENTS;
    }

    subscribe(name, func) {
        if (name && this.events[name] && func instanceof Function) {
            this.events[name].push(func);
        }
    }

    call(name, data) {
        if (name && this.events[name]) {
            this.events[name].forEach(func => {
                if (func instanceof Function) {
                    func(data);
                }
            });
        }
    }
}

module.exports = Mediator;