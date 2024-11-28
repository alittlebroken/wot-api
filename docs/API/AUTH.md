## Authentication

Provides mechanisms for a user to login, logout and register themselves with the system.

### Login

Allows the user to login and supplies them with a refresh token and access token. The refresh token is set as a http only cookie and the access token is sent as json.

```plaintext
POST /api/v1/auth/login
```

Supported attributes:

| Attribute                | Type     | Required | Description           |
|--------------------------|----------|----------|-----------------------|
| `email`               | string   | Yes      | Email of the registered user. |
| `password`               | string   | Yes      | Password for the registered user. |

If successful, returns [`200`] and response attributes:

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `accessToken`            | string | An access token for the user which has a default expiration of 5 minutes. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Login unsuccessful", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "Problem logging in", "data": []}`|


Example request:

```shell
curl --location 'http://localhost:3005/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3ODcyNDgsImV4cCI6MTczMjg3MzY0OH0.RKahLVNy2nV5ak0bUtdH5N0QM-dJvUF9hiWKf-hgt9s' \
--data-raw '{
    "email": "user@test.com",
    "password": "L3tM31nPl34s3!"
}'
```

Example response:

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3MTYzNzUsImV4cCI6MTczMjcxNjY3NX0.H5ZPFbERZzUpyHRIxN3ABC5hrwzQluwKknu37ZP34ok"
}
```

### Logout

Logs the user out of the system, removing any refresh tokens assigned.

Requires you to be logged in to use this route.

```plaintext
POST /api/v1/auth/logout
```

Supported attributes: 

`none`

If successful, returns ['200'] and a JSON object of the response attributes.

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `accessToken`            | string | An access token for the user which has a default expiration of 5 minutes. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Invalid refresh token supplied", "data": []}`|
| `404`                     | application/json | `{ "status": 404, "state": "fail", "message": "No valid refresh token found", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": "Problem logging out user", "data": []}`|

Example request:

```shell
curl --location --request POST 'http://localhost:3005/api/v1/auth/logout' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3ODcxNTUsImV4cCI6MTczMjc4NzQ1NX0.ostNn4ZR_GvDsCouyDYMbK_BrhiKVZPgGQT2icgn0GA' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3ODcxNTUsImV4cCI6MTczMjg3MzU1NX0.uy1Le7WevfmDsIO8tf0rWGeW_ejCsO6rODsWyADTHnA' \
--data ''
```

Example response:

```json
{
    "status": 401,
    "state": "fail",
    "message": "Must be logged in to access this resource",
    "data": []
}
```

### Register

Creates a new user

```plaintext
POST /api/v1/auth/register
```

Supported attributes:

| Attribute                | Type     | Required | Description           |
|--------------------------|----------|----------|-----------------------|
| `email`               | string   | Yes      | Email of the new user user. |
| `password`               | string   | Yes      | Password for the new user user. |
| `display_name`               | string   | Yes      | The display name for the new user. |

If successful, returns ['201'] and a JSON object of the response attributes.

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `status`            | number | The HTTP staus code for the request. |
| `state`            | string | Whether the request has failed or is ok. |
| `message`            | string | Any supporting message for the response. |
| `data`            | array | Contains the user details just registered. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `400`                     | application/json | `{ "status": 400, "state": "fail", "message": "Registration failure", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": <varies based on error raised>, "data": []}`|


```shell
curl --location 'http://localhost:3005/api/v1/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user1@test.com",
    "password": "us3r0n3!",
    "display_name": "User one"
}'
```

Example response:

```json
{
    "status": 201,
    "state": "ok",
    "message": "User registration successful",
    "data": [
        {
            "id": 3,
            "username": "user1@test.com",
            "display_name": "User One"
        }
    ]
}
```

### Refresh

Requests a new access token for the logged in user

Requires you to be logged in to use this route.

```plaintext
POST /api/v1/auth/refresh
```

Supported attributes: 

`none`

If successful, returns ['200'] and a JSON object of the response attributes.

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `accessToken`            | string | A new access tokenfor the user which has a default expiration of 5 minutes. |

If unsuccessful returns the following response codes and data:

| HTTP Code                 | Content Type   | Response        |
|---------------------------|----------------|-----------------|
| `401`                     | application/json | `{ "status": 401, "state": "fail", "message": "Unauthorised access. Please login", "data": []}`|
| `401`                     | application/json | `{ "status": 401, "state": "fail", "message": "Problem verifying refresh token. Please login.", "data": []}`|
| `500`                     | application/json | `{ "status": 500, "state": "fail", "message": <varies based on error raised>, "data": []}`|

Example request:

```shell
curl --location --request POST 'http://localhost:3005/api/v1/auth/refresh' \
--header 'Authorisation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI1NDU4MTUsImV4cCI6MTczMjU0NjExNX0.XyTmtQZ2UEGK_989jRpBMF2gnDphrUu3SEd3hs-F4ps' \
--header 'Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwbG9ja3llckBnb29nbGVtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6IlBhdWwiLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3ODcyNDgsImV4cCI6MTczMjg3MzY0OH0.RKahLVNy2nV5ak0bUtdH5N0QM-dJvUF9hiWKf-hgt9s'
```

Example response:

```html
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheV9uYW1lIjoiUGF1bCIsInVzZXJuYW1lIjoicGxvY2t5ZXJAZ29vZ2xlbWFpbC5jb20iLCJsYXN0X2xvZ29uIjpudWxsLCJpYXQiOjE3MzI3ODgzMTMsImV4cCI6MTczMjc4ODYxM30._2CgcsxDQraz88Xgh2E7cDSSHH1bh8ZqliwrEn8oVdQ"
```