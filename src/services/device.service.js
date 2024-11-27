/* Import supporting libraries and files */
const db = require('../database/db');
const validator = require('../utils/validation');
const {logger} = require('../config/logging');

/**
 * Adds a new device to the system
 * @param {String} name - The name of the device
 * @param {String} mac_address - The mac address of the device
 * @param {numeric} owner - The user the device belongs to
 * @param {String} description - Description of the device
 * @returns {array} - Details of the device added
 */
const createDevice = async (name, mac_address, owner, description) => {

    try{

        /* Validate the passed in arguments */
        validator(name).isDefined().isString().minLen(1);
        validator(mac_address).isDefined().isString().minLen(1);
        validator(owner).isDefined().isNumber();

        /* Create the sql statement needed to add the new device */
        const sqlStmt = `INSERT INTO devices (name, mac_address, owner, description) VALUES($1, $2, $3, $4, $5);`

        /* Values being added */
        const stmtValues = [name, mac_address, owner, description];

        /* Check that the mac_address is not already been added before */
        const chkStmt = `SELECT id FROM devices WHERE mac_address = $1`;
        const chkValues = [mac_address];

        /* Perform the check to see if the device already exists */
        const chkRes = await db.query(chkStmt, chkValues);

        if(chkRes && chkRes?.rows?.length > 0){
            logger.log('warn', "Device Service: Device already exists");
            return {
                "status": "fail",
                "message": "Device already exists",
                "data": []
            }
        }

        /* Save the data to the DB */
        const result = await db.query(sqlStmt, stmtValues);

        if (!result || result?.rows?.length < 0){
            logger.log('error', "Device Service: Unable to create device");
            return {
                "status": "fail",
                "message": "Unable to create new device",
                "data": []
            }
        }

        return {
            "status": "ok",
            "message": "Device successfully added",
            "data": result.rows
        }

    } catch(err) {
        logger.log('error', "Device Service: " + error.message);
        return {
            "status": "fail",
            "message": error.message,
            "data": []
        }

    }

};

/**
 * Gets a list of all devices
 * 
 */
const findDevices = async() => {

    try{

        /* Create the statement for selecting the devices */
        const sqlStmt = "SELECT * FROM devices";
        
        /* Exexute the query and then check that we have some results */
        const results = await db.query(sqlStmt);

        if(results && results?.rows?.length > 0){
            return {
                "state": "ok",
                "message": "",
                "data": results.rows
            }
        } else {
            logger.log('info', "Device Service: No devices found");
            return {
                "state": "ok",
                "message": "No records found",
                "data": []
            }
        }

    } catch(error) {
        logger.log('error', "Device Service: " + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

}

/**
 * Gets a specific device from the system
 * @param {number} id - The id of the devic ewe wish to find
 */
const findDevice = async (id) => {

    try{

        /* Validate the passed in argument */
        validator(id).isNumber().isDefined();

        /* Generate the SQL and assign values to an array */
        const sqlStmt = "SELECT * FROM devices WHERE id = $1";
        const sqlValues = [id];

        /* Get the required data from the DB */
        const results = await db.query(sqlStmt, sqlValues);

        /* Check the results have been sent back ok */
        if(!results){
            logger.log('error', "Device Service: Problem finding requested device");
            return {
                "state": "fail",
                "message": "Problem accessing the records from the DB",
                "data": []
            }
        } else {

            if(results?.rows?.length === 0){
                logger.log('info', "Device Service: No device found matching id provided");
                return {
                    "state": "ok",
                    "message": "No device found matching provided id",
                    "data": []
                }
            }

            return {
                "state": "ok",
                "message": "Device successfully found",
                "data": results?.rows
            }
        }

    } catch(error) {
        logger.log('error', "Device Service: " + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * Updates a device in the system
 * @param {number} id - The id of the device being updated
 * @param {string} column - The field to be updated
 * @param {any} value - The value of the column being updated
 */
const updateDevice = async (id, column, value) => {

    try {

        /* Validate the passed in arguments */
        const deviceId = parseInt(id);
        validator(deviceId).isDefined().isNumber();
        validator(column).isDefined().isString().minLen(1);
        validator(value).isDefined();

        /* Create the sql statement to run against the DB */
        const sqlStmt = `UPDATE devices SET ${column} = $1 WHERE id = $2`;
        const sqlValues = [value, deviceId];

        /* Execute the statement */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.state === "fail"){
            logger.log('error', "Device Service: Unable to update the specified device");
            return {
                "state": "fail",
                "message": "Unable to update the specified device",
                "data": []
            }
        } else {

            return {
                "state": "ok",
                "message": "Device successfully updated",
                "data": result?.data
            }

        }


    } catch(error) {
        logger.log('error', "Device Service: " + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * Deletes a device from the system
 * @param {number} id - The id of the device being deleted
 */
const removeDevice = async id => {

    try{

        /* Validate the passed in arguments */
        validator(id).isDefined().isNumber();

        /*  Create the sql statements and values to be used */
        const sqlStmt = "DELETE FROM devices WHERE id = $1 RETURNING id, name";
        const sqlValues = [id];

        /* Execute the statement */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.rows?.length <= 0){
            logger.log('error', "Device Service: Unable to find a device to be removed");
            return {
                "state": "fail",
                "message": "Unable to find device to be removed",
                "data": []
            }
        } else {

            return {
                "state": "ok",
                "message": "Device successfully removed",
                "data": result?.rows
            }

        }

    } catch(error) {
        logger.log('error', "Device Service: " + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data":  []
        };
    }

}; 

module.exports = {
    createDevice,
    findDevices,
    findDevice,
    updateDevice,
    removeDevice
}