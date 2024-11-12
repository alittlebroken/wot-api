/* Import supporting libraries and files */
const validator = require('../utils/validation');
const service = require('../services/component.service');

/**
 * Gets a list of all components in the system
 * @param {object} req - The Express request object
 * @param {object} res - The express response object
 */
const getComponents = async (req, res) => {

    try{

        /* Get the desired records from the DB */
        const result = await service.findComponents();

        if(!result){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to retrieve list of components",
                "data": []
            });
        } else {

            if(result?.data?.length <=0){
                return res.status(204).json({
                    "status": 204,
                    "state": "ok",
                    "message": "No data to retrieve",
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

}

/**
 * Get a particular component in the system
 * @param {object} req - The Express request object
 * @param {object} res - The express response object
 */
const getComponent = async (req, res) => {

    try{

        /* Extract the ID from the request param */
        const id = parseInt(req.params.id);

        /* Validate the ID */
        validator(id).isDefined().isNumber();

        /* get the desired record from the db */
        const result = await service.findComponent(id);

        /* Check the result is ok */
        if(!result || result?.data?.length <= 0){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to retrieve list of components",
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
 * Create a new component
 * @param {object} req - The Express request object
 * @param {object} res - The express response object
 */
const createComponent = async (req,res) => {

    try{

        /* Destructure the request body */
        const {name, description, owner, device_id, } = req.body;

        /* Validate the request body params */
        validator(name).isDefined().isString().minLen(1);
        validator(description).isDefined().isString().minLen(1);
        validator(owner).isDefined().isNumber();
        validator(device_id).isDefined().isNumber();

        /* Create the component */
        const result = await service.createComponent(name, description, owner, device_id);

        if(!result || result?.data?.length <= 0){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to create component",
                "data": []
            });
        } else {
            return res.status(201).json({
                "status": 201,
                "state": "ok",
                "message": "Component successfully created",
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
 * Update a piece of component information
 * @param {object} req - The Express request object
 * @param {object} res - The express response object
 */
const updateComponent = async (req, res) => {

    try{

        /* Extract the component id */
        const id = parseInt(req.params.id);

        /* Destructure the request body */
        const {column, value } = req.body;

        /* Validate the request body params */
        validator(column).isDefined().isString().minLen(1);
        validator(id).isDefined().isNumber();

        /* Update the component */
        const result = await service.updateComponent(id, column, value);

        if(!result || result?.data?.length <= 0){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to update component",
                "data": []
            });
        } else {
            return res.status(201).json({
                "status": 201,
                "state": "ok",
                "message": "Component successfully updated",
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
 * Remove a component
 * @param {object} req - The Express request object
 * @param {object} res - The express response object
 */
const removeComponent = async (req, res) => {

    try{

        /* Extract the component id */
        const id = parseInt(req.params.id);

        /* Validate the request body params */
        validator(id).isDefined().isNumber();

        /* Remove the component */
        const result = await service.deleteComponent(id);

        if(!result){
            return res.status(400).json({
                "status": 400,
                "state": "fail",
                "message": "Unable to remove component",
                "data": []
            });
        } else {
            return res.status(200).json({
                "status": 200,
                "state": "ok",
                "message": "Component successfully removed",
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
    getComponents,
    getComponent,
    createComponent,
    updateComponent,
    removeComponent
}