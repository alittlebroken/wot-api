const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/auth.controller');
const auth = require('../../../middleware/auth.middleware');

route.post('/login', controller.login);
route.post('/logout', auth.isAuthenticated, controller.logout);
route.post('/register', controller.registerUser);

module.exports = route;