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

module.exports = {
    findComponents
}