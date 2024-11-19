/* Import supporting libraries and files */
const db = require('../database/db');
const validator = require('../utils/validation');
const config = require('../config/config');
const bc = require('bcrypt');

/**
 * Finds a user by id
 * @param {number} id - The id of the user
 */
const findById = async id => {

    try{

        /* Validate the passed in arguments */
        validator(id).isDefined().isNumber();

        /* Prepare the SQL statement and supporting values */
        const sqlStmt = "SELECT id, display_name, username, password, last_logon, verified, locked FROM users WHERE id = $1";
        const sqlValues = [id];

        /* Execute the statement */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.rows?.length <= 0){
            return {
                "state": "fail",
                "message": "User not found",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "User found",
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
 * Finds a user by email address 
 * @param {String} email - The emial address of the user
*/
const findByEmail = async email => {

    try{

        /* Validate the passed in arguments */
        validator(email).isDefined().isString().minLen(1);

        /* Prepare the sql statement and values */
        const sqlStmt = "SELECT id, display_name, username, password, last_logon, verified, locked FROM users WHERE username = $1";
        const sqlValues = [email];

        /* Execute the statement */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.rows?.length <= 0){
            return {
                "state": "fail",
                "message": "User not found",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "User found",
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
 * Get a list of all users
 * 
 */
const findUsers = async () => {

    try{

        /* Prepare the sql statement and values */
        const sqlStmt = "SELECT id, display_name, username, last_logon, verified, locked FROM users";
        const sqlValues = [];

        /* Execute the statement */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.rows?.length <= 0){
            return {
                "state": "fail",
                "message": "User not found",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "User found",
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
 * Create a new user
 * @param {String} email - The users email address
 * @param {String} password - The password desired by the user
 * @param {String} display_name - The users display name
 */
const createUser = async (email, password, display_name) => {

    try{

        /* Validate the passed in arguments */
        validator(email).isDefined().isString().minLen(1);
        validator(password).isDefined().isString().minLen(8);
        validator(display_name).isDefined().isString().minLen(1);

        /* Hash the users password */
        const hashed_pass = await bc.hash(password, parseInt(config.SEC_SALT_ROUNDS));

        /* Prepare the sql statement and values */
        const sqlStmt = `
            INSERT INTO users(
                username, 
                password, 
                display_name
                ) 
            VALUES (
                $1, 
                $2, 
                $3) 
            RETURNING id, username, display_name;
        `;
        const sqlValues = [email, hashed_pass, display_name];

        /* Execute sql statement against the DB */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.rows?.length <= 0){
            return {
                "state": "fail",
                "message": "Unable to create user",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "User created successfully",
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
 * Updates a user
 * @param {number} id - The id of the user
 * @param {String} column - The table column being updated
 * @param {any} value - The new value the column will be updated to
 */
const updateUser = async (id, column, value) => {

    try{

        /* Validate the passed in data */
        validator(id).isDefined().isNumber();
        validator(column).isDefined().isString().minLen(3);
        validator(value).isDefined();

        /* Prep the SQL statement and supporting values */
        const sqlStmt = `
            UPDATE users SET ${column} = $2 WHERE id = $1 RETURNING id, username, display_name;
        `;
        const sqlValues = [id, value];

        /* Execute the sql statement */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result){
            return {
                "state": "fail",
                "message": "Unable to update user",
                "data": []
            }
        } else {
            if(result?.rows?.length <= 0){
                return {
                    "state": "fail",
                    "message": "No user found",
                    "data": []
                }
            }

            return {
                "state": "ok",
                "message": "User updated successfully",
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
 * Removes a user
 * @param {number} id - The id of the user
 */
const removeUser = async id => {

    try {

        /* Validate the passed in arguments */
        validator(id).isDefined().isNumber();

        /* Prepare the statement and supporting values */
        const sqlStmt = "DELETE FROM users WHERE id = $1 RETURNING id, username, display_name, last_logon;";
        const sqlValues = [id];

        /* Execute the statement and check the result of running it */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.rows?.length <= 0){
            return {
                "state": "fail",
                "message": "Unable to remove user",
                "data": []
            }
        } else {
            return {
                "state": "ok",
                "message": "User deleted successfully",
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
    findById,
    findByEmail,
    findUsers,
    createUser,
    updateUser,
    removeUser
}