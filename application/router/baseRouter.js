class BaseRouter {
    constructor() {
        this.ERRORS = {
            1: 'incorrect input',
            2: 'invalid number',
            3: 'contact has not found',
            404: 'page not found',
            9000: 'unknown error'
        }
    }

    answer(data) {
        return {
            result: 'ok',
            data
        };
    }

    error(code) {
        const error = (code && this.ERRORS[code]) ?
            { code, text: this.ERRORS[code] } :
            { code: 9000, text: this.ERRORS[9000] }
        return {
            result: 'error',
            error
        }
    }

}

module.exports = BaseRouter;