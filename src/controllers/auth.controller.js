/* Import supporting libraries and files */
const validator = require('../utils/validation');
const service = require('../services/auth.service');
const userService = require('../services/user.service');
const security = require('../utils/tokens');
const refreshTokenService = require('../services/refreshtokens.service');

/**
 * Allows the user to login and get a JWT token to authenticate further requests
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const login = async (req, res) => {

    try{

        /* Extract the required vars from the request object */
        const { email, password } = req.body;

        /* Validate the vars */
        validator(email).isDefined().isString().minLen(3);
        validator(password).isDefined().isString().minLen(8);

        /* Perform the login */
        const result = await service.login(email, password);

        if(!result || result?.length <= 0 || result?.state == "fail"){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Login unsuccessful",
                "data": []
            });
        } else {
            
            /* Login was successful, lets generate the auth tokens by sending the generator
                a payload to sign
            */
           const payload = {
            id: result?.data?.id,
            username: result?.data?.username,
            display_name: result?.data?.display_name,
            last_logon: result?.data?.last_logon
           }

           const { accessToken, refreshToken } = await security.generateTokens(payload);
           
           /* Check if the user does not already have a refresh token assigned */
           const tokenExists = await refreshTokenService.findToken(payload.id);
           if(tokenExists?.data?.length > 0){

            /* Remove the existing token and assign the new one */
            const result = await refreshTokenService.removeToken(tokenExists?.data[0].id);
            if(!result){
                return res.status(500).json({
                    "status": 500,
                    "state": "fail",
                    "message": "Problem logging in",
                    "data": []
                });
            } else {
                /* Store the new refresh token for the user */
                const newToken = await refreshTokenService.createToken(payload.id, refreshToken);
                if(!newToken){
                    return res.status(500).json({
                        "status": 500,
                        "state": "fail",
                        "message": "Problem logging in",
                        "data": []
                    });
                }
            }
           }

           /* The refresh token needs to be in a secure httpOnly cookie, whilst the access token can just be 
            sent back in the response */
            res.cookie('refreshToken', refreshToken, { HttpOnly: true });
            res.status(200).send(accessToken);

        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

}

/**
 * registers a new user
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const registerUser = async (req, res) => {

    try{

        /* Extrcat the required vars from the request */
        const { email, password, display_name } = req.body;

        /* Validate the vars */
        validator(email).isDefined().isString().minLen(3);
        validator(password).isDefined().isString().minLen(8);
        validator(display_name).isDefined().isString().minLen(3);

        /* Call the appropriate service to register the user */
        const result = await userService.createUser(email, password, display_name);

        if(!result || result?.state === "fail"){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Registration failure",
                "data": []
            });
        } else {
            return res.status(201).json({
                "status": 201,
                "state": "ok",
                "message": "User registration successful",
                "data": result?.data
            });
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

};

/**
 * Logs a user out of the system
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const logout = async (req, res) => {

    try {

        /* Check that we have a refresh token and it is valid */
        if(!req.cookies['refreshToken']) {
            res.status(404).json({
                "status": 404,
                "state": "fail",
                "message": "No vlaid refresh token found",
                "data": []
            })
        }

        /* Extrcat the token and verify it */
        const token = req.cookies['refreshToken'];
        const verifiedToken = security.verifyRefreshToken(token);
        if(verifiedToken){

            /* Check to see if the refreshToken is in use by the user */
            const storedToken = await refreshTokenService.findToken(verifiedToken.id);
            
            if(storedToken?.data?.length > 0){
                /* User does have a token, so lets remove it */
                const removedToken = await refreshTokenService.removeToken(storedToken.data[0].id);

                if(!removedToken){
                    /* Something has gone wrong whilst logging the user out and removing the refresh key */
                    return res.status(500).json({
                        "status": 500,
                        "state": "fail",
                        "message": "Problem logging out user",
                        "data": []
                    });
                }

            }

            /* Remove the refresh token cookie and let the user know we logged out ok */
            return res.clearCookie('refreshToken', { HttpOnly: true }).status(200).json({
                "status": 200,
                "state": "ok",
                "message": "logged out successfully",
                "data": []
            });


        } else {
            res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Invalid refresh token supplied",
                "data": []
            })
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
    login,
    registerUser,
    logout
}