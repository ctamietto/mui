import loggerInstance from "./Logger";

class Config {
    prefix = "class Config";

    constructor() {
        if (Config.instance) {
            return Config.instance;
        }
        Config.instance = this;
        return this;
    }

    async readConfig() {
        let localPrefix = ` ${this.prefix} function readConfig `;
        loggerInstance.debug(`${localPrefix} start`);

        try {
            if (this.config == null) {
                let urlConfig = "/config/config.json";
                const response = await fetch(urlConfig);
                if (!response.ok) {
                    throw new Error(`errore HTTP su lettura file di configurazione , Status: ${response.status}`);
                }
                const configData = await response.json();
                if (configData == null) {
                    throw new Error('file di condifurazione vuoto');
                }
                loggerInstance.debug(`${localPrefix} config data  : ${JSON.stringify(configData)}`);
                if (!("restServer" in configData)) {
                    throw new Error('sezione restServer non presente in configurazione');
                }
                const restServer = configData.restServer;
                if (!("url" in restServer)) {
                    throw new Error(`proprieta' url restServer non presente in configurazione`);
                }
                this.config = configData;
            }
        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            throw error;
        }
        loggerInstance.debug(`${localPrefix} end`);
    }

    async getRestServerUrl() {
        await this.readConfig();
        return this.config.restServer.url;
    }

}

// Export a single instance
const configInstance = new Config();
export default configInstance;

