import loggerInstance from "../utils/Logger.js";
import stateInstance from "../bo/SingletonState.js"

class SingletonUIState {
    prefix = "class SingletonUIState";
    globalVariables = {

    }
    companySelectList = null;

    constructor() {
        if (SingletonUIState.instance) {
            return SingletonUIState.instance;
        }
        SingletonUIState.instance = this;
        return this;
    }

    async delay(ms) { await new Promise((resolve) => setTimeout(resolve, ms)) };

    async ping(setLoading,setOpenSuccess,setOpenError) {
        let localPrefix = ` ${this.prefix} function ping `;
        loggerInstance.debug(`${localPrefix} start`);
        let data = null;
        try {
            // visualizza loader indicante esecuzione procedura in corso
            setLoading(true);
            data = await stateInstance.ping();
            await this.delay(1000);
            loggerInstance.debug(`${localPrefix} pingResult : ${JSON.stringify(data)}`);
            this.setGlobalVariables("successMessage", "ping eseguito con successo");
            // visualizza messaggio di successo
            setOpenSuccess(true);
        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            this.setGlobalVariables("errorMessage", errorMessage);
            // visualizza messaggio di errore
            setOpenError(true);
        } finally {
            setLoading(false);
        }

        loggerInstance.debug(`${localPrefix} end`);
        return data;
    }

    setGlobalVariables(variablesName, variablesValue) {
        let localPrefix = ` ${this.prefix} function getGlobalVariables `;
        //loggerInstance.debug(`${localPrefix} start`);
        try {
            this.globalVariables[variablesName] = variablesValue;

        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            throw error;
        }

        //loggerInstance.debug(`${localPrefix} end`);
        return variablesValue;
    }

    getGlobalVariables(variablesName) {
        let localPrefix = ` ${this.prefix} function getGlobalVariables } `;
        //loggerInstance.debug(`${localPrefix} start , variablesName : ${variablesName}`);
        let variablesValue = null;

        try {
            if (variablesName in this.globalVariables) {
                variablesValue = this.globalVariables[variablesName];
            }

        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            throw error;
        }

        //loggerInstance.debug(`${localPrefix} end , variablesValue : ${variablesValue} `);
        return variablesValue;
    }

}

// Export a single instance
const stateUIInstance = new SingletonUIState();
export default stateUIInstance;
