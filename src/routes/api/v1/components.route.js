const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/components.controller');

route.get('/', controller.getComponents);
route.get('/:id', controller.getComponent);
route.post('/', controller.createComponent);
route.put('/:id', controller.updateComponent);
route.delete('/:id', controller.removeComponent);


module.exports = route;