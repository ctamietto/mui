import loggerInstance from "../utils/Logger";
import configInstance from "../utils/Config";

export default class Remote {

    prefix = "class Remote";

    checkData(result) {
        let localPrefix = ` ${this.prefix} function checkData `;
        loggerInstance.debug(`${localPrefix} start`);
        try {
            if (!("data") in result) {
                throw new Error(`proprieta data non impostata nel risultato }`);
            }
        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            throw error;
        }
        loggerInstance.debug(`${localPrefix} end`);
    }

    checkResult(result) {
        let localPrefix = ` ${this.prefix} function checkResult `;
        loggerInstance.debug(`${localPrefix} start`);

        try {
            if (!("status") in result) {
                throw new Error(`proprieta status non impostata nel risultato }`);
            }
            const status = result.status;
            if (status !== "OK") {
                let message = "";
                if ("message" in result) {
                    message = result.message;
                }
                throw new Error(`fallita chiamata , status = ${status} , message = ${message}`);
            }

        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            throw error;
        }
        loggerInstance.debug(`${localPrefix} end`);
    }


    async testDB() {
        let localPrefix = ` ${this.prefix} function testDB `;
        loggerInstance.debug(`${localPrefix} start`);
        let data = null;
        try {
            const urlRestServer = await configInstance.getRestServerUrl();
            let url = `${urlRestServer}test/db`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`errore HTTP su chiamata remota test/db , Status: ${response.status}`);
            }
            data = await response.json();
            this.checkResult(data);
            this.checkData(data);

        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            throw error;
        }

        loggerInstance.debug(`${localPrefix} end`);
        return data;
    }

    async ping() {
        let localPrefix = ` ${this.prefix} function ping `;
        loggerInstance.debug(`${localPrefix} start`);
        let data = null;

        try {
            const urlRestServer = await configInstance.getRestServerUrl();
            //await new Promise(resolve => setTimeout(resolve, 1000));
            let url = `${urlRestServer}ping`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`errore HTTP su chiamata remota ping , Status: ${response.status}`);
            }
            data = await response.json();
            this.checkResult(data);
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