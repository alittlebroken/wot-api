const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/measurements.controller.js');
const auth = require('../../../middleware/auth.middleware');

route.get('/', auth.isAuthenticated, controller.findMeasurments);
route.get('/:id', auth.isAuthenticated, controller.findMeasurement);
route.post('/', auth.isValidDevice, controller.createMeasurement);
route.put('/:id', auth.isAuthenticated, controller.updateMeasurement);
route.delete('/:id', auth.isAuthenticated, controller.removeMeasurement);

module.exports = route;