/* Import DB */
const db = require('./db');

/* Create the table statements */
const measurements = `
    CREATE TABLE IF NOT EXISTS measurements(
        id SERIAL PRIMARY KEY,
        device_id INT REFERENCES devices(id),
        component_id INT REFERENCES components(id),
        value VARCHAR(20) NOT NULL,
        logged TIMESTAMP NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited_at TIMESTAMP
    );
`;

const devices = `
    CREATE TABLE IF NOT EXISTS devices(
        id SERIAL PRIMARY KEY,
        mac_address VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        owner INT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited_at TIMESTAMP
    );
`;

const components = `
    CREATE TABLE IF NOT EXISTS components(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        owner INT REFERENCES users(id),
        device_id INT REFERENCES devices(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited_at TIMESTAMP
    );
`;

const users = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        display_name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        last_logon TIMESTAMP,
        verified INT NOT NULL DEFAULT 0,
        locked INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited_at TIMESTAMP
    );
`;

const keys = `
    CREATE TABLE IF NOT EXISTS keys(
        id SERIAL PRIMARY KEY,
        owner INT REFERENCES users(id),
        device_id INT REFERENCES devices(id),
        key VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited_at TIMESTAMP
    );
`;

const tokens = `
    CREATE TABLE IF NOT EXISTS tokens(
        id SERIAL PRIMARY KEY,
        owner INT REFERENCES users(id),
        token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited_at TIMESTAMP
    );
`;

/* Does table exists */
const findTable = async (tableName) => {

    try {

        if(tableName === null || tableName === undefined || tableName === "" || tableName.length < 4){
            console.log("You must supply the name of a table to check for existance");
            return false;
        }

        let result = await db.query(`SELECT FROM information_schema.tables WHERE table_name = '${tableName}';`);

        if(result.rowCount > 0){
            return true;
        } else {
            return false;
        }

    } catch (err) {
        console.log(err);
        return false;
    }

};

/* Clear out the tables */
const truncatetables = async () => {

    try{
        let exists, result;

        exists = await findTable("measurements");
        if(exists){
            result = await db.query("TRUNCATE measurements;");
            console.log("Measurements table truncated");
        }

        exists = await findTable("components");
        if(exists){
            result = await db.query("TRUNCATE components CASCADE;");
            console.log("Components table truncated");
        }

        exists = await findTable("keys");
        if(exists){
            result = await db.query("TRUNCATE keys;");
            console.log("API Keys table truncated");
        }

        exists = await findTable("tokens");
        if(exists){
            result = await db.query("TRUNCATE tokens;");
            console.log("Refresh Tokens table truncated");
        }

        exists = await findTable("users");
        if(exists){
            result = await db.query("TRUNCATE users CASCADE;");
            console.log("Users table truncated");
        }

        exists = await findTable("devices");
        if(exists){
            result = await db.query("TRUNCATE devices CASCADE;");
            console.log("Devices table truncated");
        }

        return true;

    } catch(err) {
        console.log(err);
        return false;
    }

};

/* Drop the existing tables */
const dropTables = async () => {

    console.log("Dropping tables");

    try{

        let result = await db.query("DROP TABLE IF EXISTS measurements;")
        console.log("Meausurements table dropped");

        result = await db.query("DROP TABLE IF EXISTS components;");
        console.log("Components table dropped");

        result = await db.query("DROP TABLE IF EXISTS keys;");
        console.log("API Key table dropped");

        result = await db.query("DROP TABLE IF EXISTS devices;");
        console.log("Devices table dropped");

        result = await db.query("DROP TABLE IF EXISTS tokens;");
        console.log("Refresh Token table dropped");

        result = await db.query("DROP TABLE IF EXISTS users;");
        console.log("Users table dropped");

        return true;

    } catch(err) {

        console.log(err);
        return false;

    }

    

};

/* Setup the Tables */
const createTables = async () => {

        /* Setup each table in turn */
        console.log("Creating tables");

        try{
            let result = await db.query(users);
            console.log("Users table created");

            result = await db.query(devices);
            console.log("Devices table created");

            result = await db.query(components);
            console.log("Components table created");

            result = await db.query(measurements);
            console.log("Measurements table created");

            result = await db.query(keys);
            console.log("API Keys table created");

            result = await db.query(tokens);
            console.log("Refresh Tokens table created");

            return true;
        } catch(err) {
            console.log(err);
            return false;
        }

};


/* Execute the DDL */
(async () => {

    let result = await truncatetables();
    if(!result) return false;

    result = await dropTables();
    if(!result) return false;

    result = await createTables();
    if(!result) return false;

})();