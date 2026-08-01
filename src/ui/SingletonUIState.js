import loggerInstance from "../utils/Logger.js";
import stateInstance from "../bo/SingletonState.js"
import configInstance from "../utils/Config.js";

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

    async initializeApplication() {
        let localPrefix = ` ${this.prefix} function initializeApplication `;
        loggerInstance.debug(`${localPrefix} start`);
        try {
            await configInstance.readConfig();
            //await this.delay(1000);
        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
        } finally {
        }

        loggerInstance.debug(`${localPrefix} end`);
    }

    async testDB(setLoading,setOpenSuccess,setOpenError) {
        let localPrefix = ` ${this.prefix} function testDB `;
        loggerInstance.debug(`${localPrefix} start`);
        let data = null;
        try {
            // nascondi eventuali messaggi ancora visualizzati
            setOpenSuccess(false);
            setOpenError(false);
            // visualizza loader indicante esecuzione procedura in corso
            setLoading(true);
            data = await stateInstance.testDB();
            await this.delay(500);
            loggerInstance.debug(`${localPrefix} testDBResult : ${JSON.stringify(data)}`);
            let message = `testDB eseguito con successo , result = ${JSON.stringify(data.data)}`;
            this.setGlobalVariables("successMessage", message);
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

    async ping(setLoading,setOpenSuccess,setOpenError) {
        let localPrefix = ` ${this.prefix} function ping `;
        loggerInstance.debug(`${localPrefix} start`);
        let data = null;
        try {
            // nascondi eventuali messaggi ancora visualizzati
            setOpenSuccess(false);
            setOpenError(false);
            // visualizza loader indicante esecuzione procedura in corso
            setLoading(true);
            data = await stateInstance.ping();
            await this.delay(500);
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

    async getList(setLoading,setOpenSuccess,setOpenError,params) {
        let localPrefix = ` ${this.prefix} function getList `;
        loggerInstance.debug(`${localPrefix} start , params : ${JSON.stringify(params)}`);
        let data = null;
        try {
            // nascondi eventuali messaggi ancora visualizzati
            setOpenSuccess(false);
            setOpenError(false);
            // visualizza loader indicante esecuzione procedura in corso
            setLoading(true);
            await this.delay(500);
            data = await stateInstance.getList(params);
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
