/* Import supporting libraries and files */
const db = require('../database/db');
const validator = require('../utils/validation');

/**
 * Gets a list of all refresh tokens
 */
const findTokens = async () => {

    try {

        /* Prepare the SQL statement and supporting values */
        const sqlStmt = "SELECT id, owner, token FROM tokens;";
        const sqlValues = [];

        /* Execute the statment and check the results returned */
        const results = await db.query(sqlStmt, sqlValues);

        if(!results) {
            return {
                "state": "fail",
                "message": "Unable to retrieve list of tokens",
                "data": []
            }
        } else {

            if(!results?.rows?.length <= 0 ){
                return {
                    "state": "fail",
                    "message": "No tokens found",
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
 * Finds an individual token
 * @param {number} id - The ID of the token we are after
 */
const findToken = async id => {

    try {

        /* Validate any passed in arguments */
        validator(id).isDefined().isNumber();

        /* Prepare the sql statement and it's supporting values */
        const sqlStmt = "SELECT id, owner, token FROM tokens WHERE owner = $1;";
        const sqlValues = [id];

        /* Execute the statment and check the results returned */
        const results = await db.query(sqlStmt, sqlValues);
        
        if(!results.rows) {
            return {
                "state": "fail",
                "message": "Unable to retrieve token",
                "data": []
            }
        } else {

            if(results?.rows?.length <= 0 ){
                return {
                    "state": "fail",
                    "message": "No token found",
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
 * Add a new refresh token 
 * @param {number} owner - The owner of the refresh token
 * @param {String} token - The actual refresh token being added
 */
const createToken = async (owner, token) => {

    try {

        /* Validate the passed in arguments */
        validator(owner).isDefined().isNumber();
        validator(token).isDefined().isString().minLen(1);

        /* Determine if the token already exists */
        let sqlStmt = "SELECT id, owner, token FROM tokens WHERE token = $1;";
        let sqlValues = [token];

        let check = await db.query(sqlStmt, sqlValues);

        if(!check){
            return {
                "state": "fail",
                "message": "Problem whilst checking for existing token",
                "data": []
            }
        } else {
            if(check?.rows?.length >= 1) {
                return {
                    "state": "fail",
                    "message": "Token already in use",
                    "data": []
                }
            } else {
                /* OK at this point the token is new and can be used, add it to the table */
                sqlStmt = "INSERT INTO tokens (owner, token) VALUES ($1, $2) RETURNING id, owner, token;";
                sqlValues = [owner, token];

                let result = await db.query(sqlStmt, sqlValues);

                if(!result || result?.rows?.length <= 0){
                    return {
                        "state": "fail",
                        "message": "Problem whilst saving token",
                        "data": []
                    }
                } else {

                    return {
                        "state": "ok",
                        "message": "token saved successfully",
                        "data": result?.rows
                    }

                }
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
 * Updates a stored token
 * @param {number} id - The ID of the token being updated
 * @param {String} column - The column being updated
 * @param {any} value - The value for the column being updated
 */
const updateToken = async (id, column, value) => {

    try {

        /* Validate the passed in arguments */
        validator(id).isDefined().isNumber();
        validator(column).isDefined().isString().minLen(1);
        validator(value).isDefined();

        /* Prepare the sql statement and it's supporting values */
        const sqlStmt = `UPDATE tokens SET ${column} = $2 WHERE id = $1 RETURNING id, owner, token;`;
        const sqlValues = [id, value];

        /* Execute the statement and check the result returned */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result){
            return {
                "state": "fail",
                "message": "Problem updating stored token",
                "data": []
            }
        } else {
            if(result?.rows?.length <= 0){
                return {
                    "state": "fail",
                    "message": "No token found to update",
                    "data": []
                }
            }

            return {
                "state": "ok",
                "message": "token successfully updated",
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
 * Removes a token
 * @param {number} id - The id of the token beign removed
 */
const removeToken = async id => {

    try {

        /* Validate the passed in argument */
        validator(id).isDefined().isNumber();

        /* Prepare the sql statement and it's supporting values */
        const sqlStmt = "DELET FROM tokens WHERE id = $1 RETURNING id, owner, token;";
        const sqlValues = [id];

        /* Execute the statement and check the result */
        const result = await db.query(sqlStmt, sqlValues);

        if(!result){
            return {
                "state": "fail",
                "message": "Problem whilst removing token",
                "data": []
            }
        } else {

            if(result?.rows?.length <= 0){
                return {
                    "state": "fail",
                    "message": "no token found to be removed",
                    "data": []
                }
            }

            return {
                "state": "ok",
                "message": "token successfully removed",
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
    findTokens,
    findToken,
    createToken,
    updateToken,
    removeToken
}