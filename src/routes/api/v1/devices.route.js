const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/devices.controller');
const auth = require('../../../middleware/auth.middleware');

/* Add a device to the DB */
route.get('/', auth.isAuthenticated, controller.findDevices);
route.get('/:id', auth.isAuthenticated, controller.findDevice);
route.post('/', auth.isAuthenticated, controller.createDevice);
route.put('/:id', auth.isAuthenticated, controller.updateDevice);
route.delete('/:id', auth.isAuthenticated, controller.removeDevice);

module.exports = route;