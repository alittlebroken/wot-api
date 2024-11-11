/* Validation library */
const validateMe = require('../utils/validation');

/* Import the service module */
const service = require("../services/device.service");

/** 
 * Adds a new device
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
const createDevice = async (req, res) => {

    try {

        /* Extract the pertient data from the request body */
        const {
            name,
            description,
            owner,
            api_key,
            mac_address,
        } = req.body

        /* Validate the extracted request body variables */
        validateMe("Test Please").isString().minLen(1).validate();
        validateMe(name).isString().minLen(1);
        validateMe(owner).isNumber();
        validateMe(api_key).isString().minLen(12);
        validateMe(mac_address).isString().minLen(6);

        /* Add the device to the DB */
        const result = await service.createDevice(name, api_key, mac_address, owner, description);

        /* Check the result is OK and we have no errors */
        if(result.status === "fail"){
            return res.status(400).json({
                status: 400,
                state: 'fail',
                message: result.message,
                data: []
            })
        }

        return res.status(201).json({
            status: 201,
            state: 'ok',
            message: 'Device successfully added',
            data: result.data
        });


    } catch(error) {
        console.log(error);

        return res.status(500).json({
            status: 500,
            state: 'fail',
            message: error.message,
            data: []
        });

    }

};

/**
 * Returns all devices stored in the DB
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
const findDevices = async (req, res) => {

    try{

        /* Get the devices within the DB */
        const results = await service.findDevices();

        if(!results || results?.state === "fail"){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": results?.message,
                "data": []    
            });
        } else {

            if(res?.data?.length <= 0){

                return res.status(204).json({
                    "status": 204,
                    "state": "ok",
                    "message": "No devices found",
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
        return res.status(500).json({
            "status": 500,
            "state": "fail",
            "message": error.message,
            "data": []
        });
    }

};

/**
 * Returns a specific device from the DB
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
const findDevice = async (req, res) => {

    try{

        /* Extract the id of the device from the request parameter */
        const id = parseInt(req.params.id);

        /* Validate the request parameter */
        validateMe(id).isDefined().isNumber();

        /* Extract the record from the DB */
        const result = await service.findDevice(id);

        /* Check to see if any records were found and handle gracefully either way */
        if(!result || result?.state === "fail"){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": res?.message,
                "data": []
            });
        } else {

            if(result?.data?.length <= 0){
                return res.status(204).json({
                    "status": 204,
                    "state": "ok",
                    "message": result?.message,
                    "data": []
                });
            }

            return res.status(200).json({
                "status": 200,
                "state": "ok",
                "message": "",
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
 * Updates a field for a device
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
const updateDevice = async (req, res) => {

    try{

        /* Destructure the vars from the request body */
        const { column, value } = req.body;

        /* Extract the ID from the request params object */
        const id = parseInt(req.params.id);

        console.log(column, value, id);

        /* Perform validation */
        validateMe(id).isDefined().isNumber();
        validateMe(column).isDefined().isString().minLen(2);
        validateMe(value).isDefined();

        /* Call the service to update the device field specified */
        const result = await service.updateDevice(id, column, value);

        /* Check the update was successful and report back */
        if(!result || result?.state === "fail"){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": result?.message,
                "data": []
            });
        } else {
            return res.status(201).json({
                "status": 201,
                "state": "ok",
                "message": result?.message,
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
 * Removes a device
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
const removeDevice = async (req, res) => {

    try {

        /* Extract the required request parameters */
        const id = parseInt(req?.params.id);

        /* Validate the id */
        validateMe(id).isDefined().isNumber();

        /* Remove the device */
        const result = await service.removeDevice(id);

        if(!result || result.state === "fail"){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": result?.message || "Unable to remove device",
                "data": []
            });
        } else {
            if(result?.rows?.length <= 0){
                return res.status(404).json({
                    "status": 494,
                    "state": "fail",
                    "message": "No device found to delete"
                });
            }

            return res.status(200).json({
                "status": 200,
                "state": "ok",
                "message": "Device successfully removed",
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
    createDevice,
    findDevices,
    findDevice,
    updateDevice,
    removeDevice
}