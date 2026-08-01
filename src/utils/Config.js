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

                if (!("ui" in configData)) {
                    throw new Error('sezione ui non presente in configurazione');
                }
                let ui = configData.ui;
                if (!("mainMenu" in ui)) {
                    throw new Error('sezione mainMenu ui non presente in configurazione');
                }
                let mainMenu = ui.mainMenu;
                if (!Array.isArray(mainMenu)) {
                    throw new Error('la sezione mainMenu ui deve essere un array');
                }
                for (const item of mainMenu) {
                    if (!("label" in item)) {
                        throw new Error('un item di mainMenu non contiene il campo label');
                    }
                    const label = item.label;
                    if (label == null || label == "") {
                        throw new Error('un item di mainMenu contiene il campo label vuoto');
                    }
                    if (!("icon" in item)) {
                        throw new Error(`l'item con etichetta ${label} di mainMenu non contiene il campo icon`);
                    }
                    const icon = item.icon;
                    if (icon == null || icon == "") {
                        throw new Error(`l'item con etichetta ${label}  di mainMenu contiene il campo icon vuoto`);
                    }
                    if (!("actionCode" in item)) {
                        throw new Error(`l'item con etichetta ${label} di mainMenu non contiene il campo actionCode`);
                    }
                    const actionCode = item.actionCode;
                    if (actionCode == null || actionCode == "") {
                        throw new Error(`l'item con etichetta ${label}  di mainMenu contiene il campo actionCode vuoto`);
                    }
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

    getRestServerUrl() {
        //await this.readConfig();
        return this.config.restServer.url;
    }

    getMainMenu() {
        //await this.readConfig();
        return this.config.ui.mainMenu;
    }

}

// Export a single instance
const configInstance = new Config();
export default configInstance;

