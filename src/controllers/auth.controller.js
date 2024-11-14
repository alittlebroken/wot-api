/* Import supporting libraries and files */
const validator = require('../utils/validation');
const service = require('../services/auth.service');
const userService = require('../services/user.service');

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
            return res.status(200).json({
                "status": 200,
                "state": "ok",
                "message": "Login successful",
                "data": result
            })
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

module.exports = {
    login,
    registerUser
}