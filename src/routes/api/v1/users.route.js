const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/users.controller');
const auth = require('../../../middleware/auth.middleware');

route.get('/', auth.isAuthenticated, controller.findUsers);
route.get('/:id', auth.isAuthenticated, controller.findUser);
route.put('/:id', auth.isAuthenticated, controller.updateUser);
route.delete('/:id', auth.isAuthenticated, controller.removeUser);

module.exports = route;