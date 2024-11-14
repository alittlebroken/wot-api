const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/auth.controller');

route.post('/login', controller.login);
route.post('/register', controller.registerUser);

module.exports = route;