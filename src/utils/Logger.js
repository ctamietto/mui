class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        Logger.instance = this;
        return this;
    }

    debug(message) {
        console.log(message);
    }

    info(message) {
        console.log(message);
    }

    warn(message) {
        console.warn(message);
    }

    error(message) {
        console.error(message);
    }
}

// Export a single instance
const loggerInstance = new Logger();
export default loggerInstance;
