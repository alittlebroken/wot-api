/* Import supporting libraries and files */
const validator = require('../utils/validation');
const service = require('../services/measurement.service');

/**
 * Lists all measurements in the system
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const findMeasurments = async (req, res) => {

    try{

        /* Call the service to get the list of measurements */
        const result = await service.findMeasurements();

        /* Check the result to ensure that the service ran as expected */
        if(!result){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": result?.message,
                "data": result?.data
            });
        } else {
            if(result?.data?.length <= 0){
                return res.status(204).json({
                    "status": 204,
                    "state": "ok",
                    "message": "No measurements found",
                    "data": result?.data
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
 * Lists a individual measurement in the system
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const findMeasurement = async id => {

    try{

        /* Extract the ID from the request parameters */
        const id = parseInt(req.params.id);

        /* Validate the id */
        validator(id).isDefined().isNumber();

        /* Call the appropriate service to get the required data */
        const result = await service.findMeasurement(id);

        /* Check the result to ensure that the service ran as expected */
        if(!result){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": result?.message,
                "data": result?.data
            });
        } else {
            if(result?.data?.length <= 0){
                return res.status(204).json({
                    "status": 204,
                    "sate": "ok",
                    "message": "No measurement found",
                    "data": result?.data
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
 * Creates a new measurement
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const createMeasurement = async (req, res) => {

    try{

        /* Extract the data from the request body */
        const {
            device_id,
            component_id,
            value,
            logged
        } = req.body;

        /* Validate the request body vars */
        validator(device_id).isDefined().isNumber();
        validator(component_id).isDefined().isNumber();
        validator(logged).isDefined().isString().minLen(1);
        validator(value).isDefined();

        /* Call the service */
        const result = await service.createMeasurement(device_id, component_id, value, logged);

        /* Check the result to ensure that the service ran as expected */
        if(!result || result?.data?.length <= 0){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to create measurement",
                "data": result?.data
            });
        } else {

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
 * Updates a field of the measurement
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const updateMeasurement = async (req, res) => {#
    
    try{

        /* Extract the id from the request param */
        const id = parseInt(req.params.id);

        /* Extract the vars from the request body */
        const { column, value } = req.body;

        /* Validate the vars */
        validator(id).isDefined().isNumber();
        validator(column).isDefined().isString().minLen(2);
        validator(value).isDefined();

        /* Call the appropriate service */
        const result = await service.updateMeasurement(id, column, value);

        /* Check the result to ensure that the service ran as expected */
        if(!result){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": result?.message,
                "data": result?.data
            });
        } else {
            if(result?.data?.length <= 0){
                return res.status(204).json({
                    "status": 204,
                    "sate": "ok",
                    "message": "No measurement found",
                    "data": result?.data
                 });
            }

            return res.status(201).json({
                "status": 201,
                "state": "ok",
                "message": "Meaurement updated",
                "data": result?.data
             });
        }

    }  catch(error) {
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
 * Removes a measurement
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 */
const removeMeasurement = async (req, res) => {

    try{

        /* Extract the id from the request param */
        const id = parseInt(req.params.id);

        /* Validate the vars */
        validator(id).isDefined().isNumber();
       
        /* Call the appropriate Service */
        const result = await service.removeMeasurement(id);

        /* Check the result to ensure that the service ran as expected */
        if(!result){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": result?.message,
                "data": result?.data
            });
        } else {
            if(result?.data?.length <= 0){
                return res.status(204).json({
                    "status": 204,
                    "sate": "ok",
                    "message": "No measurement found to remove",
                    "data": result?.data
                 });
            }

            return res.status(200).json({
                "status": 200,
                "state": "ok",
                "message": "Meaurement removed",
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
    findMeasurments,
    findMeasurement,
    createMeasurement,
    updateMeasurement,
    removeMeasurement
}