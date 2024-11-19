/* Import supporting libraries and files */
const validator = require('../utils/validation');
const bc = require('bcrypt');
const userService = require('./user.service');

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
            return {
                "state": "fail",
                "message": "No matching user found",
                "data": []
            }
        } else {

            /* Check the passwords macth */
            const matched = await bc.compare(password, user?.data[0]?.password);

            if(!matched){
                return {
                    "state": "fail",
                    "message": "The provided password is incorrect",
                    "data": []
                }
            } else {

                /* we have successfully logged in */
                return {
                    "state": "ok",
                    "message": "Logged in successfully",
                    "data": user
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

module.exports = {
    login
}