/* Import DB */
const db = require('./db');

/* Create the table statements */
const measurements = `
    CREATE TABLE IF NOT EXISTS measurements(
        id SERIAL PRIMARY KEY,
        device_id INT NOT NULL,
        component_id INT NOT NULL,
        value VARCHAR(20) NOT NULL,
        logged TIMESTAMP NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited_at TIMESTAMP
    );
`;

const devices = `
    CREATE TABLE IF NOT EXISTS devices(
        id SERIAL PRIMARY KEY,
        api_key VARCHAR(255) NOT NULL,
        mac_address VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        owner INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited_at TIMESTAMP
    );
`;

const components = `
    CREATE TABLE IF NOT EXISTS components(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
         owner INT NOT NULL,
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

            return true;
        } catch(err) {
            console.log(err);
            return false;
        }

};


/* Execute the DDL */
(async () => {

    let result = await createTables();
    if(!result) return false;

})();