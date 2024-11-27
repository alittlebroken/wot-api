/* Import supporting libraries and files */
const validator = require('../utils/validation');
const bc = require('bcrypt');
const userService = require('./user.service');
const {logger} = require('../config/logging');

/**
 * Login a user
 * @param {String} username - The username of the user
 * @param {String} password - The password for the user
 */
const login = async (username, password) => {

    try{

        /* Validate the passed in arguments */
        validator(username).isDefined().isString().minLen(1);
        validator(password).isDefined().isString().minLen(8);

        /* find a valid user */
        const user = await userService.findByEmail(username);

        if(!user || user?.data?.length <= 0) {
            logger.log('warn', "Auth Service: No matching user found");
            return {
                "state": "fail",
                "message": "No matching user found",
                "data": []
            }
        } else {

            /* Check the passwords match */
            const matched = await bc.compare(password, user?.data[0]?.password);

            if(!matched){
                logger.log('warn', "Auth Service: password mismatch");
                return {
                    "state": "fail",
                    "message": "The provided password is incorrect",
                    "data": []
                }
            } else {

                /* we have successfully logged in */
                logger.log('info', "Auth Service: login successful");
                return {
                    "state": "ok",
                    "message": "Logged in successfully",
                    "data": user
                }

            }

        }

    } catch(error) {
        logger.log('error', "Auth Service: " + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

module.exports = {
    login
}