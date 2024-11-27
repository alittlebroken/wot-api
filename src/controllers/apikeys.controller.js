/* Import supporting libraries and files */
const validator = require('../utils/validation');
const service = require('../services/apikeys.service');
const {logger} = require('../config/logging');

/**
 * Gets a list of all api keys in the system
 * @param {object} req - The Express request object
 * @param {object} res - The express response object
 */
const findKeys = async (req, res) => {

    try {

        /* Call the appropriate service to get a list of keys */
        const results = await service.findApiKeys();

        /* Check the results sent back to us */
        if(!results){
            logger.log('error', 'API Keys Controller: Problem getting list of keys');
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Problem whilst accessing resource",
                "data": []
            });  
        } else {

            if(results?.data?.length <= 0){
                logger.log('warn', 'API Keys Controller: No keys found');
                return res.status(204).json({
                    "status": 204,
                    "state": "ok",
                    "message": "Unable to find any keys",
                    "data": []
                });
            }

            return res.status(200).json({
                "status": 200,
                "state": "ok",
                "message": "",
                "data": results?.data
            });

        }


    } catch(error) {
        logger.log('error', 'API Keys Controller: ' + error.message);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

};

/**
 * Get an api keys in the system
 * @param {object} req - The Express request object
 * @param {object} res - The express response object
 */
const findKey = async (req, res) => {

    try {

        /* Extract and validate the request parameters */
        const id = parseInt(req.params.id);
        validator(id).isDefined().isNumber();

        /* Call the correct service and check the result sent back */
        const results = await service.findApiKey(id);
        if(!results){
            logger.log('error', 'API Keys Controller: Problem whilst retrieving key');
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Problem whilst accessing resource",
                "data": []
            });  
        } else {

            if(results?.data?.length <= 0){
                logger.log('warn', 'API Keys Controller: No matching key found');
                return res.status(204).json({
                    "status": 204,
                    "state": "ok",
                    "message": "Unable to find key",
                    "data": []
                });
            }

            return res.status(200).json({
                "status": 200,
                "state": "ok",
                "message": "",
                "data": results?.data
            });

        }


    } catch(error) {
        logger.log('error', 'API Keys Controller: ' + error.message);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

};

/**
 * Create a new API key
 * @param {object} req - The Express request object
 * @param {object} res - The express response object
 */
const createKey = async (req, res) => {

    try {

        /* Extract and validate the request parameters */
        const { owner, device_id } = req.body;
        validator(owner).isDefined().isNumber();
        validator(device_id).isDefined().isNumber();

        /* Call the correct service and check the result sent back */
        const results = await service.createApiKey(owner, device_id);
        if(!results || results?.data?.length <= 0){
            logger.log('error', 'API Keys Controller: Unable to create new key');
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to create new key",
                "data": []
            });
        } else {
            return res.status(201).json({
                "status": 201,
                "state": "ok",
                "message": "Key created successfully",
                "data": results?.data
            });
        }

    } catch(error) {
        logger.log('error', 'API Keys Controller: ' + error.message);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    };

};

/**
 *Update an existing key
 * @param {object} req - The Express request object
 * @param {object} res - The express response object
 */
const updateKey = async (req, res) => {

    try {

        /* Extract and validate the request parameters */
        const id = parseInt(req.params.id);
        validator(id).isDefined().isNumber();

        const { column, value } = req.body;
        validator(column).isDefined().isString().minLen(1);
        validator(value).isDefined();

        /* Call the correct service and check the result sent back */
        const results = await service.updateApiKey(id, column, value);

        if(!results){
            logger.log('error', 'API Keys Controller: Unable to update key');
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to update key",
                "data": []
            });
        } else {

            if(results?.data?.length <= 0) {
                logger.log('warn', 'API Keys Controller: No key found to update');
                return res.status(404).json({
                    "status": 404,
                    "state": "ok",
                    "message": "No key found to update",
                    "data": []
                });
            }

            return res.status(201).json({
                "status": 201,
                "state": "ok",
                "message": "Key updated successfully",
                "data": results?.data
            });
        }

    } catch(error) {
        logger.log('error', 'API Keys Controller: ' + error.message);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    };

};

/**
 * Remove an existing key
 * @param {object} req - The Express request object
 * @param {object} res - The express response object
 */
const removeKey = async (req, res) => {

    try {

        /* Extract and validate the request parameters */
        const id = parseInt(req.params.id);
        validator(id).isDefined().isNumber();

        /* Use the appropriate service and check it's result */
        const results = await service.removeKey(id);

        if(!results){
            logger.log('error', 'API Keys Controller: Unable to remove key');
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to remove key",
                "data": []
            });
        } else {

            if(results?.data?.length <= 0) {
                logger.log('warn', 'API Keys Controller: No key found to remove');
                return res.status(404).json({
                    "status": 404,
                    "state": "ok",
                    "message": "No key found to remove",
                    "data": []
                });
            }

            return res.status(201).json({
                "status": 201,
                "state": "ok",
                "message": "Key removed successfully",
                "data": results?.data
            });
        }



    } catch(error) {
        logger.log('error', 'API Keys Controller: ' + error.message);
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

};

module.exports = {
    findKeys,
    findKey,
    createKey,
    updateKey,
    removeKey
}