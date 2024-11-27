const morgan = require('morgan');
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

module.exports = {
    morganLog,
    morganConsole
};