require('dotenv').config();

/* Import the correct environmental vars needed */
/* Base application config */
const APP_PORT = process.env.APP_PORT;

/* Enviornment the app is running under */
const NODE_ENV = process.env.NODE_ENV;

/* Database connection information */
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

module.exports = {
    APP_PORT,
    NODE_ENV,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_HOST,
    DB_PORT,
}