/* Import supporting libraries and files */
const db = require('../database/db');
const validator = require('../utils/validation');
const config = require('../config/config');
const bc = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        /* find a vlaid user */
        const user = await userService.findByEmail(username);

        if(!user || user?.data) {
            return {
                "state": "fail",
                "message": "No matching user found",
                "data": []
            }
        } else {

            /* Check the passwords macth */
            const matched = await bcrypt.compare(password, user?.data[0]?.password);

            if(!matched){
                return {
                    "state": "fail",
                    "message": "The provided password is incorrect",
                    "data": []
                }
            } else {

                /* The user is valid and they have provided a valid password
                 Now we can create the HWT tokens */
                const data = user.data[0];
                const payload = {
                    id: data.id,
                    username: data.username,
                    display_name: data.display_name,
                }

                const token = await jwt.sign(payload, config.JWT_SECRET_TOKEN);

                /* Before sending the token back ensure that it is valid */
                if(token && token.length > 0){
                    return token;
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