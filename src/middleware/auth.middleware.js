/* Import supporting libraries and files */
const validator = require('../utils/validation');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../database/db');

/**
 * Checks if a user is authenticated and if they are then
 * adds the user details to the request object
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {object} done - Express done object - allows us to move on to the next middleware
 */
const isAuthenticated = async (req, res, done) => {

    try{

        /* Attempt to get the authentication header */
        const auth = req.get('Authorization');

        if(!auth){
            return res.status(401).json({
                "status": 401,
                "state": "fail",
                "message": "Must be logged in to access this resource",
                "data": []
            })
        } else {

            /* Split the auth header */
            const auth_split = auth.split(" ");

            /* Check if we have a bearer token */
            if(!auth_split[0] === "Bearer" || auth_split[1].length <= 0){
                return res.status(401).json({
                    "status": 401,
                    "state": "fail",
                    "message": "Must be logged in to access this resource",
                    "data": []
                });
            } else {
                /* Now we need to ensure the token supplied is valid */
                const token = await jwt.verify(auth_split[1], config.JWT_SECRET_TOKEN);

                if(!token){
                    return res.status(401).json({
                        "status": 401,
                        "state": "fail",
                        "message": "Must be logged in to access this resource",
                        "data": []
                    });
                } else {
                    /* Token is valid, decode and add to the request object */
                    const decoded_token = await jwt.decode(auth_split[1]);
                    if(!decoded_token){
                        return res.status(401).json({
                            "status": 401,
                            "state": "fail",
                            "message": "Must be logged in to access this resource",
                            "data": []
                        });
                    } else {
                       /* Finally we can add the decoded token fields to the request object */
                       req.user = {
                        id: decoded_token.id,
                        username: decoded_token.username,
                        display_name: decoded_token.display_name
                       } 

                       /* Proceed to the next middleware */
                       done()
                    }
                }
                
            }

        }


    } catch(error) {
        console.log(error);

        /* Check if the token has exopired at all */
        if(error.message === "jwt expired"){
            return res.status(401).json({
                "status": 401,
                "state": "fail",
                "message": "access token expired",
                "data": []
            })
        }

        return res.status(401).json({
            "status": 401,
            "state": "fail",
            "message": "Must be logged in to access this resource",
            "data": []
        })
    }

}

/**
 * Checks if the device sending data is registered with a valid api key
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {object} done - Express done object - allows us to move on to the next middleware
 */
const isValidDevice = async (req, res, done) => {
    
    try {

        /* Extract and validate the APi Key */
        const api_key = req.get('x-api-key');
        validator(api_key).isDefined().isString().minLen(1);

        if(!api_key){
            return res.status(403).json({
                "status": 403,
                "state": "fail",
                "message": "You are not authorized to use this resource",
                "data": []
            })
        }

        /* Extract and validate the request body variables */
        const { mac_address } = req.body;
        validator(mac_address).isDefined().isString().minLen(1);


        /* Perform some checks to ensure the device is registered in
           the system and has been assigned a valid ap key */
        let sqlStmt = `
            SELECT d.id, d.mac_address FROM devices d INNER JOIN keys k ON d.id = k.device_id WHERE d.mac_address = $1; 
        `;
        let sqlValues = [mac_address];

        /* Execute the query and check the return value */
        let result = await db.query(sqlStmt, sqlValues);

        if(!result || result?.rows?.length <= 0){
            return res.status(403).json({
                "status": 403,
                "state": "fail",
                "message": "You are not authorized to use this resource",
                "data": []
            })
        } else {
            done();
        }

    } catch(error) {

        console.log(error);

        return res.status(403).json({
            "status": 403,
            "state": "fail",
            "message": "You are not authorized to use this resource",
            "data": []
        })

    }

};

module.exports = {
    isAuthenticated,
    isValidDevice
}