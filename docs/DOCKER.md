# Deploying locally with Docker

`IMPORTANT:` Remember to change all ENV data especially passwords and usernames from the defaults for security reasons.

This will get a local dev environment setup on your local machine

## Table of contents

[Prerequisites](#Prerequisites)



## Prerequisites

The below is the software used to develop this application and it's highly recommended you have this installed globally to your local machine and working before you start.

* Docker Desktop / Docker CLI
* node v20.15.1
* npm v10.7.0
* postgresql 16.4

## Common Steps for both scenarios

### Clone the repo

```bash
mkdir wot
cd wot
mkdir server
cd server
git clone https://github.com/alittlebroken/wot-api.git .
npm install
```

### Configure the .env file & docker files

- Edit the compose.db.yaml file
- Under the environment section, set a new hard to guess password for POSTGRES_PASSWORD and then save and close the file
- If needed do the same for the compose.yaml file, the POSTGRES_PASSWORD entry you need to change is listed under the environment section for the db service
- Create a new .env file in the projects root folder and set the following entries

```text
# Main Application variables
APP_PORT=3005
NODE_ENV=development

# Database 
DB_USER=wotusr
DB_PASS=<set to pass used in composer.db.yaml>
DB_NAME=wot
DB_HOST=localhost
DB_PORT=5432

# Security Settings
SEC_SALT_ROUNDS=10
SEC_SALT=CHANGE_ME
JWT_SECRET_TOKEN=CHANGE_ME
JWT_SECRET_REFRESH=CHANGE_ME
JWT_DEFAULT_EXPIRY=5m
JWT_DEFAULT_EXPIRY_REFRESH=1d

# Logging settings
LOG_DIR=logs
LOG_HTTP=http.log
LOG_APP=app.log
LOG_ERROR=error.log
LOG_ROTATION=1d
```

- Change any other values from the defaults if you so desire and ensure you provide values where it says ***CHANGE_ME***

## Database

Use this method if you are planning on running the API code from the source directory rather in a docker image but still require the DB in it's own container

### Build & Start the DB docker container

```bash
cd wot
cd server
docker-compose -f compose.db.yaml up -d
```

### Create the DB and any contents

```bash
node ./src/database/setup.js
```

### Start the API server

```bash
npm run dev
```

## API and Database

Use this method if you wish to have a local wot backend running to help develop the frontend

### Clone the repo

```bash
mkdir wot
cd wot
mkdir server
cd server
git clone https://github.com/alittlebroken/wot-api.git .
npm install
```

#### Build and start the backend

```bash
cd wot
cd server
docker-compose -f compose.yaml up -d
```