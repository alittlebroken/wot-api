/* Import supporting libraries and files */
const validator = require('../utils/validation');
const service = require('../services/user.service');
const {logger} = require('../config/logging');

/**
 * Gathers a list of users
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const findUsers = async (req, res) => {

    try{

        /* Call the appropriate service to retrieve the list of users */
        const result = await service.findUsers();

        /* Check the service worked and we have records to send back */
        if(!result){
            logger.log('error', 'Users controller: Problem retrieving list of users');
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "No users found",
                "data": []
            });
        } else {

            if(result?.data?.length <=0 ){
                logger.log('warn', 'Users controller: No users found');
                return res.status(204).json({
                    "status": 204,
                    "state": "ok",
                    "message": "No users found",
                    "data": []
                });
            } else {
                return res.status(200).json({
                    "status": 200,
                    "state": "ok",
                    "message": "",
                    "data": result?.data
                });
            }

        }

    } catch(error) {
        logger.log('error', 'Users controller: ' + error.message);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

};

/**
 * Gets details on a user
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const findUser = async (req, res) => {

    try{

        /* Extract the request paramaters */
        const id  = parseInt(req.params.id);
        
        /* Perform validation */
        validator(id).isDefined().isNumber();

        /* Call the appropriate service and get the user details */
        const result = await service.findById(id);
        
        /* Check the service worked and we have records to send back */
        if(!result){
            logger.log('error', 'Users controller: Problem retrieving specified user');

            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "No users found",
                "data": []
            });
        } else {

            if(result?.data?.length <=0 ){
                logger.log('error', 'Users controller: Unable to find specified user with matching id');
                return res.status(204).json({
                    "status": 204,
                    "state": "ok",
                    "message": "No users found",
                    "data": []
                });
            } else {
                return res.status(200).json({
                    "status": 200,
                    "state": "ok",
                    "message": "",
                    "data": result?.data
                });
            }

        }

    } catch(error) {
        
        logger.log('error', 'Users controller: ' + error.message);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

};

/**
 * Updates a user
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const updateUser = async (req, res) => {

    try{

        /* Extract the request parameters */
        const { id } = parseInt(req.params.id);
        const { column, value } = req.body;

        /* Perform validation */
        validator(id).isDefined().isNumber();
        validator(column).isDefined().isString().minLen();
        validator(value).isDefined();

        /* Call the appropriate service */
        const result = await service.updateUser(id, column, value);

        /* check the results sent back and ensure the user was updated */
        if(!result || result?.data?.length <= 0){
            logger.log('error', 'Users controller: Problem updating the specified user');
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to update user",
                "data": []
            });
        } else {
            return res.status(201).json({
                "status": 201,
                "state": "ok",
                "message": "User successfully updated",
                "data": result?.data
            });
        }

    } catch(error) {
        logger.log('error', 'Users controller: ' + error.message);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

};

/**
 * Remove a user
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const removeUser = async (req, res) => {

    try{

        /* Extract the request parameters */
        const { id } = parseInt(req.params.id);

        /* Perform validation */
        validator(id).isDefined().isNumber();

        /* Call the appropriate service */
        const result = await service.removeUser(id);

        /* check the results sent back and ensure the user was updated */
        if(!result || result?.data?.length <= 0){
            logger.log('error', 'Users controller: Problem removing the user');
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to remove user",
                "data": []
            });
        } else {
            return res.status(200).json({
                "status": 200,
                "state": "ok",
                "message": "User successfully removed",
                "data": result?.data
            });
        }

    } catch(error) {
        logger.log('error', 'Users controller: ' + error.message);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

};

module.exports = {
    findUsers,
    findUser,
    updateUser,
    removeUser
}