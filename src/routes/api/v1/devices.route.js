const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/devices.controller');

/* Add a device to the DB */
route.get('/', controller.findDevices);
route.get('/:id', controller.findDevice);
route.post('/', controller.createDevice);
route.put('/:id', controller.updateDevice);
route.delete('/:id', controller.removeDevice);

module.exports = route;