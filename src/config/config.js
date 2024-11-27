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

/* Security settings */
const SEC_SALT_ROUNDS = process.env.SEC_SALT_ROUNDS;
const SEC_SALT = process.env.SEC_SALT;
const JWT_SECRET_TOKEN =  process.env.JWT_SECRET_TOKEN;
const JWT_DEFAULT_EXPIRY = process.env.JWT_DEFAULT_EXPIRY;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;
const JWT_DEFAULT_EXPIRY_REFRESH = process.env.JWT_DEFAULT_EXPIRY_REFRESH;

/* Logging settings */
const LOG_DIR = process.env.LOG_DIR;
const LOG_HTTP = process.env.LOG_HTTP;
const LOG_APP = process.env.LOG_APP;
const LOG_ERROR = process.env.LOG_ERROR;
const LOG_ROTATION = process.env.LOG_ROTATION;

module.exports = {
    APP_PORT,
    NODE_ENV,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    SEC_SALT_ROUNDS,
    SEC_SALT,
    JWT_SECRET_TOKEN,
    JWT_DEFAULT_EXPIRY,
    JWT_SECRET_REFRESH,
    JWT_DEFAULT_EXPIRY_REFRESH,
    LOG_DIR,
    LOG_HTTP,
    LOG_APP,
    LOG_ERROR,
    LOG_ROTATION
}