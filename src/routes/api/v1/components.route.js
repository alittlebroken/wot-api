const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/components.controller');
const auth = require('../../../middleware/auth.middleware');

route.get('/', auth.isAuthenticated, controller.getComponents);
route.get('/:id', auth.isAuthenticated, controller.getComponent);
route.post('/', auth.isAuthenticated, controller.createComponent);
route.put('/:id', auth.isAuthenticated, controller.updateComponent);
route.delete('/:id', auth.isAuthenticated, controller.removeComponent);


module.exports = route;