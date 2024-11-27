const morgan = require('morgan');
const winston = require('winston');
const fs = require('fs');
const path = require('path');
const config = require('./config');

/* Get the root directory for the app */
const rootDir = path.dirname(process.argv[1]);

/* Create an access stream for the http access log */
const httpFileStream = fs.createWriteStream(path.join(rootDir, config.LOG_DIR, config.LOG_HTTP), { flags: 'a'});
const morganLog = morgan(
    ':date[iso] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', 
    { stream: httpFileStream});

const morganConsole = morgan('combined');

/* Setup the various winston logging options */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true}),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'wot-api'},
    transports: [
        new winston.transports.File({ filename: path.join(rootDir, config.LOG_DIR, config.LOG_APP)})
    ]
})

if(config.NODE_ENV === "development"){
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
};

module.exports = {
    morganLog,
    morganConsole,
    logger
};