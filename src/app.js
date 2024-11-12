const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

/* Set the options for handling JSON via the body of the request */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const measurementsRoute = require("./routes/api/v1/measurements.route");
const devicesRoute = require('./routes/api/v1/devices.route');
const componentsRoute = require('./routes/api/v1/components.route');

app.use('/api/v1/measurements', measurementsRoute);
app.use('/api/v1/devices', devicesRoute);
app.use('/api/v1/components', componentsRoute);

module.exports = app;