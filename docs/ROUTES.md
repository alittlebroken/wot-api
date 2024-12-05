# API Routes

The below are links to documentation for each of the API routes

## API Keys

Manage API keys used by devices to ensure they can use the system 

* [GET /api/v1/apikeys](./API/APIKEYS/LISTALL.md)
* [GET /api/v1/apikeys/:id](./API/APIKEYS/LISTONE.md)
* [POST /api/v1/apikeys](./API/APIKEYS/CREATE.md)
* [PUT /api/v1/apikeys/:id](./API/APIKEYS/UPDATE.md)
* [DELETE /api/v1/apikeys/:id](./API/APIKEYS/DELETE.md)


## Authentication

Provides mechanisms for a user to login, logout and register themselves with the system.

* [POST /api/v1/auth/login](./API/AUTH/LOGIN.md)
* [POST /api/v1/auth/logout](./API/AUTH/LOGOUT.md)
* [POST /api/v1/auth/register](./API/AUTH/REGISTER.md)
* [POST /api/v1/auth/refresh](./API/AUTH/REFRESH.md)

## Components

Manage components to be usede with a device

* [GET /api/v1/components/](./API/COMPONENTS/LISTALL.md)
* [GET /api/v1/components/:id](./API/COMPONENTS/LISTONE.md)
* [POST /api/v1/components/](./API/COMPONENTS/CREATE.md)
* [PUT /api/v1/components/:id](./API/COMPONENTS/UPDATE.md)
* [DELETE /api/v1/components/:id](./API/COMPONENTS/REMOVE.md)

## Devices

Manage devices

* [GET /api/v1/devices/](./API/DEVICES/LISTALL.md)
* [GET /api/v1/devices/:id](./API/DEVICES/LISTONE.md)
* [POST /api/v1/devices/](./API/DEVICES/CREATE.md)
* [PUT /api/v1/devices/:id](./API/DEVICES/UPDATED.md)
* [DELETE /api/v1/devices/:id](./API/DEVICES/REMOVE.md)

## Measurements

Manage measurements that devices and components produce

* [GET /api/v1/measurements/](./API/MEASUREMENTS/LISTALL.md)
* [GET /api/v1/measurements/:id](./API/MEASUREMENTS/LISTONE.md)
* [POST /api/v1/measurements/](./API/MEASUREMENTS/CREATE.md)
* [PUT /api/v1/measurements/:id](./API/MEASUREMENTS/UPDATED.md)
* [DELETE /api/v1/measurements/:id](./API/MEASUREMENTS/REMOVE.md)

## Refresh Tokens

Manage refresh tokens for users

* [POST /api/v1/tokens/refresh](./API/TOKENS/REFRESH.md)

## Users

Manage the users of the system