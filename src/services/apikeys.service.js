/* Import supporting libraries and files */
const db = require('../database/db');
const validator = require('../utils/validation');
const config = require('../config/config');
const { generateApiKey } = require('generate-api-key');
const {logger} = require('../config/logging');

/**
 * List all API keys
 */
const findApiKeys = async () => {

    try{

        /* Prepare the SQL statement and supporting values */
        const sqlStmt = "SELECT id, owner, device_id, key, created_at FROM keys";
        const sqlValues = [];

        /* Get the list of keys */
        const result = await db.query(sqlStmt, sqlValues);

        /* Check the query ran ok */
        if(!result){
            logger.log('error', "Api Keys Services: Problem retrieving keys");
            return {
                "state": "fail",
                "message": "Problem retrieving keys",
                "data": []
            };
        } else {

            if(result?.rows?.length <= 0){
                logger.log('warn', "Api Keys Services: No keys found");
                return {
                    "state": "fail",
                    "message": "No keys found",
                    "data": []
                };
            }

            return {
                "state": "ok",
                "message": "",
                "data": result?.rows
            };
        }


    } catch(error) {
        logger.log('error', "Api Keys Services: " + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * List and inidividual API key
 * @param {number} id - The id of the key
 */
const findApiKey = async id => {

    try{

        /* Perform validation */
        validator(id).isDefined().isNumber();

        /* Prepare the sql statement and values */
        const sqlStmt = "SELECT id, owner, device_id, key, created_at FROM keys WHERE id = $1";
        const sqlValues = [id];

        /* Get the list of keys */
        const result = await db.query(sqlStmt, sqlValues);

        /* Check the query ran ok */
        if(!result){
            logger.log('error', "Api Keys Services: Problem retrieving key");
            return {
                "state": "fail",
                "message": "Problem retrieving key",
                "data": []
            };
        } else {

            if(result?.rows?.length <= 0){
                logger.log('warn', "Api Keys Services: No key found");
                return {
                    "state": "fail",
                    "message": "No key found",
                    "data": []
                };
            }

            return {
                "state": "ok",
                "message": "",
                "data": result?.rows
            };
        }

    } catch(error) {
        logger.log('error', "Api Keys Services: " + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * Create a new key and store in the DB
 * @param {number} device_id - The device to which the api key belongs
 * @param {number} owner - The owner of the API key
 */
const createApiKey = async (owner, device_id) => {

    try {

        /* Perform validation */
        validator(owner).isDefined().isNumber();
        validator(device_id).isDefined().isNumber();

        /* Generate an API key */
        const apiKey = generateApiKey();
        validator(apiKey).isDefined().isString().minLen(1);

        /* Prepare the SQL statement and it's values */
        const sqlStmt = "INSERT INTO keys(owner, device_id, key) values ($1, $2, $3) RETURNING id, owner, device_id, key;";
        const sqlValues = [owner, device_id, apiKey];

        /* Execute the sql statement and check the operation was successful */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.rows?.length <= 0){
            logger.log('error', "Api Keys Services: Unable to create key");
            return {
                "state": "fail",
                "message": "Problem generating new api key",
                "data": []
            };
        } else {
            return {
                "state": "ok",
                "message": "API Key generated successfully",
                "data": result?.rows
            };
        }

    } catch(error) {
        logger.log('error', "Api Keys Services: " + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * Update an API key
 * @param {number} id - ID of the key being updated
 * @param {String} column - The column in the key table being updated
 * @param {any} value - The value being stored in the column 
 */
const updateApiKey = async (id, column, value) => {

    try {

        /* Perform validation */
        validator(id).isDefined().isNumber();
        validator(column).isDefined().isString().minLen(1);
        validator(value).isDefined();

        /* Prepare the SQL statement and it's supporting values */
        const sqlStmt = `UPDATE keys SET ${column} = $2 WHERE id = $1 RETURNING id, device_id, owner, key`;
        const sqlValues = [id, value];

        /* Execute the sql statement and check the result of it running */
        const result = await db.query(sqlStmt, sqlValues);
        if(!result){
            logger.log('error', "Api Keys Services: Unable to update api key");
            return {
                "state": "fail",
                "message": "Unable to update api key",
                "data": []
            };
        } else {

            if(result?.rows?.length <= 0){
                logger.log('warn', "Api Keys Services: No key found to update");
                return {
                    "state": "fail",
                    "message": "No key found to update",
                    "data": []
                }
            }

            return {
                "state": "ok",
                "message": "Key successfully updated",
                "data": result?.keys
            }

        }

    } catch(error) {
        logger.log('error', "Api Keys Services: " + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * Remove a key
 * @param {number} id - The id of the key to be deleted
 */
const removeKey = async id => {

    try{
      
        /* Perform Validation */
        validator(id).isDefined().isNumber();

        /* Prepare the sql statement and supporting values */
        const sqlStmt = `DELETE FROM keys WHERE id = $1 RETURNING id, owner, device_id, key`;
        const sqlValues = [id];

        /* Exeucte the prepared statement and check the result sent back by the db */
        const result = await db.query(sqlStmt, sqlValues);
        if(!result || result?.rows?.length <= 0){
            logger.log('error', "Api Keys Services: Problem removing key");
            return {
                "state": "fail",
                "message": "Problem removing api key",
                "data": []
            };
        } else {
            return {
                "state": "ok",
                "message": "API Key removed successfully",
                "data": result?.rows
            };
        }

    } catch(error) {
        logger.log('error', "Api Keys Services: " + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

module.exports = {
    findApiKeys,
    findApiKey,
    createApiKey,
    updateApiKey,
    removeKey
}