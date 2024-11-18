const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/apikeys.controller');
const auth = require('../../../middleware/auth.middleware');

route.get('/', auth.isAuthenticated, controller.findKeys);
route.get('/:id', auth.isAuthenticated, controller.findKey);
route.post('/', auth.isAuthenticated, controller.createKey);
route.put('/:id', auth.isAuthenticated, controller.updateKey);
route.delete('/:id', auth.isAuthenticated, controller.removeKey);

module.exports = route;