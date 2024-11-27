const jwt = require("jsonwebtoken");
const config = require('../config/config');
const validator = require('../utils/validation');
const {logger} = require("../config/logging");

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
        const optRefresh = { expiresIn: config.JWT_DEFAULT_EXPIRY_REFRESH || "1d" };

        /* Sign the tokens */
        const accessToken = await jwt.sign(payload, config.JWT_SECRET_TOKEN, optAccess);
        const refreshToken = await jwt.sign(payload, config.JWT_SECRET_REFRESH, optRefresh);

        /* Ensure the tokens are valid before sending back */
        validator(accessToken).isDefined().isString().minLen(1);
        validator(refreshToken).isDefined().isString().minLen(1);

        return { accessToken, refreshToken }

    } catch(error) {
        logger.log('error', 'Tokens util: ' + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * Verifies an access token 
 * @param {String} token - The token being verified
 */
const verifyAccessToken = async token => {

    try {

        /* Validate the passed in arguments */
        validator(token).isDefined().isString().minLen(1);

        /* Verify the token */
        return await jwt.verify(token, config.JWT_SECRET_TOKEN);

    } catch(error) {
        logger.log('error', 'Tokens util: ' + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};

/**
 * Verifies an refresh token 
 * @param {String} token - The token being verified
 */
const verifyRefreshToken = async token => {

    try {

        /* Validate the passed in arguments */
        validator(token).isDefined().isString().minLen(1);

        /* Verify the token */
        return await jwt.verify(token, config.JWT_SECRET_REFRESH);

    } catch(error) {
        logger.log('error', 'Tokens util: ' + error.message);
        return {
            "state": "fail",
            "message": error.message,
            "data": []
        }
    }

};


module.exports = {
    generateTokens,
    verifyAccessToken,
    verifyRefreshToken
}