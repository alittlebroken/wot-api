/* Import supporting libraries and files */
const db = require('../database/db');
const validator = require('../utils/validation');

/**
 * Get a list of components
 */
const findComponents = async () => {

    try{

        /* Create the SQL statement and any supporting values required */
        const sqlStmt = "SELECT id, name, owner, description FROM components";

        /* Excute the SQL stement against the DB and store the results found */
        const results = await db.query(sqlStmt);

        if(!results || results?.rows?.length <= 0){
            return {
                "state": "fail",
                "message": "Unable to get list of components",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "Components successfully found",
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
 * Find an individual component
 * 
 * @param {number} id - The ide of the component to find
 */
const findComponent = async id => {

    try{

        /* Validate the passed in argument */
        validator(id).isDefined().isNumber();

        /* Create the SQL statements and supporting values to enable us to
        find the required component */
        const sqlStmt = "SELECT id, name, description, owner, device_id, created_at, edited_at FROM components WHERE id = $1";
        const sqlValues = [parseInt(id)];

        /* Execute the query and store the results back for checking */
        const results = await db.query(sqlStmt, sqlValues);

        if(!results || results?.rows?.length <= 0){
            return {
                "state": "fail",
                "message": "Unable to get find specified component",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "Component successfully found",
                "data": results?.rows
            }
        }

    } catch(error) {
        console.log(error);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        };
    }

};

/**
 * Creates a new component
 * @param {String} name - The components name
 * @param {String} description - The description of the component ( can be blank )
 * @param {number} owner - The owner of the component
 * @param {number} device_id - The device this component is associated with
 */
const createComponent = async () => {

    try{

        /* Validate the passed in arguments */
        validator(name).isDefined().isString().minLen(1);
        validator(owner).isDefined().isNumber();
        validator(device_id).isDefined().isNumber();

        /* Prepare the SQL and it's values for insertion */
        const sqlStmt = `
            INSERT INTO components(
             name, description, owner, device_id
            ) VALUES (
             $1, $2, $3, $4 
            );
        `;
        const sqlValues = [name, description, owner, device_id];

        /* Execute the SQL statement and check the returned data */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result){
            return {
                "state": "fail",
                "message": "Unable to add component",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "Component successfully added",
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
 * Updates a component
 * @param {number} id - The Id of the component being updated
 * @param {String} columm - The DB column to be updated in the table
 * @param {any} value - The new value being updated to
  */
const updateComponent = async (id, column, value) => {

    try{

        /* Validate passed in arguments */
        validator(id).isDefined().isNumber();
        validator(column).isDefined().isString().minLen(2);

        /* Prepare the statement and it's supporting values */
        const sqlStmt = `
            UPDATE components SET ${column} = $2 WHERE id = $1 RETURNING *;
        `;
        const sqlValues = [id, value];

        /* Execute ther statement against the DB */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result){
            return {
                "state": "fail",
                "message": "Unable to update component",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "Component successfully updated",
                "data": result?.rows
            }
        }

    } catch(error) {
        console.log(error);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        };
    }

};

module.exports = {
    findComponents,
    findComponent,
    createComponent,
    updateComponent
}