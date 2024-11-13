/* Import supporting libraries and files */
const db = require('../database/db');
const validator = require('../utils/validation');

/**
 * Gets a list of measurements
 */
const findMeasurements = async () => {

    try{

        /* Prepare the SQL Statements and Values */
        const sqlStmt = "SELECT * FROM measurements";
        const sqlValues = [];

        /* Execute the query */
        const results = await db.query(sqlStmt, sqlValues);

        if(!results){
            return {
                "state": "fail",
                "message": "Unable to get measurements",
                "data": []
            }
        } else {
            if(results?.rows?.length <=0){
                return {
                    "state": "ok",
                    "message": "Currently no measurements",
                    "data": []
                }
            }

            return {
                "state": "ok",
                "message": "",
                "data": results?.rows 
            }
        }

    } catch(error) {
        console.log(error);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * Gets a particular measurement
 * @param {number} id - The id of the measurement we wish to get
 */
const findMeasurement = async id => {

    /* Validate the passed in argument */
    validator(id).isDefined().isNumber();

    /* Generate the SQL statement and supporting values */
    const sqlStmt = "SELECT * FROM measurements WHERE id = $1";
    const sqlValues = [id];

    /* Execute the statement */
    const results = await db.query(sqlStmt, sqlValues);

    /* Check the result back from the DB and process it accordingly */
    if(!results){
        return {
            "state": "fail",
            "message": "Unable to retieve the specified measurement",
            "data": []
        }
    } else {
        if(results?.rows?.length <=0){
            return {
                "state": "ok",
                "message": "Unable to find the specified measurement",
                "data": []
            }
        }

        return {
            "state": "ok",
            "message": "",
            "data": results?.rows
        }

    }

};

/**
 * Creates a new measurement
 * @param {number} device_id - The id of the device this measurement belongs to
 * @param {number} component_id - The id of the component which produced this measurement
 * @param {String} value - The value for the component being recorded
 * @param {String} logged - The date and time of the measurement
 */
const createMeasurement = async (device_id, component_id, value, logged) => {

    try{

        /* Validate the passed in arguments */
        validator(device_id).isDefined().isNumber();
        validator(component_id).isDefined().isNumber();
        validator(value).isDefined();
        validator(logged).isDefined().isString().minLen(1);

        /* Create the SQL Statement and it's supporting values */
        const sqlStmt = `INSERT INTO measurements(device_id, component_id, value, logged) VALUES ($1, $2, $3m $4) RETURNING id`;
        const sqlValues = [device_id, component_id, value, logged];

        /* Execute the statement */
        const result = await db.query(sqlStmt, sqlValues);

        /* Check to ensure the operation was a success */
        if(!result || result?.rows?.length <= 0){
            return {
                "state": "fail",
                "message": "Unable to add measurement",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "Measurement successfully added",
                "data": result?.rows
            }
        }

    } catch(error) {
        console.log(error);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * Update a measurement
 * @param {number} id - The id of the measurement being updated
 * @param {String} column - The column in the measurement table being updated
 * @param {any} value - The value being updated to
 */
const updateMeasurement = async (id, column, value) => {

    try{

        /* Validate the passed in arguments */
        validator(id).isDefined().isNumber();
        validator(column).isDefined().isString().minLen(1);

        /* Create the sql statement and it's supporting values */
        const sqlStmt = `UPDATE measurements SET ${column} = $2 WHERE id = $1 RETURNING *`;
        const sqlValues = [id, value];

        /* Execute the sql statement and check the return value ensuring all is OK */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.rows?.length <= 0){
            return {
                "state": "fail",
                "message": "Unable to update specified measurement",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "Measurement successfully updated",
                "data": result?.rows
            }
        }

    } catch(error) {
        console.log(error);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * Remove a measurement from the system
 * @param {number} id - The id of the measurement being removed
 */
const removeMeasurement = async id => {

    try{

        /* Validate the passed in argument */
        validator(id).isDefined().isNumber();

        /* Create the SLQ Statement and it's supporting values */
        const sqlStmt = "DELETE FROM measurements WHERE id = $1 RETURNING *";
        const sqlValues = [id];

        /* Execute the statement against the DB and check afterwards to
           esnure there are no problems */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.rows?.length <= 0){
            return {
                "state": "fail",
                "message": "Unable to remove measurment",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "Measurment successfully removed",
                "data": result?.rows
            }
        }

    } catch(error) {
        console.log(error);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

module.exports = {
    findMeasurements,
    findMeasurement,
    createMeasurement,
    updateMeasurement,
    removeMeasurement
}