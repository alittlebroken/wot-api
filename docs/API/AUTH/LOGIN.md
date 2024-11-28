## Login

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