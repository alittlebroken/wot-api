/* Import supporting libraries and files */
const validator = require('../utils/validation');
const service = require('../services/refreshtokens.service');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const security = require('../utils/tokens');
const {logger} = require('../config/logging');

/**
 * Rerfresh an access token
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const refreshToken = async (req, res) => {

    try {

        /* Check that we have a refresh token to use */
        if(!req.cookies['refreshToken']){
            logger.log('error', 'Refresh Token controller: No refresh token provided');
            return res.status(401).json({
                "status": 401,
                "state": "fail",
                "message": "No refresh token set",
                "data": []
            });
        };

        /* Now check the roken is valid */
        const token = await jwt.verify(req.cookies['refreshToken'], config.JWT_SECRET_REFRESH);

        if(!token){
            logger.log('error', 'Refresh Token controller: Invalid refresh token supplied');
            return res.status(401).json({
                "status": 401,
                "state": "fail",
                "message": "Invalid refresh token sent",
                "data": []
            });
        };

        /* Refresh token is OK, so lets generate new tokens */
        const { accessToken } = await security.generateTokens({
            id: token?.id,
            username: token?.username,
            display_name: token?.display_name
        })

        /* Check the acces token is OK and send it back */
        if(accessToken){
            return res.status(200).send(accessToken);
        } else {
            logger.log('error', 'Refresh Token controller: Unable to generate a new access token');
            return res.status(500).json({
                "status": 500,
                "state": "fail",
                "message": "Unable to generate new access token",
                "data": []
            });
        }


    } catch(error) {
        logger.log('error', 'Refresh Token controller: ' + error.message);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

};

module.exports = {
    refreshToken
}