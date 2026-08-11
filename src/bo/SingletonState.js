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

    getFilterValue(params) {
        let localPrefix = ` ${this.prefix} function getFilterValue `;
        loggerInstance.debug(`${localPrefix} start`);
        let value = '';
        try{
            if (params === undefined || params === null) {
                throw new Error(`params must be set`);
            }
            if (!("filters") in params || params.filters === undefined || params.filters === null) {
                throw new Error(`params filters must be set`);
            }
            let filters = params.filters; 
            if (!("name") in params || params.name === undefined || params.name === null) {
                throw new Error(`params name must be set`);
            }
            let name = params.name;
            const filter = filters.find(filter => filter.name === name);
            if (filter !== undefined && filter !== null) {
                if (!("value") in filter || filter.value === undefined || filter.value === null) {
                    throw new Error(`filter with name '${name}' does not have value set`);
                }
                value = filter.value;
            }
        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            throw error;
        }
        loggerInstance.debug(`${localPrefix} end`);
        return value;
    }

    // add the new filter build from name operator value to the structure filters
    buildFilters(params) {
        let localPrefix = ` ${this.prefix} function buildFilters `;
        loggerInstance.debug(`${localPrefix} start`);
        let filters = [];
        try {
            if (params === undefined || params === null) {
                throw new Error(`params must be set`);
            }
            if (!("filters") in params || params.filters === undefined || params.filters === null) {
                throw new Error(`params filters must be set`);
            }
            filters = params.filters; 
            if (!("name") in params || params.name === undefined || params.name === null) {
                throw new Error(`params name must be set`);
            }
            let name = params.name;
            if (!("operator") in params || params.operator === undefined || params.operator === null) {
                throw new Error(`params operator must be set`);
            }
            let operator = params.operator;
            if (!("value") in params || params.value === undefined || params.value === null) {
                throw new Error(`params value must be set`);
            }
            let value = params.value;
            const mutateFilters = filters.filter(item => item.name !== name);
            mutateFilters.push({ name : name , operator : operator , value : value});
            filters = mutateFilters;
        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error}`
            loggerInstance.error(errorMessage);
            throw error;
        }
        loggerInstance.debug(`${localPrefix} end`);
        return filters;
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
            let errorMessage = `${localPrefix} : ${error} `
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
            let errorMessage = `${localPrefix} : ${error} `
            loggerInstance.error(errorMessage);
            throw error;
        }
        loggerInstance.debug(`${localPrefix} end`);
        return data;
    }


    async getList(params) {
        let localPrefix = ` ${this.prefix} function getList `;
        loggerInstance.debug(`${localPrefix} start, params : ${JSON.stringify(params)} `);
        let data = null;
        try {
            const remote = new Remote();
            data = await remote.getList(params);
        } catch (error) {
            // Handle errors here
            let errorMessage = `${localPrefix} : ${error} `
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
