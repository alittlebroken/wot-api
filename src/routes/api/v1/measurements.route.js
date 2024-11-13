const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/measurements.controller.js');

route.get('/', controller.findMeasurments);
route.get('/:id', controller.findMeasurement);
route.post('/', controller.createMeasurement);
route.put('/:id', controller.updateMeasurement);
route.delete('/:id', controller.removeMeasurement);

module.exports = route;