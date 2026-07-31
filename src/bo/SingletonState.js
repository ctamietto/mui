import loggerInstance from "../utils/Logger.js";
import Remote from "../remote/Remote.js";

// singleton.js
class SingletonState {
    prefix = "class SingletonState";

    constructor() {
        if (SingletonState.instance) {
            return SingletonState.instance;
        }
        SingletonState.instance = this;
        return this;
    }

    async ping() {
        let localPrefix = ` ${this.prefix} function ping `;
        loggerInstance.debug(`${localPrefix} start`);
        let data = null;
        try {
            const remote = new Remote();
            data = await remote.ping();
        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            throw error;
        }

        loggerInstance.debug(`${localPrefix} end`);
        return data;
    }

    async testDB() {
        let localPrefix = ` ${this.prefix} function testDB `;
        loggerInstance.debug(`${localPrefix} start`);
        let data = null;
        try {
            const remote = new Remote();
            data = await remote.testDB();
        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            throw error;
        }

        loggerInstance.debug(`${localPrefix} end`);
        return data;
    }


}

// Export a single instance
const stateInstance = new SingletonState();
export default stateInstance;
