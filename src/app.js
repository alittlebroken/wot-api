const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

/* Aloows the use of cookies */
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    allowedHeaders: "authorisation,Authorisation,Content-Type,content-type,Content-type,token,range, crossorigin",
    exposedHeaders: "Content-Range, X-Content-Range"
}));

/* Set the options for handling JSON via the body of the request */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const measurementsRoute = require("./routes/api/v1/measurements.route");
const devicesRoute = require('./routes/api/v1/devices.route');
const componentsRoute = require('./routes/api/v1/components.route');
const authRoutes = require('./routes/api/v1/auth.routes');
const usersRoutes = require('./routes/api/v1/users.route');
const apiKeysRoutes = require('./routes/api/v1/apikeys.routes');
const refreshTokenRoute = require('./routes/api/v1/refreshtokens.routes');

app.use('/api/v1/measurements', measurementsRoute);
app.use('/api/v1/devices', devicesRoute);
app.use('/api/v1/components', componentsRoute);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/apikeys', apiKeysRoutes);
app.use('/api/v1/tokens', refreshTokenRoute);

module.exports = app;