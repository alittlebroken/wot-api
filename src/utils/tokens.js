const jwt = require("jsonwebtoken");
const config = require('../config/config');

/**
 * Creates a new set of access tokens 
 * @param {String} payload - The payload to be contained within the refresh token
 */
const generateTokens = async payload => {

    try {
        
        /* Validate the payload */
        validator(payload).isDefined();

        /* Create options for each type of token */
        const optAccess = { expiresIn: config.JWT_DEFAULT_EXPIRY || "5m" };
        const optRefresh = { ExpiresIn: config.JWT_DEFAULT_EXPIRY_REFRESH || "1d" };

        /* Sign the tokens */
        const accessToken = await jwt.sign(payload, config.JWT_SECRET_TOKEN, optAccess);
        const refreshToken = await jwt.sign(payload, config.JWT_SECRET_REFRESH, optRefresh);

        /* Ensure the tokens are valid before sending back */
        validator(accessToken).isDefined().isString().minLen(1);
        validator(refreshToken).isDefined().isString().minLen(1);

        return accessToken, refreshToken

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
    generateTokens
}