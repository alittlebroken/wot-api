# wot-api

Web of Things API

wot-api is a set of RESTful resources to allow arduino and raspberry pi devices to record measurements of their installed components.

## Getting Started

The steps below will allow you to get a local development copy of the recipeFinder up and running.

### Prerequisites

The below is the software used to develop this application and it's highly recommended you have this installed globally to your local machine and working before you start.

* node v20.15.1
* npm v10.7.0
* postgresql 16.4

### Installation

The below steps will get a local copy of the application up and running for you

#### Database

```
$ psql -U <postgres admin user>
 
  >: enter in the password when prompted

$ CREATE DATABASE <dbname>;
$ CREATE USER <username> WITH ENCRYPTED PASSWORD '<password>';
$ GRANT ALL PRIVILEGES ON DATABASE <dbname> TO <username>;
```

Remember to take note of the database name, username and password and insert them into the appropriate database environment variables for the application to use

#### Application

```
$ git clone https://github.com/alittlebroken/wot-api.git
$ cd wot-api
$ npm install
```

##### Configuration

You will need to set the following environment vars for your OS of choice or create a .env file with them in the porjects root directory

The examples below are for use in a .env file and have default values set. 

For security reasons always change any default passwords listed below

```
# Main Application variables
APP_PORT=3005
# Update this to production when deploying to production
NODE_ENV=development

# Database 
DB_USER=wotusr
DB_PASS=wotpass
DB_NAME=wot
DB_HOST=api.wot.internal
DB_PORT=5432

# Security Settings
SEC_SALT_ROUNDS=10
SEC_SALT=m4k3sur3ToCh4ng3M3
JWT_SECRET_TOKEN=S3cur3En0ugh4D3v!
JWT_SECRET_REFRESH=L3tsD0M0r3F0rSa!
JWT_DEFAULT_EXPIRY=5m
JWT_DEFAULT_EXPIRY_REFRESH=1d

# Logging settings
LOG_DIR=logs
LOG_HTTP=http.log
LOG_APP=app.log
LOG_ERROR=error.log
LOG_ROTATION=1d
```

The log files are all stored in the logs folder at the root of the project folder

The following commands will setup the databse for the appication and load some seed data. The commands must be run from the applications root folder

```
$ cd src/database
$ node setup.js
```

## Usage

A few examples of useful commands and/or tasks.

```
# Start application
$ npm run dev
```

## Deployment

You will find below links to readme files on how to get the application up and running on various other platforms or environments
<!--- 
* [Docker containers](./docs/DOCKERINSTALL.md)
* [Docker Dev Environment](./docs/DOCDKERDEVINSTALL.md)
-->

## Documentation

* [API Routes](./docs/ROUTES.md)