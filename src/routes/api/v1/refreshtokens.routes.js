const express = require('express');
const route = express.Router();
const controller = require('../../../controllers/refreshtokens.controller');
const auth = require('../../../middleware/auth.middleware');

route.post('/refresh', auth.isAuthenticated, controller.refreshToken);

module.exports = route;